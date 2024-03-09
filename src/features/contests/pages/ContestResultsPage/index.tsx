import { NavigateBackButton } from '@/components/NavigateBackButton'
import { Header } from '@/components/layout'
import { HintSection, SignInButton, CubeButton, Pagination } from '@/components/ui'
import { useAutofillHeight, useDebounceAfterFirst } from '@/utils'
import { useQuery } from '@tanstack/react-query'
import { Link, Navigate, getRouteApi } from '@tanstack/react-router'
import { getContestResultsQuery, type ContestResultsDTO } from '../../api'
import { SessionSkeleton, Session } from './Session'
import { SessionsListHeader } from './SessionsListHeader'

const route = getRouteApi('/contests/$contestNumber/results')
export function ContestResultsPage() {
  return (
    <section className='flex flex-1 flex-col gap-3'>
      <Header caption='Look through the contest results' />
      <p className='title-h2 hidden text-secondary-20 lg:block'>Look through the contest results</p>

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
    return (
      <Navigate
        to={route.id}
        params={{ contestNumber: String(contestNumber) }}
        search={(prev) => ({ ...prev, page: 1 })}
        replace
      />
    )
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

  if (errorStatus === 404) {
    return <Navigate to='/contests/ongoing' search={{ discipline }} replace />
  }

  return (
    <>
      <div className='flex min-h-[5.75rem] items-center gap-4 rounded-2xl bg-black-80 px-4'>
        <Link from={route.id} search={{ discipline: '3by3' }} params={{ contestNumber: String(contestNumber) }}>
          <CubeButton asButton={false} cube='3by3' isActive={discipline === '3by3'} />
        </Link>
        <div>
          <h1 className='title-h2 mb-1'>Contest 14</h1>
          <p className='text-lg text-grey-40'>17 Dec 2023 - 23 Dec 2023</p>
        </div>
        <Pagination currentPage={page} totalPages={data?.totalPages} className='ml-auto' />
      </div>
      <div className='flex flex-1 flex-col gap-1 rounded-2xl bg-black-80 p-6'>
        <SessionsListHeader className='md:hidden' />
        <ul
          className='md:scrollbar flex flex-1 flex-col gap-3 md:-mr-1 md:basis-0 md:overflow-y-scroll md:pr-1'
          ref={containerRef}
        >
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
