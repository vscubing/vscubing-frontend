import { axiosClient } from '@/lib/axios'
import { type Discipline, type ScrambleDTO } from '@/types'
import { queryOptions } from '@tanstack/react-query'

export type ReconstructionDTO = {
  id: string
  reconstruction: string
  scramble: Pick<ScrambleDTO, 'position' | 'scramble'>
  contestSlug: string
  discipline: { name: Discipline }
  user: { username: string }
}

async function getReconstruction(solveId: string) {
  const res = await axiosClient.get<ReconstructionDTO>(`contests/solve-reconstruction/${solveId}/`)
  return res.data
}

export const reconstructionQuery = (solveId: string | null) =>
  queryOptions({
    queryKey: ['reconstructor', solveId],
    queryFn: () => getReconstruction(solveId!),
    enabled: solveId !== null,
  })
