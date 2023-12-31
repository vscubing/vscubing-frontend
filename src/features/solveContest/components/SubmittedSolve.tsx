import { SolveTimeButton } from '@/components'
import { useReconstructor } from '@/features/reconstructor'
import { cn } from '@/utils'
import { type SolveContestStateDTO } from '../types'

type SubmittedSolveProps = SolveContestStateDTO['submittedSolves'][number] & {
  className?: string
}
export function SubmittedSolve({ className, timeMs, scramble, id }: SubmittedSolveProps) {
  const { showReconstruction } = useReconstructor()
  const isSuccessfull = timeMs !== null

  return (
    <div
      className={cn(
        'bg-panels grid grid-cols-[30px_1fr] items-center rounded-md md:grid-cols-[30px_min-content_1fr]',
        className,
      )}
    >
      <span className='md:mr-[10px] md:text-right'>{scramble.position}.</span>
      <span className='md:mr-[20px] md:border-r-[1px] md:border-[#A0A0A0]/50 md:pr-[20px]'>
        {isSuccessfull ? (
          <SolveTimeButton timeMs={timeMs} onClick={() => showReconstruction(id)} />
        ) : (
          <span className='block w-[80px] pl-2'>DNF</span>
        )}
      </span>
      <span className='col-span-full md:col-span-1'>{scramble.scramble}</span>
    </div>
  )
}
