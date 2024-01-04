import { CubeIcon, Ellipsis, SecondaryButton, SolveTimeButton } from '@/components/ui'
import { useReconstructor } from '@/features/reconstructor'
import { cn } from '@/utils'
import { Link } from '@tanstack/react-router'
import { type LeaderboardResult } from '../api'
import { useQuery } from '@tanstack/react-query'
import { userQuery } from '@/features/auth'
import dayjs from 'dayjs'

export function Result({ data }: { data: LeaderboardResult }) {
  const { showReconstruction } = useReconstructor()

  const { data: currentUser } = useQuery(userQuery)
  const isOwnResult = currentUser?.username === data.user.username // TODO: use id instead of username

  let username = data.user.username
  if (isOwnResult) {
    username = username + ' (you)'
  }

  return (
    <div
      className={cn(
        'flex h-[3.75rem] items-center whitespace-nowrap rounded-xl pl-2',
        isOwnResult ? 'bg-secondary-80' : 'bg-grey-100',
        {},
      )}
    >
      <span className='mr-3 flex h-11 w-11 items-center justify-center rounded-full border border-primary-60 pt-[.2em] text-lg'>
        {data.placeNumber}
      </span>
      <CubeIcon className='mr-3' cube={data.discipline.name} />
      <Ellipsis className='flex-1 pt-[.2em]'>{username}</Ellipsis>
      <SolveTimeButton className='mr-6' timeMs={data.timeMs} onClick={() => showReconstruction(data.id)} />
      <span className='w-36 border-l border-grey-60 pt-[.2em] text-center'>
        {dayjs(data.created).format('DD.MM.YYYY')}
      </span>
      <span className='mr-10 w-[9.375rem] pt-[.2em] text-center'>Contest {data.contest.contestNumber}</span>
      <SecondaryButton asChild>
        <Link
          to='/contest/$contestNumber/$discipline'
          params={{ contestNumber: String(data.contest.contestNumber), discipline: data.discipline.name }}
        >
          view contest
        </Link>
      </SecondaryButton>
    </div>
  )
}

export function ResultSkeleton() {
  return <div className='h-[3.75rem] animate-pulse rounded-xl bg-grey-100'></div>
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
