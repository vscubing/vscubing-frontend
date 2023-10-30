import { formatTimeResult } from '@/utils'
import classNames from 'classnames'
import { ButtonHTMLAttributes } from 'react'

type SolveTimeButtonProps = {
  time_ms: number
} & ButtonHTMLAttributes<HTMLButtonElement>
export const ReconstructTimeButton = ({ time_ms, className, ...props }: SolveTimeButtonProps) => {
  return (
    <button {...props} type='button' className={classNames(className, 'btn-action w-[80px] text-center')}>
      {formatTimeResult(time_ms)}
    </button>
  )
}
