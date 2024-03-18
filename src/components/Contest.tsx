import { cn, formatDate } from '@/utils'
import { Link } from '@tanstack/react-router'
import { SecondaryButton, ArrowRightIcon } from './ui'
import { type ContestInfo } from '@/types'
import { ComponentProps, forwardRef } from 'react'

type ContestProps = { contest: ContestInfo }
export const Contest = forwardRef<HTMLLIElement, ContestProps>(({ contest: { contestNumber, start, end } }, ref) => {
  return (
    <li ref={ref} className='flex min-h-20 items-center justify-between gap-8 rounded-xl bg-grey-100 pl-4 sm:min-h-16'>
      <div className='sm:space-y-2'>
        <p className='title-h3'>Contest {contestNumber}</p>
        <p className='text-grey-40'>
          {formatDate(start, 'long')} - {formatDate(end, 'long')}
        </p>
      </div>
      <SecondaryButton size='iconLg' asChild className='sm:h-16 sm:w-16'>
        <Link to='/contests/$contestNumber' params={{ contestNumber: String(contestNumber) }}>
          <ArrowRightIcon />
        </Link>
      </SecondaryButton>
    </li>
  )
})

export const ContestSkeleton = forwardRef<HTMLLIElement, ComponentProps<'li'>>(({ className, ...props }, ref) => {
  return <li ref={ref} {...props} className={cn('h-20 animate-pulse rounded-xl bg-grey-100 sm:h-16', className)}></li>
})
