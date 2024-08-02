import { cn, matchesQuery } from '@/utils'
import { Link } from '@tanstack/react-router'
import { UnderlineButton } from '@/components/ui'
import { ContestSkeleton, Contest } from '@/shared/contests'
import { AutofillHeight } from '@/features/autofillHeight'
import { type ContestDTO, DEFAULT_DISCIPLINE } from '@/types'

const MIN_ITEMS_IF_OVERFLOW = 2
const MOBILE_ITEMS = 2
export function LatestContests({ className, contests }: { className: string; contests?: ContestDTO[] }) {
  const { fittingCount, containerRef, fakeElementRef } = AutofillHeight.useFittingCount()

  let countToDisplay = fittingCount
  if (matchesQuery('md')) {
    countToDisplay = MOBILE_ITEMS
  } else if (countToDisplay) {
    countToDisplay = Math.max(countToDisplay, MIN_ITEMS_IF_OVERFLOW)
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
          <Link search={{ disciplineSlug: DEFAULT_DISCIPLINE, page: 1 }} to='/contests'>
            View all
          </Link>
        </UnderlineButton>
      </div>
      <AutofillHeight.ListWrapper
        className='gap-3'
        renderFakeElement={() => <ContestSkeleton />}
        containerRef={containerRef}
        fakeElementRef={fakeElementRef}
      >
        <AutofillHeight.List
          renderItem={({ item: contest }) => <Contest contest={contest} />}
          renderSkeleton={() => <ContestSkeleton />}
          pageSize={countToDisplay}
          getItemKey={(contest) => contest.id}
          list={contests?.slice(0, countToDisplay)}
        />
      </AutofillHeight.ListWrapper>
    </section>
  )
}
