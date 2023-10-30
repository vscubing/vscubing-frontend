import { ReconstructTimeButton } from '@/components'
import classNames from 'classnames'
import { useNavigateToSolve } from './ContestDiscipline'
import { ContestResultsResponse } from '@/api/contests'
import { formatSolveTime } from '@/utils'

type PublishedSessionResultsProps = {
  username: string
  avgMs: number
  solves: ContestResultsResponse[number]['solve_set']
} // TODO fix to camelCase
export const PublishedSessionResults = ({ username, avgMs, solves }: PublishedSessionResultsProps) => {
  const { navigateToSolve } = useNavigateToSolve()

  const timeArr = solves.map((solve) => solve.time_ms)
  const bestIndex = timeArr.indexOf(Math.min(...timeArr))
  const worstIndex = timeArr.indexOf(Math.max(...timeArr))

  return (
    <div className='mb-[26px] grid grid-cols-[1fr_repeat(6,min-content)] items-center gap-[8px] rounded-[5px] bg-panels py-[12px] pl-[27px] pr-[56px] last:mb-0'>
      <span>{username}</span>
      <span className='mr-[22px] border-r-[1px] border-[#A0A0A0]/50 pr-[30px]'>
        <span className='block w-[80px] text-center text-[#79A1EF]'>{formatSolveTime(avgMs)}</span>
      </span>
      {solves.map(({ id, time_ms }, index) => {
        return (
          <ReconstructTimeButton
            className={classNames({
              'text-[#69C382]': bestIndex === index,
              'text-[#E45B5B]': worstIndex === index,
            })}
            onClick={() => navigateToSolve(id)}
            key={id}
            time_ms={time_ms}
          />
        )
      })}
    </div>
  )
}
