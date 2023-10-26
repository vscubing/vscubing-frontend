import useSWR from 'swr'
import { axiosClient } from '../axios'
import { Discipline } from '@/types'

type SolveState = {
  current_solve: {
    scramble: { extra: boolean; id: number; scramble: string }
    solve: { time_ms: null }
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
