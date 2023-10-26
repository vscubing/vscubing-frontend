import { postSolveResult, useSolveContestState } from '@/api/contests/solveContest'
import { Discipline } from '@/types'
import { useCube } from '@/features/cube'
import { CubeSolveResult } from '@/features/cube/Cube'
import { formatSolveTime } from '@/utils'

type SolveContestProps = { contestNumber: number; discipline: Discipline }
export const SolveContest = ({ contestNumber, discipline }: SolveContestProps) => {
  const { startSolve } = useCube()
  const { data: state, mutate: mutateState } = useSolveContestState(contestNumber, discipline)

  if (!state) {
    return 'loading'
  }
  const { current_solve, submitted_solves } = state
  const currentSolveNumber = `${submitted_solves.length + 1}.`
  const pendingResult = current_solve.solve.time_ms

  const onSolveFinish = async (result: CubeSolveResult) => {
    const { solve_id: newSolveId } = await postSolveResult(contestNumber, discipline, current_solve.scramble.id, result)

    mutateState({
      data: {
        submitted_solves,
        current_solve: { ...current_solve, solve: { id: newSolveId, time_ms: result.time_ms } },
      },
    })
  }

  return (
    <>
      {submitted_solves.map((_, index) => (
        <div>{index + 1}.</div>
      ))}
      <div className='flex items-center gap-[20px]'>
        {currentSolveNumber}
        <div>{pendingResult ? formatSolveTime(pendingResult) : '??:??.??'}</div>
        <div>
          {pendingResult
            ? current_solve.scramble.scramble
            : '? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ?'}
        </div>
        {pendingResult ? (
          <>
            <button className='w-[82px] rounded-[5px] bg-[#9B2527] py-[8px]'>extra</button>
            <button className='w-[82px] rounded-[5px] bg-primary py-[8px]'>submit</button>
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
