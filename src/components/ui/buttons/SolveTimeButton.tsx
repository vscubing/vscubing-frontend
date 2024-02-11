import { cn, formatSolveTime } from '@/utils'
import { Link } from '@tanstack/react-router'
import { type VariantProps, cva } from 'class-variance-authority'
import { forwardRef, type ComponentProps, type ComponentPropsWithoutRef } from 'react'

const solveTimeButtonVariants = cva(
  'transition-base outline-ring after-border-bottom vertical-alignment-fix inline-flex h-8 w-24 items-center justify-center hover:after:scale-x-100',
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

export function SolveTimeLinkOrDnf({
  timeMs,
  variant,
  className,
  contestNumber,
  solveId,
  ...props
}: VariantProps<typeof solveTimeButtonVariants> &
  ComponentPropsWithoutRef<'a'> & {
    timeMs: number | null
    contestNumber: number
    solveId: number
  }) {
  if (timeMs === null) {
    return <SolveTimeLabel className={className} {...props} />
  }
  return (
    <Link
      {...props}
      to='/contests/$contestNumber/watch/$solveId'
      params={{ contestNumber: String(contestNumber), solveId: String(solveId) }}
      className={cn(solveTimeButtonVariants({ variant, className }))}
    >
      {formatSolveTime(timeMs)}
    </Link>
  )
}

const solveTimeLabelVariants = cva('vertical-alignment-fix inline-flex h-8 w-24 items-center justify-center', {
  variants: {
    variant: { average: 'text-yellow-100', dnf: 'text-red-80' },
  },
})
type SolveTimeLabelProps = {
  timeMs?: number
  isPlaceholder?: boolean
  isAverage?: boolean
} & Omit<ComponentProps<'span'>, 'children'>
export const SolveTimeLabel = forwardRef<HTMLSpanElement, SolveTimeLabelProps>(
  ({ timeMs, isPlaceholder, isAverage, className, ...props }, ref) => {
    let variant: 'average' | 'dnf' | undefined
    if (isAverage) {
      variant = 'average'
    }
    if (timeMs === undefined && !isPlaceholder) {
      variant = 'dnf'
    }

    let content = ''
    if (isPlaceholder) {
      content = '00:00.000'
    } else if (timeMs !== undefined) {
      content = formatSolveTime(timeMs)
    } else {
      content = 'DNF'
    }

    return (
      <span {...props} className={cn(solveTimeLabelVariants({ variant, className }))} ref={ref}>
        {content}
      </span>
    )
  },
)
