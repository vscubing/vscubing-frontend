import { Discipline, Scramble } from '@/types'
import useSWRImmutable from 'swr/immutable'
import { axiosClient } from '../axios'

export type ContestResultsResponse = Array<{
  id: number
  avgMs: number | null
  discipline: { name: Discipline }
  user: { username: string }
  solveSet: Array<{
    id: number
    timeMs: number | null
    dnf: boolean
    scramble: Pick<Scramble, 'position'>
    state: 'submitted' | 'changed_to_extra'
  }>
}>

type ContestResultsError = {
  response: { status: number }
}

const API_ROUTE = 'contests/contest/'
export function useContestResults(contestNumber: number, discipline: Discipline) {
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
