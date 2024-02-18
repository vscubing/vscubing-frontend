import { type Discipline } from '@/types'
import { usePostSolveResult, useSubmitSolve, useChangeToExtra } from '../api'
import { useCube } from '@/features/cube'
import { useNavigate } from '@tanstack/react-router'
import { type SolveContestStateDTO } from '../types'
import { CurrentSolve } from './CurrentSolve'
import { Progress } from './Progress'
import { SolvePanel } from './SolvePanel'

type SolveContestProps = { state: SolveContestStateDTO; contestNumber: number; discipline: Discipline }
export function SolveContestForm({ state, contestNumber, discipline }: SolveContestProps) {
  const { mutate: postSolveResult } = usePostSolveResult(contestNumber, discipline)
  const { mutate: handleSubmitSolve } = useSubmitSolve(contestNumber, discipline, handleSessionFinish)
  const { mutate: handleChangeToExtra } = useChangeToExtra(contestNumber, discipline)
  const { initSolve } = useCube()
  const navigate = useNavigate()

  const { currentSolve, submittedSolves } = state

  function handleInitSolve() {
    initSolve(currentSolve.scramble.scramble, (result) =>
      postSolveResult({ scrambleId: currentSolve.scramble.id, result }),
    )
  }

  function handleSessionFinish() {
    void navigate({
      to: '/contests/$contestNumber/results',
      params: { contestNumber: String(contestNumber) },
      replace: true,
    })
  }

  const currentSolveNumber = submittedSolves.length + 1
  return (
    <div className='flex flex-1 justify-center pl-16 pr-12'>
      <div className='flex max-w-[64rem] flex-1 flex-col'>
        <div className='mb-1 flex gap-8 pl-[calc(0.25rem*12+3.7rem)] lg-short:pl-[calc(0.25rem*6+3.7rem)]'>
          <span className='w-16 text-center text-grey-40'>Attempt</span>
          <span className='w-24 text-center text-grey-40'>Single time</span>
          <span className='text-grey-40'>Scramble</span>
        </div>
        <div className='scrollbar flex flex-1 basis-0 items-start justify-center gap-12 overflow-y-auto pr-4 lg-short:gap-6'>
          <Progress className='gap-12 lg-short:gap-6' currentSolveNumber={currentSolveNumber} />
          <div className='flex w-full flex-1 flex-col gap-12 lg-short:gap-6'>
            {submittedSolves.map((solve, index) => (
              <SolvePanel
                number={index + 1}
                timeMs={solve.timeMs ?? undefined}
                scramble={solve.scramble}
                id={solve.id}
                key={solve.id}
              />
            ))}

            <CurrentSolve
              currentSolve={currentSolve}
              onChangeToExtra={handleChangeToExtra}
              onSolveInit={handleInitSolve}
              onSolveSubmit={handleSubmitSolve}
              number={currentSolveNumber}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
