import { contestsSolvesRetrieveRetrieve } from '@/api'
import { queryOptions } from '@tanstack/react-query'

export function getReconstructionQuery(solveId: number) {
  return queryOptions({
    queryKey: ['reconstructor', solveId],
    queryFn: () => contestsSolvesRetrieveRetrieve(solveId),
  })
}
