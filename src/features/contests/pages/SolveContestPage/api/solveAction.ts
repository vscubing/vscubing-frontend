import { queryClient } from '@/lib/reactQuery'
import { useMutation } from '@tanstack/react-query'
import { getSolveContestStateQuery } from './getSolveContestState'
import { contestsOngoingContestSubmitCreate } from '@/api'
import { ongoingContestQuery } from '@/shared/contests'

export function useSolveAction({ solveId, discipline }: { solveId?: number; discipline: string }) {
  return useMutation({
    mutationFn: async (payload: { type: 'change_to_extra'; reason: string } | { type: 'submit' }) => {
      if (!solveId) {
        throw new Error('solveId is required')
      }

      if (payload.type === 'submit') {
        await contestsOngoingContestSubmitCreate(solveId, {}, { action: 'submit' })
      } else if (payload.type === 'change_to_extra') {
        await contestsOngoingContestSubmitCreate(
          solveId,
          { reasonForTakingExtra: payload.reason },
          { action: 'change_to_extra' },
        )
      }
      const contest = await queryClient.fetchQuery(ongoingContestQuery)
      void queryClient.invalidateQueries(
        getSolveContestStateQuery({ disciplineSlug: discipline, contestSlug: contest.data!.slug }),
      )
    },
  })
}
