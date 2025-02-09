import { Header } from '@/components/layout'
import { ChevronDownIcon } from '@/components/ui'
import { NavigateBackButton } from '@/shared/NavigateBackButton'
import * as SelectPrimitive from '@radix-ui/react-select'
import { forwardRef } from 'react'
import { useMutateSettings, useSettings } from './queries'
import { HintSignInSection } from '@/shared/HintSection'
import { cn } from '@/utils'

export function SettingsPage() {
  return (
    <div className='flex flex-1 flex-col gap-3 sm:gap-2'>
      <Header title='Settings' />
      <NavigateBackButton className='self-start' />
      <PageContent />
    </div>
  )
}

function PageContent() {
  const { data: settings, error } = useSettings()
  const { mutate } = useMutateSettings()

  if (error?.response?.status === 401) {
    return <HintSignInSection />
  }

  return (
    <ul className='flex flex-1 flex-col gap-2 rounded-2xl bg-black-80 p-6 sm:p-3'>
      {settings ? (
        <li className='flex items-center justify-between rounded-xl bg-grey-100 p-4'>
          <span>VRC base speed (tps):</span>
          <CsAnimationDurationSelect
            value={settings.csAnimationDuration}
            onValueChange={(csAnimationDuration) => mutate({ csAnimationDuration })}
          />
        </li>
      ) : (
        <li className='h-20 animate-pulse rounded-xl bg-grey-100'></li>
      )}
    </ul>
  )
}

function CsAnimationDurationSelect({
  value,
  onValueChange,
}: {
  value: number
  onValueChange: (value: number) => void
}) {
  return (
    <SelectPrimitive.Root value={String(value)} onValueChange={(val) => onValueChange(Number(val))}>
      <SelectPrimitive.Trigger className='group flex h-12 w-[5.625rem] items-center justify-between rounded-lg bg-black-100 px-4'>
        <span className='text-large'>
          <SelectPrimitive.Value />
        </span>
        <SelectPrimitive.Icon>
          <ChevronDownIcon className='h-4 w-4 group-data-[state=open]:rotate-180' />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Content
        className='mt-1 rounded-lg bg-black-100 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-top-2'
        position='popper'
      >
        <SelectItem value='0'>
          <span className='font-sans'>&infin;</span>
        </SelectItem>
        <SelectItem value='50'>20</SelectItem>
        <SelectItem value='100'>10</SelectItem>
        <SelectItem value='200'>5</SelectItem>
        <SelectItem value='500'>2</SelectItem>
        <SelectItem value='1000'>1</SelectItem>
      </SelectPrimitive.Content>
    </SelectPrimitive.Root>
  )
}

const SelectItem = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    className={cn(
      'text-large flex w-[5.625rem] cursor-pointer items-center rounded-lg px-4 py-[0.625rem] outline-none hover:bg-primary-100 active:bg-primary-100 data-[state=checked]:bg-primary-100',
      className,
    )}
    {...props}
    ref={ref}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
