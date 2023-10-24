import { useDashbordData } from '@/api'
import { ReconstructTimeButton } from '@/components'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

export const DashboardPage = () => {
  const { data } = useDashbordData()
  const contests = data?.contests && [...data.contests].reverse()

  return (
    <div className='grid grid-cols-[1fr_1fr] gap-[150px]'>
      <div>
        <h2 className='mb-[26px] text-[20px]'>Contests</h2>
        {contests ? (
          <div className='flex flex-col gap-[26px]'>
            {contests.map(({ contest_number, ongoing }) => (
              <ContestLink key={contest_number} number={contest_number} ongoing={ongoing} />
            ))}
          </div>
        ) : (
          'loading...'
        )}
      </div>
      <div>
        <h2 className='mb-[26px] text-[20px]'>Best Solves</h2>
        {data
          ? data.best_solves.map((solve) => (
              <div key={solve.id} className='flex gap-2'>
                <span>{solve.discipline}</span>
                <span>{solve.username}</span>
                <ReconstructTimeButton time_ms={solve.time_ms} solveId={solve.id} />
                <Link to={`/contest/${solve.contest}`}>leaderboard</Link>
              </div>
            ))
          : 'loading...'}
      </div>
    </div>
  )
}

type ContestLinkProps = { number: number; ongoing: boolean }
const ContestLink = ({ number, ongoing }: ContestLinkProps) => {
  return (
    <Link
      className={classNames(ongoing ? 'bg-[#233D50]' : 'bg-panels', 'rounded-[5px] px-[25px] py-[9px] text-[18px]')}
      to={`/contest/${number}`}
    >
      Contest {number} {ongoing ? '(ongoing)' : null}
    </Link>
  )
}
