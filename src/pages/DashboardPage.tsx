import { useDashbordData } from '@/api'
import { useReconstructor } from '@/providers'
import { formatSolveTime } from '@/utils'
import { Link } from 'react-router-dom'

export const DashboardPage = () => {
  const { data } = useDashbordData()
  const { showSolve } = useReconstructor()

  return (
    <div className='flex justify-center gap-20 pt-10'>
      <div>
        <h2>Contests</h2>
        {data
          ? data.contests.map(({ contest_number, ongoing }) => (
              <ContestLink key={contest_number} number={contest_number} ongoing={ongoing} />
            ))
          : 'loading...'}
      </div>
      <div>
        <h2>Best Solves</h2>
        {data
          ? data.best_solves.map((solve) => (
              <div key={solve.id} className='flex gap-2'>
                <span>{solve.discipline}</span>
                <span>{solve.username}</span>
                <span className='cursor-pointer' onClick={() => showSolve(solve)}>
                  {formatSolveTime(solve.time_ms)}
                </span>
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
    <Link className='block' to={`/contest/${number}`}>
      Contest {number} {ongoing ? '(ongoing)' : null}
    </Link>
  )
}
