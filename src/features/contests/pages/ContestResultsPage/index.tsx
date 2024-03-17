import { NavigateBackButton } from '@/components/NavigateBackButton'
import { Header } from '@/components/layout'
import { CubeButton, Pagination, HintSignInSection } from '@/components/ui'
import { useAutofillHeight } from '@/utils'
import { useQuery } from '@tanstack/react-query'
import { Link, Navigate, getRouteApi } from '@tanstack/react-router'
import { getContestResultsQuery, ongoingContestNumberQuery, type ContestResultsDTO } from '../../api'
import { SessionSkeleton, Session } from './Session'
import { SessionsListHeader } from './SessionsListHeader'
import { type RefObject } from 'react'
import { type Discipline } from '@/types'

const route = getRouteApi('/contests/$contestNumber/results')
export function ContestResultsPage() {
  const { contestNumber, discipline, page } = route.useLoaderData()

  const { fittingCount: pageSize, containerRef, fakeElementRef } = useAutofillHeight()
  const query = getContestResultsQuery({
    contestNumber: contestNumber,
    discipline,
    page,
    pageSize: pageSize ?? 0,
    isEnabled: pageSize !== undefined,
  })

  const { data, error, isFetching } = useQuery(query)
  const statusCode = error?.response?.status

  const { data: ongoingContestNumber } = useQuery(ongoingContestNumberQuery)
  const isOngoing = contestNumber === ongoingContestNumber // TODO: get from backend

  const contestDuration = '17 Dec 2023 - 23 Dec 2023' // TODO: get from backend

  let caption = ''
  if (!isOngoing) {
    caption = 'Look through the contest results'
  } else if (statusCode === 401) {
    caption = `Ongoing contest (${contestDuration})` // TODO: get from backend
  } else {
    caption = 'Check out ongoing contest results'
  }

  return (
    <section className='flex flex-1 flex-col gap-3'>
      <Header caption={caption} />
      <p className='title-h2 hidden text-secondary-20 lg:block'>{caption}</p>

      <NavigateBackButton className='self-start' />
      <PageContent
        statusCode={statusCode}
        data={data}
        discipline={discipline}
        contestNumber={contestNumber}
        containerRef={containerRef}
        fakeElementRef={fakeElementRef}
        isFetching={isFetching}
        pageSize={pageSize}
        page={page}
        contestDuration={contestDuration}
      />
    </section>
  )
}

type PageContentProps = {
  statusCode?: number
  data?: ContestResultsDTO
  discipline: Discipline
  contestNumber: number
  containerRef: RefObject<HTMLUListElement>
  fakeElementRef: RefObject<HTMLLIElement>
  isFetching: boolean
  pageSize?: number
  page: number
  contestDuration: string
}
function PageContent({
  statusCode,
  isFetching,
  data,
  discipline,
  contestNumber,
  contestDuration,
  pageSize,
  page,
  containerRef,
  fakeElementRef,
}: PageContentProps) {
  if (statusCode === 400) {
    return (
      <Navigate
        to={route.id}
        params={{ contestNumber: String(contestNumber) }}
        search={(prev) => ({ ...prev, page: 1 })}
        replace
      />
    )
  }

  if (statusCode === 403) {
    return (
      <Navigate
        from={route.id}
        to='/contests/$contestNumber/solve'
        params={{ contestNumber: String(contestNumber) }}
        replace
      />
    )
  }

  if (statusCode === 401) {
    return <HintSignInSection description='You need to be signed in to view ongoing contest results' />
  }

  if (statusCode === 404) {
    return <Navigate to='/contests/ongoing' search={{ discipline }} replace />
  }

  return (
    <>
      <div className='flex min-h-[5.75rem] items-center gap-4 rounded-2xl bg-black-80 px-4'>
        <Link from={route.id} search={{ discipline: '3by3' }} params={{ contestNumber: String(contestNumber) }}>
          <CubeButton asButton={false} cube='3by3' isActive={discipline === '3by3'} />
        </Link>
        <div>
          <h1 className='title-h2 mb-1'>Contest {contestNumber}</h1>
          <p className='text-lg text-grey-40'>{contestDuration}</p>
        </div>
        <Pagination currentPage={page} totalPages={data?.totalPages} className='ml-auto' />
      </div>
      <div className='flex flex-1 flex-col gap-1 rounded-2xl bg-black-80 p-6'>
        <SessionsListHeader className='md:hidden' />
        <ul className='flex flex-1 flex-col gap-3' ref={containerRef}>
          <SessionSkeleton className='invisible fixed' aria-hidden ref={fakeElementRef} />
          <Sessions
            contestNumber={contestNumber}
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

function Sessions({
  sessions,
  ownSession,
  contestNumber,
  pageSize,
  isFetching,
}: {
  sessions?: ContestResultsDTO['sessions']
  contestNumber: number
  ownSession?: ContestResultsDTO['ownSession']
  pageSize?: number
  isFetching: boolean
}) {
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
      {!sessions && isFetching ? (
        <SessionsSkeleton size={skeletonSize} />
      ) : (
        sessions?.map((session) => (
          <Session
            contestNumber={contestNumber}
            isOwn={session.user.username === ownSession?.session.user.username} // TODO: compare by id
            key={session.id}
            session={session}
          />
        ))
      )}
    </>
  )
}

function SessionsSkeleton({ size }: { size: number }) {
  return Array.from({ length: size }, (_, index) => <SessionSkeleton key={index} />)
}
