import { cn, matchesQuery } from '@/utils'
import { Link } from '@tanstack/react-router'
import { type DashboardDTO } from '../api'
import { UnderlineButton } from '@/components/ui'
import { ContestSkeleton, Contest } from '@/components/Contest'
import { AutofillHeight } from '@/features/autofillHeight'

const MOBILE_MAX_OVERFLOWING_ITEMS = 3
export function LatestContests({ className, contests }: { className: string; contests?: DashboardDTO['contests'] }) {
  // contests = contests && Array.from({ length: 10 }, () => ({ ...contests[0], id: Math.random() }))
  // contests = contests.reverse().filter(({ ongoing }) => !ongoing) // TODO: remove filter when backend is ready

  const { fittingCount, containerRef, fakeElementRef } = AutofillHeight.useFittingCount(undefined)
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
          className={cn('whitespace-nowrap', { invisible: allDisplayed })}
          aria-hidden={allDisplayed}
        >
          <Link to='/contests'>View all</Link>
        </UnderlineButton>
      </div>
      <AutofillHeight.ListWrapper
        className='gap-3'
        renderSkeleton={() => <ContestSkeleton />}
        containerRef={containerRef}
        fakeElementRef={fakeElementRef}
      >
        <AutofillHeight.List
          renderItem={(contest) => <Contest contest={contest} />}
          renderSkeleton={() => <ContestSkeleton />}
          pageSize={countToDisplay}
          list={contests?.slice(0, countToDisplay)}
        />
      </AutofillHeight.ListWrapper>
    </section>
  )
}
