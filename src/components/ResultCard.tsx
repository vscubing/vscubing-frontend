import { cn } from '@/utils'
import { VariantProps, cva } from 'class-variance-authority'
import { HTMLAttributes, forwardRef } from 'react'

const variants = cva('rounded-md px-1 pb-2 pt-2 text-[13px] md:py-3 md:px-3 md:text-base lg:px-8', {
  variants: {
    kind: {
      default: 'bg-panels',
      highlighted: 'bg-[#233D50]',
    },
  },
  defaultVariants: {
    kind: 'default',
  },
})

type ResultCardProps = HTMLAttributes<HTMLDivElement> & VariantProps<typeof variants>
export const ResultCard = forwardRef<HTMLDivElement, ResultCardProps>(
  ({ className, kind, children, ...props }, ref) => {
    return (
      <div className={cn(variants({ kind, className }))} {...props} ref={ref}>
        {children}
      </div>
    )
  },
)
