import { cn } from '@/utils'
import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { type Discipline } from '@/types'
import { CubeIcon } from '../icons.tsx'

type CubeButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  asButton?: boolean
  isActive?: boolean
  cube: Discipline
}

const CubeButton = forwardRef<HTMLButtonElement, CubeButtonProps>(
  ({ className, isActive, cube, asButton = true, ...props }, ref) => {
    const Comp = asButton ? 'button' : 'span'
    return (
      <Comp
        className={cn(
          'transition-base outline-ring inline-flex h-15 w-15 cursor-pointer items-center justify-center rounded-xl border border-transparent bg-grey-100 text-grey-60 hover:border-secondary-20 active:bg-secondary-20 active:text-black-100',
          { 'bg-secondary-20 text-black-100': isActive },
          className,
        )}
        ref={ref}
        {...props}
      >
        <CubeIcon cube={cube} />
      </Comp>
    )
  },
)
CubeButton.displayName = 'CubeButton'

export { CubeButton }
