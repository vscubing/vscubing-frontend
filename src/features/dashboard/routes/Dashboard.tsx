import { useQuery } from '@tanstack/react-query'
import cubesCardBg from '@/assets/images/cubes-card-bg.svg'
import { CubeBadge, Header, PrimaryButton, UnderlineButton } from '@/components'
import { userQuery } from '@/features/auth'
import { Link } from '@tanstack/react-router'
import { BestSolves, LatestContests } from '../components'
import { dashboardQuery } from '../api'

export function Dashboard() {
  const { data: userData } = useQuery(userQuery)
  const { data } = useQuery(dashboardQuery)

  return (
    <div className='flex h-full flex-col gap-3'>
      <Header caption={userData ? `Greetings, ${userData.username}` : 'Greetings, SpeedCubers'} />
      <h1 className='title-h1 flex min-h-28 items-center justify-center px-4 text-center text-secondary-20'>
        <span>
          Are you ready to take your love for cubing <span className='text-nowrap'>to the next level?</span>
        </span>
      </h1>
      <section className='card-gradient'>
        <div
          style={{ backgroundImage: `url(${cubesCardBg})` }}
          className='flex justify-between bg-contain bg-[position:35%,center] bg-no-repeat p-4'
        >
          <div className='flex flex-col items-start justify-between gap-2'>
            <h2 className='title-lg'>
              <span className='text-secondary-20'>Ongoing</span> Contest
            </h2>
            <PrimaryButton asChild>
              <Link to='contest'>Solve now</Link>
            </PrimaryButton>
          </div>
          <div className='text-right'>
            <p className='title-h3 mb-3'>Duration</p>
            <p className='mb-6 text-lg'>10 Dec 2023-17 Dec 2023</p>
            <Link to='/contest' search={{ discipline: '3by3' }} className='inline-block rounded-xl'>
              <CubeBadge
                cube='3by3'
                className='transition-base outline-ring bg-secondary-40 hover:bg-secondary-20 active:bg-secondary-40'
              />
            </Link>
          </div>
        </div>
      </section>
      <div className='flex flex-1 flex-wrap gap-3'>
        <section className='min-h-[calc(50%-0.75rem/2)] flex-grow-[1] basis-[calc(40%-0.75rem/2)] whitespace-nowrap rounded-2xl bg-black-80 px-6 py-4'>
          <div className='mb-6 flex justify-between'>
            <h2 className='title-h3'>Latest contests</h2>
            <UnderlineButton asChild>
              <Link>View all</Link>
            </UnderlineButton>
          </div>
          <LatestContests contests={data?.contests} /> {/* TODO: add loading state */}
        </section>
        <section className='min-h-[calc(50%-0.75rem/2)] flex-grow-[1] basis-[calc(60%-0.75rem/2)] rounded-2xl bg-black-80 px-6 py-4'>
          <div className='mb-6 flex justify-between'>
            <h2 className='title-h3'>Best solves ever</h2>
            <UnderlineButton asChild>
              <Link to='/leaderboard'>View all</Link>
            </UnderlineButton>
          </div>
          <BestSolves solves={data?.bestSolves} /> {/* TODO: add loading state */}
        </section>
      </div>
    </div>
  )
}
