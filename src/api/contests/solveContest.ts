import { axiosClient } from '../axios'
import { Discipline, Scramble } from '@/types'
import useSWRImmutable from 'swr/immutable'

export type SolveContestStateResponse = {
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

const API_ROUTE = '/contests/solve-contest/'
export function useSolveContestState(contestNumber: number, discipline: Discipline) {
  const { data, error, isLoading, mutate } = useSWRImmutable<{ data: SolveContestStateResponse }>(
    `${API_ROUTE}${contestNumber}/${discipline}/`,
    axiosClient.get,
  )

  return { data: data?.data, isLoading, error, mutate }
}

export async function postSolveResult(
  contestNumber: number,
  discipline: Discipline,
  scrambleId: number,
  payload: { reconstruction: string; timeMs: number } | { dnf: true },
) {
  const { data } = await axiosClient.post<{ solveId: number }>(
    `${API_ROUTE}${contestNumber}/${discipline}/?scramble_id=${scrambleId}`,
    payload,
  )

  return data
}

export async function submitSolve(contestNumber: number, discipline: Discipline) {
  const { data } = await axiosClient.put<SolveContestStateResponse | { detail: 'contest submitted' }>(
    `${API_ROUTE}${contestNumber}/${discipline}/?action=submit`,
  )

  const roundFinished = 'detail' in data
  return roundFinished ? { roundFinished } : { newSolvesState: data }
}

export async function changeToExtra(contestNumber: number, discipline: Discipline) {
  const { data } = await axiosClient.put<SolveContestStateResponse>(
    `${API_ROUTE}${contestNumber}/${discipline}/?action=change_to_extra`,
  )

  return { newSolvesState: data }
}
