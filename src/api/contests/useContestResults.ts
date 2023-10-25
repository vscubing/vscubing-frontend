import { Discipline } from '@/types'
import useSWRImmutable from 'swr/immutable'
import { axiosClient } from '../axios'

type Response = Solve[]
type ErrorType = {
  response: { status: number }
}

type Solve = {
  id: number
  username: string
  time_ms: number // TODO fix to camelCase
  discipline: Discipline
}

const API_ROUTE = 'contests/contest/'
export const useContestResults = (contestNumber: number, discipline: Discipline) => {
  const { data, error, isLoading } = useSWRImmutable<{ data: Response }, ErrorType>(
    `${API_ROUTE}${contestNumber}/${discipline}/`,
    axiosClient.get,
    { shouldRetryOnError: false },
  )

  return {
    data: data?.data,
    isLoading,
    error,
  }
}
