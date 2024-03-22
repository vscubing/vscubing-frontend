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
import { useMemo, useState } from 'react'
import { type ContestSessionDTO } from '../../api'

export function Session({
  session,
  linkToPage,
  isOwn,
  contestNumber,
}: {
  session: ContestSessionDTO
  contestNumber: number
  linkToPage?: number
  isOwn?: boolean
}) {
  const currentUserLabel = isOwn ? ' (you)' : ''
  const [accordionOpen, setAccordionOpen] = useState(false)

  const { bestId, worstId } = useMemo(() => getBestAndWorstIds(session.solves), [session.solves])
  return (
    <div
      className={cn(
        'flex h-15 items-center whitespace-nowrap rounded-xl px-2 md:flex-wrap md:px-4 md:py-2 sm:p-4',
        accordionOpen ? 'md:h-auto' : 'md:h-[4.5rem] sm:h-28',
        isOwn ? 'bg-secondary-80' : 'bg-grey-100',
      )}
    >
      <span
        className={cn(
          'flex flex-1 items-center md:w-full sm:grid sm:grid-flow-col sm:grid-cols-[min-content_1fr_min-content] sm:grid-rows-[repeat(2,min-content)] sm:gap-x-3 sm:gap-y-1',
          {
            'md:mb-4 md:border-b md:border-grey-60 sm:pb-3': accordionOpen,
          },
        )}
      >
        <PlaceLabel className='mr-3 sm:mr-0' linkToPage={linkToPage}>
          {session.place}
        </PlaceLabel>
        <CubeIcon className='mr-3 sm:mr-0' cube={session.discipline.name} />
        <Ellipsis className='vertical-alignment-fix flex-1 sm:col-span-2 sm:w-auto'>{`${session.user.username}${currentUserLabel}`}</Ellipsis>

        <span className='mr-4 md:mr-10 sm:mr-0 sm:flex sm:items-center'>
          <span className='sm:vertical-alignment-fix hidden text-center text-grey-40 md:block'>Average time</span>
          <SolveTimeLabel
            timeMs={session.avgMs ?? undefined}
            isAverage
            className='relative after:absolute after:-right-2 after:top-1/2 after:h-6 after:w-px after:-translate-y-1/2 after:bg-grey-60 md:after:hidden'
          />
        </span>
        <button onClick={() => setAccordionOpen((prev) => !prev)} className='outline-ring hidden md:block sm:py-2'>
          {accordionOpen ? <MinusIcon /> : <PlusIcon />}
        </button>
      </span>
      <ul
        className={cn(
          'grid grid-cols-[repeat(5,min-content)] gap-x-2 md:grid-flow-col md:grid-rows-2 md:justify-end sm:grid-flow-row sm:grid-cols-2 sm:grid-rows-none sm:items-center sm:pl-2',
          accordionOpen ? 'md:w-full' : 'md:sr-only',
        )}
      >
        {session.solves.map((solve, index) => (
          <li key={solve.id} className='contents'>
            <span className='hidden text-center text-grey-40 md:block sm:text-left'>Attempt {index + 1}</span>
            <span className='relative sm:text-right'>
              <SolveTimeLinkOrDnf
                contestNumber={contestNumber}
                solveId={solve.id}
                timeMs={solve.timeMs ?? null}
                variant={solve.id === bestId ? 'best' : solve.id === worstId ? 'worst' : undefined}
              />
              <ExtraLabel
                scramblePosition={solve.scramble.position}
                className='absolute -top-2 right-[1.1rem] sm:-top-1'
              />
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function SessionSkeleton() {
  return <div className='h-15 animate-pulse rounded-xl bg-grey-100 md:h-[4.5rem] sm:h-28'></div>
}

function getBestAndWorstIds(solves: ContestSessionDTO['solves']) {
  const dnfSolve = solves.find(({ dnf }) => dnf)
  const successful = solves
    .filter(({ timeMs, dnf }) => typeof timeMs === 'number' && !dnf)
    .sort((a, b) => a.timeMs! - b.timeMs!)
  const bestId = successful.at(0)?.id
  const worstId = dnfSolve?.id ?? successful.at(-1)?.id

  return { bestId, worstId }
}
