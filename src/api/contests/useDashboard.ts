import useSWRImmutable from 'swr/immutable'
import { axiosClient } from '../axios'
import { Discipline } from '@/types'

export type DashboardResponse = {
  bestSolves: Array<{
    id: number
    contestNumber: number
    timeMs: number
    user: { username: string }
    discipline: { name: Discipline }
  }>
  contests: Array<{
    id: number
    contestNumber: number
    start: string
    end: string | null
    ongoing: boolean
  }>
}

const API_ROUTE = 'contests/dashboard/'
export function useDashboard() {
  const { data, error, isLoading } = useSWRImmutable<{ data: DashboardResponse }>(API_ROUTE, axiosClient.get)

  return {
    data: data?.data,
    isLoading,
    isError: error,
  }
}
