import { Discipline } from '@/types'
import useSWRImmutable from 'swr/immutable'
import { axiosClient } from '..'

type Response = Solve[]
type Solve = {
  id: number
  username: string
  time_ms: number // TODO fix to camelCase
  discipline: Discipline
}

const API_ROUTE = 'contests/contest/'
export const useContestResults = (contestNumber: number, discipline: Discipline) => {
  const { data, error, isLoading } = useSWRImmutable<{ data: Response }>(
    `${API_ROUTE}${contestNumber}/${discipline}`,
    axiosClient.get,
  )

  return {
    data: data?.data,
    isLoading,
    isError: error,
  }
}
