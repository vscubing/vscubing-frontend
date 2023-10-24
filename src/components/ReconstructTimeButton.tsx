import { useReconstructor } from '@/providers'
import { formatSolveTime } from '@/utils'
import classNames from 'classnames'

type SolveTimeButtonProps = { solveId: number; time_ms: number; className?: string }
export const ReconstructTimeButton = ({ solveId, time_ms, className }: SolveTimeButtonProps) => {
  const { showReconstruction } = useReconstructor()

  return (
    <button
      type='button'
      className={classNames(className, 'btn-action w-[80px] text-center')}
      onClick={() => showReconstruction(solveId)}
    >
      {formatSolveTime(time_ms)}
    </button>
  )
}
