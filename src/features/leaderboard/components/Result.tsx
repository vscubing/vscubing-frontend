import { CubeIcon, Ellipsis, SecondaryButton, SolveTimeLinkOrDnf } from '@/components/ui'
import { cn, formatDate } from '@/utils'
import { Link } from '@tanstack/react-router'
import { type LeaderboardResult } from '../api'
import { forwardRef, type ComponentProps } from 'react'
import { PlaceLabel } from '@/components/ui'

type ResultProps = { result: LeaderboardResult; linkToPage?: number; isOwn?: boolean } & ComponentProps<'li'>
export const Result = forwardRef<HTMLLIElement, ResultProps>(
  ({ result, isOwn, linkToPage, className, ...props }, ref) => {
    let username = result.user.username
    if (isOwn) {
      username = username + ' (you)'
    }

    return (
      <li
        ref={ref}
        className={cn(
          'flex h-[3.75rem] items-center whitespace-nowrap rounded-xl pl-2',
          isOwn ? 'bg-secondary-80' : 'bg-grey-100',
          className,
        )}
        {...props}
      >
        <PlaceLabel className='mr-3' linkToPage={linkToPage}>
          {result.place}
        </PlaceLabel>
        <CubeIcon className='mr-3' cube={result.discipline.name} />
        <Ellipsis className='vertical-alignment-fix flex-1'>{username}</Ellipsis>
        <SolveTimeLinkOrDnf
          className='mr-6'
          timeMs={result.timeMs}
          solveId={result.id}
          contestNumber={result.contest.contestNumber}
        />
        <span className='vertical-alignment-fix w-36 border-l border-grey-60 text-center'>
          {formatDate(result.created)}
        </span>
        <span className='vertical-alignment-fix mr-10 w-[9.375rem] text-center'>
          Contest {result.contest.contestNumber}
        </span>
        <SecondaryButton asChild>
          <Link
            to='/contests/$contestNumber'
            params={{ contestNumber: String(result.contest.contestNumber) }}
            search={{ discipline: result.discipline.name }}
          >
            view contest
          </Link>
        </SecondaryButton>
      </li>
    )
  },
)

export function ResultSkeleton() {
  return <li className='h-[3.75rem] animate-pulse rounded-xl bg-grey-100'></li>
}

export function ResultsHeader() {
  return (
    <div className='flex whitespace-nowrap pl-2 text-grey-40'>
      <span className='mr-2 w-11 text-center'>Place</span>
      <span className='mr-2'>Type</span>
      <span className='flex-1'>Nickname</span>
      <span className='mr-6 w-24 text-center'>Single time</span>
      <span className='w-36 text-center'>Solve date</span>
      <span className='mr-10 w-[9.375rem] text-center'>Contest name</span>
      <SecondaryButton aria-hidden className='invisible h-px'>
        view contest
      </SecondaryButton>
    </div>
  )
}

export const FAKE_RESULT: LeaderboardResult = {
  id: 1,
  place: 1,
  user: {
    id: 1,
    username: 'username',
  },
  discipline: { name: '3by3' },
  timeMs: 1000,
  scramble: { id: 1, scramble: '' },
  contest: { contestNumber: 1 },
  created: '2021-01-01T00:00:00.000Z',
}
