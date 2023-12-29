import { Slot } from '@radix-ui/react-slot'

import { cn } from '@/utils'
import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { Cube3Icon } from '@/components'
import { type Discipline } from '@/types'

type CubeButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  asButton?: boolean
  cube: Discipline
}

const CubeButton = forwardRef<HTMLButtonElement, CubeButtonProps>(
  ({ className, cube, asButton = true, ...props }, ref) => {
    const Comp = asButton ? 'button' : Slot
    return (
      <Comp
        className={cn(
          'outline-ring transition-base h-15 w-15 inline-flex cursor-pointer items-center justify-center rounded-xl border border-transparent bg-grey-100 text-grey-60 hover:border-secondary-20 active:bg-secondary-20 active:text-black-100',
          className,
        )}
        ref={ref}
        {...props}
      >
        {cube === '3by3' && <Cube3Icon />}
      </Comp>
    )
  },
)
CubeButton.displayName = 'CubeButton'

export { CubeButton }
