import { cn } from '@/utils'
import { ReactNode } from '@tanstack/react-router'

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className='px-[1.625rem]'>
      <div className={cn('mx-auto max-w-[86rem]', className)}>{children}</div>
    </div>
  )
}
