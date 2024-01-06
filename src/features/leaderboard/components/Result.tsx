import { CubeIcon, Ellipsis, SecondaryButton, SolveTimeButton } from '@/components/ui'
import { useReconstructor } from '@/features/reconstructor'
import { cn, formatDate } from '@/utils'
import { Link } from '@tanstack/react-router'
import { type LeaderboardResult } from '../api'
import { useQuery } from '@tanstack/react-query'
import { userQuery } from '@/features/auth'
import { forwardRef, type ComponentProps } from 'react'

type ResultProps = { result: LeaderboardResult; linkToPage?: number } & ComponentProps<'li'>
export const Result = forwardRef<HTMLLIElement, ResultProps>(({ result, linkToPage, className, ...props }, ref) => {
  const { showReconstruction } = useReconstructor()

  const { data: currentUser } = useQuery(userQuery)
  const isOwnResult = currentUser?.username === result.user.username // TODO: use id instead of username

  let username = result.user.username
  if (isOwnResult) {
    username = username + ' (you)'
  }

  return (
    <li
      ref={ref}
      className={cn(
        'flex h-[3.75rem] items-center whitespace-nowrap rounded-xl pl-2',
        isOwnResult ? 'bg-secondary-80' : 'bg-grey-100',
        className,
      )}
      {...props}
    >
      <PlaceBadge className='mr-3' linkToPage={linkToPage}>
        {result.placeNumber}
      </PlaceBadge>
      <CubeIcon className='mr-3' cube={result.discipline.name} />
      <Ellipsis className='flex-1 pt-[.2em]'>{username}</Ellipsis>
      <SolveTimeButton className='mr-6' timeMs={result.timeMs} onClick={() => showReconstruction(result.id)} />
      <span className='w-36 border-l border-grey-60 pt-[.2em] text-center'>{formatDate(result.created)}</span>
      <span className='mr-10 w-[9.375rem] pt-[.2em] text-center'>Contest {result.contest.contestNumber}</span>
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
})

function PlaceBadge({
  children: placeNumber,
  linkToPage,
  className,
}: {
  children: number
  linkToPage?: number
  className?: string
}) {
  const Comp = linkToPage ? Link : 'span'
  return (
    <Comp
      params={{}}
      search={linkToPage ? (prev) => ({ ...prev, page: linkToPage }) : undefined}
      className={cn(
        'flex h-11 w-11 items-center justify-center rounded-full border border-primary-60 pt-[.2em] text-lg',
        {
          'transition-base outline-ring hover:border-primary-80 active:border-primary-80 active:text-primary-80':
            !!linkToPage,
        },
        className,
      )}
    >
      {placeNumber}
    </Comp>
  )
}

export function ResultSkeleton() {
  return <li className='h-[3.75rem] animate-pulse rounded-xl bg-grey-100'></li>
}

export function ResultsHeader() {
  return (
    <div className='flex whitespace-nowrap pl-2 text-grey-40'>
      <span className='mr-3'>Place</span>
      <span className='mr-3'>Type</span>
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
  placeNumber: 1,
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
