import { ReconstructTimeButton } from '@/components'
import classNames from 'classnames'
import { useNavigateToSolve } from './ContestDiscipline'
import { ContestResultsResponse } from '@/api/contests'
import { formatTimeResult } from '@/utils'

type PublishedSessionProps = ContestResultsResponse[number]
export const PublishedSession = ({ user: { username }, avg_ms, solve_set }: PublishedSessionProps) => {
  const { navigateToSolve } = useNavigateToSolve()

  const submittedSolves = solve_set.filter(({ state }) => state === 'submitted')

  const timeArr = submittedSolves.map((solve) => solve.time_ms)
  const bestIndex = timeArr.indexOf(Math.min(...timeArr))
  const worstIndex = timeArr.indexOf(Math.max(...timeArr))

  return (
    <div className='mb-[26px] grid grid-cols-[1fr_repeat(6,min-content)] items-center gap-[8px] rounded-[5px] bg-panels py-[12px] pl-[27px] pr-[56px] last:mb-0'>
      <span>{username}</span>
      <span className='mr-[22px] border-r-[1px] border-[#A0A0A0]/50 pr-[30px]'>
        <span className='block w-[80px] text-center text-[#79A1EF]'>{avg_ms && formatTimeResult(avg_ms)}</span>
      </span>
      {submittedSolves
        .filter((solve) => solve.state !== 'changed_to_extra')
        .map(({ id, time_ms /* scramble: { position } */ }, index) => {
          // const isExtra = position.startsWith('E')
          const isExtra = false
          return (
            <ReconstructTimeButton
              className={classNames({
                'text-[#69C382]': bestIndex === index,
                'text-[#E45B5B]': worstIndex === index,
                'underline underline-offset-4': isExtra,
              })}
              // title={isExtra ? `Extra ${position[1]}` : undefined}
              onClick={() => navigateToSolve(id)}
              key={id}
              time_ms={time_ms}
            />
          )
        })}
    </div>
  )
}
