import { axiosClient } from '@/lib/axios'
import { Discipline, Scramble } from '@/types'
import { queryOptions } from '@tanstack/react-query'
import { RECONSTRUTOR_SOLVE_QUERY_KEY } from '../queryKeys'

export type ReconstructionDTO = {
  id: number
  reconstruction: string
  scramble: Pick<Scramble, 'position' | 'scramble'>
  contestNumber: number
  discipline: { name: Discipline }
  user: { username: string }
}

async function getReconstruction(solveId: number) {
  const res = await axiosClient.get<ReconstructionDTO>(`contests/solve-reconstruction/${solveId}/`)
  return res.data
}

export const reconstructionQuery = (solveId: number | null) =>
  queryOptions({
    queryKey: [RECONSTRUTOR_SOLVE_QUERY_KEY, solveId],
    queryFn: () => getReconstruction(solveId as number),
    enabled: typeof solveId === 'number',
  })
