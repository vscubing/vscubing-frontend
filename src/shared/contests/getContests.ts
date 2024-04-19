import { axiosClient } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'

export type ContestDTO = {
  id: number
  name: string
  slug: string
  startDate: string
  endDate: string
}

export type ContestListDTO = {
  limit: number
  offset: number
  count: number
  next: string | null
  previous: string | null
  results: ContestDTO[]
}

type ContestListParams = {
  limit: number
  offset: number
  orderBy?: 'creaded_at' | '-created_at'
}

async function getContestList(params: ContestListParams) {
  const res = await axiosClient.get<ContestListDTO>('contests/contests/', { params })
  return res.data
}

export function useContestList(params: ContestListParams) {
  return useQuery({ queryKey: ['contest-list', params], queryFn: () => getContestList(params) })
}
