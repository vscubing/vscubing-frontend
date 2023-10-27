import { IContestsList } from '@/api/contests'
import { DEFAULT_DISCIPLINE } from '@/constants'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

type ContestsListProps = { contests?: IContestsList }
export const ContestsList = ({ contests }: ContestsListProps) => {
  const sortedContests = contests && [...contests].reverse()

  return sortedContests ? (
    <div className='flex flex-col gap-[26px]'>
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
      className={classNames(ongoing ? 'bg-[#233D50]' : 'bg-panels', 'rounded-[5px] px-[25px] py-[9px] text-[18px]')}
      to={`/contest/${number}/${DEFAULT_DISCIPLINE}`}
    >
      Contest {number} {ongoing ? '(ongoing)' : null}
    </Link>
  )
}
