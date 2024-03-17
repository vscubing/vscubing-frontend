import { SecondaryButton } from '@/components/ui'
import { cn } from '@/utils'

export function ContestsListHeader({ className }: { className: string }) {
  return (
    <div className={cn('flex justify-between bg-black-80 pl-3 text-grey-40', className)}>
      <span className='mr-3'>Type</span>
      <span className='mr-8 flex-1'>Contest name</span>
      <span className='mr-10 w-44'>Duration</span>
      <SecondaryButton aria-hidden className='invisible h-px'>
        view contest
      </SecondaryButton>
    </div>
  )
}
