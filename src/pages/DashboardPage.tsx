import { useDashbordData } from '@/api'
import { Link } from 'react-router-dom'

export const DashboardPage = () => {
  const { data } = useDashbordData()

  return (
    <div className='flex justify-center gap-20 pt-10'>
      <div>
        <h2>Contests</h2>
        {data
          ? data.contests.map(({ contest_number }) => <ContestLink key={contest_number} number={contest_number} />)
          : 'loading...'}
      </div>
      <div>
        <h2>Best Solves</h2>
        {data
          ? data.best_solves.map((solve) => (
              <div key={solve.id} className='flex gap-2'>
                <span>{solve.username}</span>
                <span>{solve.time_ms}</span>
              </div>
            ))
          : 'loading...'}
      </div>
    </div>
  )
}

type ContestLinkProps = { number: number }
const ContestLink = ({ number }: ContestLinkProps) => {
  return (
    <Link className='block' to={`/contest/${number}/3by3`}>
      Contest {number}
    </Link>
  )
}
