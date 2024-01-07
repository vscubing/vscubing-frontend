import { NavigateBackButton } from '@/components/NavigateBackButton'
import { Header } from '@/components/layout'
import { cn, useAutofillHeight, useDebounceAfterFirst } from '@/utils'
import { useQuery } from '@tanstack/react-query'
import { Link, RouteApi, useNavigate } from '@tanstack/react-router'
import { type ComponentProps, forwardRef, useEffect, useMemo } from 'react'
import { type ContestResultsDTO, type ContestSessionDTO, getContestQuery } from '../api'
import { CubeButton, CubeIcon, Ellipsis, Pagination, SolveTimeLabel, SolveTimeButton } from '@/components/ui'
import { PlaceLabel } from '@/components/ui'
import { userQuery } from '@/features/auth'
import { useReconstructor } from '@/features/reconstructor'

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

  const { data, error } = useQuery(query)

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
          <SessionsList sessions={data?.sessions} pageSize={pageSize} />
        </ul>
      </div>
    </section>
  )
}

function SessionsListHeader() {
  return (
    <div className='flex whitespace-nowrap px-2 text-grey-40'>
      <span className='mr-2 w-11 text-center'>Place</span>
      <span className='mr-2'>Type</span>
      <span className='flex-1'>Nickname</span>
      <span className='mr-4 w-24 text-center'>Average time</span>
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index} className='mr-2 w-24 text-center last:mr-0'>
          Attempt {index + 1}
        </span>
      ))}
    </div>
  )
}

function SessionsList({ sessions, pageSize }: { sessions?: ContestResultsDTO['sessions']; pageSize?: number }) {
  if (pageSize === undefined) {
    return null
  }
  if (sessions === undefined) {
    return Array.from({ length: pageSize }, (_, index) => <SessionSkeleton key={index} />)
  }
  if (sessions.length === 0) {
    return 'Seems like there are no contests hmm...' // TODO: add empty state
  }

  return sessions.map((session) => <Session key={session.id} session={session} />)
}

const SessionSkeleton = forwardRef<HTMLLIElement, ComponentProps<'li'>>(({ className, ...props }, ref) => {
  return <li ref={ref} {...props} className={cn('h-15 animate-pulse rounded-xl bg-grey-100', className)}></li>
})

export function Session({
  session,
  linkToPage,
  className,
}: {
  session: ContestSessionDTO
  linkToPage?: number
  className?: string
}) {
  const { showReconstruction } = useReconstructor()

  const { data: currentUser } = useQuery(userQuery)
  const isOwnSession = currentUser?.username === session.user.username // TODO: use id instead of username
  const currentUserLabel = isOwnSession ? ' (you)' : ''

  const { bestId, worstId } = useMemo(() => getBestAndWorstIds(session.solveSet), [session.solveSet])
  return (
    <li
      className={cn(
        'flex h-[3.75rem] items-center whitespace-nowrap rounded-xl pl-2',
        isOwnSession ? 'bg-secondary-80' : 'bg-grey-100',
        className,
      )}
    >
      <PlaceLabel className='mr-3' linkToPage={linkToPage}>
        {session.placeNumber}
      </PlaceLabel>
      <CubeIcon className='mr-3' cube={session.discipline.name} />
      <Ellipsis className='flex-1 pt-[.2em]'>{`${session.user.username}${currentUserLabel}`}</Ellipsis>
      <SolveTimeLabel
        timeMs={session.avgMs ?? undefined}
        isAverage
        className='relative mr-4 after:absolute after:-right-2 after:top-1/2 after:h-6 after:w-px after:-translate-y-1/2 after:bg-grey-60'
      />
      {session.solveSet.map((solve) =>
        solve.timeMs ? (
          <SolveTimeButton
            key={solve.id}
            timeMs={solve.timeMs}
            onClick={() => showReconstruction(solve.id)}
            variant={solve.id === bestId ? 'best' : solve.id === worstId ? 'worst' : undefined}
            className='mr-2 last:mr-0'
          />
        ) : (
          <SolveTimeLabel key={solve.id} timeMs={undefined} className='mr-2 last:mr-0' />
        ),
      )}
    </li>
  )
}

function getBestAndWorstIds(solveSet: ContestSessionDTO['solveSet']) {
  const dnfSolve = solveSet.find(({ dnf }) => dnf)
  const solves = solveSet
    .filter(({ timeMs, dnf }) => typeof timeMs === 'number' && !dnf)
    .sort((a, b) => a.timeMs! - b.timeMs!)
  const bestId = solves.at(0)?.id
  const worstId = dnfSolve?.id ?? solves.at(-1)?.id

  return { bestId, worstId }
}
