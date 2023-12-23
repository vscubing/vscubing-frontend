import { axiosClient } from '../axios'
import { Discipline } from '@/types'
import { queryOptions } from '@tanstack/react-query'

export type DashboardResponse = {
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

const API_ROUTE = 'contests/dashboard/'

async function fetchDashboard() {
  const res = await axiosClient.get<DashboardResponse>(API_ROUTE)
  return res.data
}

export const dashboardQuery = queryOptions({ queryKey: ['dashboard'], queryFn: fetchDashboard })
