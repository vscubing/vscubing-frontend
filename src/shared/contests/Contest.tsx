import { formatDate } from '@/utils'
import { Link } from '@tanstack/react-router'
import { SecondaryButton, ArrowRightIcon } from '@/components/ui'
import { type ContestDTO, DEFAULT_DISCIPLINE } from '@/types'

type ContestProps = { contest: ContestDTO }
export function Contest({ contest: { slug, startDate, endDate } }: ContestProps) {
  return (
    <div className='flex min-h-16 items-center justify-between gap-8 rounded-xl bg-grey-100 pl-4'>
      <div className='sm:space-y-2'>
        <p className='title-h3'>Contest {slug}</p>
        <p className='text-grey-40'>
          {formatDate(startDate, 'long')} - {formatDate(endDate, 'long')}
        </p>
      </div>
      <SecondaryButton size='iconLg' asChild className='sm:h-16 sm:w-16'>
        <Link to='/contests/$contestSlug' params={{ contestSlug: slug }} search={{ discipline: DEFAULT_DISCIPLINE }}>
          <ArrowRightIcon />
        </Link>
      </SecondaryButton>
    </div>
  )
}

export function ContestSkeleton() {
  return <div className='h-20 animate-pulse rounded-xl bg-grey-100 sm:h-16'></div>
}
