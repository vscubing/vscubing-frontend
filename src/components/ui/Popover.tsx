import * as PopoverPrimitive from '@radix-ui/react-popover'
import { cn } from '@/utils'
import { type ReactNode } from 'react'

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

type PopoverContentProps = { className?: string; children: ReactNode }
function PopoverContent({ className, children }: PopoverContentProps) {
  return (
    <PopoverPrimitive.Content
      collisionPadding={100}
      className={cn(
        'relative z-20 flex max-w-[16rem] flex-col items-center gap-2 rounded-xl bg-black-100 p-4 text-center animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className,
      )}
    >
      {children}
      <PopoverPrimitive.Arrow width={22} fill='#1B1E25' height={18}></PopoverPrimitive.Arrow>
    </PopoverPrimitive.Content>
  )
}

export { Popover, PopoverTrigger, PopoverContent }
