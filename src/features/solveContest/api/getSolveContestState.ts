import { axiosClient } from '@/lib/axios'
import { type Discipline } from '@/types'
import { queryOptions } from '@tanstack/react-query'
import { type SolveContestStateDTO } from '../types'
import { API_ROUTE } from './constants'
import { USER_QUERY_KEY } from '@/features/auth'

export const solveContestStateQuery = (contestNumber: number, discipline: Discipline) =>
  queryOptions({
    queryKey: [USER_QUERY_KEY, 'solve-contest-state', { contestNumber, discipline }],
    queryFn: async () => {
      const res = await axiosClient.get<SolveContestStateDTO>(`${API_ROUTE}${contestNumber}/${discipline}/`)
      return res.data
    },
  })
