import { cn } from '@/utils'
import { type InputHTMLAttributes, forwardRef } from 'react'

export type InputProps = InputHTMLAttributes<HTMLInputElement>

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, type = 'text', ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'rounded-lg bg-black-100 px-4 py-2 text-lg text-white-100 placeholder-grey-40 ring-grey-40 focus-visible:outline-none focus-visible:ring-2',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = 'Input'

export { Input }
