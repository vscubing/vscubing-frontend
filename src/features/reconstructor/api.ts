import { axiosClient } from '@/api'
import useSWRImmutable from 'swr/immutable'

export type Reconstruction = { scramble: string; reconstruction: string }
export const useSolveReconstruction = (solveId: number | null) => {
  const { data, error, isLoading } = useSWRImmutable<{
    data: Reconstruction
  }>(solveId === null ? null : `contests/solve_reconstruction/${solveId}/`, axiosClient.get)

  return { data: data ? data.data : null, isLoading, isError: error }
}
