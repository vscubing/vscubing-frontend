import { axiosClient } from '@/lib/axios'
import { Discipline } from '@/types'
import { queryOptions } from '@tanstack/react-query'
import { SolveContestStateDTO } from '../types'
import { API_ROUTE } from './constants'

export const SOLVE_CONTEST_STATE_QUERY_KEY = 'solveContestState'

export const solveContestStateQuery = (contestNumber: number, discipline: Discipline) =>
  queryOptions({
    queryKey: [SOLVE_CONTEST_STATE_QUERY_KEY, { contestNumber, discipline }],
    queryFn: async () => {
      const res = await axiosClient.get<SolveContestStateDTO>(`${API_ROUTE}${contestNumber}/${discipline}/`)
      return res.data
    },
  })
