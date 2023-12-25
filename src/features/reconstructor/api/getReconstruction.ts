import { axiosClient } from '@/lib/axios'
import { type Discipline, type Scramble } from '@/types'
import { queryOptions } from '@tanstack/react-query'

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
    queryKey: ['reconstructor', solveId],
    queryFn: () => getReconstruction(solveId!),
    enabled: typeof solveId === 'number',
  })
