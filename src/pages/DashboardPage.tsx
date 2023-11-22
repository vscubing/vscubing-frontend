import { useDashboard } from '@/api/contests'
import { ContestsList, BestSolves } from '@/features/dashboard'

export const DashboardPage = () => {
  const { data } = useDashboard()

  return (
    <div className='flex flex-col-reverse gap-8 md:grid md:grid-cols-[1fr_1fr] md:gap-10 lg:gap-20 xl:gap-40'>
      <div>
        <h2 className='mb-3 text-xl md:mb-6 lg:text-2xl'>Contests</h2>
        <ContestsList contests={data?.contests} />
      </div>
      <div>
        <h2 className='mb-3 text-xl md:mb-6 lg:text-2xl'>Best Solves</h2>
        <BestSolves bestSolves={data?.best_solves} />
      </div>
    </div>
  )
}
