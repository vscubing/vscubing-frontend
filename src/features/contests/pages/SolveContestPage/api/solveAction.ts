import { queryClient } from '@/lib/reactQuery'
import { useMutation } from '@tanstack/react-query'
import { getSolveContestStateQuery } from './getSolveContestState'
import { contestsOngoingContestSubmitCreate } from '@/api'
import { ongoingContestQuery } from '@/shared/contests'

export function useSolveAction({ solveId, discipline }: { solveId?: number; discipline: string }) {
  return useMutation({
    mutationFn: async (action: 'change_to_extra' | 'submit') => {
      if (!solveId) {
        throw new Error('solveId is required')
      }

      await contestsOngoingContestSubmitCreate(solveId, { idDnf: false }, { action })
      const contest = await queryClient.fetchQuery(ongoingContestQuery)
      void queryClient.invalidateQueries(
        getSolveContestStateQuery({ disciplineSlug: discipline, contestSlug: contest.data!.slug }),
      )
    },
  })
}
