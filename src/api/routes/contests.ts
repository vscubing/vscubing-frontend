import useSWR from 'swr'
import axiosClient from '../axios'

const PREFIX = '/contests'

export type DashboardData = {
  best_solves: Array<{
    contest: number
    reconstruction: string
    scramble: { scramble: string }
    time_ms: string
    user: { username: string }
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
