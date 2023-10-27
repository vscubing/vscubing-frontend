import { ReconstructTimeButton } from '@/components'
import { useCube } from '@/features/cube'
import { CubeSolveResult } from '@/features/cube/Cube'

type CurrentSolveProps = {
  number: number
  result?: { id: number; time_ms: number }
  scramble: string
  onSolveFinish: (result: CubeSolveResult) => void
  onSubmit: () => void
  onExtra: () => void
}
export const CurrentSolve = ({ number, result, scramble, onSolveFinish, onSubmit, onExtra }: CurrentSolveProps) => {
  const { startSolve } = useCube()
  return (
    <div className='mb-[25px] grid h-[54px] grid-cols-[30px_min-content_1fr_min-content] items-center rounded-[5px] bg-panels pl-[27px] pr-[20px]'>
      <div className='pr-[10px] text-right'>{number}.</div>
      <div className='mr-[20px] border-r-[1px] border-[#A0A0A0]/50 pr-[20px]'>
        {result ? (
          <ReconstructTimeButton solveId={result.id} time_ms={result.time_ms} />
        ) : (
          <div className='w-[80px] text-center'>??:??.??</div>
        )}
      </div>
      <div>{result ? scramble : '? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ?'}</div>
      {result ? (
        <div className='flex gap-[17px]'>
          <button onClick={onExtra} className='w-[82px] rounded-[5px] bg-[#9B2527] py-[8px]'>
            extra
          </button>
          <button onClick={onSubmit} className='w-[82px] rounded-[5px] bg-primary py-[8px]'>
            submit
          </button>
        </div>
      ) : (
        <button
          className='w-[82px] rounded-[5px] bg-primary py-[8px]'
          onClick={() => startSolve(scramble, onSolveFinish)}
        >
          solve
        </button>
      )}
    </div>
  )
}
