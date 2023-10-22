import useSWR from 'swr'
import axiosClient from '../axios'

const PREFIX = '/contests'

export type DashboardData = {
  best_solves: Array<{
    id: number
    contest: number
    time_ms: number
    reconstruction: string
    scramble: string
    username: string
    discipline: '3by3' | '4by4'
  }>
  contests: Array<{ id: number; name: number; start: string; end: string | null }>
}

export const useDashbordData = () => {
  const { data, error, isLoading } = useSWR<{ data: DashboardData }>(PREFIX + '/dashboard_page/', axiosClient.get)

  return {
    data: data?.data,
    isLoading,
    isError: error,
  }
}
