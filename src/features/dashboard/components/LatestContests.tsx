import { cn, formatDate, useAutofillHeight } from '@/utils'
import { Link } from '@tanstack/react-router'
import { type DashboardDTO } from '../api'
import { ArrowRightIcon, SecondaryButton, UnderlineButton } from '@/components/ui'

export function LatestContests({ className, contests }: { className: string; contests?: DashboardDTO['contests'] }) {
  const sortedContests = contests && [...contests].reverse().filter(({ ongoing }) => !ongoing)

  const { fittingCount, containerRef, fakeElementRef } = useAutofillHeight<HTMLUListElement, HTMLLIElement>()

  let doAllFit = undefined
  if (!!fittingCount && sortedContests?.length) {
    doAllFit = sortedContests.length <= fittingCount
  }

  return (
    <section className={cn('flex flex-col rounded-2xl bg-black-80 px-6 py-4', className)}>
      <div className='mb-6 flex h-[2.3rem] justify-between'>
        <h2 className='title-h3'>Latest contests</h2>
        {doAllFit === false && (
          <UnderlineButton asChild>
            <Link>View all</Link>
          </UnderlineButton>
        )}
        {/* TODO: add a link to all contests */}
      </div>
      <ul className='flex flex-1 flex-col gap-3' ref={containerRef}>
        <li className='invisible fixed' aria-hidden='true' ref={fakeElementRef}>
          <Contest contest={FAKE_CONTEST} />
        </li>
        <ContestsList contests={sortedContests} fittingCount={fittingCount} />
      </ul>
    </section>
  )
}

function ContestsList({ contests, fittingCount }: { contests?: DashboardDTO['contests']; fittingCount?: number }) {
  if (fittingCount === undefined) {
    return null
  }
  if (contests === undefined) {
    return Array.from({ length: fittingCount }, (_, i) => <ContestSkeleton key={i} />)
  }
  if (contests.length === 0) {
    return 'Seems like there are no contests here yet' // TODO: add empty state
  }

  return contests.slice(0, fittingCount).map((contest) => (
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
          {formatDate(start)}-{formatDate(end!)}
        </p>
      </div>
      <SecondaryButton size='iconLg' asChild>
        <Link to='/contest/$contestNumber' params={{ contestNumber: String(contestNumber) }}>
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
