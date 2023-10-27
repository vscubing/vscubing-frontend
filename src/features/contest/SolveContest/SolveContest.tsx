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
          ...state,
          current_solve: { ...current_solve, solve: { id: newSolveId, time_ms: result.time_ms } },
        },
      },
      { revalidate: false },
    )
  }

  const onExtra = async () => {
    const { newSolvesState } = await changeToExtra(contestNumber, discipline, currentSolveResult!.id)
    mutateState({ data: newSolvesState }, { revalidate: false })
  }

  const onSubmit = async () => {
    const { newSolvesState } = await submitSolve(contestNumber, discipline, currentSolveResult!.id)
    mutateState({ data: newSolvesState }, { revalidate: false })
  }

  return (
    <>
      {submitted_solves.map((solve, index) => (
        <div
          key={solve.id}
          className='mb-[25px] grid h-[54px] grid-cols-[30px_min-content_1fr] items-center rounded-[5px] bg-panels py-[7px] pl-[27px] pr-[20px]'
        >
          <div className='pr-[10px] text-right'>{index + 1}.</div>
          <div className='mr-[20px] border-r-[1px] border-[#A0A0A0]/50 pr-[20px]'>
            <ReconstructTimeButton time_ms={solve.time_ms} solveId={solve.id} />
          </div>
          {solve.scramble.scramble}
        </div>
      ))}
      <div className='grid h-[54px] grid-cols-[30px_min-content_1fr_min-content] items-center rounded-[5px] bg-panels pl-[27px] pr-[20px]'>
        <div className='pr-[10px] text-right'>{currentSolveNumber}</div>
        <div className='mr-[20px] border-r-[1px] border-[#A0A0A0]/50 pr-[20px]'>
          {currentSolveResult ? (
            <ReconstructTimeButton solveId={currentSolveResult.id} time_ms={currentSolveResult.time_ms} />
          ) : (
            <div className='w-[80px] text-center'>??:??.??</div>
          )}
        </div>
        <div>
          {currentSolveResult
            ? current_solve.scramble.scramble
            : '? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ?'}
        </div>
        {currentSolveResult ? (
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
            onClick={() => startSolve(current_solve.scramble.scramble, onSolveFinish)}
          >
            solve
          </button>
        )}
      </div>
    </>
  )
}
