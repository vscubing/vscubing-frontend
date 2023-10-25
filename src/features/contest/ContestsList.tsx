import { IContestsList } from '@/api/contests'
import { ContestLink } from './ContestLink'

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
