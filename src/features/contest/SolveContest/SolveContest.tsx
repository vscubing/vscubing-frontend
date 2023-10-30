import { Discipline } from '@/types'
import { CubeSolveResult } from '@/features/cube/Cube'
import { useSolveContestState, postSolveResult, changeToExtra, submitSolve } from '@/api/contests'
import { CurrentSolve, SubmittedSolve } from './components'

type SolveContestProps = { contestNumber: number; discipline: Discipline['name'] }
export const SolveContest = ({ contestNumber, discipline }: SolveContestProps) => {
  const { data: state, mutate: mutateState } = useSolveContestState(contestNumber, discipline)

  if (!state) {
    return 'loading'
  }
  const { current_solve, submitted_solves } = state

  const solveFinishHandler = async (result: CubeSolveResult) => {
    const { solve_id: newSolveId } = await postSolveResult(contestNumber, discipline, current_solve.scramble.id, result)

    mutateState(
      {
        data: {
          ...state,
          current_solve: {
            ...current_solve,
            solve: { id: newSolveId, ...result },
          },
        },
      },
      { revalidate: false },
    )
  }

  const takeExtraHandler = async () => {
    const { newSolvesState } = await changeToExtra(contestNumber, discipline)
    mutateState({ data: newSolvesState }, { revalidate: false })
  }

  const submitHandler = async () => {
    const { newSolvesState, roundFinished } = await submitSolve(contestNumber, discipline)

    if (roundFinished) {
      window.location.reload()
      return
    }
    mutateState({ data: newSolvesState }, { revalidate: false })
  }

  return (
    <>
      {submitted_solves.map((solve) => (
        <SubmittedSolve className='mb-[25px]' key={solve.id} {...solve} />
      ))}
      <CurrentSolve
        className='mb-[25px]'
        {...current_solve}
        onSolveFinish={solveFinishHandler}
        onExtra={takeExtraHandler}
        onSubmit={submitHandler}
      />
      {submitted_solves.length === 0 ? (
        <div className='flex justify-center rounded-[5px] bg-panels py-[80px]'>
          <p className='max-w-[609px] text-center text-[24px]'>
            You can't see results of an ongoing round until you solve all scrambles or the round ends
          </p>
        </div>
      ) : null}
    </>
  )
}
