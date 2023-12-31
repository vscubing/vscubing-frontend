import { axiosClient } from '@/lib/axios'
import { type Discipline } from '@/types'
import { queryOptions } from '@tanstack/react-query'

export type DashboardDTO = {
  bestSolves: Array<{
    id: number
    contestNumber: number
    timeMs: number
    user: { username: string }
    discipline: { name: Discipline }
  }>
  contests: Array<{
    id: number
    contestNumber: number
    start: string
    end: string | null
    ongoing: boolean
  }>
}

async function getDashboard() {
  const res = await axiosClient.get<DashboardDTO>('contests/dashboard/')
  if (res.data && !res.data.bestSolves.length)
    res.data.bestSolves.push({
      id: 1,
      contestNumber: 1,
      timeMs: 12134,
      user: { username: 'test-user' },
      discipline: { name: '3by3' },
    }) // TODO: replace with proper mock data
  return res.data
}

export const dashboardQuery = queryOptions({ queryKey: ['dashboard'], queryFn: getDashboard })
