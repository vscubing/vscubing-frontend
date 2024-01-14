import { NavigateBackButton } from '@/components/NavigateBackButton'
import { Header } from '@/components/layout'
import { useAutofillHeight, useDebounceAfterFirst } from '@/utils'
import { useQuery } from '@tanstack/react-query'
import { Link, Navigate, RouteApi } from '@tanstack/react-router'
import { type ContestResultsDTO, getContestResultsQuery } from '../api'
import { CubeButton, HintSection, Pagination, SignInButton } from '@/components/ui'
import { SessionsListHeader, SessionSkeleton, Session } from '../components'

const route = new RouteApi({ id: '/contests/$contestNumber/results' })
export function ContestResultsPage() {
  return (
    <section className='flex h-full flex-col gap-3'>
      <Header caption='Look through the contest results' />
      <NavigateBackButton className='self-start' />
      <PageContent />
    </section>
  )
}

function PageContent() {
  const { contestNumber, discipline, page } = route.useLoaderData()

  const { fittingCount: pageSize, containerRef, fakeElementRef } = useAutofillHeight()
  const debouncedPageSize = useDebounceAfterFirst(pageSize)

  const query = getContestResultsQuery({
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
      <HintSection>
        <p className='mb-10'>You need to be signed in to view ongoing contest results</p>
        <SignInButton variant='primary' />
      </HintSection>
    )
  }

  return (
    <>
      <div className='flex min-h-[5.75rem] items-center gap-4 rounded-xl bg-black-80 px-4'>
        <Link from={route.id} search={{ discipline: '3by3' }} params={{ contestNumber: String(contestNumber) }}>
          <CubeButton asButton={false} cube='3by3' isActive={discipline === '3by3'} />
        </Link>
        <div>
          <h1 className='title-h2 mb-1'>Contest 14</h1>
          <p className='text-lg text-grey-40'>17 Dec 2023 - 23 Dec 2023</p>
        </div>
        <Pagination currentPage={page} totalPages={data?.totalPages} className='ml-auto' />
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
