import useSWRImmutable from 'swr/immutable'
import { axiosClient } from '../axios'
import { Discipline } from '@/types'

type Response = {
  best_solves: IBestSolves
  contests: IContestsList
}

export type IBestSolves = Array<{
  id: number
  contest_number: number // TODO fix to camelCase
  time_ms: number // TODO fix to camelCase
  username: string
  discipline: Discipline
}>

export type IContestsList = Array<{
  id: number
  contest_number: number // TODO fix to camelCase
  start: string
  end: string | null
  ongoing: boolean
}>

const API_ROUTE = 'contests/dashboard/'
export const useDashbordData = () => {
  const { data, error, isLoading } = useSWRImmutable<{ data: Response }>(API_ROUTE, axiosClient.get)

  return {
    data: data?.data,
    isLoading,
    isError: error,
  }
}
