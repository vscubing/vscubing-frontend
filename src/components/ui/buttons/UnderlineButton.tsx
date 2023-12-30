import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/utils'
import { type ButtonHTMLAttributes, forwardRef } from 'react'

const underlineButtonVariants = cva('inline-flex items-center justify-center', {
  variants: {
    variant: {
      default:
        'border-b border-current py-1 text-primary-100 hover:text-primary-80 active:text-primary-100 disabled:text-grey-60',
    },
    size: {
      lg: 'btn-lg',
      sm: 'btn-sm',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'lg',
  },
})

type UnderlineButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof underlineButtonVariants> & {
    asChild?: boolean
  }

const UnderlineButton = forwardRef<HTMLButtonElement, UnderlineButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return <Comp className={cn(underlineButtonVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
UnderlineButton.displayName = 'UnderlineButton'

export { UnderlineButton, underlineButtonVariants }
