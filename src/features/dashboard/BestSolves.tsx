import { ReconstructTimeButton } from '@/components'
import { Link } from 'react-router-dom'
import CubeIcon from '@/assets/3by3.svg?react'
import { DashboardResponse } from '@/api/contests'
import { useReconstructor } from '../reconstructor'

type BestSolvesProps = { bestSolves?: DashboardResponse['best_solves'] }
export const BestSolves = ({ bestSolves }: BestSolvesProps) => {
  const { showReconstruction } = useReconstructor()

  return (
    <div>
      {bestSolves
        ? bestSolves.map((solve) => (
            <div key={solve.id} className='flex items-center rounded-[5px] bg-panels py-[13px] pl-[17px] pr-[12px]'>
              <CubeIcon className='mr-[12px] w-[23px] text-[#35424B]' />
              <span className='mr-[12px] w-[140px] border-r-[1px] border-[#A0A0A0]/50 py-[3px] pr-[12px]'>
                {solve.user.username}
              </span>
              <ReconstructTimeButton time_ms={solve.time_ms} onClick={() => showReconstruction(solve.id)} />
              <Link className='btn-action ml-auto' to={`/contest/${solve.contest_number}`}>
                leaderboard
              </Link>
            </div>
          ))
        : 'loading...'}
    </div>
  )
}
