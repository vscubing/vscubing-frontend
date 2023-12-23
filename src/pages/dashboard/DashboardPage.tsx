import { dashboardQuery } from '@/api/contests'
import { ContestsList } from './components/ContestsList'
import { BestSolves } from './components/BestSolves'
import { QueryClient, useQuery } from '@tanstack/react-query'

export function dashboardLoader({ context: { queryClient } }: { context: { queryClient: QueryClient } }) {
  queryClient.ensureQueryData(dashboardQuery)
}

export function DashboardPage() {
  const { data: dashboard } = useQuery(dashboardQuery)

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
