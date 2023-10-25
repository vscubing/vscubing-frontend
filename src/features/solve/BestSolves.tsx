import { ReconstructTimeButton } from '@/components'
import { Link } from 'react-router-dom'
import CubeIcon from '@/assets/3by3.svg?react'
import { IBestSolves } from '@/api'

type BestSolvesProps = { bestSolves?: IBestSolves }
export const BestSolves = ({ bestSolves }: BestSolvesProps) => {
  return (
    <div>
      {bestSolves
        ? bestSolves.map((solve) => (
            <div key={solve.id} className='flex items-center rounded-[5px] bg-panels py-[13px] pl-[17px] pr-[12px]'>
              <CubeIcon className='mr-[12px] w-[23px] text-[#35424B]' />
              <span className='mr-[12px] w-[140px] border-r-[1px] border-[#A0A0A0]/50 py-[3px] pr-[12px]'>
                {solve.username}
              </span>
              <ReconstructTimeButton time_ms={solve.time_ms} solveId={solve.id} />
              <Link className='btn-action ml-auto' to={`/contest/${solve.contest}`}>
                leaderboard
              </Link>
            </div>
          ))
        : 'loading...'}
    </div>
  )
}
