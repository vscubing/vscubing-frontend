import { CubeIcon, SecondaryButton } from '@/components/ui'
import type { ContestDTO } from '@/types'
import { formatContestDuration } from '@/utils'
import { Link } from '@tanstack/react-router'

type ContestProps = { contest: ContestDTO; discipline: string; height?: number }
export function ContestRow({ contest, discipline, height }: ContestProps) {
  return (
    <div className='text-large flex h-15 items-center justify-between rounded-xl bg-grey-100 pl-4' style={{ height }}>
      <CubeIcon cube='3by3' className='mr-4' />
      <span className='vertical-alignment-fix relative mr-4 flex-1 pr-4 after:absolute after:right-0 after:top-1/2 after:h-6 after:w-px after:-translate-y-1/2 after:bg-grey-60'>
        Contest {contest.name}
      </span>
      <span className='vertical-alignment-fix mr-10 w-44'>{formatContestDuration(contest)}</span>
      <SecondaryButton asChild className='h-full'>
        <Link
          to='/contests/$contestSlug/results'
          search={{ discipline, page: 1 }}
          params={{ contestSlug: contest.slug }}
        >
          view contest
        </Link>
      </SecondaryButton>
    </div>
  )
}

export function ContestRowSkeleton({ height }: { height?: number }) {
  return <div className='h-15 animate-pulse rounded-xl bg-grey-100' style={{ height }}></div>
}
