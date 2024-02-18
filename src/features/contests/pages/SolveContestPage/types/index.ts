import { type Scramble } from '@/types'

export type SolveContestStateDTO = {
  currentSolve: {
    canChangeToExtra: boolean
    scramble: Scramble
    solve: SolveNotInited | FinishedSolve
  }
  submittedSolves: Array<(SolveSuccessful | SolveDnf) & { scramble: Scramble }>
}
export type FinishedSolve = SolveSuccessful | SolveDnf

type SolveNotInited = null
type SolveSuccessful = { id: number; timeMs: number; dnf: false }
type SolveDnf = { id: number; timeMs: null; dnf: true }
