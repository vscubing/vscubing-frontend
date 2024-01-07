import { NavigateBackButton } from '@/components/NavigateBackButton'
import { Header } from '@/components/layout'
import { useAutofillHeight, useDebounceAfterFirst } from '@/utils'
import { useQuery } from '@tanstack/react-query'
import { Link, RouteApi, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { type ContestResultsDTO, getContestQuery, ContestSessionDTO } from '../api'
import { CubeButton, Pagination } from '@/components/ui'
import { SessionsListHeader, SessionSkeleton, Session } from '../components'

const route = new RouteApi({ id: '/contests/$contestNumber' })
export function ContestPage() {
  const { contestNumber, discipline, page } = route.useLoaderData()

  const navigate = useNavigate({ from: route.id })
  const { fittingCount: pageSize, containerRef, fakeElementRef } = useAutofillHeight()
  const debouncedPageSize = useDebounceAfterFirst(pageSize)

  const query = getContestQuery({
    contestNumber: contestNumber,
    discipline,
    page,
    pageSize: debouncedPageSize ?? 0,
    isEnabled: debouncedPageSize !== undefined,
  })

  const { data, error, isFetching } = useQuery(query)

  useEffect(() => {
    if (error?.response?.status === 400) {
      void navigate({ from: route.id, params: true, search: { page: 1 } })
    }
  }, [error?.response?.status, navigate, discipline])
  return (
    <section className='flex h-full flex-col gap-3'>
      <Header caption='Explore contests' />
      <NavigateBackButton className='self-start' />
      <div className='flex items-center justify-between rounded-xl bg-black-80 p-4'>
        <Link from={route.id} search={{ discipline: '3by3' }} params={true}>
          <CubeButton asButton={false} cube='3by3' isActive={discipline === '3by3'} />
        </Link>
        <Pagination currentPage={page} totalPages={data?.totalPages} />
      </div>
      <div className='flex flex-1 flex-col gap-1 rounded-xl bg-black-80 p-6'>
        <SessionsListHeader />
        <ul className='flex flex-1 flex-col gap-3' ref={containerRef}>
          <SessionSkeleton className='invisible fixed' aria-hidden ref={fakeElementRef} />
          <Sessions
            sessions={data?.sessions}
            isFetching={isFetching}
            ownSession={data?.ownSession}
            pageSize={pageSize}
          />
        </ul>
      </div>
    </section>
  )
}

function Sessions({
  sessions,
  ownSession,
  pageSize,
  isFetching,
}: {
  sessions?: ContestResultsDTO['sessions']
  ownSession?: ContestResultsDTO['ownSession']
  pageSize?: number
  isFetching: boolean
}) {
  if (!pageSize) {
    return null
  }
  if (sessions?.length === 0) {
    return 'Seems like no one has solved yet' // TODO: add empty state
  }

  const isOwnDisplayedSeparately = ownSession && (ownSession.isDisplayedSeparately || isFetching)
  const skeletonSize = isOwnDisplayedSeparately ? pageSize - 1 : pageSize

  return (
    <>
      {isOwnDisplayedSeparately && <Session isOwn session={ownSession.session} linkToPage={ownSession.page} />}
      {!sessions && isFetching ? (
        <SessionsSkeleton size={skeletonSize} />
      ) : (
        sessions?.map((session) => (
          <Session
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
