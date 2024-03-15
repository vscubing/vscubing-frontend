import { cn } from '@/utils'
import { forwardRef, type HTMLAttributes } from 'react'
import type { Discipline } from '@/types'
import { CubeIcon } from './icons'

type CubeBadgeProps = HTMLAttributes<HTMLDivElement> & {
  cube: Discipline
}

const CubeBadge = forwardRef<HTMLDivElement, CubeBadgeProps>(({ cube, className, ...props }, ref) => {
  return (
    <span
      className={cn(
        'inline-flex h-15 w-15 items-center justify-center rounded-xl bg-secondary-20 text-black-100 sm:h-11 sm:w-11',
        className,
      )}
      ref={ref}
      {...props}
    >
      <CubeIcon cube={cube} />
    </span>
  )
})
CubeBadge.displayName = 'CubeBadge'

export { CubeBadge }
