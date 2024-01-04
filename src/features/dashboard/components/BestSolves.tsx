import { CubeIcon, Ellipsis, SolveTimeButton, SecondaryButton, UnderlineButton } from '@/components/ui'
import { Link } from '@tanstack/react-router'
import { type DashboardDTO } from '../api/getDashboard'
import { useReconstructor } from '@/features/reconstructor'
import { cn } from '@/utils'
import { DEFAULT_DISCIPLINE } from '@/types'
import { AutofillHeightList } from '@/components/AutofillHeightList'
import { useState } from 'react'

type BestSolvesProps = { className: string; solves?: DashboardDTO['bestSolves'] }
export function BestSolves({ className, solves }: BestSolvesProps) {
  const [fittingCount, setFittingCount] = useState<number>()

  let doAllFit = undefined
  if (!!fittingCount && solves?.length) {
    doAllFit = solves.length <= fittingCount
  }

  return (
    <section className={cn('flex flex-col rounded-2xl bg-black-80 px-6 py-4', className)}>
      <div className='mb-6 flex h-[2.3rem] justify-between'>
        <h2 className='title-h3'>Best solves ever</h2>
        {doAllFit === false && (
          <UnderlineButton asChild>
            <Link to='/leaderboard'>View all</Link>
          </UnderlineButton>
        )}
      </div>
      <div className='flex flex-1 flex-col'>
        <div className='mb-1 flex gap-3 text-grey-40'>
          <span>Type</span>
          <span>Nickname</span>
        </div>
        <AutofillHeightList
          className='min-w-[29.5rem]'
          fakeItem={FAKE_SOLVE}
          Item={Solve}
          ItemSkeleton={SolveSkeleton}
          items={solves}
          onFittingCountChange={setFittingCount}
        />
      </div>
    </section>
  )
}

function SolveSkeleton() {
  return <div className='h-15 animate-pulse rounded-xl bg-grey-100'></div>
}

function Solve({ data }: { data: DashboardDTO['bestSolves'][number] }) {
  const { showReconstruction } = useReconstructor()
  return (
    <div className='flex h-15 items-center rounded-xl bg-grey-100 pl-3'>
      <CubeIcon className='mr-3' cube={data.discipline.name} />
      <Ellipsis className='relative mr-3 flex-1 border-r border-grey-60 pr-2'>{data.user.username}</Ellipsis>
      <SolveTimeButton className='mr-4' timeMs={data.timeMs} onClick={() => showReconstruction(data.id)} />
      <SecondaryButton asChild>
        <Link
          search={{ page: 1 }}
          className='btn-action'
          to='/leaderboard/$discipline'
          params={{ discipline: data.discipline.name }}
        >
          leaderboard
        </Link>
      </SecondaryButton>
    </div>
  )
}

const FAKE_SOLVE: DashboardDTO['bestSolves'][number] = {
  id: 1,
  contestNumber: 1,
  timeMs: 1234,
  user: {
    username: 'username',
  },
  discipline: {
    name: DEFAULT_DISCIPLINE,
  },
}
