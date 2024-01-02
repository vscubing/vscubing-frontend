import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/utils'
import { type ButtonHTMLAttributes, forwardRef } from 'react'

const secondaryButtonVariants = cva('transition-base outline-ring inline-flex items-center justify-center', {
  variants: {
    variant: {
      default:
        'rounded-xl border border-secondary-20 text-primary-100 hover:border-transparent hover:bg-secondary-40 hover:text-primary-80 active:border-transparent active:bg-secondary-60 active:text-primary-80 disabled:border-grey-40 disabled:bg-transparent disabled:text-grey-40 [&>svg]:h-6 [&>svg]:w-6',
    },
    size: {
      lg: 'btn-sm h-15 px-4',
      sm: 'btn-sm h-11 px-4',
      iconLg: 'h-20 w-20',
      iconSm: 'h-15 w-15',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'lg',
  },
})

type SecondaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof secondaryButtonVariants> & {
    asChild?: boolean
  }

const SecondaryButton = forwardRef<HTMLButtonElement, SecondaryButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return <Comp className={cn(secondaryButtonVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
SecondaryButton.displayName = 'SecondaryButton'

export { SecondaryButton, secondaryButtonVariants }
