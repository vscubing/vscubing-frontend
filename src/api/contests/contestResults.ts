import { Discipline, Scramble } from '@/types'
import { axiosClient } from '../axios'
import { queryOptions } from '@tanstack/react-query'
import { USER_QUERY_KEY } from '../accounts'
import { AxiosError } from 'axios'

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
const API_ROUTE = 'contests/contest/'

async function fetchContestResults(contestNumber: number, discipline: Discipline) {
  const res = await axiosClient.get<ContestResultsResponse>(`${API_ROUTE}${contestNumber}/${discipline}/`)
  return res.data
}

export const contestResultsQuery = (contestNumber: number, discipline: Discipline) =>
  queryOptions({
    queryKey: [USER_QUERY_KEY, 'contestResults', { contestNumber, discipline }],
    queryFn: () => {
      return fetchContestResults(contestNumber, discipline)
    },
  })
