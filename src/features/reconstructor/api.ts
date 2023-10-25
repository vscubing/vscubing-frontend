import { axiosClient } from '@/api'
import useSWRImmutable from 'swr/immutable'

export const useSolveReconstruction = (solveId: number | null) => {
  const { data, error, isLoading } = useSWRImmutable<{
    data: { id: number; reconstruction: string; scramble: string }
  }>(solveId === null ? null : `contests/solve_reconstruction/${solveId}/`, axiosClient.get)

  return { data: data ? data.data : null, isLoading, isError: error }
}
