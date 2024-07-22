import { PrimaryButton, SecondaryButton } from '@/components/ui'
import { SolveContestStateDTO } from '../types'
import { SolvePanel } from './SolvePanel'

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
      scramble={currentSolve.scramble.moves}
      isInited={currentSolve.solve !== null}
      id={currentSolve.solve?.id}
      timeMs={currentSolve.solve?.timeMs ?? undefined}
      ActionComponent={
        currentSolve.solve === null ? (
          <PrimaryButton size='sm' onClick={onSolveInit} disabled={areActionsDisabled}>
            Solve
          </PrimaryButton>
        ) : (
          <div className='flex gap-1'>
            {currentSolve.canChangeToExtra && (
              <SecondaryButton
                size='sm'
                className='w-[5.25rem]'
                onClick={onChangeToExtra}
                disabled={areActionsDisabled}
              >
                Extra
              </SecondaryButton>
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
