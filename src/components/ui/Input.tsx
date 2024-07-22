import { cn } from '@/utils'
import { forwardRef, type ComponentProps } from 'react'

export type InputProps = ComponentProps<'input'> & {
  error?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, type = 'text', error = false, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'text-large h-11 rounded-lg bg-black-100 px-4 placeholder-grey-40 ring-grey-40 transition-shadow duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-1',
        { 'ring-1 ring-red-80': error },
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = 'Input'

export { Input }
