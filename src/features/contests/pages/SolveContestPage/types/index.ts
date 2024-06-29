import { ContestsCurrentSolveOutput } from '@/api'
import { type ScrambleDTO } from '@/types'

export type _SolveContestStateDTO = {
  currentSolve: {
    canChangeToExtra: boolean
    scramble: ScrambleDTO
    solve: SolveNotInited | FinishedSolve
  }
  submittedSolves: Array<(SolveSuccessful | SolveDnf) & { scramble: ScrambleDTO }>
}
export type SolveContestStateDTO = ContestsCurrentSolveOutput
export type FinishedSolve = SolveSuccessful | SolveDnf

type SolveNotInited = null
type SolveSuccessful = { id: number; timeMs: number; dnf: false }
type SolveDnf = { id: number; timeMs: null; dnf: true }
