import { cn } from '@/utils'
import { forwardRef, type HTMLAttributes } from 'react'
import { CubeIcon } from './icons'

type CubeBadgeProps = HTMLAttributes<HTMLDivElement> & {
  cube: string
}
const CubeBadge = forwardRef<HTMLDivElement, CubeBadgeProps>(({ cube, className, ...props }, ref) => {
  return (
    <span
      className={cn(
        'inline-flex h-15 w-15 items-center justify-center rounded-xl bg-secondary-20/90 backdrop-blur-sm text-black-100 shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 sm:h-11 sm:w-11 sm:rounded-lg',
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

type CubeSwitcherProps = {
  className?: string
  asButton?: boolean
  isActive?: boolean
  cube: string
}
const CubeSwitcher = forwardRef<HTMLButtonElement, CubeSwitcherProps>(
  ({ className, isActive, cube, asButton = true, ...props }, ref) => {
    const Comp = asButton ? 'button' : 'span'
    return (
      <Comp ref={ref} {...props}>
        <CubeBadge
          className={cn(
            'transition-all duration-300 outline-ring cursor-pointer border border-transparent bg-grey-100/90 backdrop-blur-sm text-grey-60 hover:border-secondary-20/50 hover:bg-secondary-20/20 active:bg-secondary-20 active:text-black-100',
            { 'bg-secondary-20 text-black-100 shadow-lg': isActive },
            className,
          )}
          cube={cube}
        />
      </Comp>
    )
  },
)
CubeSwitcher.displayName = 'CubeSwitcher'

export { CubeBadge, CubeSwitcher }
