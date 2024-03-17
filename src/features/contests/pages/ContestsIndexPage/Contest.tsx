import { CubeIcon, SecondaryButton } from '@/components/ui'
import type { ContestInfo, Discipline } from '@/types'
import { cn, formatDate } from '@/utils'
import { Link, getRouteApi } from '@tanstack/react-router'
import { type ComponentProps, forwardRef } from 'react'

const route = getRouteApi('/contests/')
export function ContestRow({ contest, discipline }: { contest: ContestInfo; discipline: Discipline }) {
  return (
    <li className='flex h-15 items-center justify-between rounded-xl bg-grey-100 pl-4 text-lg'>
      <CubeIcon cube='3by3' className='mr-4' />
      <span className='vertical-alignment-fix relative mr-4 flex-1 pr-4 after:absolute after:right-0 after:top-1/2 after:h-6 after:w-px after:-translate-y-1/2 after:bg-grey-60'>
        Contest {contest.contestNumber}
      </span>
      <span className='vertical-alignment-fix mr-10 w-44'>
        {formatDate(contest.start)} - {formatDate(contest.end) /* TODO: remove type assertion */}
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

export const ContestRowSkeleton = forwardRef<HTMLLIElement, ComponentProps<'li'>>(({ className, ...props }, ref) => {
  return <li ref={ref} {...props} className={cn('h-15 animate-pulse rounded-xl bg-grey-100', className)}></li>
})
