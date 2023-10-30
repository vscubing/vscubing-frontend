import useSWRImmutable from 'swr/immutable'
import { axiosClient } from '../axios'
import { Discipline, Scramble } from '@/types'

const API_ROUTE = 'contests/solve_reconstruction/'
export type SolveReconstructionResponse = {
  id: number
  reconstruction: string
  scramble: Pick<Scramble, 'position' | 'scramble'>
  contest_number: number
  discipline: { name: Discipline }
  user: { username: string }
}

export const useSolveReconstruction = (solveId: number | null) => {
  const { data, error, isLoading } = useSWRImmutable<{
    data: SolveReconstructionResponse
  }>(solveId === null ? null : `${API_ROUTE}${solveId}/`, axiosClient.get)

  return { data: data?.data, isLoading, isError: error }
}
