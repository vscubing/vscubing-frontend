import { Header, SectionHeader } from '@/components/layout'
import { CubeSwitcher, OverlaySpinner } from '@/components/ui'
import { useQuery } from '@tanstack/react-query'
import { Link, Navigate, getRouteApi } from '@tanstack/react-router'
import {
  getContestResultsInfiniteQuery,
  getContestResultsQuery,
  type ContestResultsDTO,
  type ContestSession,
} from '../../api'
import { SessionSkeleton, Session } from './Session'
import { SessionsListHeader } from './SessionsListHeader'
import { type ReactNode } from 'react'
import {
  AutofillHeight,
  type Behavior,
  type ListWithPinnedItemProps,
  type ListWrapperProps,
} from '@/shared/autofillHeight'
import { cn, formatContestDuration, matchesQuery } from '@/utils'
import { useOngoingContest } from '@/shared/contests'
import { type AxiosError } from 'axios'
import { PaginationInvalidPageHandler, NotFoundHandler } from '@/shared/ErrorHandlers'
import { HintSection, HintSignInSection } from '@/shared/HintSection'
import { NavigateBackButton } from '@/shared/NavigateBackButton'
import { PageTitleMobile } from '@/shared/PageTitleMobile'
import { Pagination } from '@/shared/Pagination'

const route = getRouteApi('/_app/contests/$contestSlug/results')
export function ContestResultsPage() {
  return matchesQuery('sm') ? <ControllerWithInfiniteScroll /> : <ControllerWithPagination />
}

function ControllerWithPagination() {
  const { contestSlug } = route.useParams()
  const { discipline, page } = route.useSearch()

  const {
    fittingCount: pageSize,
    optimalElementHeight,
    containerRef,
    fakeElementRef,
  } = AutofillHeight.useFittingCount()
  const query = getContestResultsQuery({
    contestSlug,
    disciplineSlug: discipline,
    page,
    pageSize: pageSize ?? 0,
    enabled: pageSize !== undefined,
  })

  const { data, error, isFetching } = useQuery(query)

  return (
    <View contest={data?.results.contest} pages={data?.pages} error={error} behavior='pagination'>
      <SessionsList
        behavior='pagination'
        list={data?.results.roundSessionSet}
        ownSession={data?.results.ownResult}
        containerRef={containerRef}
        fakeElementRef={fakeElementRef}
        isFetching={isFetching}
        pageSize={pageSize}
        optimalElementHeight={optimalElementHeight}
      />
    </View>
  )
}

function ControllerWithInfiniteScroll() {
  const { contestSlug } = route.useParams()
  const { discipline } = route.useSearch()

  const { fittingCount: pageSize, containerRef, fakeElementRef } = AutofillHeight.useFittingCount()
  const query = getContestResultsInfiniteQuery({
    contestSlug,
    disciplineSlug: discipline,
    pageSize: pageSize ?? 0,
    enabled: pageSize !== undefined,
  })
  const { data, isFetching, isLoading, error, lastElementRef } = AutofillHeight.useInfiniteScroll(query)
  const isFetchingNotFirstPage = isFetching && !isLoading

  return (
    <>
      <OverlaySpinner isVisible={isFetchingNotFirstPage} />
      <View
        contest={data?.pages?.at(0)?.results.contest}
        behavior='infinite-scroll'
        errorCode={error?.response?.status}
        error={error}
      >
        <SessionsList
          behavior='infinite-scroll'
          list={data?.pages.flatMap((page) => page.results.roundSessionSet)}
          ownSession={data?.pages.at(0)?.results.ownResult}
          containerRef={containerRef}
          fakeElementRef={fakeElementRef}
          lastElementRef={lastElementRef}
          isFetching={isFetching}
          pageSize={pageSize}
        />
      </View>
    </>
  )
}

type ViewProps = {
  behavior: Behavior
  contest?: ContestResultsDTO['contest']
  pages?: number
  error: AxiosError | null
  children: ReactNode
  errorCode?: number
}
function View({ pages, contest, children, error, behavior, errorCode }: ViewProps) {
  const { contestSlug } = route.useParams()
  const { discipline, page } = route.useSearch()

  const { data: ongoing } = useOngoingContest()
  const isOngoing = contestSlug === ongoing?.data?.slug

  const contestDuration = contest ? formatContestDuration(contest) : undefined

  let title = ''
  if (!isOngoing) {
    title = 'Look through the contest results'
  } else if (errorCode === 401) {
    title = `Ongoing contest (${contestDuration})`
  } else {
    title = 'Check out ongoing contest results'
  }

  return (
    <section className='flex flex-1 flex-col gap-3 sm:gap-2'>
      <Header title={title} />
      <PageTitleMobile>{title}</PageTitleMobile>

      <NavigateBackButton className='self-start' />
      <ErrorHandler error={error}>
        <SectionHeader className='gap-4 sm:gap-2 sm:px-4'>
          <div className='flex gap-3'>
            {contest?.disciplineSet?.map(({ slug: disciplineSlug }) => (
              <Link
                from='/contests/$contestSlug/results'
                search={{ discipline: disciplineSlug, page: 1 }}
                params={{ contestSlug }}
                key={disciplineSlug}
              >
                <CubeSwitcher asButton={false} cube={disciplineSlug} isActive={discipline === disciplineSlug} />
              </Link>
            ))}
          </div>
          <div>
            <h2 className='title-h2 mb-1'>Contest {contestSlug}</h2>
            <p className={cn('text-large min-w-1 text-grey-40', contestDuration ? undefined : 'opacity-0')}>
              {contestDuration ?? 'Loading...'}
            </p>
          </div>
          {behavior === 'pagination' && <Pagination currentPage={page} pages={pages} className='ml-auto sm:hidden' />}
        </SectionHeader>
        {children}
      </ErrorHandler>
    </section>
  )
}

type SessionsListProps = {
  ownSession: ContestResultsDTO['ownResult']
} & Pick<ListWrapperProps, 'containerRef' | 'fakeElementRef'> &
  Pick<ListWithPinnedItemProps<ContestSession>, 'pageSize' | 'lastElementRef' | 'list' | 'isFetching' | 'behavior'> & {
    optimalElementHeight?: number
  }
function SessionsList({
  isFetching,
  lastElementRef,
  behavior,
  ownSession,
  list,
  pageSize,
  containerRef,
  fakeElementRef,
  optimalElementHeight,
}: SessionsListProps) {
  const { contestSlug } = route.useParams()
  const { discipline } = route.useSearch()

  if (list?.length === 0) {
    return (
      <HintSection>
        <p>It seems no one participated in this round</p>
      </HintSection>
    )
  }

  return (
    <div className='flex flex-1 flex-col gap-1 rounded-2xl bg-black-80 p-6 sm:p-3'>
      <SessionsListHeader className='md:hidden' />
      <AutofillHeight.ListWrapper
        renderFakeElement={() => <SessionSkeleton />}
        fakeElementRef={fakeElementRef}
        containerRef={containerRef}
      >
        <AutofillHeight.ListWithPinnedItem
          lastElementRef={lastElementRef}
          pinnedItem={ownSession ?? undefined}
          getItemKey={(session) => session.roundSession.id}
          behavior={behavior}
          isHighlighted={(session) => session.roundSession.id === ownSession?.roundSession.id}
          renderPinnedItem={(isFirstOnPage) =>
            ownSession ? (
              <div className='sm:-mt-3 sm:rounded-b-xl sm:bg-black-80 sm:pt-3'>
                <Session
                  isFirstOnPage={isFirstOnPage}
                  discipline={discipline}
                  contestSlug={contestSlug}
                  linkToPage={behavior === 'pagination' ? ownSession.page : undefined}
                  isOwn
                  height={optimalElementHeight}
                  session={ownSession}
                />
              </div>
            ) : null
          }
          pageSize={pageSize}
          renderItem={({ item: session, isFirst }) => (
            <Session
              isOwn={session.roundSession.id === ownSession?.roundSession.id}
              isFirstOnPage={isFirst}
              contestSlug={contestSlug}
              discipline={discipline}
              session={session}
              height={optimalElementHeight}
            />
          )}
          renderSkeleton={() => <SessionSkeleton height={optimalElementHeight} />}
          list={list}
          isFetching={isFetching}
        />
      </AutofillHeight.ListWrapper>
    </div>
  )
}

type ErrorHandlerProps = {
  error: AxiosError | null
  children: ReactNode
}
function ErrorHandler({ error, children }: ErrorHandlerProps) {
  const { contestSlug } = route.useParams()

  if (error?.response?.status === 403) {
    return (
      <Navigate
        from='/contests/$contestSlug/results'
        to='/contests/$contestSlug/solve'
        search={(prev) => prev}
        params={{ contestSlug }}
        replace
      />
    )
  }

  if (error?.response?.status === 401) {
    // BUG: This seems to never happen. We also should be rendering the error below the contest header, not instead.
    return <HintSignInSection description='You need to be signed in to view ongoing contest results' />
  }

  return (
    <>
      <PaginationInvalidPageHandler error={error}>
        <NotFoundHandler error={error}>{children}</NotFoundHandler>
      </PaginationInvalidPageHandler>
    </>
  )
}
