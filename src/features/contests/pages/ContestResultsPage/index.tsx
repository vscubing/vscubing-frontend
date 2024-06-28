import { Header, SectionHeader } from '@/components/layout'
import { CubeSwitcher } from '@/components/ui'
import { useQuery } from '@tanstack/react-query'
import { Link, Navigate, getRouteApi, notFound } from '@tanstack/react-router'
import { getContestResultsQuery, type ContestResultsDTO, type ContestSession } from '../../api'
import { SessionSkeleton, Session } from './Session'
import { SessionsListHeader } from './SessionsListHeader'
import { type ReactNode } from 'react'
import {
  AutofillHeight,
  type Behavior,
  type ListWithPinnedItemProps,
  type ListWrapperProps,
} from '@/features/autofillHeight'
import { matchesQuery } from '@/utils'
import { PageTitleMobile, NavigateBackButton, Pagination, HintSignInSection } from '@/components/shared'
import { useOngoingSlug } from '@/shared/contests'

const contestDuration = '17 Dec 2023 - 23 Dec 2023' // TODO: get from backend
const route = getRouteApi('/contests/$contestSlug/results')
export function ContestResultsPage() {
  return matchesQuery('sm') ? <ControllerWithInfiniteScroll /> : <ControllerWithPagination />
}

function ControllerWithPagination() {
  const { contestSlug } = route.useParams()
  const { discipline: disciplineSlug, page } = route.useSearch()

  const { fittingCount: pageSize, containerRef, fakeElementRef } = AutofillHeight.useFittingCount()
  const query = getContestResultsQuery({
    contestSlug,
    disciplineSlug,
    page,
    pageSize: pageSize ?? 0,
    enabled: pageSize !== undefined,
  })

  const { data, error, isFetching } = useQuery(query)

  return (
    <View pages={data?.pages} behavior='pagination' errorCode={error?.response?.status}>
      <SessionsList
        behavior='pagination'
        list={data?.results.roundSessionSet}
        ownSession={data?.results.ownResult ?? null}
        containerRef={containerRef}
        fakeElementRef={fakeElementRef}
        isFetching={isFetching}
        pageSize={pageSize}
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
    discipline,
    pageSize: pageSize ?? 0,
    enabled: pageSize !== undefined,
  })
  const { data, isFetching, error, lastElementRef } = AutofillHeight.useInfiniteScroll(query)

  return (
    <View behavior='infinite-scroll' errorCode={error?.response?.status}>
      <SessionsList
        behavior='infinite-scroll'
        list={data?.pages.flatMap((page) => page.sessions!)}
        ownSession={data?.pages.at(0)?.ownSession ?? null}
        containerRef={containerRef}
        fakeElementRef={fakeElementRef}
        lastElementRef={lastElementRef}
        isFetching={isFetching}
        pageSize={pageSize}
      />
    </View>
  )
}

type ViewProps = {
  behavior: Behavior
  pages?: number
  children: ReactNode
  errorCode?: number
}
function View({ pages, children, behavior, errorCode }: ViewProps) {
  const { contestSlug } = route.useParams()
  const { discipline, page } = route.useSearch()

  const { data: ongoingSlug } = useOngoingSlug()
  const isOngoing = contestSlug === ongoingSlug // TODO: get from backend

  let title = ''
  if (!isOngoing) {
    title = 'Look through the contest results'
  } else if (errorCode === 401) {
    title = `Ongoing contest (${contestDuration})` // TODO: get from backend
  } else {
    title = 'Check out ongoing contest results'
  }

  return (
    <>
      <section className='flex flex-1 flex-col gap-3 sm:gap-2'>
        <Header title={title} />
        <PageTitleMobile>{title}</PageTitleMobile>

        <NavigateBackButton className='self-start' />
        <ErrorHandler errorCode={errorCode}>
          <SectionHeader className='gap-4 sm:gap-2 sm:px-4'>
            <Link from={route.id} search={{ discipline: '3by3', page: 1 }} params={{ contestSlug }}>
              <CubeSwitcher asButton={false} cube='3by3' isActive={discipline === '3by3'} />
            </Link>
            <div>
              <h2 className='title-h2 mb-1'>Contest {contestSlug}</h2>
              <p className='text-large text-grey-40'>{contestDuration}</p>
            </div>
            {behavior === 'pagination' && <Pagination currentPage={page} pages={pages} className='ml-auto sm:hidden' />}
          </SectionHeader>
          {children}
        </ErrorHandler>
      </section>
    </>
  )
}

type ErrorHandlerProps = {
  errorCode?: number
  children: ReactNode
}
function ErrorHandler({ errorCode, children }: ErrorHandlerProps) {
  const { contestSlug } = route.useParams()
  if (errorCode === 400) {
    return (
      <Navigate
        from={route.id}
        to={route.id}
        params={{ contestSlug }}
        search={(prev) => ({ ...prev, page: 1 })}
        replace
      />
    )
  }

  if (errorCode === 403) {
    return (
      <Navigate
        from={route.id}
        to='/contests/$contestSlug/solve'
        search={(prev) => prev}
        params={{ contestSlug }}
        replace
      />
    )
  }

  if (errorCode === 401) {
    return <HintSignInSection description='You need to be signed in to view ongoing contest results' />
  }

  if (errorCode === 404) {
    throw notFound()
  }

  return children
}

type SessionsListProps = {
  ownSession: ContestResultsDTO['ownResult']
} & Pick<ListWrapperProps, 'containerRef' | 'fakeElementRef'> &
  Pick<ListWithPinnedItemProps<ContestSession>, 'pageSize' | 'lastElementRef' | 'list' | 'isFetching' | 'behavior'>
function SessionsList({
  isFetching,
  lastElementRef,
  behavior,
  ownSession,
  list,
  pageSize,
  containerRef,
  fakeElementRef,
}: SessionsListProps) {
  const { contestSlug } = route.useParams()
  const { discipline } = route.useSearch()

  return (
    <>
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
            renderPinnedItem={(isFirstOnPage, linkToPage) =>
              ownSession ? (
                <div className='sm:-mt-3 sm:rounded-b-xl sm:bg-black-80 sm:pt-3'>
                  <Session
                    isFirstOnPage={isFirstOnPage}
                    discipline={discipline}
                    contestSlug={contestSlug}
                    linkToPage={linkToPage}
                    isOwn
                    session={ownSession}
                  />
                </div>
              ) : null
            }
            pageSize={pageSize}
            renderItem={(session, isFirstOnPage) => (
              <Session
                isOwn={session.roundSession.id === ownSession?.roundSession.id}
                isFirstOnPage={isFirstOnPage}
                contestSlug={contestSlug}
                discipline={discipline}
                session={session}
              />
            )}
            renderSkeleton={() => <SessionSkeleton />}
            list={list}
            isFetching={isFetching}
          />
        </AutofillHeight.ListWrapper>
      </div>
    </>
  )
}
