import useSWRImmutable from 'swr/immutable'
import { axiosClient } from '../axios'
import { Discipline } from '@/types'

export type DashboardResponse = {
  best_solves: Array<{
    id: number
    contest_number: number // TODO fix to camelCase
    time_ms: number // TODO fix to camelCase
    user: { username: string }
    discipline: { name: Discipline }
  }>
  contests: Array<{
    id: number
    contest_number: number // TODO fix to camelCase
    start: string
    end: string | null
    ongoing: boolean
  }>
}

const API_ROUTE = 'contests/dashboard/'
export const useDashboard = () => {
  const { data, error, isLoading } = useSWRImmutable<{ data: DashboardResponse }>(API_ROUTE, axiosClient.get)

  return {
    data: data?.data,
    isLoading,
    isError: error,
  }
}
