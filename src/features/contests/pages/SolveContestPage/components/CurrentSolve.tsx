import {
  PrimaryButton,
  SecondaryButton,
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogCloseCross,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogFooter,
  DialogTitle,
  TextArea,
  DialogDescription,
} from '@/components/ui'
import { SolveContestStateDTO } from '../types'
import { SolvePanel } from './SolvePanel'
import { ReactNode, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { BaseDialogButton } from '@/components/ui/popovers/BaseDialog'

export function CurrentSolve({
  areActionsDisabled,
  number,
  currentSolve,
  onChangeToExtra,
  onSolveInit,
  onSolveSubmit,
}: {
  areActionsDisabled: boolean
  number: number
  currentSolve: SolveContestStateDTO['currentSolve']
  onChangeToExtra: () => void
  onSolveInit: () => void
  onSolveSubmit: () => void
}) {
  return (
    <SolvePanel
      number={number}
      scramble={currentSolve.scramble}
      isInited={currentSolve.solve !== null}
      id={currentSolve.solve?.id}
      timeMs={currentSolve.solve?.timeMs}
      isDnf={currentSolve.solve?.isDnf}
      ActionComponent={
        currentSolve.solve === null ? (
          <PrimaryButton size='sm' onClick={onSolveInit} disabled={areActionsDisabled}>
            Solve
          </PrimaryButton>
        ) : (
          <div className='flex gap-1'>
            {currentSolve.canChangeToExtra && (
              <ExtraReasonPrompt
                onChangeToExtra={onChangeToExtra}
                trigger={
                  <SecondaryButton size='sm' className='w-[5.25rem]' disabled={areActionsDisabled}>
                    Extra
                  </SecondaryButton>
                }
              />
            )}
            <PrimaryButton size='sm' className='w-[5.25rem]' onClick={onSolveSubmit} disabled={areActionsDisabled}>
              Submit
            </PrimaryButton>
          </div>
        )
      }
    />
  )
}

const REASON_MIN_LENGTH = 3
const reasonFormSchema = z.object({
  reason: z.string().trim().min(REASON_MIN_LENGTH, 'The reason should be at least 3 characters long'),
})
type ReasonForm = z.infer<typeof reasonFormSchema>

function ExtraReasonPrompt({
  trigger,
  onChangeToExtra,
}: {
  trigger: ReactNode
  onChangeToExtra: (reason: string) => void
}) {
  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm<ReasonForm>({ resolver: zodResolver(reasonFormSchema) })

  const [open, setOpen] = useState(false)

  function onSubmit({ reason }: ReasonForm) {
    onChangeToExtra(reason)
    setOpen(false)
  }

  return (
    <Dialog
      onOpenChange={(newOpen) => {
        resetForm()
        setOpen(newOpen)
      }}
      open={open}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogPortal>
        <DialogOverlay withCubes={false} className='bg-black-1000/25' />
        <DialogContent className='max-w-[35rem] p-0'>
          <form className='relative h-full w-full px-24 py-16' onSubmit={handleSubmit(onSubmit)}>
            <DialogCloseCross className='absolute right-4 top-4' />
            <DialogTitle className='mb-4'>Need an Extra attempt?</DialogTitle>
            <DialogDescription className='mb-8 text-center text-[0.875rem] leading-[1.5] text-grey-20'>
              To request an extra attempt, please tell us what went wrong. This helps ensure extras are used
              thoughtfully
            </DialogDescription>
            <label className='mb-8 block'>
              <TextArea
                error={!!errors.reason}
                {...register('reason')}
                className='mb-1 h-24 w-full'
                placeholder='Type your reason here'
              />
              <span className='caption'>{errors.reason?.message}</span>
            </label>
            <DialogFooter>
              <DialogClose version='secondary'>Cancel</DialogClose>
              <BaseDialogButton type='submit' version='primary' disabled={!!errors.reason}>
                Submit
              </BaseDialogButton>
            </DialogFooter>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
