import { cn } from '@/utils'
import { type ComponentProps } from 'react'
import { type VariantProps, cva } from 'class-variance-authority'

const controlButtonVariants = cva('transition-base outline-ring inline-flex items-center justify-center', {
  variants: {
    variant: {
      default: 'rounded-xl text-white hover:text-primary-60 active:text-primary-80 disabled:text-grey-60',
    },
    size: {
      default: 'h-14 w-14 [&>svg]:h-[2.25rem] [&>svg]:w-[2.25rem]',
      play: 'h-16 w-16',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

type ControlButtonProps = ComponentProps<'button'> & VariantProps<typeof controlButtonVariants>
export function ControlButton({ className, size, variant, ...props }: ControlButtonProps) {
  return <button className={cn(controlButtonVariants({ size, variant, className }))} {...props}></button>
}
