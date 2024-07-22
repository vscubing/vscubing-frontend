import { type Discipline } from '@/types'
import { usePostSolveResult, useSolveAction } from '../api'
import { type CubeSolveResult, useCube } from '@/features/cube'
import { SolveContestStateDTO } from '../types'
import { CurrentSolve } from './CurrentSolve'
import { Progress } from './Progress'
import { SolvePanel } from './SolvePanel'
import { useState } from 'react'

type SolveContestProps = { state: SolveContestStateDTO; contestSlug: string; disciplineSlug: Discipline }
export function SolveContestForm({ state: { currentSolve, submittedSolveSet }, disciplineSlug }: SolveContestProps) {
  const { mutateAsync: postSolveResult } = usePostSolveResult(disciplineSlug)
  const { mutateAsync: solveAction } = useSolveAction({
    solveId: currentSolve.solve?.id,
    disciplineSlug,
  })
  const { initSolve } = useCube()
  const [isPending, setIsPending] = useState(false)

  function handleInitSolve() {
    const onSolveFinish = async (result: CubeSolveResult) => {
      await postSolveResult({ scrambleId: currentSolve.scramble.id, result })
      setIsPending(false)
    }
    const onEarlyAbort = () => setIsPending(false)

    initSolve(currentSolve.scramble.moves, (result) => void onSolveFinish(result), onEarlyAbort)
    setIsPending(true)
  }

  async function handleSolveAction(action: 'change_to_extra' | 'submit') {
    setIsPending(true)
    await solveAction(action)
    setIsPending(false)
  }

  // TODO: remove submittedSolveSet nonnullable type assertion once backend is updated
  const currentSolveNumber = submittedSolveSet!.length + 1
  return (
    <div className='flex flex-1 justify-center pl-16 pr-12'>
      <div className='flex max-w-[64rem] flex-1 flex-col'>
        <div className='mb-1 flex gap-8 pl-[calc(0.25rem*12+3.7rem)] xl-short:pl-[calc(0.25rem*6+3.7rem)]'>
          <span className='w-16 text-center text-grey-40'>Attempt</span>
          <span className='w-24 text-center text-grey-40'>Single time</span>
          <span className='text-grey-40'>Scramble</span>
        </div>
        <div className='scrollbar flex flex-1 basis-0 items-start justify-center gap-12 overflow-y-auto pr-4 xl-short:gap-6'>
          <Progress className='gap-12 xl-short:gap-6' currentSolveNumber={currentSolveNumber} />
          <div className='flex w-full flex-1 flex-col gap-12 xl-short:gap-6'>
            {submittedSolveSet?.map(({ solve }, index) => (
              <SolvePanel
                number={index + 1}
                timeMs={solve.timeMs ?? undefined}
                scramble={solve.scramble.moves}
                id={solve.id}
                key={solve.id}
              />
            ))}

            <CurrentSolve
              areActionsDisabled={isPending}
              currentSolve={currentSolve}
              onChangeToExtra={() => handleSolveAction('change_to_extra')}
              onSolveInit={handleInitSolve}
              onSolveSubmit={() => handleSolveAction('submit')}
              number={currentSolveNumber}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
