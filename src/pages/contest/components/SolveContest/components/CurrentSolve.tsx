import { ReconstructTimeButton } from '@/components'
import { SolveContestStateResponse } from '@/api/contests'
import { cn } from '@/utils'
import { useNavigateToSolve } from '@/pages/contest'
import { useCube } from '@/integrations/cube'
import { CubeSolveResult } from '@/integrations/cube'

type CurrentSolveProps = SolveContestStateResponse['current_solve'] & {
  className?: string
  onSolveFinish: (result: CubeSolveResult) => void
  onSubmit: () => void
  onExtra: () => void
}
export const CurrentSolve = ({
  scramble,
  solve,
  can_change_to_extra,
  onSolveFinish,
  onSubmit,
  onExtra,
  className,
}: CurrentSolveProps) => {
  const { startSolve } = useCube()
  const { navigateToSolve } = useNavigateToSolve()

  const isInited = !!solve
  const isSuccessful = isInited && !solve.dnf

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
          {!isInited ? (
            <span className='block w-[80px] text-center'>??:??.??</span>
          ) : isSuccessful ? (
            <ReconstructTimeButton onClick={() => navigateToSolve(solve.id)} time_ms={solve.time_ms} />
          ) : (
            <span className='block w-[80px] pl-2'>DNF</span>
          )}
        </div>
        <div className='pr-2 max-md:col-span-2'>
          {isInited ? scramble.scramble : '? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ?'}
        </div>
        <div className='justify-center max-md:col-start-3 max-md:row-start-1 max-md:row-end-3 max-md:flex max-md:h-full max-md:flex-col'>
          {isInited ? (
            <div className='flex gap-[17px]'>
              {can_change_to_extra ? (
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
              onClick={() => startSolve(scramble.scramble, onSolveFinish)}
            >
              solve
            </button>
          )}
        </div>
      </div>
    </>
  )
}
