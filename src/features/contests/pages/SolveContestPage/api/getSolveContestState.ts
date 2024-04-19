import { axiosClient } from '@/lib/axios'
import { type Discipline } from '@/types'
import { queryOptions } from '@tanstack/react-query'
import { type SolveContestStateDTO } from '../types'
import { USER_QUERY_KEY } from '@/features/auth'
import { getApiRoute } from './apiRoute'

export const solveContestStateQuery = (contestSlug: string, discipline: Discipline) =>
  queryOptions({
    queryKey: [USER_QUERY_KEY, 'solve-contest-state', { contestSlug, discipline }],
    queryFn: async () => {
      const res = await axiosClient.get<SolveContestStateDTO>(getApiRoute(contestSlug, discipline))
      return res.data
    },
  })
