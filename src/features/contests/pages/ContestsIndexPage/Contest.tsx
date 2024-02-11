import { CubeIcon, SecondaryButton } from '@/components/ui'
import type { Discipline } from '@/types'
import { cn, formatDate } from '@/utils'
import { Link, getRouteApi } from '@tanstack/react-router'
import { type ContestListItemDTO } from '../../api'
import { type ComponentProps, forwardRef } from 'react'

const route = getRouteApi('/contests/')
export function Contest({ contest, discipline }: { contest: ContestListItemDTO; discipline: Discipline }) {
  return (
    <li className='flex h-15 items-center justify-between rounded-xl bg-grey-100 pl-4 text-lg'>
      <CubeIcon cube='3by3' className='mr-4' />
      <span className='relative mr-4 flex-1 pr-4 pt-[.2em] after:absolute after:right-0 after:top-1/2 after:h-6 after:w-px after:-translate-y-1/2 after:bg-grey-60'>
        Contest {contest.contestNumber}
      </span>
      <span className='mr-10 w-44 pt-[.2em]'>
        {formatDate(contest.startDate)} - {formatDate(contest.endDate!) /* TODO: remove type assertion */}
      </span>
      <SecondaryButton asChild>
        <Link
          from={route.id}
          to='/contests/$contestNumber/results'
          search={{ discipline }}
          params={{ contestNumber: String(contest.contestNumber) }}
        >
          view contest
        </Link>
      </SecondaryButton>
    </li>
  )
}

export const ContestSkeleton = forwardRef<HTMLLIElement, ComponentProps<'li'>>(({ className, ...props }, ref) => {
  return <li ref={ref} {...props} className={cn('h-15 animate-pulse rounded-xl bg-grey-100', className)}></li>
})
