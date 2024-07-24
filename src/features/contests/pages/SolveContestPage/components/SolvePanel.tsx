import { ExtraLabel } from '@/components/shared'
import { CheckIcon, Ellipsis } from '@/components/ui'
import { SolveTimeLinkOrDnf, SolveTimeLabel } from '@/components/shared'
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
  scramble: string
  id?: number
  isInited?: boolean
  ActionComponent?: ReactNode
}) {
  return (
    <div className='flex h-11 items-center gap-8 rounded-xl bg-grey-100 pl-4'>
      <span className='vertical-alignment-fix relative flex h-full min-w-16 items-center justify-center after:absolute after:-right-4 after:h-6 after:w-px after:bg-grey-60'>
        No {number}
        <ExtraLabel scramblePosition={'1'} className='absolute right-0 top-0' />{' '}
        {/* TODO: fix scramblePosition once backend is updated */}
      </span>
      <TimeSection timeMs={timeMs} id={id} isInited={isInited} />
      {isInited ? (
        <Ellipsis className='vertical-alignment-fix flex-1'>{scramble}</Ellipsis>
      ) : (
        <span className='vertical-alignment-fix text-grey-40'>
          Your scramble will be displayed here after you start solving
        </span>
      )}
      <div className='ml-auto'>{ActionComponent ?? <CheckIcon className='mr-4 text-primary-80' />}</div>
    </div>
  )
}

const route = getRouteApi('/contests/$contestSlug/solve')

type TimeSectionProps = { timeMs?: number; id?: number; isInited: boolean }
function TimeSection({ timeMs, id, isInited }: TimeSectionProps) {
  const { contestSlug } = route.useParams()
  const { disciplineSlug } = route.useSearch()

  if (!isInited) {
    return <SolveTimeLabel isPlaceholder />
  }
  if (timeMs === undefined) {
    return <SolveTimeLabel timeMs={timeMs} />
  }
  if (id === undefined) {
    throw Error('solve id is undefined')
  }
  return (
    <SolveTimeLinkOrDnf
      canShowHint={false}
      contestSlug={contestSlug}
      disciplineSlug={disciplineSlug}
      solveId={id}
      timeMs={timeMs}
    />
  )
}
