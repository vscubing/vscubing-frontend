import { queryClient } from '@/lib/reactQuery'
import { axiosClient } from '@/lib/axios'
import { type Discipline } from '@/types'
import { useMutation } from '@tanstack/react-query'
import { solveContestStateQuery } from './getSolveContestState'
import { getApiRoute } from './apiRoute'

export const usePostSolveResult = (contestNumber: number, discipline: Discipline) =>
  useMutation({
    mutationFn: async ({
      scrambleId,
      result,
    }: {
      scrambleId: number
      result: { reconstruction: string; timeMs: number; dnf: false } | { dnf: true; timeMs: null }
    }) => {
      const res = await axiosClient.post<{ solveId: number }>(
        getApiRoute(contestNumber, discipline, `?scramble_id=${scrambleId}`),
        result,
      )

      const query = solveContestStateQuery(contestNumber, discipline)
      const previousState = await queryClient.fetchQuery(query)
      queryClient.setQueryData(query.queryKey, {
        ...previousState,
        currentSolve: { ...previousState.currentSolve, solve: { id: res.data.solveId, ...result } },
      })
    },
  })
