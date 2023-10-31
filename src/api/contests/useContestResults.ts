import { Discipline, Scramble } from '@/types'
import useSWRImmutable from 'swr/immutable'
import { axiosClient } from '../axios'

export type ContestResultsResponse = Array<{
  id: number
  avg_ms: number | null // TODO fix to camelCase
  discipline: { name: Discipline }
  user: { username: string }
  solve_set: Array<{
    id: number
    time_ms: number // TODO fix to camelCase
    scramble: Pick<Scramble, 'position'>
    state: 'submitted' | 'changed_to_extra'
  }>
}>

type ContestResultsError = {
  response: { status: number }
}

const API_ROUTE = 'contests/contest/'
export const useContestResults = (contestNumber: number, discipline: Discipline) => {
  const { data, error, isLoading } = useSWRImmutable<{ data: ContestResultsResponse }, ContestResultsError>(
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
