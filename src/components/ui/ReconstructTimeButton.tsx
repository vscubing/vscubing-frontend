import { cn, formatTimeResult } from '@/utils'
import { ButtonHTMLAttributes } from 'react'

type SolveTimeButtonProps = {
  time_ms: number
} & ButtonHTMLAttributes<HTMLButtonElement>
export function ReconstructTimeButton({ time_ms, className, ...props }: SolveTimeButtonProps) {
  return (
    <button {...props} type='button' className={cn('btn-action w-[70px] text-center md:w-[80px]', className)}>
      {formatTimeResult(time_ms)}
    </button>
  )
}
