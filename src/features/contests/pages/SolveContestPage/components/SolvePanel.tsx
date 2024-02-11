import { SolveTimeLinkOrDnf, CheckIcon, SolveTimeLabel, ExtraLabel } from '@/components/ui'
import type { Scramble } from '@/types'
import { getRouteApi } from '@tanstack/react-router'
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
  scramble: Scramble
  id?: number
  isInited?: boolean
  ActionComponent?: ReactNode
}) {
  return (
    <div className='flex h-11 items-center gap-8 rounded-xl bg-grey-100 pl-4'>
      <span className='relative flex h-full w-16 items-center justify-center after:absolute after:-right-4 after:h-6 after:w-px after:bg-grey-60'>
        No {number}
        <ExtraLabel scramblePosition={scramble.position} className='absolute right-0 top-0' />
      </span>
      <TimeSection timeMs={timeMs} id={id} isInited={isInited} />
      {isInited ? (
        <span>{scramble.scramble}</span>
      ) : (
        <span className='text-grey-40'>Your scramble will be displayed here after you start solving</span>
      )}
      <div className='ml-auto'>{ActionComponent ?? <CheckIcon className='mr-4 text-primary-80' />}</div>
    </div>
  )
}

const route = getRouteApi('/contests/$contestNumber/solve')
function TimeSection({ timeMs, id, isInited }: { timeMs?: number; id?: number; isInited: boolean }) {
  if (!isInited) {
    return <SolveTimeLabel isPlaceholder />
  }
  if (timeMs === undefined) {
    return <SolveTimeLabel timeMs={timeMs} />
  }
  if (id === undefined) {
    throw Error('solve id is undefined')
  }
  const { contestNumber } = route.useLoaderData()
  return <SolveTimeLinkOrDnf contestNumber={contestNumber} solveId={id} timeMs={timeMs} />
}