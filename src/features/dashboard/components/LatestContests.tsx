import { cn, formatDate, useAutofillHeight } from '@/utils'
import { Link } from '@tanstack/react-router'
import { type DashboardDTO } from '../api'
import { ArrowRightIcon, SecondaryButton } from '@/components'

export function LatestContests({ className, contests }: { className: string; contests?: DashboardDTO['contests'] }) {
  const sortedContests = contests && [...contests].reverse().filter(({ ongoing }) => !ongoing)

  const { fittingCount, containerRef, fakeElementRef } = useAutofillHeight<HTMLUListElement, HTMLDivElement>()

  return (
    <ul className={cn('flex flex-col gap-3', className)} ref={containerRef}>
      <div className='invisible fixed' aria-hidden='true' ref={fakeElementRef}>
        <Contest contest={FAKE_CONTEST} />
      </div>
      {sortedContests
        ? sortedContests.slice(0, fittingCount).map((contest) => <Contest contest={contest} key={contest.id} />)
        : 'Loading...'}
    </ul>
  )
}

function Contest({ contest: { contestNumber, start, end } }: { contest: DashboardDTO['contests'][number] }) {
  return (
    <li className='flex justify-between rounded-xl bg-grey-100'>
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
  )
}

const FAKE_CONTEST: DashboardDTO['contests'][number] = {
  id: 1,
  contestNumber: 1,
  start: '2021-01-01T00:00:00.000Z',
  end: '2021-01-01T00:00:00.000Z',
  ongoing: false,
}
