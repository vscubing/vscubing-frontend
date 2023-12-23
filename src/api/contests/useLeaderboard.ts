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

export async function fetchLeaderboard(discipline: Discipline) {
  const res = await axiosClient.get<LeaderboardResponse>(`${API_ROUTE}${discipline}/`)
  return res.data
}
