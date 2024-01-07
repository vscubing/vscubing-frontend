import { PlaceLabel, CubeIcon, Ellipsis, SolveTimeLabel, SolveTimeButton } from '@/components/ui'
import { userQuery } from '@/features/auth'
import { useReconstructor } from '@/features/reconstructor'
import { cn } from '@/utils'
import { useQuery } from '@tanstack/react-query'
import { useMemo, forwardRef, type ComponentProps } from 'react'
import { type ContestSessionDTO } from '../../api'

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

export const SessionSkeleton = forwardRef<HTMLLIElement, ComponentProps<'li'>>(({ className, ...props }, ref) => {
  return <li ref={ref} {...props} className={cn('h-15 animate-pulse rounded-xl bg-grey-100', className)}></li>
})

function getBestAndWorstIds(solveSet: ContestSessionDTO['solveSet']) {
  const dnfSolve = solveSet.find(({ dnf }) => dnf)
  const solves = solveSet
    .filter(({ timeMs, dnf }) => typeof timeMs === 'number' && !dnf)
    .sort((a, b) => a.timeMs! - b.timeMs!)
  const bestId = solves.at(0)?.id
  const worstId = dnfSolve?.id ?? solves.at(-1)?.id

  return { bestId, worstId }
}
