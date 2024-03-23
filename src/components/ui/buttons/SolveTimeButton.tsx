import { cn, formatSolveTime, matchesQuery } from '@/utils'
import { Link } from '@tanstack/react-router'
import { type VariantProps, cva } from 'class-variance-authority'
import { type ReactNode, forwardRef, type ComponentProps, type ComponentPropsWithoutRef } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { Popover, PopoverAnchor, PopoverCloseButton, PopoverContent } from '../Popover'

const solveTimeButtonVariants = cva(
  'transition-base outline-ring after-border-bottom vertical-alignment-fix inline-flex h-8 min-w-24 items-center justify-center hover:after:scale-x-100',
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
  canShowHint,
  ...props
}: VariantProps<typeof solveTimeButtonVariants> &
  ComponentPropsWithoutRef<'a'> & {
    timeMs: number | null
    contestNumber: number
    solveId: number
    canShowHint: boolean
  }) {
  if (timeMs === null) {
    return <SolveTimeLabel className={className} {...props} />
  }
  return (
    <WatchSolveHintPopover disabled={!canShowHint}>
      <Link
        {...props}
        to='/contests/$contestNumber/watch/$solveId'
        params={{ contestNumber: String(contestNumber), solveId: String(solveId) }}
        className={cn(solveTimeButtonVariants({ variant, className }))}
      >
        {formatSolveTime(timeMs)}
      </Link>
    </WatchSolveHintPopover>
  )
}

const solveTimeLabelVariants = cva('vertical-alignment-fix inline-flex h-8 min-w-24 items-center justify-center', {
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

const hintCaption = matchesQuery('sm') ? 'Tap on time to watch a solve' : 'Click on time to watch a solve'
type WatchSolveHintPopoverProps = {
  children: ReactNode
  className?: string
  disabled: boolean
}
export function WatchSolveHintPopover({ children, disabled }: WatchSolveHintPopoverProps) {
  const [seenHint, setSeenHint] = useLocalStorage('vs-seenWatchSolveHint', false)

  function handleClose() {
    setSeenHint(true)
  }

  return (
    <Popover open={!seenHint && !disabled}>
      <PopoverContent>
        <p>{hintCaption}</p>
        <PopoverCloseButton onClick={handleClose} />
      </PopoverContent>

      <PopoverAnchor asChild onClick={handleClose}>
        {children}
      </PopoverAnchor>
    </Popover>
  )
}
