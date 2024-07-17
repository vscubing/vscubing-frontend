import { queryClient } from '@/lib/reactQuery'
import { type Discipline } from '@/types'
import { useMutation } from '@tanstack/react-query'
import { getSolveContestStateQuery } from './getSolveContestState'
import { ContestsCreateSolveInput, contestsOngoingContestSolveCreateCreate } from '@/api'

const SOLVE_REJECTED_TOAST = {
  title: 'Uh-oh! Solve rejected by the server',
  description: "Under normal circumstances this shouldn't happen.",
  autoClose: false,
}
export const usePostSolveResult = (disciplineSlug: Discipline) =>
  useMutation({
    mutationFn: async ({ scrambleId, result }: { scrambleId: number; result: ContestsCreateSolveInput }) => {
      // try {
      const res = await contestsOngoingContestSolveCreateCreate(result, { disciplineSlug, scrambleId })
      console.log(res)
      // } catch (err) {
      //   if (!(err instanceof AxiosError)) {
      //     toast(TOASTS_PRESETS.internalError)
      //     return
      //   }
      //   if ('status' in err) {
      //     toast(TOASTS_PRESETS.internalError)
      //     return
      //   }

      //   let solve: SolveContestStateDTO['currentSolve']['solve'] | null = null
      //   if (res.status === 200) {
      //     solve = { id: res.data.solveId, ...result }
      //   } else if (res.status === 400) {
      //     // TODO: make sure that this is synced with the backend
      //     solve = { id: res.data.solveId, timeMs: null, dnf: true }
      //     toast(SOLVE_REJECTED_TOAST)
      //   } else toast(TOASTS_PRESETS.internalError)
      // }

      const query = getSolveContestStateQuery({ disciplineSlug })
      const previousState = await queryClient.fetchQuery(query)
      queryClient.setQueryData(query.queryKey, {
        ...previousState,
        currentSolve: { ...previousState.currentSolve, solve },
      })
    },
  })
