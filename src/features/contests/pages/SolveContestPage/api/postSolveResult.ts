import { queryClient } from '@/lib/reactQuery'
import { useMutation } from '@tanstack/react-query'
import { getSolveContestStateQuery } from './getSolveContestState'
import { ContestsCreateSolveInput, contestsOngoingContestSolveCreateCreate } from '@/api'
import { TOASTS_PRESETS, Toast, toast } from '@/components/ui'
import { AxiosError } from 'axios'
import { ongoingContestQuery } from '@/shared/contests'

const SOLVE_REJECTED_TOAST = {
  title: 'Uh-oh! Solve rejected by the server',
  // description: "Under normal circumstances this shouldn't happen.", // uncomment once the bug is fixed
  description: 'We are working on fixing this bug, for now please take an extra.',
  duration: 'infinite',
} satisfies Toast

export const usePostSolveResult = (discipline: string) =>
  useMutation({
    mutationFn: async ({ scrambleId, result }: { scrambleId: number; result: ContestsCreateSolveInput }) => {
      try {
        await contestsOngoingContestSolveCreateCreate(result, { disciplineSlug: discipline, scrambleId })
      } catch (err) {
        if (err instanceof AxiosError && err.response?.status === 400) {
          toast(SOLVE_REJECTED_TOAST)
        } else {
          toast(TOASTS_PRESETS.internalError)
        }
      }

      const contest = await queryClient.fetchQuery(ongoingContestQuery)
      queryClient.invalidateQueries(
        getSolveContestStateQuery({ disciplineSlug: discipline, contestSlug: contest.data!.slug }),
      )
    },
  })
