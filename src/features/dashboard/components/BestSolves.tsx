import { CubeIcon, Ellipsis, SolveTimeButton, SecondaryButton, UnderlineButton } from '@/components/ui'
import { Link } from '@tanstack/react-router'
import { type DashboardDTO } from '../api/getDashboard'
import { useReconstructor } from '@/features/reconstructor'
import { cn, useAutofillHeight } from '@/utils'
import { DEFAULT_DISCIPLINE } from '@/types'

type BestSolvesProps = { className: string; solves?: DashboardDTO['bestSolves'] }
export function BestSolves({ className, solves }: BestSolvesProps) {
  const { fittingCount, containerRef, fakeElementRef } = useAutofillHeight<HTMLUListElement, HTMLLIElement>()

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
        <ul className='flex min-w-[29.5rem] flex-1 flex-col gap-3' ref={containerRef}>
          <li className='invisible fixed' aria-hidden='true' ref={fakeElementRef}>
            <Solve solve={FAKE_SOLVE} />
          </li>
          <SolvesList solves={solves} fittingCount={fittingCount} />
        </ul>
      </div>
    </section>
  )
}

function SolvesList({ solves, fittingCount }: { solves?: DashboardDTO['bestSolves']; fittingCount?: number }) {
  if (!fittingCount) {
    return null
  }
  if (solves === undefined) {
    return Array.from({ length: fittingCount }, (_, i) => <SolveSkeleton key={i} />)
  }
  if (solves.length === 0) {
    return 'Seems like there are no solves here yet' // TODO: add empty state
  }
  return solves.slice(0, fittingCount).map((solve) => <Solve solve={solve} key={solve.id} />)
}

function SolveSkeleton() {
  return <div className='h-15 animate-pulse rounded-xl bg-grey-100'></div>
}

function Solve({ solve }: { solve: DashboardDTO['bestSolves'][number] }) {
  const { showReconstruction } = useReconstructor()
  return (
    <div className='flex h-15 items-center rounded-xl bg-grey-100 pl-3'>
      <CubeIcon className='mr-3' cube={solve.discipline.name} />
      <Ellipsis className='relative mr-3 flex-1 border-r border-grey-60 pr-2'>{solve.user.username}</Ellipsis>
      <SolveTimeButton className='mr-4' timeMs={solve.timeMs} onClick={() => showReconstruction(solve.id)} />
      <SecondaryButton asChild>
        <Link
          search={{ page: 1 }}
          className='btn-action'
          to='/leaderboard/$discipline'
          params={{ discipline: solve.discipline.name }}
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
