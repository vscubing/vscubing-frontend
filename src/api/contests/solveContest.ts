import { axiosClient } from '../axios'
import { Discipline } from '@/types'
import useSWRImmutable from 'swr/immutable'

type Scramble = { extra: boolean; id: number; scramble: string }
type SolvesState = {
  current_solve: {
    scramble: Scramble
    solve: { time_ms: null } | { time_ms: number; id: number }
  }
  submitted_solves: Array<ISubmittedSolve>
}
export type ISubmittedSolve = {
  dnf: boolean
  id: number
  scramble: Scramble
  time_ms: number
}

const API_ROUTE = '/contests/solve_contest/'
export const useSolveContestState = (contestNumber: number, discipline: Discipline) => {
  const { data, error, isLoading, mutate } = useSWRImmutable<{ data: SolvesState }>(
    `${API_ROUTE}${contestNumber}/${discipline}/`,
    axiosClient.get,
  )

  return { data: data?.data, isLoading, error, mutate }
}

export const postSolveResult = async (
  contestNumber: number,
  discipline: Discipline,
  scrambleId: number,
  payload: { reconstruction: string; time_ms: number },
) => {
  const { data } = await axiosClient.post<{ solve_id: number }>(
    `${API_ROUTE}${contestNumber}/${discipline}/?scramble_id=${scrambleId}`,
    payload,
  )

  return data
}

export const submitSolve = async (contestNumber: number, discipline: Discipline, solve_id: number) => {
  const { data } = await axiosClient.put<SolvesState>(`${API_ROUTE}${contestNumber}/${discipline}/?action=submit`, {
    solve_id,
  })

  return { newSolvesState: data }
}

export const changeToExtra = async (contestNumber: number, discipline: Discipline, solve_id: number) => {
  const { data } = await axiosClient.put<SolvesState>(
    `${API_ROUTE}${contestNumber}/${discipline}/?action=change_to_extra`,
    { solve_id },
  )

  return { newSolvesState: data }
}
