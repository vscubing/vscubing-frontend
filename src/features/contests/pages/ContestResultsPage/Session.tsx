import { PlaceLabel, CubeIcon, Ellipsis, SolveTimeLabel, SolveTimeLinkOrDnf, ExtraLabel } from '@/components/ui'
import { cn } from '@/utils'
import { useMemo, forwardRef, type ComponentProps } from 'react'
import { type ContestSessionDTO } from '../../api'

export function Session({
  session,
  linkToPage,
  isOwn,
  className,
  contestNumber,
}: {
  session: ContestSessionDTO
  contestNumber: number
  linkToPage?: number
  isOwn?: boolean
  className?: string
}) {
  const currentUserLabel = isOwn ? ' (you)' : ''

  const { bestId, worstId } = useMemo(() => getBestAndWorstIds(session.solves), [session.solves])
  return (
    <li
      className={cn(
        'flex h-[3.75rem] items-center whitespace-nowrap rounded-xl px-2',
        isOwn ? 'bg-secondary-80' : 'bg-grey-100',
        className,
      )}
    >
      <PlaceLabel className='mr-3' linkToPage={linkToPage}>
        {session.place}
      </PlaceLabel>
      <CubeIcon className='mr-3' cube={session.discipline.name} />
      <Ellipsis className='vertical-alignment-fix flex-1'>{`${session.user.username}${currentUserLabel}`}</Ellipsis>
      <SolveTimeLabel
        timeMs={session.avgMs ?? undefined}
        isAverage
        className='relative mr-4 after:absolute after:-right-2 after:top-1/2 after:h-6 after:w-px after:-translate-y-1/2 after:bg-grey-60'
      />
      {session.solves.map((solve) => (
        <span key={solve.id} className='relative mr-2 w-24 text-center last:mr-0'>
          <SolveTimeLinkOrDnf
            contestNumber={contestNumber}
            solveId={solve.id}
            timeMs={solve.timeMs ?? null}
            variant={solve.id === bestId ? 'best' : solve.id === worstId ? 'worst' : undefined}
          />
          <ExtraLabel
            scramblePosition={solve.scramble.position}
            className='absolute right-[1.1rem] top-0 -translate-y-1/2'
          />
        </span>
      ))}
    </li>
  )
}

export const SessionSkeleton = forwardRef<HTMLLIElement, ComponentProps<'li'>>(({ className, ...props }, ref) => {
  return <li ref={ref} {...props} className={cn('h-15 animate-pulse rounded-xl bg-grey-100', className)}></li>
})

function getBestAndWorstIds(solves: ContestSessionDTO['solves']) {
  const dnfSolve = solves.find(({ dnf }) => dnf)
  const successful = solves
    .filter(({ timeMs, dnf }) => typeof timeMs === 'number' && !dnf)
    .sort((a, b) => a.timeMs! - b.timeMs!)
  const bestId = successful.at(0)?.id
  const worstId = dnfSolve?.id ?? successful.at(-1)?.id

  return { bestId, worstId }
}
