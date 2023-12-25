import { DEFAULT_DISCIPLINE } from '@/types'
import { cn } from '@/utils'
import { Link } from '@tanstack/react-router'
import { type DashboardDTO } from '../api'

type ContestsListProps = { contests?: DashboardDTO['contests'] }
export function ContestsList({ contests }: ContestsListProps) {
  const sortedContests = contests && [...contests].reverse()

  return sortedContests ? (
    <div className='flex flex-col gap-2 md:gap-4 xl:gap-6'>
      {sortedContests.map(({ contestNumber, ongoing }) => (
        <ContestLink key={contestNumber} number={contestNumber} ongoing={ongoing} />
      ))}
    </div>
  ) : (
    'loading...'
  )
}

type ContestLinkProps = { number: number; ongoing: boolean }
export function ContestLink({ number, ongoing }: ContestLinkProps) {
  return (
    <Link
      className={cn(ongoing ? 'bg-[#233D50]' : 'bg-panels', 'rounded-md py-2 pl-4 pr-2 md:px-6 md:py-2 md:text-lg')}
      to={`/contest/$contestNumber/$discipline`}
      params={{ contestNumber: String(number), discipline: DEFAULT_DISCIPLINE }}
    >
      Contest {number} {ongoing ? '(ongoing)' : null}
    </Link>
  )
}
