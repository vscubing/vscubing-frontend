import { axiosClient } from '@/lib/axios'
import { Discipline, Scramble } from '@/types'
import { queryOptions } from '@tanstack/react-query'
import { CONTEST_RESULTS_QUERY_KEY } from '../queryKeys'
import { USER_QUERY_KEY } from '@/features/auth'

export type ContestResultsDTO = Array<{
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

async function getContestResults(contestNumber: number, discipline: Discipline) {
  const res = await axiosClient.get<ContestResultsDTO>(`contests/contest/${contestNumber}/${discipline}/`)
  return res.data
}

export const contestResultsQuery = (contestNumber: number, discipline: Discipline) =>
  queryOptions({
    queryKey: [USER_QUERY_KEY, CONTEST_RESULTS_QUERY_KEY, { contestNumber, discipline }],
    queryFn: () => {
      return getContestResults(contestNumber, discipline)
    },
  })
