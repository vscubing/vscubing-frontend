import { cn, formatDate } from '@/utils'
import { Link } from '@tanstack/react-router'
import { type DashboardDTO } from '../api'
import { ArrowRightIcon, SecondaryButton } from '@/components'

export function LatestContests({ contests }: { contests?: DashboardDTO['contests'] }) {
  const sortedContests = contests && [...contests].reverse().filter(({ ongoing }) => !ongoing)

  return sortedContests ? (
    <ul className='flex flex-col gap-3'>
      {sortedContests.map(({ contestNumber, start, end }) => (
        <li key={contestNumber} className='flex justify-between rounded-xl bg-grey-100'>
          <div className='py-3 pl-4 pr-8'>
            <p className='title-h3'>Contest {contestNumber}</p>
            <p className='text-grey-40'>
              {formatDate(start)}-{formatDate(end!)}
            </p>
          </div>
          <SecondaryButton size='iconLg' asChild>
            <Link
              className={cn('rounded-md py-2 pl-4 pr-2 md:px-6 md:py-2 md:text-lg')}
              to='/contest/$contestNumber'
              params={{ contestNumber: String(contestNumber) }}
            >
              <ArrowRightIcon />
            </Link>
          </SecondaryButton>
        </li>
      ))}
    </ul>
  ) : (
    'Loading...'
  )
}
