import useSWRImmutable from 'swr/immutable'
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
export function useLeaderboard(discipline: Discipline) {
  const { data, error, isLoading } = useSWRImmutable<{ data: LeaderboardResponse }>(
    `${API_ROUTE}${discipline}/`,
    axiosClient.get,
  )

  return {
    data: data?.data,
    isLoading,
    isError: error,
  }
}
