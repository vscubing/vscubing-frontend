import { Discipline } from '@/types'
import { CurrentSolve, SubmittedSolve } from './components'
import { InfoBox } from '@/components'
import { useQuery } from '@tanstack/react-query'
import { solveContestStateQuery, usePostSolveResult, useSubmitSolve, useChangeToExtra } from './api'
import { userQuery } from '../auth'
import { CubeSolveResult } from '../cube'

type SolveContestProps = { contestNumber: number; discipline: Discipline }
export function SolveContest({ contestNumber, discipline }: SolveContestProps) {
  const { data: userData } = useQuery(userQuery)
  const { data: state } = useQuery(solveContestStateQuery(contestNumber, discipline))
  const { mutate: postSolveResult } = usePostSolveResult(contestNumber, discipline)
  const { mutate: submitSolve } = useSubmitSolve(contestNumber, discipline)
  const { mutate: changeToExtra } = useChangeToExtra(contestNumber, discipline)

  if (userData && !userData.authCompleted) {
    return <InfoBox>Please finish registration first</InfoBox>
  }
  if (!state) {
    return <InfoBox>loading...</InfoBox>
  }
  const { currentSolve, submittedSolves } = state

  async function solveFinishHandler(result: CubeSolveResult) {
    postSolveResult({ scrambleId: currentSolve.scramble.id, result })
  }

  return (
    <div className='flex flex-col gap-3 md:gap-6'>
      {submittedSolves.map((solve) => (
        <SubmittedSolve className='px-3 py-2 md:h-[54px] md:px-4 md:py-0 lg:px-7' key={solve.id} {...solve} />
      ))}

      <CurrentSolve
        className='px-3 py-2 md:h-[54px] md:py-0 md:pl-4 md:pr-3 lg:pl-7 lg:pr-4'
        {...currentSolve}
        onSolveFinish={solveFinishHandler}
        onExtra={changeToExtra}
        onSubmit={submitSolve}
      />
      {submittedSolves.length === 0 ? (
        <InfoBox>You can't see results of an ongoing round until you solve all scrambles or the round ends</InfoBox>
      ) : null}
    </div>
  )
}
