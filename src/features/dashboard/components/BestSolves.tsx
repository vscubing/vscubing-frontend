import {
  CubeIcon,
  Ellipsis,
  SolveTimeLinkOrDnf,
  SecondaryButton,
  UnderlineButton,
  ArrowRightIcon,
} from '@/components/ui'
import { Link } from '@tanstack/react-router'
import { type DashboardDTO } from '../api/getDashboard'
import { cn, matchesQuery, useAutofillHeight } from '@/utils'
import { ResultSkeleton } from '@/features/leaderboard/components'

type BestSolvesProps = { className: string; solves?: DashboardDTO['bestSolves'] }
export function BestSolves({ className, solves }: BestSolvesProps) {
  const { fittingCount, containerRef, fakeElementRef } = useAutofillHeight()
  let countToDisplay = fittingCount
  if (solves && matchesQuery('sm')) {
    countToDisplay = solves?.length
  }

  let allDisplayed = undefined
  if (!!countToDisplay && solves?.length) {
    allDisplayed = solves.length <= countToDisplay
  }

  return (
    <section className={cn('flex flex-col gap-6 rounded-2xl bg-black-80 px-6 py-4 sm:gap-4 sm:p-3', className)}>
      <div className='flex items-center justify-between'>
        <h2 className='title-h3'>Best solves ever</h2>
        <UnderlineButton
          asChild
          className={cn('whitespace-nowrap', { 'invisible w-0': allDisplayed })}
          aria-hidden={allDisplayed}
        >
          <Link to='/leaderboard'>View all</Link>
        </UnderlineButton>
      </div>
      <div className='flex flex-1 flex-col gap-1'>
        <div className='flex gap-3 pl-1 text-grey-40'>
          <span>Type</span>
          <span>Nickname</span>
        </div>
        <ul className='flex flex-1 flex-col gap-3' ref={containerRef}>
          <ResultSkeleton className='invisible fixed' aria-hidden ref={fakeElementRef} />
          <Solves solves={solves?.slice(0, countToDisplay)} countToDisplay={countToDisplay} />
        </ul>
      </div>
    </section>
  )
}

function Solves({ solves, countToDisplay }: { solves?: DashboardDTO['bestSolves']; countToDisplay?: number }) {
  if (countToDisplay === undefined) {
    return null
  }
  if (solves === undefined) {
    return Array.from({ length: countToDisplay }, (_, index) => <SolveSkeleton key={index} />)
  }
  if (solves.length === 0) {
    return 'Seems like no one has solved yet'
  }

  return solves.map((solve) => (
    <li key={solve.id}>
      <Solve solve={solve} />
    </li>
  ))
}

function SolveSkeleton() {
  return <div className='h-15 animate-pulse rounded-xl bg-grey-100'></div>
}

function Solve({ solve }: { solve: DashboardDTO['bestSolves'][number] }) {
  return (
    <div className='flex min-h-15 items-center rounded-xl bg-grey-100 pl-3'>
      <span className='relative mr-3 flex flex-1 items-center pr-2 after:absolute after:right-0 after:top-1/2 after:block after:h-6 after:w-px after:-translate-y-1/2 after:bg-grey-60 sm:mr-0 sm:flex-col sm:items-start'>
        <CubeIcon className='mr-3' cube={solve.discipline.name} />
        <span className='flex w-full'>
          <Ellipsis className='flex-1'>{solve.user.username}</Ellipsis>
        </span>
      </span>
      <SolveTimeLinkOrDnf
        className='mr-4 sm:mr-0'
        timeMs={solve.timeMs}
        solveId={solve.id}
        contestNumber={solve.contestNumber}
      />
      <SecondaryButton asChild className='sm:hidden'>
        <Link to='/leaderboard/$discipline' params={{ discipline: solve.discipline.name }}>
          leaderboard
        </Link>
      </SecondaryButton>
      <SecondaryButton size='iconLg' asChild className='hidden w-16 sm:flex sm:h-16'>
        <Link to='/leaderboard/$discipline' params={{ discipline: solve.discipline.name }}>
          <ArrowRightIcon />
        </Link>
      </SecondaryButton>
    </div>
  )
}
