import { axiosClient } from '../axios'
import { Discipline } from '@/types'
import useSWRImmutable from 'swr/immutable'

type Scramble = { extra: boolean; id: number; scramble: string; position: string }
type SolvesState = {
  current_solve: {
    can_change_to_extra: boolean
    scramble: Scramble
    solve: { time_ms: null } | { time_ms: number; id: number } | { dnf: true; id: number }
  }
  submitted_solves: Array<ISubmittedSolve>
}
export type ISubmittedSolve = {
  id: number
  scramble: Scramble
} & ({ time_ms: number } | { dnf: boolean })

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
  payload: { reconstruction: string; time_ms: number } | { dnf: true },
) => {
  if ('dnf' in payload) {
    alert('dnf is not implemented yet') // TODO fix when backend is ready
    return { solve_id: 0 }
  }

  const { data } = await axiosClient.post<{ solve_id: number }>(
    `${API_ROUTE}${contestNumber}/${discipline}/?scramble_id=${scrambleId}`,
    payload,
  )

  return data
}

export const submitSolve = async (contestNumber: number, discipline: Discipline) => {
  const { data } = await axiosClient.put<SolvesState | { detail: 'contest submitted' }>(
    `${API_ROUTE}${contestNumber}/${discipline}/?action=submit`,
  )

  const roundFinished = 'detail' in data
  return roundFinished ? { roundFinished } : { newSolvesState: data }
}

export const changeToExtra = async (contestNumber: number, discipline: Discipline) => {
  const { data } = await axiosClient.put<SolvesState>(
    `${API_ROUTE}${contestNumber}/${discipline}/?action=change_to_extra`,
  )

  return { newSolvesState: data }
}
