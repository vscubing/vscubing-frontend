import { cn, formatDate } from '@/utils'
import { Link } from '@tanstack/react-router'
import { type DashboardDTO } from '../api'
import { ArrowRightIcon, SecondaryButton, UnderlineButton } from '@/components/ui'
import { AutofillHeightList } from '@/components/AutofillHeightList'
import { useState } from 'react'

export function LatestContests({ className, contests }: { className: string; contests?: DashboardDTO['contests'] }) {
  const sortedContests = contests && [...contests].reverse().filter(({ ongoing }) => !ongoing)
  const [fittingCount, setFittingCount] = useState<number>()

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
      <AutofillHeightList
        Item={Contest}
        ItemSkeleton={ContestSkeleton}
        items={sortedContests}
        fakeItem={FAKE_CONTEST}
        onFittingCountChange={setFittingCount}
      />
    </section>
  )
}

function Contest({ data: { contestNumber, start, end } }: { data: DashboardDTO['contests'][number] }) {
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
