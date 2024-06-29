import { axiosClient } from '@/lib/axios'
import { queryClient } from '@/lib/reactQuery'
import { type Discipline } from '@/types'
import { useMutation } from '@tanstack/react-query'
import { type _SolveContestStateDTO } from '../types'
import { getSolveContestStateQuery } from './getSolveContestState'
import { getContestQueryKey } from '@/features/contests/api'
import { getApiRoute } from './apiRoute'

export const useSubmitSolve = (contestSlug: string, discipline: Discipline, onSessionFinish: () => void) =>
  useMutation({
    mutationFn: async () => {
      const { data } = await axiosClient.put<_SolveContestStateDTO | { detail: 'contest submitted' }>(
        getApiRoute(contestSlug, discipline) + '?action=submit',
      )

      const isSessionOver = 'detail' in data
      if (isSessionOver) {
        await queryClient.resetQueries({ queryKey: getContestQueryKey({ contestSlug, disciplineSlug: discipline }) })
        onSessionFinish()
        return
      }
      const newSolvesState = data

      const query = getSolveContestStateQuery(contestSlug, discipline)
      queryClient.setQueryData(query.queryKey, newSolvesState)
    },
  })
