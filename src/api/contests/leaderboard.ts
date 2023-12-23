import { queryOptions } from '@tanstack/react-query'
import { axiosClient } from '../axios'
import { Discipline, Scramble } from '@/types'

export type LeaderboardResponse = Array<{
  id: number
  timeMs: number
  created: string
  scramble: Pick<Scramble, 'id' | 'scramble'>
  discipline: { name: Discipline }
  user: { id: number; username: string }
  contest: { contestNumber: number }
}>
const API_ROUTE = 'contests/leaderboard/'

async function fetchLeaderboard(discipline: Discipline) {
  const res = await axiosClient.get<LeaderboardResponse>(`${API_ROUTE}${discipline}/`)
  return res.data
}

export const leaderboardQuery = (discipline: Discipline) =>
  queryOptions({
    queryKey: ['leaderboard', { discipline }],
    queryFn: () => fetchLeaderboard(discipline),
    retry: false,
  })
