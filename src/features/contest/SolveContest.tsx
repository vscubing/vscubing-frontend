import { useSolveContestState } from '@/api/contests/solveContest'
import { Discipline } from '@/types'
import { ActionButton } from './ActionButton'
import { useCube } from '../cube';

type SolveContestProps = { contestNumber: number; discipline: Discipline }
export const SolveContest = ({ contestNumber, discipline }: SolveContestProps) => {
  const { startSolve } = useCube()
  const { data: state } = useSolveContestState(contestNumber, discipline)

  if (!state) {
    return 'loading'
  }
  const { current_solve, submitted_solves } = state
  const currentSolveNumber = `${submitted_solves.length + 1}.`
  const pending = !!current_solve.solve.time_ms

  return (
    <>
      {submitted_solves.map((_, index) => (
        <div>{index + 1}.</div>
      ))}
      <div className='flex items-center gap-[20px]'>
        {currentSolveNumber}
        <div>{pending ? current_solve.solve.time_ms : '??:??.??'}</div>
        <div>{pending ? current_solve.scramble : '? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ?'}</div>
        {pending ? (
          <>
            <ActionButton color='secondary'>extra</ActionButton>
            <ActionButton color='primary'>submit</ActionButton>
          </>
        ) : (
          <ActionButton color='primary' onClick={() => startSolve(current_solve.scramble, console.log)}>
            solve
          </ActionButton>
        )}
      </div>
    </>
  )
}
