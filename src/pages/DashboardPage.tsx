import { useDashbordData } from '@/api/contests'
import { ContestsList } from '@/features/contest'
import { BestSolves } from '@/features/solve'

export const DashboardPage = () => {
  const { data } = useDashbordData()

  return (
    <div className='grid grid-cols-[1fr_1fr] gap-[150px]'>
      <div>
        <h2 className='mb-[26px] text-[20px]'>Contests</h2>
        <ContestsList contests={data?.contests} />
      </div>
      <div>
        <h2 className='mb-[26px] text-[20px]'>Best Solves</h2>
        <BestSolves bestSolves={data?.best_solves} />
      </div>
    </div>
  )
}
