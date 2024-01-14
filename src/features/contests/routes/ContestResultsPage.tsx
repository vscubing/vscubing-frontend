import { NavigateBackButton } from '@/components/NavigateBackButton'
import { Header } from '@/components/layout'
import { useAutofillHeight, useDebounceAfterFirst } from '@/utils'
import { useQuery } from '@tanstack/react-query'
import { Link, Navigate, RouteApi } from '@tanstack/react-router'
import { type ContestResultsDTO, getContestQuery } from '../api'
import { CubeButton, HintPage, Pagination, SignInButton } from '@/components/ui'
import { SessionsListHeader, SessionSkeleton, Session } from '../components'

const route = new RouteApi({ id: '/contests/$contestNumber/results' })
export function ContestResultsPage() {
  return (
    <section className='flex h-full flex-col gap-3'>
      <Header caption='Explore contests' />
      <NavigateBackButton className='self-start' />
      <PageContent />
    </section>
  )
}

function PageContent() {
  const { contestNumber, discipline, page } = route.useLoaderData()

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
  const errorStatus = error?.response?.status

  if (errorStatus === 400) {
    return <Navigate from={route.id} params={true} search={{ page: 1 }} replace />
  }

  if (errorStatus === 403) {
    return (
      <Navigate
        from={route.id}
        to='/contests/$contestNumber/solve'
        params={{ contestNumber: String(contestNumber) }}
        replace
      />
    )
  }

  if (errorStatus === 401) {
    return (
      <HintPage>
        <p className='mb-10'>You need to be signed in to view ongoing contest results</p>
        <SignInButton variant='primary' />
      </HintPage>
    )
  }

  return (
    <>
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
    </>
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
