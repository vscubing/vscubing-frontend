import { CubeIcon, Ellipsis, SolveTimeButton, SecondaryButton } from '@/components'
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
      <ul className='min-w-[29.5rem]'>
        {solves
          ? solves.map(({ id, user: { username }, timeMs, discipline }) => (
              <li key={id} className='flex h-15 items-center rounded-xl bg-grey-100 pl-3'>
                <CubeIcon className='mr-3' cube='3by3' />
                <Ellipsis className='relative mr-3 w-0 flex-1 border-r border-grey-60 pr-2'>{username}</Ellipsis>
                <SolveTimeButton className='mr-4' timeMs={timeMs} onClick={() => showReconstruction(id)} />
                <SecondaryButton asChild>
                  <Link className='btn-action' to='/leaderboard/$discipline' params={{ discipline: discipline.name }}>
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
