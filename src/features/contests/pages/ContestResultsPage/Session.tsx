import { CubeIcon, Ellipsis, PlusIcon, MinusIcon } from '@/components/ui'
import { SolveTimeLinkOrDnf, SolveTimeLabel } from '@/components/shared'
import { cn, matchesQuery } from '@/utils'
import { useMemo } from 'react'
import { type ContestSession } from '../../api'
import * as Accordion from '@radix-ui/react-accordion'
import { PlaceLabel, ExtraLabel } from '@/components/shared'
import { type Discipline } from '@/types'

export function Session({
  session,
  linkToPage,
  isOwn,
  contestSlug,
  discipline,
  isFirstOnPage,
}: {
  session: ContestSession
  contestSlug: string
  discipline: Discipline
  linkToPage?: number
  isOwn?: boolean
  isFirstOnPage: boolean
}) {
  const currentUserLabel = isOwn ? ' (you)' : ''

  const { bestId, worstId } = useMemo(
    () => getBestAndWorstIds(session.roundSession.solveSet),
    [session.roundSession.solveSet],
  )
  return (
    <Accordion.Root type='single' collapsible defaultValue={matchesQuery('md') ? undefined : 'result'}>
      <Accordion.Item
        value='result'
        className={cn(
          'flex min-h-15 items-center whitespace-nowrap rounded-xl px-2 md:min-h-[4.5rem] md:flex-wrap md:px-4 md:py-2 sm:min-h-28 sm:p-4',
          isOwn ? 'bg-secondary-80' : 'bg-grey-100',
        )}
      >
        <Accordion.Header className='flex flex-1 items-center md:w-full sm:grid sm:grid-flow-col sm:grid-cols-[min-content_1fr_min-content] sm:grid-rows-[repeat(2,min-content)] sm:gap-x-3 sm:gap-y-1'>
          <PlaceLabel className='mr-3 sm:mr-0' linkToPage={linkToPage}>
            {session.place!}
          </PlaceLabel>
          <CubeIcon className='mr-3 sm:mr-0' cube={discipline} />
          <Ellipsis className='vertical-alignment-fix flex-1 sm:col-span-2 sm:w-auto'>{`${session.roundSession.user.username}${currentUserLabel}`}</Ellipsis>

          <span className='mr-4 md:mr-10 sm:mr-0 sm:flex sm:items-center'>
            <span className='sm:vertical-alignment-fix hidden text-center text-grey-40 md:block'>Average time</span>
            <SolveTimeLabel
              timeMs={session.roundSession.avgMs ?? undefined}
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
            {session.roundSession.solveSet.map((solve, index) => (
              <li key={solve.id} className='contents'>
                <span className='hidden text-center text-grey-40 md:block sm:text-left'>Attempt {index + 1}</span>
                <span className='relative sm:ml-auto sm:text-right'>
                  <SolveTimeLinkOrDnf
                    canShowHint={isFirstOnPage && index === 0}
                    contestSlug={contestSlug}
                    discipline={discipline}
                    solveId={solve.id}
                    timeMs={10000} // TODO: remove the hack after backend fix
                    variant={solve.id === bestId ? 'best' : solve.id === worstId ? 'worst' : undefined}
                  />

                  <ExtraLabel
                    scramblePosition={'1'} /* TODO: remove the hack after backend fix */
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

export function SessionSkeleton() {
  return <div className='h-15 animate-pulse rounded-xl bg-grey-100 md:h-[4.5rem] sm:h-28'></div>
}

function getBestAndWorstIds(solves: ContestSession['roundSession']['solveSet']) {
  const solvesPatched = solves.map((solve) => ({ ...solve, timeMs: 10000 })) // TODO: remove the hack after backend fix

  const dnfSolve = solvesPatched.find(({ isDnf }) => isDnf)
  const successful = solvesPatched
    .filter(({ timeMs, isDnf }) => typeof timeMs === 'number' && !isDnf)
    .sort((a, b) => a.timeMs - b.timeMs)
  const bestId = successful.at(0)?.id
  const worstId = dnfSolve?.id ?? successful.at(-1)?.id

  return { bestId, worstId }
}
