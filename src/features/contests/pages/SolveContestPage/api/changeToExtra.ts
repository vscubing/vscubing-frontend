import { queryClient } from '@/lib/reactQuery'
import { type Discipline } from '@/types'
import { useMutation } from '@tanstack/react-query'
import { SolveContestStateDTO, type _SolveContestStateDTO } from '../types'
import { getSolveContestStateQuery } from './getSolveContestState'
import { contestsOngoingContestSubmitCreate } from '@/api'

export const useChangeToExtra = ({ solveId, disciplineSlug }: { solveId: number; disciplineSlug: Discipline }) =>
  useMutation({
    mutationFn: async () => {
      const newSolvesState = (await contestsOngoingContestSubmitCreate(
        solveId,
        { idDnf: false },
        { action: 'change_to_extra', disciplineSlug },
      )) as unknown as SolveContestStateDTO // TODO: fix after backend is fixed

      const query = getSolveContestStateQuery({ disciplineSlug })
      queryClient.setQueryData(query.queryKey, newSolvesState)
    },
  })
