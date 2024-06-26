import { queryClient } from '@/lib/reactQuery'
import { axiosClient } from '@/lib/axios'
import { type Discipline } from '@/types'
import { useMutation } from '@tanstack/react-query'
import { solveContestStateQuery } from './getSolveContestState'
import { getApiRoute } from './apiRoute'
import { type FinishedSolve } from '../types'
import { TOASTS_PRESETS, toast } from '@/components/ui'

const SOLVE_REJECTED_TOAST = {
  title: 'Uh-oh! Solve rejected by the server',
  description: "Under normal circumstances this shouldn't happen.",
  autoClose: false,
}
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

      let solve: FinishedSolve | null = null
      if (res.status === 200) {
        solve = { id: res.data.solveId, ...result }
      } else if (res.status === 400) {
        // TODO: make sure that this is synched with the backend
        solve = { id: res.data.solveId, timeMs: null, dnf: true }
        toast(SOLVE_REJECTED_TOAST)
      } else if (res.status !== 500) {
        toast(TOASTS_PRESETS.internalError)
      }

      const query = solveContestStateQuery(contestNumber, discipline)
      const previousState = await queryClient.fetchQuery(query)
      queryClient.setQueryData(query.queryKey, {
        ...previousState,
        currentSolve: { ...previousState.currentSolve, solve },
      })
    },
  })
