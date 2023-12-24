import { ReconstructTimeButton } from '@/components'
import { cn } from '@/utils'
import { useReconstructor } from '@/features/reconstructor'
import { SolveContestStateDTO } from '../types'
import { CubeSolveResult, useCube } from '@/features/cube'

type CurrentSolveProps = SolveContestStateDTO['currentSolve'] & {
  className?: string
  onSolveFinish: (result: CubeSolveResult) => void
  onSubmit: () => void
  onExtra: () => void
}
export function CurrentSolve({
  scramble,
  solve,
  canChangeToExtra,
  onSolveFinish,
  onSubmit,
  onExtra,
  className,
}: CurrentSolveProps) {
  const { initSolve } = useCube()
  const { showReconstruction } = useReconstructor()

  const isFinished = !!solve
  const isSuccessful = isFinished && !solve.dnf

  return (
    <>
      <div
        className={cn(
          'grid grid-cols-[30px_1fr_min-content] items-center rounded-md bg-panels md:grid-cols-[30px_min-content_1fr_min-content]',
          className,
        )}
      >
        <div className='pr-[10px] md:text-right'>{scramble.position}.</div>
        <div className='md:mr-[20px] md:border-r-[1px] md:border-[#A0A0A0]/50 md:pr-[20px]'>
          {!isFinished ? (
            <span className='block w-[80px] text-center'>??:??.??</span>
          ) : isSuccessful ? (
            <ReconstructTimeButton onClick={() => showReconstruction(solve.id)} timeMs={solve.timeMs} />
          ) : (
            <span className='block w-[80px] pl-2'>DNF</span>
          )}
        </div>
        <div className='pr-2 max-md:col-span-2'>
          {isFinished ? scramble.scramble : '? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ?'}
        </div>
        <div className='justify-center max-md:col-start-3 max-md:row-start-1 max-md:row-end-3 max-md:flex max-md:h-full max-md:flex-col'>
          {isFinished ? (
            <div className='flex gap-[17px]'>
              {canChangeToExtra ? (
                <button onClick={onExtra} className='w-[82px] rounded-md bg-[#9B2527] py-2'>
                  extra
                </button>
              ) : null}
              <button onClick={onSubmit} className='w-[82px] rounded-md bg-primary py-2'>
                submit
              </button>
            </div>
          ) : (
            <button
              className='w-[82px] rounded-md bg-primary py-2 disabled:brightness-50'
              onClick={() => initSolve(scramble.scramble, onSolveFinish)}
            >
              solve
            </button>
          )}
        </div>
      </div>
    </>
  )
}
