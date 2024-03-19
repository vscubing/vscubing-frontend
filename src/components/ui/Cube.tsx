import { cn } from '@/utils'
import { type ComponentProps, forwardRef, type HTMLAttributes } from 'react'
import type { Discipline } from '@/types'
import { CubeIcon } from './icons'

type CubeBadgeProps = HTMLAttributes<HTMLDivElement> & {
  cube: Discipline
}
const CubeBadge = forwardRef<HTMLDivElement, CubeBadgeProps>(({ cube, className, ...props }, ref) => {
  return (
    <span
      className={cn(
        'inline-flex h-15 w-15 items-center justify-center rounded-xl bg-secondary-20 text-black-100 sm:h-11 sm:w-11 sm:rounded-lg',
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

type CubeButtonProps = Omit<ComponentProps<'button'>, 'children'> & {
  asButton?: boolean
  isActive?: boolean
  cube: Discipline
}
const CubeButton = forwardRef<HTMLButtonElement, CubeButtonProps>(
  ({ className, isActive, cube, asButton = true, ...props }, ref) => {
    const Comp = asButton ? 'button' : 'span'
    return (
      <Comp ref={ref} {...props}>
        <CubeBadge
          className={cn(
            'transition-base outline-ring cursor-pointer border border-transparent bg-grey-100 text-grey-60 hover:border-secondary-20 active:bg-secondary-20 active:text-black-100',
            { 'bg-secondary-20 text-black-100': isActive },
            className,
          )}
          cube={cube}
        />
      </Comp>
    )
  },
)
CubeButton.displayName = 'CubeButton'

export { CubeBadge, CubeButton }
