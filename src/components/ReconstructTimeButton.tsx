import { cn, formatTimeResult } from '@/utils'
import { ButtonHTMLAttributes } from 'react'

type SolveTimeButtonProps = {
  time_ms: number
} & ButtonHTMLAttributes<HTMLButtonElement>
export const ReconstructTimeButton = ({ time_ms, className, ...props }: SolveTimeButtonProps) => {
  return (
    <button {...props} type='button' className={cn('btn-action w-[80px] text-center', className)}>
      {formatTimeResult(time_ms)}
    </button>
  )
}
