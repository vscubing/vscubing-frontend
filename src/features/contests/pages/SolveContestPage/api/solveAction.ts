import { queryClient } from '@/lib/reactQuery'
import { useMutation } from '@tanstack/react-query'
import { getSolveContestStateQuery } from './getSolveContestState'
import { contestsOngoingContestSubmitCreate } from '@/api'
import { Discipline } from '@/types'

export function useSolveAction({ solveId, discipline }: { solveId?: number; discipline: Discipline }) {
  return useMutation({
    mutationFn: async (action: 'change_to_extra' | 'submit') => {
      if (!solveId) {
        throw new Error('solveId is required')
      }

      await contestsOngoingContestSubmitCreate(solveId, { idDnf: false }, { action, disciplineSlug: discipline })
      queryClient.invalidateQueries(getSolveContestStateQuery({ disciplineSlug: discipline }))
    },
  })
}
