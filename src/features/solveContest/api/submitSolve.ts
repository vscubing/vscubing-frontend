import { axiosClient } from '@/lib/axios'
import { queryClient } from '@/lib/reactQuery'
import { type Discipline } from '@/types'
import { useMutation } from '@tanstack/react-query'
import { type SolveContestStateDTO } from '../types'
import { API_ROUTE } from './constants'
import { solveContestStateQuery } from './getSolveContestState'
import { contestResultsQuery } from '@/features/contests/api'

export const useSubmitSolve = (contestNumber: number, discipline: Discipline) =>
  useMutation({
    mutationFn: async () => {
      const { data } = await axiosClient.put<SolveContestStateDTO | { detail: 'contest submitted' }>(
        `${API_ROUTE}${contestNumber}/${discipline}/?action=submit`,
      )

      const isSessionOver = 'detail' in data
      if (isSessionOver) {
        queryClient.invalidateQueries(contestResultsQuery(contestNumber, discipline))
        return
      }
      const newSolvesState = data

      const query = solveContestStateQuery(contestNumber, discipline)
      queryClient.setQueryData(query.queryKey, newSolvesState)
    },
  })
