import { cn, matchesQuery, useAutofillHeight } from '@/utils'
import { Link } from '@tanstack/react-router'
import { type DashboardDTO } from '../api'
import { UnderlineButton } from '@/components/ui'
import { ContestSkeleton, Contest } from '@/components/Contest'

const MOBILE_MAX_OVERFLOWING_ITEMS = 3
export function LatestContests({ className, contests }: { className: string; contests?: DashboardDTO['contests'] }) {
  contests = contests && [...contests] //.reverse().filter(({ ongoing }) => !ongoing) TODO: remove filter when backend is ready

  const { fittingCount, containerRef, fakeElementRef } = useAutofillHeight(undefined)
  let countToDisplay = fittingCount
  if (fittingCount && matchesQuery('sm')) {
    countToDisplay = Math.max(fittingCount, MOBILE_MAX_OVERFLOWING_ITEMS)
  }

  let allDisplayed = undefined
  if (!!countToDisplay && contests?.length) {
    allDisplayed = contests.length <= countToDisplay
  }

  return (
    <section className={cn('flex flex-col gap-6 rounded-2xl bg-black-80 px-6 py-4 sm:gap-4 sm:p-3', className)}>
      <div className='flex items-center justify-between'>
        <h2 className='title-h3'>Latest contests</h2>
        <UnderlineButton
          asChild
          className={cn('whitespace-nowrap', { 'invisible w-0': allDisplayed })}
          aria-hidden={allDisplayed}
        >
          <Link to='/contests'>View all</Link>
        </UnderlineButton>
      </div>
      <ul className='flex flex-1 flex-col gap-3' ref={containerRef}>
        <li className='invisible fixed' aria-hidden ref={fakeElementRef}>
          <ContestSkeleton />
        </li>
        <Contests contests={contests?.slice(0, countToDisplay)} countToDisplay={countToDisplay} />
      </ul>
    </section>
  )
}

function Contests({ contests, countToDisplay }: { contests?: DashboardDTO['contests']; countToDisplay?: number }) {
  if (countToDisplay === undefined) {
    return null
  }
  if (contests === undefined) {
    return Array.from({ length: countToDisplay }, (_, index) => <ContestSkeleton key={index} />)
  }

  return contests.map((contest) => (
    <li key={contest.id}>
      <Contest contest={contest} />
    </li>
  ))
}
