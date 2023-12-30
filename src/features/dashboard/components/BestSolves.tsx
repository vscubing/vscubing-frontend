import { Cube3Icon, ReconstructTimeButton, SecondaryButton } from '@/components'
import { Link } from '@tanstack/react-router'
import { type DashboardDTO } from '../api/getDashboard'
import { useReconstructor } from '@/features/reconstructor'

type BestSolvesProps = { solves?: DashboardDTO['bestSolves'] }
export function BestSolves({ solves }: BestSolvesProps) {
  const { showReconstruction } = useReconstructor()

  return (
    <>
      <div className='mb-1 flex gap-3 text-grey-40'>
        <span>Type</span>
        <span>Nickname</span>
      </div>
      <ul>
        {solves
          ? solves.map(({ id, user: { username }, timeMs, discipline }) => (
              <li key={id} className='h-15 flex items-center rounded-xl bg-grey-100 pl-3'>
                <Cube3Icon className='mr-3' />
                <div
                  className='relative w-0 flex-1 overflow-x-clip text-ellipsis border-r border-grey-60 pr-1'
                  title={username}
                >
                  {username}
                </div>
                <ReconstructTimeButton className='mr-3' timeMs={timeMs} onClick={() => showReconstruction(id)} />
                <SecondaryButton asChild>
                  <Link
                    className='btn-action ml-auto'
                    to='/leaderboard/$discipline'
                    params={{ discipline: discipline.name }}
                  >
                    leaderboard
                  </Link>
                </SecondaryButton>
              </li>
            ))
          : 'Loading...'}
      </ul>
    </>
  )
}
