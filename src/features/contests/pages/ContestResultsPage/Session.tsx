import {
  PlaceLabel,
  CubeIcon,
  Ellipsis,
  SolveTimeLabel,
  SolveTimeLinkOrDnf,
  ExtraLabel,
  PlusIcon,
  MinusIcon,
} from '@/components/ui'
import { cn } from '@/utils'
import { useMemo, forwardRef, type ComponentProps, useState } from 'react'
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
  const [accordionOpen, setAccordionOpen] = useState(false)

  const { bestId, worstId } = useMemo(() => getBestAndWorstIds(session.solves), [session.solves])
  return (
    <li
      className={cn(
        'flex h-15 items-center whitespace-nowrap rounded-xl px-2 md:h-[4.5rem] md:flex-wrap md:py-2',
        { 'md:h-auto': accordionOpen },
        isOwn ? 'bg-secondary-80' : 'bg-grey-100',
        className,
      )}
    >
      <span
        className={cn('flex flex-1 items-center md:w-full', { 'md:mb-4 md:border-b md:border-grey-60': accordionOpen })}
      >
        <PlaceLabel className='mr-3' linkToPage={linkToPage}>
          {session.place}
        </PlaceLabel>
        <CubeIcon className='mr-3' cube={session.discipline.name} />
        <Ellipsis className='vertical-alignment-fix flex-1'>{`${session.user.username}${currentUserLabel}`}</Ellipsis>

        <span className='mr-4'>
          <span className='hidden text-center text-grey-40 md:block'>Average time</span>
          <SolveTimeLabel
            timeMs={session.avgMs ?? undefined}
            isAverage
            className='relative after:absolute after:-right-2 after:top-1/2 after:h-6 after:w-px after:-translate-y-1/2 after:bg-grey-60 md:after:hidden'
          />
        </span>
        <button onClick={() => setAccordionOpen((prev) => !prev)} className='outline-ring hidden md:block'>
          {accordionOpen ? <MinusIcon /> : <PlusIcon />}
        </button>
      </span>
      <ul className={cn('flex gap-2 md:justify-end', accordionOpen ? 'md:w-full' : 'md:sr-only')}>
        {session.solves.map((solve, index) => (
          <li key={solve.id} className='w-24 text-center'>
            <span className='mb-2 hidden text-grey-40 md:block'>Attempt {index + 1}</span>
            <span className='relative'>
              <SolveTimeLinkOrDnf
                contestNumber={contestNumber}
                solveId={solve.id}
                timeMs={solve.timeMs ?? null}
                variant={solve.id === bestId ? 'best' : solve.id === worstId ? 'worst' : undefined}
              />
              <ExtraLabel
                scramblePosition={solve.scramble.position}
                className='absolute -top-0.5 right-[1.1rem] -translate-y-1/2'
              />
            </span>
          </li>
        ))}
      </ul>
    </li>
  )
}

export const SessionSkeleton = forwardRef<HTMLLIElement, ComponentProps<'li'>>(({ className, ...props }, ref) => {
  return (
    <li
      ref={ref}
      {...props}
      className={cn('h-15 animate-pulse rounded-xl bg-grey-100 md:min-h-[4.5rem]', className)}
    ></li>
  )
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
