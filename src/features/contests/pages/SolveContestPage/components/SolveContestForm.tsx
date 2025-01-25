import { usePostSolveResult, useSolveAction } from '../api'
import { type CubeSolveResult, useCube } from '@/features/cube'
import { type SolveContestStateDTO } from '../types'
import { CurrentSolve } from './CurrentSolve'
import { Progress } from './Progress'
import { SolvePanel } from './SolvePanel'
import { getRouteApi } from '@tanstack/react-router'

const route = getRouteApi('/_app/contests/$contestSlug/solve')
type SolveContestProps = {
  state: SolveContestStateDTO
  isStateFetching: boolean
}
export function SolveContestForm({ state: { currentSolve, submittedSolveSet }, isStateFetching }: SolveContestProps) {
  const { discipline } = route.useSearch()

  const { mutateAsync: postSolveResult, isPending: isPostSolvePending } = usePostSolveResult(discipline)
  const { mutateAsync: solveAction, isPending: isSolveActionPending } = useSolveAction({
    solveId: currentSolve.solve?.id,
    discipline,
  })
  const isPending = isStateFetching || isPostSolvePending || isSolveActionPending

  const { initSolve } = useCube()

  function handleInitSolve() {
    const onSolveFinish = async (result: CubeSolveResult) => {
      await postSolveResult({ scrambleId: currentSolve.scramble.id, result })
    }

    initSolve({ scramble: currentSolve.scramble.moves, discipline }, (result) => void onSolveFinish(result))
  }

  async function handleSolveAction(payload: { type: 'change_to_extra'; reason: string } | { type: 'submit' }) {
    // TODO: also pass the reason for extras once backend is ready
    await solveAction(payload.type)
  }

  const currentSolveNumber = (submittedSolveSet?.length ?? 0) + 1
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
                timeMs={solve.timeMs}
                isDnf={solve.isDnf}
                scramble={solve.scramble}
                id={solve.id}
                key={solve.id}
              />
            ))}

            <CurrentSolve
              areActionsDisabled={isPending}
              currentSolve={currentSolve}
              onChangeToExtra={(reason) => handleSolveAction({ type: 'change_to_extra', reason })}
              onSolveInit={handleInitSolve}
              onSolveSubmit={() => handleSolveAction({ type: 'submit' })}
              number={currentSolveNumber}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
