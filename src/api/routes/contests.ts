import useSWRImmutable from 'swr/immutable'
import { axiosClient } from '../axios'
import { Reconstruction } from '@/components'

const PREFIX = '/contests'

type Discipline = '3by3'
export type DashboardData = {
  best_solves: Array<{
    id: number
    contest: number
    time_ms: number
    reconstruction: string
    scramble: string
    username: string
    discipline: Discipline
  }>
  contests: Array<{ id: number; contest_number: number; start: string; end: string | null; ongoing: boolean }>
}

export const useDashbordData = () => {
  const { data, error, isLoading } = useSWRImmutable<{ data: DashboardData }>(PREFIX + '/dashboard/', axiosClient.get)

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
  discipline: Discipline
}

export const useContestData = (contestNumber: number, discipline: Discipline) => {
  const { data, error, isLoading } = useSWRImmutable<{ data: Solve[] }>(
    `${PREFIX}/contest/${contestNumber}/${discipline}`,
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

export const useSolveReconstruction = (solveId: number | null) => {
  const { data, error, isLoading } = useSWRImmutable<{
    data: Reconstruction
  }>(solveId === null ? null : `${PREFIX}/solve_reconstruction/${solveId}/`, axiosClient.get)

  return { data: data ? data.data : null, isLoading, isError: error }
}
