import { axiosClient } from '@/lib/axios'
import { queryOptions, useQuery } from '@tanstack/react-query'

export type ContestDTO = {
  id: number
  name: string
  slug: string
  start_date: string // NOTE: mock because not present on backend yet
  end_date: string // NOTE: mock not present on backend yet
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
  res.data.results = res.data.results.map((contest) => ({
    ...contest,
    start: '2021-01-01T00:00:00Z',
    end: '2021-01-01T00:00:00Z',
  }))
  return res.data
}

export function useContestList(params: ContestListParams) {
  return useQuery({ queryKey: ['contest-list', params], queryFn: () => getContestList(params) })
}
