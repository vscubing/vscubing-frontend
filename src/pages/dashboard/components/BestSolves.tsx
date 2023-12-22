import { ReconstructTimeButton } from '@/components'
import { Link } from 'react-router-dom'
import CubeIcon from '@/assets/3by3.svg?react'
import { DashboardResponse } from '@/api/contests'
import { useReconstructor } from '@/integrations/reconstructor'

type BestSolvesProps = { bestSolves?: DashboardResponse['best_solves'] }
export function BestSolves({ bestSolves }: BestSolvesProps) {
  const { showReconstruction } = useReconstructor()

  return (
    <div>
      {bestSolves
        ? bestSolves.map(({ id, user: { username }, time_ms, discipline }) => (
            <div
              key={id}
              className='flex items-center rounded-md bg-panels py-2 pl-4 pr-2 text-sm md:py-3 md:pl-4 md:pr-6'
            >
              <CubeIcon className='mr-3 w-[23px] text-[#35424B]' />
              <span
                className='mr-3 w-[140px] overflow-x-hidden text-ellipsis border-r-[1px] border-[#A0A0A0]/50 pr-3'
                title={username}
              >
                {username}
              </span>
              <ReconstructTimeButton className='mr-3' time_ms={time_ms} onClick={() => showReconstruction(id)} />
              <Link className='btn-action ml-auto' to={`/leaderboard/${discipline.name}`}>
                leaderboard
              </Link>
            </div>
          ))
        : 'loading...'}
    </div>
  )
}
