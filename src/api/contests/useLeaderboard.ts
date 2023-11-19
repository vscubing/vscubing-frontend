import useSWRImmutable from 'swr/immutable'
import { axiosClient } from '../axios'
import { Discipline, Scramble } from '@/types'

export type LeaderboardResponse = Array<{
  id: number
  time_ms: number
  created: string
  scramble: Pick<Scramble, 'id' | 'scramble'>
  discipline: { name: Discipline }
  user: { id: number; username: string }
  contest: { contest_number: number }
}>

const API_ROUTE = 'contests/leaderboard/'
export const useLeaderboard = (discipline: Discipline) => {
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
