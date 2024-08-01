import { cn } from '@/utils'
import { type VariantProps, cva } from 'class-variance-authority'

const spinnerVariants = cva('relative inline-block h-16 w-16 after:border-[#FF3D00]', {
  variants: { size: { sm: 'h-8 w-8', lg: 'h-16 w-16' } },
  defaultVariants: { size: 'lg' },
})

type LoadingSpinnerProps = { isVisible?: boolean } & VariantProps<typeof spinnerVariants>
export function LoadingSpinner({ isVisible = true, size }: LoadingSpinnerProps) {
  return (
    <div className={cn(spinnerVariants({ size }), { hidden: !isVisible })}>
      <span className='absolute h-full w-full animate-[spinner-rotation_2s_ease-in-out_infinite] rounded-lg border-[3px] border-solid border-primary-100'></span>
      <span className='absolute h-full w-full animate-[spinner-rotation_2s_ease-in-out_infinite_1s] rounded-lg border border-solid border-secondary-20'></span>
    </div>
  )
}

export function OverlaySpinner({ isVisible = true }: { isVisible?: boolean }) {
  return (
    <div
      className={cn(
        'transition-base pointer-events-none fixed bottom-[var(--mobile-bottom-nav-height)] z-50 flex w-full items-center justify-center bg-black-100/75 p-4 transition-opacity',
        { 'opacity-0': !isVisible },
      )}
    >
      <LoadingSpinner size='sm' />
    </div>
  )
}
