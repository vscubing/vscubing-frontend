import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/utils'
import { type ButtonHTMLAttributes, forwardRef } from 'react'

const buttonUnderlineVariants = cva('animate transition-base outline-ring border-b border-current py-1', {
  variants: {
    variant: {
      default:
        'border-b border-current text-primary-100 hover:text-primary-80 active:text-primary-100 disabled:text-grey-60',
    },
    size: {
      default: 'btn-lg',
      sm: 'btn-sm',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

type ButtonUnderlineProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonUnderlineVariants> & {
    asChild?: boolean
  }

const ButtonUnderline = forwardRef<HTMLButtonElement, ButtonUnderlineProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return <Comp className={cn(buttonUnderlineVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
ButtonUnderline.displayName = 'Button'

export { ButtonUnderline, buttonUnderlineVariants }
