import { CubeIcon, Ellipsis, PlusIcon, MinusIcon } from '@/components/ui'
import { cn, matchesQuery } from '@/utils'
import { useMemo } from 'react'
import { type ContestSession } from '../../api'
import * as Accordion from '@radix-ui/react-accordion'
import { ExtraLabel } from '@/shared/ExtraLabel'
import { PlaceLabel } from '@/shared/PlaceLabel'
import { SolveTimeLabel, SolveTimeLinkOrDnf } from '@/shared/SolveTimeButton'

export function Session({
  session,
  linkToPage,
  isOwn,
  contestSlug,
  discipline,
  isFirstOnPage,
  height,
}: {
  session: ContestSession
  contestSlug: string
  discipline: string
  linkToPage?: number
  isOwn?: boolean
  isFirstOnPage: boolean
  height?: number
}) {
  const currentUserLabel = isOwn ? ' (you)' : ''
  const solveSet = session.roundSession.solveSet.filter((solve) => solve.submissionState === 'submitted')

  const { bestId, worstId } = useMemo(
    () => getBestAndWorstIds(solveSet),
    [solveSet],
  )
  return (
    <Accordion.Root type='single' collapsible defaultValue={matchesQuery('md') ? undefined : 'result'}>
      <Accordion.Item
        value='result'
        className={cn(
          'flex min-h-15 items-center rounded-xl px-2 md:min-h-[4.5rem] md:flex-wrap md:px-4 md:py-2 sm:min-h-28 sm:p-4',
          isOwn ? 'bg-secondary-80' : 'bg-grey-100',
        )}
        style={{ minHeight: height }}
      >
        <Accordion.Header className='flex flex-1 items-center md:w-full sm:grid sm:grid-flow-col sm:grid-cols-[min-content_1fr_min-content] sm:grid-rows-[repeat(2,min-content)] sm:gap-x-3 sm:gap-y-1'>
          <PlaceLabel className='mr-3 sm:mr-0' linkToPage={linkToPage}>
            {session.place}
          </PlaceLabel>
          <CubeIcon className='mr-3 sm:mr-0' cube={discipline} />
          <Ellipsis className='vertical-alignment-fix flex-1 sm:col-span-2 sm:w-auto'>{`${session.roundSession.user.username}${currentUserLabel}`}</Ellipsis>

          <span className='mr-4 md:mr-10 sm:mr-0 sm:flex sm:items-center'>
            <span className='sm:vertical-alignment-fix hidden text-center text-grey-40 md:block'>Average time</span>
            <SolveTimeLabel
              timeMs={session.roundSession.avgMs}
              isDnf={session.roundSession.avgMs === null}
              isAverage
              className='relative after:absolute after:-right-2 after:top-1/2 after:h-6 after:w-px after:-translate-y-1/2 after:bg-grey-60 md:after:hidden'
            />
          </span>
          <Accordion.Trigger className='outline-ring group hidden md:block sm:py-2'>
            <PlusIcon className='block group-data-[state=open]:hidden' />
            <MinusIcon className='hidden group-data-[state=open]:block' />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className='data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down md:w-full md:overflow-y-clip'>
          <ul className='grid grid-cols-[repeat(5,min-content)] gap-x-2 md:grid-flow-col md:grid-rows-2 md:justify-end md:border-t md:border-grey-60 md:pt-4 sm:grid-flow-row sm:grid-cols-2 sm:grid-rows-none sm:items-center sm:pl-2 sm:pt-3'>
            {solveSet
              .map((solve, index) => (
                <li key={solve.id} className='contents'>
                  <span className='hidden text-center text-grey-40 md:block sm:text-left'>Attempt {index + 1}</span>
                  <span className='relative sm:ml-auto sm:text-right'>
                    <SolveTimeLinkOrDnf
                      canShowHint={isFirstOnPage && index === 0}
                      contestSlug={contestSlug}
                      discipline={discipline}
                      solveId={solve.id}
                      timeMs={solve.timeMs}
                      isDnf={solve.isDnf}
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
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  )
}

export function SessionSkeleton({ height }: { height?: number }) {
  return <div className='h-15 animate-pulse rounded-xl bg-grey-100 md:h-[4.5rem] sm:h-28' style={{ height }}></div>
}

function getBestAndWorstIds(solves: ContestSession['roundSession']['solveSet']) {
  const dnfSolve = solves.find(({ isDnf }) => isDnf)
  const successful = solves
    .filter(({ timeMs, isDnf }) => typeof timeMs === 'number' && !isDnf)
    .sort((a, b) => a.timeMs - b.timeMs)
  const bestId = successful.at(0)?.id
  const worstId = dnfSolve?.id ?? successful.at(-1)?.id

  return { bestId, worstId }
}
