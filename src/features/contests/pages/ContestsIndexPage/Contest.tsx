import { CubeIcon, SecondaryButton } from '@/components/ui'
import type { ContestDTO, Discipline } from '@/types'
import { formatDate } from '@/utils'
import { Link, getRouteApi } from '@tanstack/react-router'

const route = getRouteApi('/contests/')
type ContestProps = { contest: ContestDTO; disciplineSlug: Discipline }
export function ContestRow({ contest, disciplineSlug }: ContestProps) {
  return (
    <div className='text-large flex h-15 items-center justify-between rounded-xl bg-grey-100 pl-4'>
      <CubeIcon cube='3by3' className='mr-4' />
      <span className='vertical-alignment-fix relative mr-4 flex-1 pr-4 after:absolute after:right-0 after:top-1/2 after:h-6 after:w-px after:-translate-y-1/2 after:bg-grey-60'>
        Contest {contest.name}
      </span>
      <span className='vertical-alignment-fix mr-10 w-44'>
        {formatDate(contest.startDate)} - {formatDate(contest.endDate)}
      </span>
      <SecondaryButton asChild>
        <Link
          from={route.id}
          to='/contests/$contestSlug/results'
          search={{ disciplineSlug, page: 1 }}
          params={{ contestSlug: contest.slug }}
        >
          view contest
        </Link>
      </SecondaryButton>
    </div>
  )
}

export function ContestRowSkeleton() {
  return <div className='h-15 animate-pulse rounded-xl bg-grey-100'></div>
}
