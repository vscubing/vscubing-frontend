import { Header } from '@/components/layout'
import { ChevronDownIcon } from '@/components/ui'
import { NavigateBackButton } from '@/shared/NavigateBackButton'
import * as SelectPrimitive from '@radix-ui/react-select'
import { type ReactNode, forwardRef } from 'react'
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
        <>
          <li className='flex items-center justify-between rounded-xl bg-grey-100 p-4'>
            <span>VRC base speed (tps):</span>
            <Select
              options={CS_ANIMATION_DURATION_OPTIONS}
              value={settings.csAnimationDuration}
              onValueChange={(csAnimationDuration) => mutate({ csAnimationDuration })}
            />
          </li>
          <li className='flex items-center justify-between gap-2 rounded-xl bg-grey-100 p-4'>
            <span>Preinspection voice alert at 8/12s:</span>
            <Select
              options={CS_INSPECTION_VOICE_ALERT_OPTIONS}
              value={settings.csInspectionVoiceAlert}
              onValueChange={(csInspectionVoiceAlert) => mutate({ csInspectionVoiceAlert })}
              className='min-w-[9rem]'
            />
          </li>
        </>
      ) : (
        <li className='h-20 animate-pulse rounded-xl bg-grey-100'></li>
      )}
    </ul>
  )
}

const CS_ANIMATION_DURATION_OPTIONS = [
  { value: 0, content: <span className='font-sans'>&infin;</span> },
  { value: 50, content: '20' },
  { value: 100, content: '10' },
  { value: 200, content: '5' },
  { value: 500, content: '2' },
  { value: 1000, content: '1' },
] as const

const CS_INSPECTION_VOICE_ALERT_OPTIONS = [
  { value: 'Male', content: 'male voice' },
  { value: 'Female', content: 'female voice' },
  { value: 'None', content: 'none' },
] as const

function Select<T>({
  options,
  value,
  onValueChange,
  className,
}: {
  options: Readonly<{ value: T; content: ReactNode }[]>
  value: T
  onValueChange: (value: T) => void
  className?: string
}) {
  return (
    <SelectPrimitive.Root value={JSON.stringify(value)} onValueChange={(val) => onValueChange(JSON.parse(val) as T)}>
      <SelectPrimitive.Trigger
        className={cn(
          'group flex h-12 min-w-[5.625rem] items-center justify-between gap-2 rounded-lg bg-black-100 px-4 text-left',
          className,
        )}
      >
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
        style={{ width: 'var(--radix-select-trigger-width)' }}
      >
        {options.map(({ value, content }) => (
          <SelectItem key={JSON.stringify(value)} value={JSON.stringify(value)}>
            {content}
          </SelectItem>
        ))}
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
      'text-large flex w-full min-w-[5.625rem] cursor-pointer items-center rounded-lg px-4 py-[0.625rem] outline-none hover:bg-primary-100 active:bg-primary-100 data-[state=checked]:bg-primary-100',
      className,
    )}
    {...props}
    ref={ref}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
