import { NavigateBackButton } from '@/components/NavigateBackButton'
import { Header, SectionHeader } from '@/components/layout'
import { CubeSwitcher, Pagination, HintSignInSection, PageTitleMobile } from '@/components/ui'
import { useQuery } from '@tanstack/react-query'
import { Link, Navigate, getRouteApi } from '@tanstack/react-router'
import {
  type ContestSessionDTO,
  getContestResultsQuery,
  ongoingContestNumberQuery,
  type ContestResultsDTO,
} from '../../api'
import { SessionSkeleton, Session } from './Session'
import { SessionsListHeader } from './SessionsListHeader'
import { type ReactNode } from 'react'
import { AutofillHeight, type ListWithPinnedItemProps, type ListWrapperProps } from '@/features/autofillHeight'

const contestDuration = '17 Dec 2023 - 23 Dec 2023' // TODO: get from backend
const route = getRouteApi('/contests/$contestNumber/results')
export function ContestResultsPage() {
  const { contestNumber, discipline, page } = route.useLoaderData()

  const { fittingCount: pageSize, containerRef, fakeElementRef } = AutofillHeight.useFittingCount()
  const query = getContestResultsQuery({
    contestNumber: contestNumber,
    discipline,
    page,
    pageSize: pageSize ?? 0,
    isEnabled: pageSize !== undefined,
  })

  const { data, error, isFetching } = useQuery(query)
  const errorCode = error?.response?.status

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
    <section className='flex flex-1 flex-col gap-3'>
      <Header title={title} />
      <PageTitleMobile>{title}</PageTitleMobile>

      <NavigateBackButton className='self-start' />
      <ErrorHandler errorCode={errorCode}>
        <View totalPages={data?.totalPages}>
          <SessionsList
            list={data?.sessions ?? undefined}
            ownSession={data?.ownSession ?? null}
            containerRef={containerRef}
            fakeElementRef={fakeElementRef}
            isFetching={isFetching}
            pageSize={pageSize}
          />
        </View>
      </ErrorHandler>
    </section>
  )
}

type ErrorHandlerProps = {
  errorCode?: number
  children: ReactNode
}
function ErrorHandler({ errorCode, children }: ErrorHandlerProps) {
  const { contestNumber, discipline } = route.useLoaderData()
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
    return <Navigate to='/contests/ongoing' search={{ discipline }} replace />
  }

  return children
}

type ViewProps = { totalPages?: number; children: ReactNode }
function View({ totalPages, children }: ViewProps) {
  const { contestNumber, discipline, page } = route.useLoaderData()
  return (
    <>
      <SectionHeader className='gap-4'>
        <Link from={route.id} search={{ discipline: '3by3' }} params={{ contestNumber: String(contestNumber) }}>
          <CubeSwitcher asButton={false} cube='3by3' isActive={discipline === '3by3'} />
        </Link>
        <div>
          <h2 className='title-h2 mb-1'>Contest {contestNumber}</h2>
          <p className='text-lg text-grey-40'>{contestDuration}</p>
        </div>
        <Pagination currentPage={page} totalPages={totalPages} className='ml-auto' />
      </SectionHeader>
      {children}
    </>
  )
}

type SessionsListProps = { ownSession: ContestResultsDTO['ownSession'] } & Pick<
  ListWrapperProps,
  'containerRef' | 'fakeElementRef'
> &
  Pick<ListWithPinnedItemProps<ContestSessionDTO>, 'pageSize' | 'lastElementRef' | 'list' | 'isFetching'>
function SessionsList({ isFetching, ownSession, list, pageSize, containerRef, fakeElementRef }: SessionsListProps) {
  const { contestNumber } = route.useLoaderData()

  return (
    <>
      <div className='flex flex-1 flex-col gap-1 rounded-2xl bg-black-80 p-6'>
        <SessionsListHeader className='md:hidden' />
        <AutofillHeight.ListWrapper
          renderFakeElement={() => <SessionSkeleton />}
          fakeElementRef={fakeElementRef}
          containerRef={containerRef}
        >
          <AutofillHeight.ListWithPinnedItem
            pinnedItem={ownSession ?? undefined}
            renderPinnedItem={() =>
              ownSession ? (
                <Session
                  contestNumber={contestNumber}
                  linkToPage={ownSession.page}
                  isOwn
                  session={ownSession.session}
                />
              ) : null
            }
            pageSize={pageSize}
            renderItem={(session) => (
              <Session isOwn={session.id === ownSession?.session.id} contestNumber={contestNumber} session={session} />
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
