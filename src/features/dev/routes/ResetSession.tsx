import { contestsDevOwnRoundSessionDeleteDestroy } from '@/api'
import { USER_QUERY_KEY } from '@/features/auth'
import { useAvailableDisciplines } from '@/shared/contests'
import { DEFAULT_DISCIPLINE } from '@/types'
import { cn } from '@/utils'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { cva, type VariantProps } from 'class-variance-authority'
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef, useState } from 'react'

export function ResetSession() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { data: disciplines } = useAvailableDisciplines()
  const [discipline, setDiscipline] = useState<string>(DEFAULT_DISCIPLINE)

  const resetSession = async () => {
    try {
      await contestsDevOwnRoundSessionDeleteDestroy({ disciplineSlug: discipline })
      await queryClient.refetchQueries({ queryKey: [USER_QUERY_KEY] })
      await navigate({ to: '/contests/ongoing', search: { discipline } })
    } catch (err) {
      alert("either you don't have any results to reset or something went wrong")
    }
  }

  return (
    <>
      <button onClick={resetSession} className='mb-4 rounded-s border-2 border-white-100 p-5'>
        reset session
      </button>

      <RadioGroup value={discipline} onValueChange={setDiscipline}>
        {disciplines?.map(({ name, slug }) => (
          <div className='flex items-center space-x-2' key={slug}>
            <RadioGroupItem value={slug} id={slug} />
            <Label htmlFor={slug}>{name}</Label>
          </div>
        ))}
      </RadioGroup>
    </>
  )
}

const RadioGroup = forwardRef<
  ElementRef<typeof RadioGroupPrimitive.Root>,
  ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return <RadioGroupPrimitive.Root className={cn('grid gap-2', className)} {...props} ref={ref} />
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = forwardRef<
  ElementRef<typeof RadioGroupPrimitive.Item>,
  ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'border-primary text-primary focus-visible:ring-ring aspect-square h-4 w-4 rounded-full border shadow focus:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className='flex items-center justify-center'>
        <div className='h-3.5 w-3.5 rounded-full bg-white-100' />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

const labelVariants = cva('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70')

const Label = forwardRef<ElementRef<'label'>, ComponentPropsWithoutRef<'label'> & VariantProps<typeof labelVariants>>(
  ({ className, ...props }, ref) => <label ref={ref} className={cn(labelVariants(), className)} {...props} />,
)
