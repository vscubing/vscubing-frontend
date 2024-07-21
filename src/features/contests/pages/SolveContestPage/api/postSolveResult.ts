import { queryClient } from '@/lib/reactQuery'
import { type Discipline } from '@/types'
import { useMutation } from '@tanstack/react-query'
import { getSolveContestStateQuery } from './getSolveContestState'
import { ContestsCreateSolveInput, contestsOngoingContestSolveCreateCreate } from '@/api'
import { TOASTS_PRESETS, toast } from '@/components/ui'
import { AxiosError } from 'axios'

const SOLVE_REJECTED_TOAST = {
  title: 'Uh-oh! Solve rejected by the server',
  description: "Under normal circumstances this shouldn't happen.",
  autoClose: false,
}
export const usePostSolveResult = (disciplineSlug: Discipline) =>
  useMutation({
    mutationFn: async ({ scrambleId, result }: { scrambleId: number; result: ContestsCreateSolveInput }) => {
      try {
        await contestsOngoingContestSolveCreateCreate(result, { disciplineSlug, scrambleId })
      } catch (err) {
        if (err instanceof AxiosError && err.status === 400) {
          toast(SOLVE_REJECTED_TOAST)
        } else {
          toast(TOASTS_PRESETS.internalError)
        }
      }

      queryClient.invalidateQueries(getSolveContestStateQuery({ disciplineSlug }))
    },
  })
