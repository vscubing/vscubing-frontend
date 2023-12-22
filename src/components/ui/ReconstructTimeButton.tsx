import { cn, formatTimeResult } from '@/utils'
import { ButtonHTMLAttributes } from 'react'

type SolveTimeButtonProps = {
  timeMs: number
} & ButtonHTMLAttributes<HTMLButtonElement>
export function ReconstructTimeButton({ timeMs: timeMs, className, ...props }: SolveTimeButtonProps) {
  return (
    <button {...props} type='button' className={cn('btn-action w-[70px] text-center md:w-[80px]', className)}>
      {formatTimeResult(timeMs)}
    </button>
  )
}
