import { Discipline } from '@/types'
import { useCube } from '@/features/cube'
import { CubeSolveResult } from '@/features/cube/Cube'
import { ReconstructTimeButton } from '@/components'
import { useSolveContestState, postSolveResult, changeToExtra, submitSolve } from '@/api/contests'

type SolveContestProps = { contestNumber: number; discipline: Discipline }
export const SolveContest = ({ contestNumber, discipline }: SolveContestProps) => {
  const { startSolve } = useCube()
  const { data: state, mutate: mutateState } = useSolveContestState(contestNumber, discipline)

  if (!state) {
    return 'loading'
  }
  const { current_solve, submitted_solves } = state
  const currentSolveNumber = `${submitted_solves.length + 1}.`
  const currentSolveResult = current_solve.solve.time_ms ? current_solve.solve : null

  const onSolveFinish = async (result: CubeSolveResult) => {
    const { solve_id: newSolveId } = await postSolveResult(contestNumber, discipline, current_solve.scramble.id, result)

    mutateState(
      {
        data: {
          submitted_solves,
          current_solve: { ...current_solve, solve: { id: newSolveId, time_ms: result.time_ms } },
        },
      },
      { revalidate: false },
    )
  }

  const onExtra = async () => {
    const res = await changeToExtra(contestNumber, discipline, currentSolveResult!.id)
    console.log(res)
  }

  const onSubmit = async () => {
    const res = await submitSolve(contestNumber, discipline, currentSolveResult!.id)
    console.log(res)
  }

  return (
    <>
      {submitted_solves.map((solve, index) => (
        <div key={solve.id} className='flex items-center gap-[20px]'>
          {index + 1}. <ReconstructTimeButton time_ms={solve.time_ms} solveId={solve.id} /> {solve.scramble.scramble}
        </div>
      ))}
      <div className='flex items-center gap-[20px]'>
        {currentSolveNumber}
        <div>
          {currentSolveResult ? (
            <ReconstructTimeButton solveId={currentSolveResult.id} time_ms={currentSolveResult.time_ms} />
          ) : (
            '??:??.??'
          )}
        </div>
        <div>
          {currentSolveResult
            ? current_solve.scramble.scramble
            : '? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ?'}
        </div>
        {currentSolveResult ? (
          <>
            <button onClick={() => onExtra()} className='w-[82px] rounded-[5px] bg-[#9B2527] py-[8px]'>
              extra
            </button>
            <button onClick={() => onSubmit()} className='w-[82px] rounded-[5px] bg-primary py-[8px]'>
              submit
            </button>
          </>
        ) : (
          <button
            className='w-[82px] rounded-[5px] bg-primary py-[8px]'
            onClick={() => startSolve(current_solve.scramble.scramble, onSolveFinish)}
          >
            solve
          </button>
        )}
      </div>
    </>
  )
}
