import { SolveTimeButton } from '@/components/ui'
import { useReconstructor } from '@/features/reconstructor'
import { type SolveContestStateDTO } from '../types'
import { type CubeSolveResult, useCube } from '@/features/cube'

export function CurrentSolve({
  solve: { scramble, solve, canChangeToExtra },
  onSolveFinish,
  onSubmit,
  onExtra,
}: {
  solve: SolveContestStateDTO['currentSolve']
  onSolveFinish: (result: CubeSolveResult) => void
  onSubmit: () => void
  onExtra: () => void
}) {
  const { initSolve } = useCube()
  const { showReconstruction } = useReconstructor()

  const isFinished = !!solve
  const isSuccessful = isFinished && !solve.dnf

  return (
    <div className='flex'>
      <div className='pr-[10px] md:text-right'>{scramble.position}.</div>
      <div className='md:mr-[20px] md:border-r-[1px] md:border-[#A0A0A0]/50 md:pr-[20px]'>
        {!isFinished ? (
          <span className='block w-[80px] text-center'>??:??.??</span>
        ) : isSuccessful ? (
          <SolveTimeButton onClick={() => showReconstruction(solve.id)} timeMs={solve.timeMs} />
        ) : (
          <span className='block w-[80px] pl-2'>DNF</span>
        )}
      </div>
      <div className='max-md:col-span-2 pr-2'>
        {isFinished ? scramble.scramble : '? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ?'}
      </div>
      <div className='max-md:col-start-3 max-md:row-start-1 max-md:row-end-3 max-md:flex max-md:h-full max-md:flex-col justify-center'>
        {isFinished ? (
          <div className='flex gap-[17px]'>
            {canChangeToExtra ? (
              <button onClick={onExtra} className='w-[82px] rounded-md bg-[#9B2527] py-2'>
                extra
              </button>
            ) : null}
            <button onClick={onSubmit} className='bg-primary w-[82px] rounded-md py-2'>
              submit
            </button>
          </div>
        ) : (
          <button
            className='bg-primary w-[82px] rounded-md py-2 disabled:brightness-50'
            onClick={() => initSolve(scramble.scramble, onSolveFinish)}
          >
            solve
          </button>
        )}
      </div>
    </div>
  )
}
