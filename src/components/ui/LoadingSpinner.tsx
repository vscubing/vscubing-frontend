import { cn } from '@/utils'

export function LoadingSpinner({ isVisible = true }: { isVisible?: boolean }) {
  return (
    <div className={cn('relative inline-block h-16 w-16 after:border-[#FF3D00]', { hidden: !isVisible })}>
      <span className='absolute h-full w-full animate-[spinner-rotation_2s_ease-in-out_infinite] rounded-lg border-[3px] border-solid border-primary-100'></span>
      <span className='absolute h-full w-full animate-[spinner-rotation_2s_ease-in-out_infinite_1s] rounded-lg border border-solid border-secondary-20'></span>
    </div>
  )
}
