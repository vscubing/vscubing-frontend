import { cn, formatSolveTime } from '@/utils'
import { type VariantProps, cva } from 'class-variance-authority'
import { forwardRef, type ComponentProps } from 'react'

const solveTimeButtonVariants = cva(
  'transition-base outline-ring after-border-bottom h-8 w-24 pt-[.2em] text-center hover:after:scale-x-100',
  {
    variants: {
      variant: {
        default: 'active:text-grey-20',
        worst: 'text-red-80 active:text-red-100',
        best: 'text-primary-80 active:text-primary-100',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

type SolveTimeButtonProps = {
  timeMs: number
} & ComponentProps<'button'> &
  VariantProps<typeof solveTimeButtonVariants>

export const SolveTimeButton = forwardRef<HTMLButtonElement, SolveTimeButtonProps>(
  ({ timeMs, variant, className, ...props }, ref) => {
    return (
      <button {...props} ref={ref} className={cn(solveTimeButtonVariants({ variant, className }))}>
        {formatSolveTime(timeMs)}
      </button>
    )
  },
)
SolveTimeButton.displayName = 'SolveTimeButton'

const solveTimeLabelVariants = cva('h-8 w-24 pt-[.2em] text-center', {
  variants: {
    variant: { average: 'text-yellow-100', dnf: 'text-red-80' },
  },
})
type SolveTimeLabelProps = {
  timeMs: number | undefined
  isAverage?: boolean
} & ComponentProps<'span'>
export const SolveTimeLabel = forwardRef<HTMLSpanElement, SolveTimeLabelProps>(
  ({ timeMs, isAverage, className, ...props }, ref) => {
    let variant: 'average' | 'dnf' | undefined
    if (isAverage) {
      variant = 'average'
    }
    if (timeMs === undefined) {
      variant = 'dnf'
    }
    return (
      <span {...props} className={cn(solveTimeLabelVariants({ variant, className }))} ref={ref}>
        {timeMs ? formatSolveTime(timeMs) : 'DNF'}
      </span>
    )
  },
)
