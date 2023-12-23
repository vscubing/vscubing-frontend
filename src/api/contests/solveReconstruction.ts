import useSWRImmutable from 'swr/immutable'
import { axiosClient } from '../axios'
import { Discipline, Scramble } from '@/types'
import { queryOptions } from '@tanstack/react-query'

const API_ROUTE = 'contests/solve-reconstruction/'
export type SolveReconstructionResponse = {
  id: number
  reconstruction: string
  scramble: Pick<Scramble, 'position' | 'scramble'>
  contestNumber: number
  discipline: { name: Discipline }
  user: { username: string }
}

async function fetchSolveReconstruction(solveId: number) {
  const res = await axiosClient.get<SolveReconstructionResponse>(`${API_ROUTE}${solveId}/`)
  return res.data
}

export const solveReconstructionQuery = (solveId: number | null) =>
  queryOptions({
    queryKey: ['solveReconstruction', solveId],
    queryFn: () => fetchSolveReconstruction(solveId as number),
    enabled: typeof solveId === 'number',
  })
