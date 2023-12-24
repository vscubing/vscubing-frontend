import { axiosClient } from '@/lib/axios'
import { Discipline } from '@/types'
import { queryOptions } from '@tanstack/react-query'
import { DASHBOARD_QUERY_KEY } from '../queryKeys'

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
  return res.data
}

export const dashboardQuery = queryOptions({ queryKey: [DASHBOARD_QUERY_KEY], queryFn: getDashboard })
