import { SolveContestStateResponse } from '@/api/contests'
import { ReconstructTimeButton } from '@/components'
import classNames from 'classnames'
import { useNavigateToSolve } from '../../ContestDiscipline'

type SubmittedSolveProps = SolveContestStateResponse['submitted_solves'][number] & {
  className?: string
}
export const SubmittedSolve = ({ className, time_ms, scramble, id }: SubmittedSolveProps) => {
  const { navigateToSolve } = useNavigateToSolve()
  const isSuccessfull = time_ms !== null

  return (
    <div
      className={classNames(
        className,
        'grid h-[54px] grid-cols-[30px_min-content_1fr] items-center rounded-[5px] bg-panels py-[7px] pl-[27px] pr-[20px]',
      )}
    >
      <div className='pr-[10px] text-right'>{scramble.position}.</div>
      <div className='mr-[20px] border-r-[1px] border-[#A0A0A0]/50 pr-[20px]'>
        {isSuccessfull ? (
          <ReconstructTimeButton time_ms={time_ms} onClick={() => navigateToSolve(id)} />
        ) : (
          <span className='block w-[80px] pl-[7px]'>DNF</span>
        )}
      </div>
      {scramble.scramble}
    </div>
  )
}
