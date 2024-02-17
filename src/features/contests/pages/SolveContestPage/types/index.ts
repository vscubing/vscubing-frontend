import { type Scramble } from '@/types'

export type SolveContestStateDTO = {
  currentSolve: {
    canChangeToExtra: boolean
    scramble: Scramble
    solve: SolveNotInited | SolveSuccessful | SolveDnf
  }
  submittedSolves: Array<(SolveSuccessful | SolveDnf) & { scramble: Scramble }>
}

type SolveNotInited = null
type SolveSuccessful = { id: number; timeMs: number; dnf: false }
type SolveDnf = { id: number; timeMs: null; dnf: true }
export type FinishedSolve = SolveSuccessful | SolveDnf
