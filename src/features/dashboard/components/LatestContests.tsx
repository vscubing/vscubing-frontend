import { cn, formatDate, useAutofillHeight } from '@/utils'
import { Link } from '@tanstack/react-router'
import { type DashboardDTO } from '../api'
import { ArrowRightIcon, SecondaryButton, UnderlineButton } from '@/components/ui'

export function LatestContests({ className, contests }: { className: string; contests?: DashboardDTO['contests'] }) {
  const sortedContests = contests && [...contests].reverse().filter(({ ongoing }) => !ongoing)
  const { fittingCount, containerRef, fakeElementRef } = useAutofillHeight()

  let doAllFit = undefined
  if (!!fittingCount && sortedContests?.length) {
    doAllFit = sortedContests.length <= fittingCount
  }

  return (
    <section className={cn('flex flex-col gap-6 rounded-2xl bg-black-80 px-6 py-4', className)}>
      <div className='flex h-[2.3rem] justify-between'>
        <h2 className='title-h3'>Latest contests</h2>
        {doAllFit === false && (
          <UnderlineButton asChild>
            <Link to='/contests'>View all</Link>
          </UnderlineButton>
        )}
      </div>
      <ul className='flex flex-1 flex-col gap-3' ref={containerRef}>
        <li className='invisible fixed' aria-hidden ref={fakeElementRef}>
          <Contest contest={FAKE_CONTEST} />
        </li>
        <Contests contests={contests?.slice(0, fittingCount)} fittingCount={fittingCount} />
      </ul>
    </section>
  )
}

function Contests({ contests, fittingCount }: { contests?: DashboardDTO['contests']; fittingCount?: number }) {
  if (fittingCount === undefined) {
    return null
  }
  if (contests === undefined) {
    return Array.from({ length: fittingCount }, (_, index) => <ContestSkeleton key={index} />)
  }

  return contests.map((contest) => (
    <li key={contest.id}>
      <Contest contest={contest} />
    </li>
  ))
}

function Contest({ contest: { contestNumber, start, end } }: { contest: DashboardDTO['contests'][number] }) {
  return (
    <div className='flex justify-between rounded-xl bg-grey-100'>
      <div className='py-3 pl-4 pr-8'>
        <p className='title-h3'>Contest {contestNumber}</p>
        <p className='text-grey-40'>
          {formatDate(start, 'long')} -{' '}
          {formatDate(end!, 'long') /* TODO: remove type assertion when backend is ready */}
        </p>
      </div>
      <SecondaryButton size='iconLg' asChild>
        <Link to='/contests/$contestNumber' params={{ contestNumber: String(contestNumber) }}>
          <ArrowRightIcon />
        </Link>
      </SecondaryButton>
    </div>
  )
}

function ContestSkeleton() {
  return <div className='h-20 animate-pulse rounded-xl bg-grey-100'></div>
}

const FAKE_CONTEST: DashboardDTO['contests'][number] = {
  id: 1,
  contestNumber: 1,
  start: '2021-01-01T00:00:00.000Z',
  end: '2021-01-01T00:00:00.000Z',
  ongoing: false,
}
