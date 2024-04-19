import { axiosClient } from '@/lib/axios'
import { queryClient } from '@/lib/reactQuery'
import { type Discipline } from '@/types'
import { useMutation } from '@tanstack/react-query'
import { type SolveContestStateDTO } from '../types'
import { solveContestStateQuery } from './getSolveContestState'
import { getApiRoute } from './apiRoute'

export const useChangeToExtra = (contestSlug: string, discipline: Discipline) =>
  useMutation({
    mutationFn: async () => {
      const { data: newSolvesState } = await axiosClient.put<SolveContestStateDTO>(
        getApiRoute(contestSlug, discipline, '?action=change_to_extra'),
      )

      const query = solveContestStateQuery(contestSlug, discipline)
      queryClient.setQueryData(query.queryKey, newSolvesState)
    },
  })
