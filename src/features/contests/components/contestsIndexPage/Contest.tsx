import { CubeIcon, SecondaryButton } from '@/components/ui'
import type { Discipline } from '@/types'
import { formatDate } from '@/utils'
import { Link, RouteApi } from '@tanstack/react-router'
import { type ContestListItemDTO } from '../../api'

const route = new RouteApi({ id: '/contests/' })
export function Contest({ contest, discipline }: { contest: ContestListItemDTO; discipline: Discipline }) {
  return (
    <div className='flex h-15 items-center justify-between rounded-xl bg-grey-100 pl-4 text-lg'>
      <CubeIcon cube='3by3' className='mr-4' />
      <span className='relative mr-4 flex-1 pr-4 pt-[.2em] after:absolute after:right-0 after:top-1/2 after:h-6 after:w-px after:-translate-y-1/2 after:bg-grey-60'>
        Contest {contest.contestNumber}
      </span>
      <span className='mr-10 w-44 pt-[.2em]'>
        {formatDate(contest.start)} - {formatDate(contest.end!) /* TODO: remove type assertion */}
      </span>
      <SecondaryButton asChild>
        <Link
          from={route.id}
          to='/contests/$contestNumber'
          search={{ discipline }}
          params={{ contestNumber: String(contest.contestNumber) }}
        >
          view contest
        </Link>
      </SecondaryButton>
    </div>
  )
}

export function ContestSkeleton() {
  return <div className='h-15 animate-pulse rounded-xl bg-grey-100'></div>
}
