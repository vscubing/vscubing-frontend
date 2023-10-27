import { ISubmittedSolve } from '@/api/contests'
import { ReconstructTimeButton } from '@/components'
import classNames from 'classnames'

type SubmittedSolveProps = {
  number: number
  solve: ISubmittedSolve
  className?: string
}

export const SubmittedSolve = ({ number, solve, className }: SubmittedSolveProps) => {
  return (
    <div
      key={solve.id}
      className={classNames(
        className,
        'grid h-[54px] grid-cols-[30px_min-content_1fr] items-center rounded-[5px] bg-panels py-[7px] pl-[27px] pr-[20px]',
      )}
    >
      <div className='pr-[10px] text-right'>{number}.</div>
      <div className='mr-[20px] border-r-[1px] border-[#A0A0A0]/50 pr-[20px]'>
        <ReconstructTimeButton time_ms={solve.time_ms} solveId={solve.id} />
      </div>
      {solve.scramble.scramble}
    </div>
  )
}
