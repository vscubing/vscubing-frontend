import { PrimaryButton, SecondaryButton } from '@/components/ui'
import { type SolveContestStateDTO } from '../types'
import { SolvePanel } from './SolvePanel'

export function CurrentSolve({
  number,
  currentSolve,
  onChangeToExtra,
  onSolveInit,
  onSolveSubmit,
}: {
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
      timeMs={currentSolve.solve?.timeMs ?? undefined}
      ActionComponent={
        currentSolve.solve === null ? (
          <PrimaryButton size='sm' onClick={onSolveInit}>
            Solve
          </PrimaryButton>
        ) : (
          <div className='flex'>
            {currentSolve.canChangeToExtra && (
              <SecondaryButton size='sm' className='w-[5.25rem]' onClick={() => onChangeToExtra()}>
                Extra
              </SecondaryButton>
            )}
            <PrimaryButton size='sm' className='w-[5.25rem]' onClick={() => onSolveSubmit()}>
              Submit
            </PrimaryButton>
          </div>
        )
      }
    />
  )
}
