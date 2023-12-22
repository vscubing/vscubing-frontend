import { ReconstructTimeButton, ResultCard } from '@/components'
import { ContestResultsResponse } from '@/api/contests'
import { cn, formatTimeResult } from '@/utils'
import { useMemo } from 'react'
import { useNavigateToSolve } from '../ContestDiscipline'

type PublishedSessionProps = ContestResultsResponse[number]
export function PublishedSession({
  user: { username },
  avg_ms,
  solve_set,
  isOwnSession,
  placeNumber,
}: PublishedSessionProps & { isOwnSession?: boolean; placeNumber: number }) {
  const { navigateToSolve } = useNavigateToSolve()

  const submittedSolves = useMemo(() => solve_set.filter(({ state }) => state === 'submitted'), [solve_set])
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
        <span className='inline-block text-center text-[#79A1EF]'>{avg_ms ? formatTimeResult(avg_ms) : 'DNF'}</span>
      </span>
      <div className='col-span-3 flex justify-between md:col-span-1 md:-ml-[5px] md:gap-1 lg:gap-2'>
        {submittedSolves.map(({ id, time_ms, scramble: { position } }) => {
          const isExtra = position.startsWith('E')
          return time_ms ? (
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
              onClick={() => navigateToSolve(id)}
              key={id}
              time_ms={time_ms}
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

function getBestAndWorstIds(submittedSolves: ContestResultsResponse[number]['solve_set']) {
  const dnfSolve = submittedSolves.find(({ dnf }) => dnf)
  const timeArr = submittedSolves
    .filter(({ time_ms, dnf }) => typeof time_ms === 'number' && !dnf)
    .map(({ time_ms }) => time_ms as number)

  const bestTime = Math.min(...timeArr)
  const bestId = submittedSolves.find(({ time_ms }) => time_ms === bestTime)?.id
  const worstTime = Math.max(...timeArr)
  const worstId = dnfSolve?.id ?? submittedSolves.find(({ time_ms }) => time_ms === worstTime)?.id

  return { bestId, worstId }
}
