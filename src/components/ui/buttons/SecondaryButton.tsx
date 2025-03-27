import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/utils'
import { forwardRef, type ButtonHTMLAttributes } from 'react'

const secondaryButtonVariants = cva(
  'transition-all duration-300 outline-ring inline-flex items-center justify-center hover:scale-105 active:scale-95',
  {
    variants: {
      variant: {
        default:
          'rounded-xl border border-secondary-20/50 bg-secondary-20/10 backdrop-blur-sm text-primary-80 shadow-lg hover:border-transparent hover:bg-secondary-40/90 active:border-transparent active:bg-secondary-60/90 disabled:border-grey-40/50 disabled:bg-transparent disabled:text-grey-40 [&>svg]:h-6 [&>svg]:w-6',
      },
      size: {
        lg: 'btn-sm h-15 px-4 sm:h-14',
        sm: 'btn-sm h-11 px-4',
        iconLg: 'h-16 w-16',
        iconSm: 'h-15 w-15 sm:h-11 sm:w-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'lg',
    },
  },
)

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

export { SecondaryButton }
