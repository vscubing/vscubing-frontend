import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/utils'
import { type ButtonHTMLAttributes, forwardRef } from 'react'

const buttonVariants = cva('animate transition-base outline-ring inline-flex items-center justify-center rounded-xl', {
  variants: {
    variant: {
      primary:
        'bg-primary-100 text-black-100 hover:bg-primary-80 active:bg-primary-100 disabled:bg-grey-40 disabled:text-grey-60',
      secondary:
        'border border-secondary-20 text-primary-100 hover:border-transparent hover:bg-secondary-40 hover:text-primary-80 active:border-transparent active:bg-secondary-60 active:text-primary-80 disabled:border-grey-40 disabled:bg-transparent disabled:text-grey-40',
    },
    size: {
      default: 'btn-lg px-[24px] py-[13px]',
      sm: 'btn-sm px-[19px] py-[10px]',
      icon: 'p-[28px]',
      iconSm: 'p-[18px]',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'default',
  },
})

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
