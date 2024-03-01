import { cn } from '@/utils'

export function Copyright({ className }: { className?: string }) {
  return <p className={cn('text-caption text-center text-white-100', className)}>© Virtual Speedcubing, 2023</p>
}
