import { useDashbordData } from '@/api'

export const Dashboard = () => {
  const { data } = useDashbordData()

  return (
    <div className='flex justify-center gap-20 pt-10'>
      <div>
        <h2>Contests</h2>
        {data ? data.contests.map((contest) => <div key={contest.id}>Contest {contest.name}</div>) : 'loading...'}
      </div>
      <div>
        <h2>Best Solves</h2>
        {data
          ? data.best_solves.map((solve) => (
              <div className='flex gap-2'>
                <span>{solve.user.username}</span>
                <span>{solve.time_ms}</span>
              </div>
            ))
          : 'loading...'}
      </div>
    </div>
  )
}
