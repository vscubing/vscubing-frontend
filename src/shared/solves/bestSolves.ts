import { axiosClient } from '@/lib/axios'
import { type Discipline } from '@/types'
import { useQuery } from '@tanstack/react-query'

export type SolveListItem = {
  id: number
  timeMs: number
  createdAt: string
  user: { id: number; username: string }
  scramble: { id: number; moves: string }
  contest: { id: number; name: string; slug: string }
  discipline: { id: number; name: string; slug: Discipline } // NOTE: id and name should be removed
}

export type SolveListDTO = {
  limit: number
  offset: number
  count: number
  next: string | null
  previous: string | null
  results: SolveListItem[]
}

type SolvesBestEveryDisciplineParams = {
  limit: number
  offset: number
}

async function getSolvesBestEveryDiscipline(params: SolvesBestEveryDisciplineParams) {
  const res = await axiosClient.get<SolveListDTO>('contests/solves/best-in-every-discipline/', { params })
  return res.data
}

export function useSolvesBestEveryDiscipline(params: SolvesBestEveryDisciplineParams) {
  return useQuery({
    queryKey: ['solves-best-every-discipline', params],
    queryFn: () => getSolvesBestEveryDiscipline(params),
  })
}

type SolvesBestEveryUserParams = {
  limit: number
  offset: number
  discipline: string
}

async function getSolvesBestEveryUser(params: SolvesBestEveryUserParams) {
  const res = await axiosClient.get<SolveListDTO>('contests/solves/best-of-every-user/', { params })
  return res.data
}

export function useSolvesBestEveryUser(params: SolvesBestEveryUserParams) {
  return useQuery({
    queryKey: ['solves-best-every-user', params],
    queryFn: () => getSolvesBestEveryUser(params),
  })
}
