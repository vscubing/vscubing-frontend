import { Discipline } from '@/types'
import { useSolveContestState, postSolveResult, changeToExtra, submitSolve } from '@/api/contests'
import { CurrentSolve, SubmittedSolve } from './components'
import { InfoBox } from '@/components'
import { useUser } from '@/api/accounts'
import { CubeSolveResult } from '@/integrations/cube'

type SolveContestProps = { contestNumber: number; discipline: Discipline }
export function SolveContest({ contestNumber, discipline }: SolveContestProps) {
  const { userData } = useUser()
  const { data: state, mutate: mutateState } = useSolveContestState(contestNumber, discipline)

  if (userData && !userData.auth_completed) {
    return <InfoBox>Please finish registration first</InfoBox>
  }
  if (!state) {
    return <InfoBox>loading...</InfoBox>
  }
  const { current_solve, submitted_solves } = state

  async function solveFinishHandler(result: CubeSolveResult) {
    if (!state) return
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

  async function takeExtraHandler() {
    const { newSolvesState } = await changeToExtra(contestNumber, discipline)
    mutateState({ data: newSolvesState }, { revalidate: false })
  }

  async function submitHandler() {
    const { newSolvesState, roundFinished } = await submitSolve(contestNumber, discipline)

    if (roundFinished) {
      window.location.reload()
      return
    }
    mutateState({ data: newSolvesState }, { revalidate: false })
  }

  return (
    <div className='flex flex-col gap-3 md:gap-6'>
      {submitted_solves.map((solve) => (
        <SubmittedSolve className='px-3 py-2 md:h-[54px] md:px-4 md:py-0 lg:px-7' key={solve.id} {...solve} />
      ))}

      <CurrentSolve
        className='px-3 py-2 md:h-[54px] md:py-0 md:pl-4 md:pr-3 lg:pl-7 lg:pr-4'
        {...current_solve}
        onSolveFinish={solveFinishHandler}
        onExtra={takeExtraHandler}
        onSubmit={submitHandler}
      />
      {submitted_solves.length === 0 ? (
        <InfoBox>You can't see results of an ongoing round until you solve all scrambles or the round ends</InfoBox>
      ) : null}
    </div>
  )
}
