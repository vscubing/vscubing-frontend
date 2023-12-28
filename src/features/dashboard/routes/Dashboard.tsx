import { useQuery } from '@tanstack/react-query'
import { dashboardRoute } from '.'
import { ContestsList, BestSolves } from '../components'

export function Dashboard() {
  const query = dashboardRoute.useLoaderData()
  const { data: dashboard } = useQuery(query)

  return (
    <div className='flex flex-col-reverse gap-8 md:grid md:grid-cols-[1fr_1fr] md:gap-10 lg:gap-20 xl:gap-40'>
      <div>
        <h2 className='mb-3 text-xl md:mb-6 lg:text-2xl'>Contests</h2>
        {dashboard?.contests ? <ContestsList contests={dashboard.contests} /> : 'Loading...'}
      </div>
      <div>
        <h2 className='mb-3 text-xl md:mb-6 lg:text-2xl'>Best Solves</h2>
        {dashboard?.bestSolves ? <BestSolves bestSolves={dashboard.bestSolves} /> : 'Loading...'}
      </div>
    </div>
  )
}
