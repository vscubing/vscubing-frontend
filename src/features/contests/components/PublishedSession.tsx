import { ReconstructTimeButton, ResultCard } from '@/components'
import { cn, formatTimeResult } from '@/utils'
import { useMemo } from 'react'
import { useReconstructor } from '@/features/reconstructor'
import { ContestResultsDTO } from '../api'

type PublishedSessionProps = ContestResultsDTO[number]
export function PublishedSession({
  user: { username },
  avgMs,
  solveSet,
  isOwnSession,
  placeNumber,
}: PublishedSessionProps & { isOwnSession?: boolean; placeNumber: number }) {
  const { showReconstruction } = useReconstructor()

  const submittedSolves = useMemo(() => solveSet.filter(({ state }) => state === 'submitted'), [solveSet])
  const { bestId, worstId } = useMemo(() => getBestAndWorstIds(submittedSolves), [submittedSolves])

  return (
    <ResultCard
      kind={isOwnSession ? 'highlighted' : 'default'}
      className='mb-3 grid grid-cols-2 items-center gap-y-1 rounded-md last:mb-0 md:mb-6 md:grid-cols-[1fr_min-content_min-content] md:text-base'
    >
      <div className='mt-1 flex gap-2 overflow-x-hidden pr-1 md:-ml-2 md:mt-0 lg:-ml-5 lg:gap-3'>
        <span className='pl-[9px] text-right md:w-[30px] md:pl-0'>{placeNumber}.</span>
        <span className='overflow-x-hidden text-ellipsis'>{username}</span>
      </div>
      <span className='border-[#A0A0A0]/50 pr-[9px] text-right md:mr-5 md:border-r-[1px] md:pr-5 lg:mr-[30px] lg:pr-[30px]'>
        <span className='inline-block text-center text-[#79A1EF]'>{avgMs ? formatTimeResult(avgMs) : 'DNF'}</span>
      </span>
      <div className='col-span-3 flex justify-between md:col-span-1 md:-ml-[5px] md:gap-1 lg:gap-2'>
        {submittedSolves.map(({ id, timeMs, scramble: { position } }) => {
          const isExtra = position.startsWith('E')
          return timeMs ? (
            <ReconstructTimeButton
              className={cn(
                {
                  'text-[#69C382]': bestId === id,
                  'text-[#E45B5B]': worstId === id,
                  'underline underline-offset-4': isExtra,
                },
                'w-[70px] md:w-[80px]',
              )}
              title={isExtra ? `Extra ${position[1]}` : undefined}
              onClick={() => showReconstruction(id)}
              key={id}
              timeMs={timeMs}
            />
          ) : (
            <span key={id} className='flex w-[80px] items-center justify-center text-[#E45B5B]'>
              DNF
            </span>
          )
        })}
      </div>
    </ResultCard>
  )
}

function getBestAndWorstIds(submittedSolves: ContestResultsResponse[number]['solveSet']) {
  const dnfSolve = submittedSolves.find(({ dnf }) => dnf)
  const timeArr = submittedSolves
    .filter(({ timeMs, dnf }) => typeof timeMs === 'number' && !dnf)
    .map(({ timeMs }) => timeMs as number)

  const bestTime = Math.min(...timeArr)
  const bestId = submittedSolves.find(({ timeMs }) => timeMs === bestTime)?.id
  const worstTime = Math.max(...timeArr)
  const worstId = dnfSolve?.id ?? submittedSolves.find(({ timeMs }) => timeMs === worstTime)?.id

  return { bestId, worstId }
}
