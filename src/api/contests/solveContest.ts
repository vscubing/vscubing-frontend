import { axiosClient } from '../axios'
import { Discipline, Scramble } from '@/types'
import useSWRImmutable from 'swr/immutable'

export type SolveContestStateResponse = {
  current_solve: {
    can_change_to_extra: boolean
    scramble: Scramble
    solve: SolveNotInited | SolveSuccessful | SolveDnf
  }
  submitted_solves: Array<(SolveSuccessful | SolveDnf) & { scramble: Scramble }>
}

type SolveNotInited = null
type SolveSuccessful = { id: number; time_ms: number; dnf: false }
type SolveDnf = { id: number; time_ms: null; dnf: true }

const API_ROUTE = '/contests/solve_contest/'
export const useSolveContestState = (contestNumber: number, discipline: Discipline) => {
  const { data, error, isLoading, mutate } = useSWRImmutable<{ data: SolveContestStateResponse }>(
    `${API_ROUTE}${contestNumber}/${discipline}/`,
    axiosClient.get,
  )

  return { data: data?.data, isLoading, error, mutate }
}

export const postSolveResult = async (
  contestNumber: number,
  discipline: Discipline,
  scrambleId: number,
  payload: { reconstruction: string; time_ms: number } | { dnf: true },
) => {
  if ('dnf' in payload && payload.dnf) {
    alert('posting dnf results is not implemented yet')
    throw Error('posting dnf results is not implemented yet')
  }

  const { data } = await axiosClient.post<{ solve_id: number }>(
    `${API_ROUTE}${contestNumber}/${discipline}/?scramble_id=${scrambleId}`,
    payload,
  )

  return data
}

export const submitSolve = async (contestNumber: number, discipline: Discipline) => {
  const { data } = await axiosClient.put<SolveContestStateResponse | { detail: 'contest submitted' }>(
    `${API_ROUTE}${contestNumber}/${discipline}/?action=submit`,
  )

  const roundFinished = 'detail' in data
  return roundFinished ? { roundFinished } : { newSolvesState: data }
}

export const changeToExtra = async (contestNumber: number, discipline: Discipline) => {
  const { data } = await axiosClient.put<SolveContestStateResponse>(
    `${API_ROUTE}${contestNumber}/${discipline}/?action=change_to_extra`,
  )

  return { newSolvesState: data }
}
