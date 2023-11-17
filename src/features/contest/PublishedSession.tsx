import { ReconstructTimeButton } from '@/components'
import classNames from 'classnames'
import { useNavigateToSolve } from './ContestDiscipline'
import { ContestResultsResponse } from '@/api/contests'
import { formatTimeResult } from '@/utils'
import { useMemo } from 'react'

type PublishedSessionProps = ContestResultsResponse[number]
export const PublishedSession = ({
  user: { username },
  avg_ms,
  solve_set,
  isOwnSession,
}: PublishedSessionProps & { isOwnSession?: boolean }) => {
  const { navigateToSolve } = useNavigateToSolve()

  const submittedSolves = useMemo(() => solve_set.filter(({ state }) => state === 'submitted'), [solve_set])
  const { bestId, worstId } = useMemo(() => getBestAndWorstIds(submittedSolves), [submittedSolves])

  return (
    <div
      className={classNames(
        isOwnSession ? 'bg-[#233D50]' : 'bg-panels',
        'mb-[26px] grid grid-cols-[1fr_repeat(6,min-content)] items-center gap-[8px] rounded-[5px] py-[12px] pl-[27px] pr-[56px] last:mb-0',
      )}
    >
      <span>{username}</span>
      <span className='mr-[22px] border-r-[1px] border-[#A0A0A0]/50 pr-[30px]'>
        <span className='block w-[80px] text-center text-[#79A1EF]'>{avg_ms ? formatTimeResult(avg_ms) : 'DNF'}</span>
      </span>
      {submittedSolves.map(({ id, time_ms, scramble: { position } }) => {
        const isExtra = position.startsWith('E')
        return time_ms ? (
          <ReconstructTimeButton
            className={classNames({
              'text-[#69C382]': bestId === id,
              'text-[#E45B5B]': worstId === id,
              'underline underline-offset-4': isExtra,
            })}
            title={isExtra ? `Extra ${position[1]}` : undefined}
            onClick={() => navigateToSolve(id)}
            key={id}
            time_ms={time_ms}
          />
        ) : (
          <span key={id} className='w-[80px] text-center text-[#E45B5B]'>
            DNF
          </span>
        )
      })}
    </div>
  )
}

const getBestAndWorstIds = (submittedSolves: ContestResultsResponse[number]['solve_set']) => {
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
