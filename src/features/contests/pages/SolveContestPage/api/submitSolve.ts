import { queryClient } from '@/lib/reactQuery'
import { type Discipline } from '@/types'
import { useMutation } from '@tanstack/react-query'
import { SolveContestStateDTO, type _SolveContestStateDTO } from '../types'
import { getSolveContestStateQuery } from './getSolveContestState'
import { getContestQueryKey } from '@/features/contests/api'
import { contestsOngoingContestSubmitCreate } from '@/api'

export function useSubmitSolve({
  solveId,
  contestSlug,
  disciplineSlug,
  onSessionFinish,
}: {
  solveId: number
  contestSlug: string
  disciplineSlug: Discipline
  onSessionFinish: () => void
}) {
  return useMutation({
    mutationFn: async () => {
      const data = (await contestsOngoingContestSubmitCreate(
        solveId,
        { idDnf: false },
        { action: 'submit', disciplineSlug },
      )) as unknown as SolveContestStateDTO // TODO: fix after backend is fixed

      const isSessionOver = 'detail' in data
      if (isSessionOver) {
        await queryClient.resetQueries({
          queryKey: getContestQueryKey({ contestSlug, disciplineSlug: disciplineSlug }),
        })
        onSessionFinish()
        return
      }

      const newSolvesState = data
      const query = getSolveContestStateQuery({ disciplineSlug })
      queryClient.setQueryData(query.queryKey, newSolvesState)
    },
  })
}
