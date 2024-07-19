import { queryClient } from '@/lib/reactQuery'
import { useMutation } from '@tanstack/react-query'
import { type _SolveContestStateDTO } from '../types'
import { getSolveContestStateQuery } from './getSolveContestState'
import { contestsOngoingContestSubmitCreate } from '@/api'
import { Discipline } from '@/types'

export function useSolveAction({ solveId, disciplineSlug }: { solveId?: number; disciplineSlug: Discipline }) {
  return useMutation({
    mutationFn: async (action: 'change_to_extra' | 'submit') => {
      if (!solveId) {
        throw new Error('solveId is required')
      }

      await contestsOngoingContestSubmitCreate(solveId, { idDnf: false }, { action, disciplineSlug })
      queryClient.invalidateQueries(getSolveContestStateQuery({ disciplineSlug }))
    },
  })
}
