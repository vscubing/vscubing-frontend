import { SolveTimeButton, CheckIcon } from '@/components/ui'
import { useReconstructor } from '@/features/reconstructor'
import { type ReactNode } from 'react'

export function SolvePanel({
  number,
  timeMs,
  scramble,
  id,
  isInited = true,
  ActionComponent,
}: {
  number: number
  timeMs?: number
  scramble: string
  id?: number
  isInited?: boolean
  ActionComponent?: ReactNode
}) {
  return (
    <div className='flex h-11 items-center gap-8 rounded-xl bg-grey-100 pl-4'>
      <span className='relative w-16 text-center after:absolute after:-right-4 after:h-full after:w-px after:bg-grey-60'>
        No {number}
      </span>
      <TimeSection timeMs={timeMs} id={id} isInited={isInited} />
      {isInited ? (
        <span>{scramble}</span>
      ) : (
        <span className='text-grey-40'>Your scramble will be displayed here after you start solving</span>
      )}
      <div className='ml-auto'>{ActionComponent ?? <CheckIcon className='mr-4 text-primary-80' />}</div>
    </div>
  )
}

function TimeSection({ timeMs, id, isInited }: { timeMs?: number; id?: number; isInited: boolean }) {
  const { showReconstruction } = useReconstructor()

  if (!isInited) {
    return <span className='inline-block w-24 text-center'>??:??.???</span>
  }
  if (timeMs === undefined || id === undefined) {
    return <span className='inline-block w-24 text-center'>DNF</span>
  }
  return <SolveTimeButton timeMs={timeMs} onClick={() => showReconstruction(id)} />
}
