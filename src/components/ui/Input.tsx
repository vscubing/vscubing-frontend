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
        'rounded-lg bg-black-100 px-4 py-2 text-lg text-white-100 placeholder-grey-40 ring-grey-40 transition-shadow duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2',
        { 'ring-2 ring-red-80': error },
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = 'Input'

export { Input }
