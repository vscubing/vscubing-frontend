import useSWRImmutable from 'swr/immutable'
import { axiosClient } from '..'

const API_ROUTE = 'contests/solve_reconstruction/'
export const useSolveReconstruction = (solveId: number | null) => {
  const { data, error, isLoading } = useSWRImmutable<{
    data: { id: number; reconstruction: string; scramble: string }
  }>(solveId === null ? null : `${API_ROUTE}${solveId}/`, axiosClient.get)

  return { data: data ? data.data : null, isLoading, isError: error }
}
