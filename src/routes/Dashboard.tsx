import { useDashbordData } from '@/api'
import { Link } from 'react-router-dom'

export const Dashboard = () => {
  const { data } = useDashbordData()

  return (
    <div className='flex justify-center gap-20 pt-10'>
      <div>
        <h2>Contests</h2>
        {data
          ? data.contests.map(({ id, name }) => <ContestLink key={id} id={id} name={String(name)} />)
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

type ContestLinkProps = { name: string; id: number }
const ContestLink = ({ id, name }: ContestLinkProps) => {
  return <Link to={`/contest/${id}/3by3`}>Contest {name}</Link>
}
