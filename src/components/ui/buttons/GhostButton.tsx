import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/utils'
import { type ButtonHTMLAttributes, forwardRef } from 'react'

const ghostButtonVariants = cva('transition-base outline-ring inline-flex items-center justify-center', {
  variants: {
    variant: {
      default: 'rounded-xl text-white disabled:text-grey-60',
    },
    size: {
      lg: 'btn-lg h-12 gap-2 border border-transparent px-4 hover:border-white active:bg-white active:text-black-100 disabled:border-transparent disabled:bg-transparent',
      sm: 'btn-sm gap-3 px-2 py-1 hover:text-primary-60 active:text-primary-80',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'lg',
  },
})

type GhostButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof ghostButtonVariants> & {
    asChild?: boolean
  }

const GhostButton = forwardRef<HTMLButtonElement, GhostButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return <Comp className={cn(ghostButtonVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
GhostButton.displayName = 'GhostButton'

export { GhostButton, ghostButtonVariants }
