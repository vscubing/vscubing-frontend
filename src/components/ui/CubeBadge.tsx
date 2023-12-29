import { cn } from '@/utils'
import { forwardRef, type HTMLAttributes } from 'react'
import type { Discipline } from '@/types'
import { Cube3Icon } from '..'

type CubeBadgeProps = HTMLAttributes<HTMLDivElement> & {
  cube: Discipline
}

const CubeBadge = forwardRef<HTMLDivElement, CubeBadgeProps>(({ cube, className, ...props }, ref) => {
  return (
    <span
      className={cn('h-15 w-15 flex items-center justify-center rounded-xl bg-secondary-20 text-black-100', className)}
      ref={ref}
      {...props}
    >
      {cube === '3by3' && <Cube3Icon />}
    </span>
  )
})
CubeBadge.displayName = 'CubeBadge'

export { CubeBadge }
