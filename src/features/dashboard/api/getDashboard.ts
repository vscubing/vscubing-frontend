import { type Discipline } from '@/types'

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
    end: string
    ongoing: boolean
  }>
}
