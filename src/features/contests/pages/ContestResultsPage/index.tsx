import { NavigateBackButton } from '@/components/NavigateBackButton'
import { Header, SectionHeader } from '@/components/layout'
import { CubeSwitcher, Pagination, HintSignInSection, PageTitleMobile } from '@/components/ui'
import { useQuery } from '@tanstack/react-query'
import { Link, Navigate, getRouteApi, notFound } from '@tanstack/react-router'
import {
  type ContestSessionDTO,
  getContestResultsQuery,
  ongoingContestNumberQuery,
  type ContestResultsDTO,
  getContestResultsInfiniteQuery,
} from '../../api'
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

const contestDuration = '17 Dec 2023 - 23 Dec 2023' // TODO: get from backend
const route = getRouteApi('/contests/$contestNumber/results')
export function ContestResultsPage() {
  return matchesQuery('sm') ? <ControllerWithInfiniteScroll /> : <ControllerWithPagination />
}

function ControllerWithPagination() {
  const { contestNumber, discipline, page } = route.useLoaderData()

  const { fittingCount: pageSize, containerRef, fakeElementRef } = AutofillHeight.useFittingCount()
  const query = getContestResultsQuery({
    contestNumber,
    discipline,
    page,
    pageSize: pageSize ?? 0,
    enabled: pageSize !== undefined,
  })

  const { data, error, isFetching } = useQuery(query)

  return (
    <View totalPages={data?.totalPages} behavior='pagination' errorCode={error?.response?.status}>
      <SessionsList
        behavior='pagination'
        list={data?.sessions ?? undefined}
        ownSession={data?.ownSession ?? null}
        containerRef={containerRef}
        fakeElementRef={fakeElementRef}
        isFetching={isFetching}
        pageSize={pageSize}
      />
    </View>
  )
}

function ControllerWithInfiniteScroll() {
  const { contestNumber, discipline } = route.useLoaderData()

  const { fittingCount: pageSize, containerRef, fakeElementRef } = AutofillHeight.useFittingCount()
  const query = getContestResultsInfiniteQuery({
    contestNumber: contestNumber,
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
  totalPages?: number
  children: ReactNode
  errorCode?: number
}
function View({ totalPages, children, behavior, errorCode }: ViewProps) {
  const { contestNumber, discipline, page } = route.useLoaderData()

  const { data: ongoingContestNumber } = useQuery(ongoingContestNumberQuery)
  const isOngoing = contestNumber === ongoingContestNumber // TODO: get from backend

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
            <Link from={route.id} search={{ discipline: '3by3' }} params={{ contestNumber: String(contestNumber) }}>
              <CubeSwitcher asButton={false} cube='3by3' isActive={discipline === '3by3'} />
            </Link>
            <div>
              <h2 className='title-h2 mb-1'>Contest {contestNumber}</h2>
              <p className='text-large text-grey-40'>{contestDuration}</p>
            </div>
            {behavior === 'pagination' && (
              <Pagination currentPage={page} totalPages={totalPages} className='ml-auto sm:hidden' />
            )}
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
  const { contestNumber } = route.useLoaderData()
  if (errorCode === 400) {
    return (
      <Navigate
        to={route.id}
        params={{ contestNumber: String(contestNumber) }}
        search={(prev) => ({ ...prev, page: 1 })}
        replace
      />
    )
  }

  if (errorCode === 403) {
    return (
      <Navigate
        from={route.id}
        to='/contests/$contestNumber/solve'
        params={{ contestNumber: String(contestNumber) }}
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
  ownSession: ContestResultsDTO['ownSession']
} & Pick<ListWrapperProps, 'containerRef' | 'fakeElementRef'> &
  Pick<ListWithPinnedItemProps<ContestSessionDTO>, 'pageSize' | 'lastElementRef' | 'list' | 'isFetching' | 'behavior'>
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
  const { contestNumber } = route.useLoaderData()

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
            behavior={behavior}
            isHighlighted={(session) => session.id === ownSession?.session.id}
            renderPinnedItem={(isFirstOnPage, linkToPage) =>
              ownSession ? (
                <div className='sm:-mt-3 sm:rounded-b-xl sm:bg-black-80 sm:pt-3'>
                  <Session
                    isFirstOnPage={isFirstOnPage}
                    contestNumber={contestNumber}
                    linkToPage={linkToPage}
                    isOwn
                    session={ownSession.session}
                  />
                </div>
              ) : null
            }
            pageSize={pageSize}
            renderItem={(session, isFirstOnPage) => (
              <Session
                isOwn={session.id === ownSession?.session.id}
                isFirstOnPage={isFirstOnPage}
                contestNumber={contestNumber}
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
