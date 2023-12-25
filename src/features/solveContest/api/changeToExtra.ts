import { axiosClient } from '@/lib/axios'
import { queryClient } from '@/lib/reactQuery'
import { type Discipline } from '@/types'
import { useMutation } from '@tanstack/react-query'
import { type SolveContestStateDTO } from '../types'
import { API_ROUTE } from './constants'
import { solveContestStateQuery } from './getSolveContestState'

export const useChangeToExtra = (contestNumber: number, discipline: Discipline) =>
  useMutation({
    mutationFn: async () => {
      const { data: newSolvesState } = await axiosClient.put<SolveContestStateDTO>(
        `${API_ROUTE}${contestNumber}/${discipline}/?action=change_to_extra`,
      )

      const query = solveContestStateQuery(contestNumber, discipline)
      queryClient.setQueryData(query.queryKey, newSolvesState)
    },
  })
