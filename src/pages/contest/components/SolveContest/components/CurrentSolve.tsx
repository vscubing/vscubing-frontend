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
    <div
      className={cn(
        className,
        'grid h-[54px] grid-cols-[30px_min-content_1fr_min-content] items-center rounded-[5px] bg-panels pl-[27px] pr-[20px]',
      )}
    >
      <div className='pr-[10px] text-right'>{scramble.position}.</div>
      <div className='mr-[20px] border-r-[1px] border-[#A0A0A0]/50 pr-[20px]'>
        {!isInited ? (
          <span className='block w-[80px] text-center'>??:??.??</span>
        ) : isSuccessful ? (
          <ReconstructTimeButton onClick={() => navigateToSolve(solve.id)} time_ms={solve.time_ms} />
        ) : (
          <span className='block w-[80px] pl-2'>DNF</span>
        )}
      </div>
      <div>{isInited ? scramble.scramble : '? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ?'}</div>
      {isInited ? (
        <div className='flex gap-[17px]'>
          {can_change_to_extra ? (
            <button onClick={onExtra} className='w-[82px] rounded-[5px] bg-[#9B2527] py-[8px]'>
              extra
            </button>
          ) : null}
          <button onClick={onSubmit} className='w-[82px] rounded-[5px] bg-primary py-[8px]'>
            submit
          </button>
        </div>
      ) : (
        <button
          className='w-[82px] rounded-[5px] bg-primary py-[8px]'
          onClick={() => startSolve(scramble.scramble, onSolveFinish)}
        >
          solve
        </button>
      )}
    </div>
  )
}
