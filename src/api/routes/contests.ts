import useSWRImmutable from 'swr/immutable'
import { axiosClient } from '../axios'

const PREFIX = '/contests'

export type DashboardData = {
  best_solves: Array<{
    id: number
    contest_id: number
    time_ms: number
    reconstruction: string
    scramble: string
    username: string
    discipline: '3by3' | '4by4'
  }>
  contests: Array<{ id: number; contest_number: number; start: string; end: string | null; ongoing: boolean }>
}

export const useDashbordData = () => {
  const { data, error, isLoading } = useSWRImmutable<{ data: DashboardData }>(
    PREFIX + '/dashboard_page/',
    axiosClient.get,
  )

  return {
    data: data?.data,
    isLoading,
    isError: error,
  }
}

type Solve = {
  id: string
  username: string
  time_ms: number
  contest: number
  discipline: string
}

export const usePastContestData = (name: string, discipline: string) => {
  const { data, error, isLoading } = useSWRImmutable<{ data: Solve[] }>(
    `${PREFIX}/past_contest_page/${name}/${discipline}`,
    axiosClient.get,
  )

  return {
    data: data?.data,
    isLoading,
    isError: error,
  }
}

export const getOngoingContestNumber = async () => {
  const res = await axiosClient.get<number>(`${PREFIX}/ongoing_contest_number`)
  return res.data
}

export const useOngoingContestNumber = () => {
  const { data, error, isLoading } = useSWRImmutable<{ data: number }>(
    `${PREFIX}/ongoing_contest_number`,
    axiosClient.get,
  )

  return { data: data?.data, isLoading, isError: error }
}
