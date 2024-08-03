import { queryClient } from '@/lib/reactQuery'
import { useMutation } from '@tanstack/react-query'
import { getSolveContestStateQuery } from './getSolveContestState'
import { ContestsCreateSolveInput, contestsOngoingContestSolveCreateCreate } from '@/api'
import { TOASTS_PRESETS, Toast, toast } from '@/components/ui'
import { AxiosError } from 'axios'

const SOLVE_REJECTED_TOAST = {
  title: 'Uh-oh! Solve rejected by the server',
  description: "Under normal circumstances this shouldn't happen.",
  duration: 'infinite',
} satisfies Toast

export const usePostSolveResult = (discipline: string) =>
  useMutation({
    mutationFn: async ({ scrambleId, result }: { scrambleId: number; result: ContestsCreateSolveInput }) => {
      try {
        await contestsOngoingContestSolveCreateCreate(result, { disciplineSlug: discipline, scrambleId })
      } catch (err) {
        if (err instanceof AxiosError && err.status === 400) {
          toast(SOLVE_REJECTED_TOAST)
        } else {
          toast(TOASTS_PRESETS.internalError)
        }
      }

      queryClient.invalidateQueries(getSolveContestStateQuery({ disciplineSlug: discipline }))
    },
  })
