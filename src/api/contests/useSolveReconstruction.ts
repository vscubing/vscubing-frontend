import useSWRImmutable from 'swr/immutable'
import { axiosClient } from '../axios'
import { Discipline } from '@/types'

const API_ROUTE = 'contests/solve_reconstruction/'
export const useSolveReconstruction = (solveId: number | null) => {
  const { data, error, isLoading } = useSWRImmutable<{
    data: {
      id: number
      reconstruction: string
      scramble: string
      contest_number: number
      discipline: Discipline
      username: string
      scramble_position: number
    }
  }>(solveId === null ? null : `${API_ROUTE}${solveId}/`, axiosClient.get)

  return { data: data?.data, isLoading, isError: error }
}
