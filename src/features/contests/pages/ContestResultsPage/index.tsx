import { NavigateBackButton } from '@/components/NavigateBackButton'
import { Header, SectionHeader } from '@/components/layout'
import { CubeSwitcher, Pagination, HintSignInSection, PageTitleMobile } from '@/components/ui'
import { useQuery } from '@tanstack/react-query'
import { Link, Navigate, getRouteApi } from '@tanstack/react-router'
import { getContestResultsQuery, ongoingContestNumberQuery, type ContestResultsDTO } from '../../api'
import { SessionSkeleton, Session } from './Session'
import { SessionsListHeader } from './SessionsListHeader'
import { type ReactNode, type RefObject } from 'react'
import { AutofillHeight } from '@/features/autofillHeight'

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
            errorCode={errorCode}
            data={data}
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

type SessionsListProps = {
  errorCode?: number
  data?: ContestResultsDTO
  containerRef: RefObject<HTMLUListElement>
  fakeElementRef: RefObject<HTMLLIElement>
  isFetching: boolean
  pageSize?: number
}
function SessionsList({ isFetching, data, pageSize, containerRef, fakeElementRef }: SessionsListProps) {
  return (
    <>
      <div className='flex flex-1 flex-col gap-1 rounded-2xl bg-black-80 p-6'>
        <SessionsListHeader className='md:hidden' />
        <ul className='flex flex-1 flex-col gap-3' ref={containerRef}>
          <SessionSkeleton className='invisible fixed' aria-hidden ref={fakeElementRef} />
          <SessionsListInner
            sessions={data?.sessions}
            isFetching={isFetching}
            ownSession={data?.ownSession}
            pageSize={pageSize}
          />
        </ul>
      </div>
    </>
  )
}

type SessionsListInnerProps = {
  sessions?: ContestResultsDTO['sessions']
  ownSession?: ContestResultsDTO['ownSession']
  pageSize?: number
  isFetching: boolean
}
function SessionsListInner({ sessions, ownSession, pageSize, isFetching }: SessionsListInnerProps) {
  const { contestNumber } = route.useLoaderData()

  if (!pageSize) {
    return null
  }

  const isOwnDisplayedSeparately = ownSession && (ownSession.isDisplayedSeparately || isFetching)
  const skeletonSize = isOwnDisplayedSeparately ? pageSize - 1 : pageSize

  return (
    <>
      {isOwnDisplayedSeparately && (
        <Session contestNumber={contestNumber} isOwn session={ownSession.session} linkToPage={ownSession.page} />
      )}
      {!sessions && isFetching
        ? Array.from({ length: skeletonSize }, (_, index) => <SessionSkeleton key={index} />)
        : sessions?.map((session) => (
            <Session
              contestNumber={contestNumber}
              isOwn={session.user.username === ownSession?.session.user.username} // TODO: compare by id
              key={session.id}
              session={session}
            />
          ))}
    </>
  )
}
