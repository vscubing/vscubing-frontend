import useSWR from 'swr'
import { axiosClient } from '../axios'
import { Discipline } from '@/types'

type SolveState = {
  current_solve: {
    scramble: { extra: boolean; id: number; scramble: string }
    solve: { time_ms: null } | { time_ms: number; id: number }
  }
  submitted_solves: Array<unknown>
}

const API_ROUTE = '/contests/solve_contest/'
export const useSolveContestState = (contestNumber: number, discipline: Discipline) => {
  const { data, error, isLoading, mutate } = useSWR<{ data: SolveState }>(
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
  const response = await axiosClient.post<number>(
    `${API_ROUTE}${contestNumber}/${discipline}/?scramble_id=${scrambleId}`,
    payload,
  )

  return { solve_id: response.data }
}

export const submitSolve = async (contestNumber: number, discipline: Discipline, solve_id: number) => {
  const response = await axiosClient.put<unknown>(`${API_ROUTE}${contestNumber}/${discipline}/?action=submit`, {
    solve_id,
  })

  return response
}

export const changeToExtra = async (contestNumber: number, discipline: Discipline, solve_id: number) => {
  const response = await axiosClient.put<unknown>(
    `${API_ROUTE}${contestNumber}/${discipline}/?action=change_to_extra`,
    { solve_id },
  )

  return response
}
