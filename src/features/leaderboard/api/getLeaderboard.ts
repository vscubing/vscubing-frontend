import { axiosClient } from '@/lib/axios'
import { type Discipline, type Scramble } from '@/types'
import { queryOptions } from '@tanstack/react-query'

export type LeaderboardDTO = Array<{
  id: number
  timeMs: number
  created: string
  scramble: Pick<Scramble, 'id' | 'scramble'>
  discipline: { name: Discipline }
  user: { id: number; username: string }
  contest: { contestNumber: number }
}>

async function getLeaderboard(discipline: Discipline) {
  const res = await axiosClient.get<LeaderboardDTO>(`contests/leaderboard/${discipline}/`)
  return res.data
}

export const leaderboardQuery = (discipline: Discipline) =>
  queryOptions({
    queryKey: ['leaderboard', { discipline }],
    queryFn: () => getLeaderboard(discipline),
    retry: false,
  })
