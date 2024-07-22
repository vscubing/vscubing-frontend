import { contestsSolvesRetrieveRetrieve } from '@/api'
import { useQuery } from '@tanstack/react-query'

export function useReconstruction(solveId: number) {
  return useQuery({
    queryKey: ['reconstructor', solveId],
    queryFn: () => contestsSolvesRetrieveRetrieve(solveId),
  })
}
