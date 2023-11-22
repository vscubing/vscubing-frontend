import { DashboardResponse } from '@/api/contests'
import { DEFAULT_DISCIPLINE } from '@/constants'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

type ContestsListProps = { contests?: DashboardResponse['contests'] }
export const ContestsList = ({ contests }: ContestsListProps) => {
  const sortedContests = contests && [...contests].reverse()

  return sortedContests ? (
    <div className='flex flex-col gap-4 xl:gap-6'>
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
      className={classNames(ongoing ? 'bg-[#233D50]' : 'bg-panels', 'rounded-md px-4 py-2 text-lg md:px-6 md:py-2')}
      to={`/contest/${number}/${DEFAULT_DISCIPLINE}`}
    >
      Contest {number} {ongoing ? '(ongoing)' : null}
    </Link>
  )
}
