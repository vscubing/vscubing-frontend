import { useDashbordData } from '@/api'
import { ReconstructTimeButton } from '@/components'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import CubeIcon from '@/assets/3by3.svg?react'

export const DashboardPage = () => {
  const { data } = useDashbordData()
  const contests = data?.contests && [...data.contests].reverse()

  return (
    <div className='grid grid-cols-[1fr_1fr] gap-[150px]'>
      <div>
        <h2 className='mb-[26px] text-[20px]'>Contests</h2>
        {contests ? (
          <div className='flex flex-col gap-[26px]'>
            {contests.map(({ contest_number, ongoing }) => (
              <ContestLink key={contest_number} number={contest_number} ongoing={ongoing} />
            ))}
          </div>
        ) : (
          'loading...'
        )}
      </div>
      <div>
        <h2 className='mb-[26px] text-[20px]'>Best Solves</h2>
        {data
          ? data.best_solves.map((solve) => (
              <div key={solve.id} className='bg-panels flex items-center rounded-[5px] py-[13px] pl-[17px] pr-[12px]'>
                <CubeIcon className='mr-[12px] text-[#35424B]' />
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
    </div>
  )
}

type ContestLinkProps = { number: number; ongoing: boolean }
const ContestLink = ({ number, ongoing }: ContestLinkProps) => {
  return (
    <Link
      className={classNames(ongoing ? 'bg-[#233D50]' : 'bg-panels', 'rounded-[5px] px-[25px] py-[9px] text-[18px]')}
      to={`/contest/${number}`}
    >
      Contest {number} {ongoing ? '(ongoing)' : null}
    </Link>
  )
}
