import useSWRImmutable from 'swr/immutable'
import { axiosClient } from '../axios'
import { Discipline } from '@/types'

type ResponseType = unknown

const API_ROUTE = '/contests/solve_contest/'
export const useSolveContestState = (contestNumber: number, discipline: Discipline) => {
  const { data, error, isLoading } = useSWRImmutable<{ data: ResponseType }>(
    `${API_ROUTE}${contestNumber}/${discipline}/`,
    axiosClient.get,
  )

  return { data: data?.data, isLoading, error }
}
