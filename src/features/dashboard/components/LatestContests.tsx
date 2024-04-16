import { cn, matchesQuery } from '@/utils'
import { Link } from '@tanstack/react-router'
import { UnderlineButton } from '@/components/ui'
import { ContestSkeleton, Contest, type ContestDTO } from '@/features/shared'
import { AutofillHeight } from '@/features/autofillHeight'

const MOBILE_MAX_OVERFLOWING_ITEMS = 3
export function LatestContests({ className, contests }: { className: string; contests?: ContestDTO[] }) {
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
        renderFakeElement={() => <ContestSkeleton />}
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
