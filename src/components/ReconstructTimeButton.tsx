import { useReconstructor } from '@/providers'
import { formatSolveTime } from '@/utils'

type SolveTimeButtonProps = { solveId: number; time_ms: number }
export const ReconstructTimeButton = ({ solveId, time_ms }: SolveTimeButtonProps) => {
  const { showReconstruction } = useReconstructor()

  return (
    <button type='button' className='btn-action' onClick={() => showReconstruction(solveId)}>
      {formatSolveTime(time_ms)}
    </button>
  )
}
