import { cn, formatSolveTime } from '@/utils'
import { type VariantProps, cva } from 'class-variance-authority'
import { forwardRef, type ButtonHTMLAttributes } from 'react'

const solveTimeButtonVariants = cva('after-border-bottom w-[5.9375rem] py-1 text-center hover:after:scale-x-100', {
  variants: {
    variant: {
      default: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

type SolveTimeButtonProps = (
  | {
      timeMs: number
      isDnf?: false
    }
  | { isDnf: true; timeMs?: undefined }
) &
  ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof solveTimeButtonVariants>

export const SolveTimeButton = forwardRef<HTMLButtonElement, SolveTimeButtonProps>(
  ({ timeMs, isDnf, variant, className, ...props }, ref) => {
    return (
      <button {...props} type='button' ref={ref} className={cn(solveTimeButtonVariants({ variant, className }))}>
        {isDnf ? 'DNF' : formatSolveTime(timeMs)}
      </button>
    )
  },
)
SolveTimeButton.displayName = 'SolveTimeButton'
