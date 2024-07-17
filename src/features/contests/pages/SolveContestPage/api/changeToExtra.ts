import { axiosClient } from '@/lib/axios'
import { queryClient } from '@/lib/reactQuery'
import { type Discipline } from '@/types'
import { useMutation } from '@tanstack/react-query'
import { type _SolveContestStateDTO } from '../types'
import { getSolveContestStateQuery } from './getSolveContestState'
import { getApiRoute } from './apiRoute'

export const useChangeToExtra = (contestSlug: string, disciplineSlug: Discipline) =>
  useMutation({
    mutationFn: async () => {
      const { data: newSolvesState } = await axiosClient.put<_SolveContestStateDTO>(
        getApiRoute(contestSlug, disciplineSlug, '?action=change_to_extra'),
      )

      const query = getSolveContestStateQuery({ disciplineSlug })
      queryClient.setQueryData(query.queryKey, newSolvesState)
    },
  })
