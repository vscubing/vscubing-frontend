import { CubeIcon, Ellipsis, SecondaryButton, SolveTimeButton } from '@/components/ui'
import { useReconstructor } from '@/features/reconstructor'
import { cn } from '@/utils'
import { Link } from '@tanstack/react-router'
import { type LeaderboardResult } from '../api'

export function Result({
  className,
  isOwnResult = false,
  result,
}: { result: LeaderboardResult } & {
  isOwnResult?: boolean
  className?: string
}) {
  const { showReconstruction } = useReconstructor()

  let username = result.user.username
  if (isOwnResult) {
    username = username + ' (you)'
  }

  return (
    <div
      className={cn(
        'flex items-center whitespace-nowrap rounded-xl pl-2',
        isOwnResult ? 'bg-secondary-80' : 'bg-grey-100',
        className,
      )}
    >
      <span className='my-2 mr-3 flex h-11 w-11 items-center justify-center rounded-full border border-primary-60 text-lg'>
        {result.placeNumber}
      </span>
      <CubeIcon className='mr-3' cube={result.discipline.name} />
      <Ellipsis className='flex-1'>{username}</Ellipsis>
      <SolveTimeButton className='mr-6' timeMs={result.timeMs} onClick={() => showReconstruction(result.id)} />
      <span className='w-36 border-l border-grey-60 text-center'>{formatSolveDate(result.created)}</span>
      <span className='mr-10 w-[9.375rem] text-center'>Contest {result.contest.contestNumber}</span>
      <SecondaryButton asChild>
        <Link
          to='/contest/$contestNumber/$discipline'
          params={{ contestNumber: String(result.contest.contestNumber), discipline: result.discipline.name }}
        >
          view contest
        </Link>
      </SecondaryButton>
    </div>
  )
}

export function ResultsHeader({ className }: { className: string }) {
  return (
    <div className={cn('flex whitespace-nowrap pl-2 text-grey-40', className)}>
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

const formatSolveDate = (dateStr: string) => {
  const date = new Date(dateStr)
  let dd = String(date.getDate())
  if (dd.length === 1) {
    dd = `0${dd}`
  }

  const mm = String(date.getMonth())
  const yyyy = String(date.getFullYear())
  return `${dd}.${mm}.${yyyy}`
}
