import { DashboardResponse } from '@/api/contests'
import { DEFAULT_DISCIPLINE } from '@/constants'
import { cn } from '@/utils'
import { Link } from 'react-router-dom'

type ContestsListProps = { contests?: DashboardResponse['contests'] }
export const ContestsList = ({ contests }: ContestsListProps) => {
  const sortedContests = contests && [...contests].reverse()

  return sortedContests ? (
    <div className='flex flex-col gap-2 md:gap-4 xl:gap-6'>
      {sortedContests.map(({ contest_number, ongoing }) => (
        <ContestLink key={contest_number} number={contest_number} ongoing={ongoing} />
      ))}
    </div>
  ) : (
    'loading...'
  )
}

type ContestLinkProps = { number: number; ongoing: boolean }
export const ContestLink = ({ number, ongoing }: ContestLinkProps) => {
  return (
    <Link
      className={cn(ongoing ? 'bg-[#233D50]' : 'bg-panels', 'rounded-md py-2 pl-4 pr-2 md:px-6 md:py-2 md:text-lg')}
      to={`/contest/${number}/${DEFAULT_DISCIPLINE}`}
    >
      Contest {number} {ongoing ? '(ongoing)' : null}
    </Link>
  )
}
