import { useQuery } from '@tanstack/react-query'
import { CubeBadge, PrimaryButton } from '@/components/ui'
import { Header } from '@/components/layout'
import { userQuery } from '@/features/auth'
import { Link, getRouteApi } from '@tanstack/react-router'
import { BestSolves, LatestContests } from '../components'
import BannerDivider from '@/assets/images/banner-divider.svg?react'
import { type DashboardDTO } from '../api'
import { cn } from '@/utils'
import dashboardEmptyImg from '@/assets/images/dashboard-empty.svg'

const route = getRouteApi('/')
export function Dashboard() {
  const { data: user } = useQuery(userQuery)
  const query = route.useLoaderData()
  const { data } = useQuery(query)

  return (
    <div className='contents'>
      <Header caption={user?.username ? `Greetings, ${user.username}` : 'Greetings, SpeedCubers'} />
      <div className='flex flex-col gap-3'>
        <h1 className='title-h1 flex min-h-28 items-center px-4 text-secondary-20 lg-short:min-h-[4.3rem]'>
          <span>
            Are you ready to take your love for cubing <span className='whitespace-nowrap'>to the next level?</span>
          </span>
        </h1>
        <OngoingContestBanner />
        <Lists className='flex-1' latestContests={data?.contests} bestSolves={data?.bestSolves} />
      </div>
    </div>
  )
}

function OngoingContestBanner() {
  return (
    <section className='bg-card-gradient relative rounded-2xl @container'>
      <BannerDivider className='absolute right-44 top-0 h-full text-black-100' />
      <div className='relative flex justify-between bg-banner-cubes bg-contain bg-center bg-no-repeat p-4 @8xl:bg-banner-cubes-wide'>
        <div className='flex flex-col items-start justify-between gap-2'>
          <h2 className='title-lg'>
            <span className='text-secondary-20'>Ongoing</span> Contest
          </h2>
          <PrimaryButton asChild>
            <Link to='/contests/ongoing'>Solve now</Link>
          </PrimaryButton>
        </div>
        <div className='text-right'>
          <p className='title-h3 mb-3'>Duration</p>
          <p className='mb-6 text-lg' /* TODO: get from backend */>10 Dec 2023-17 Dec 2023</p>
          <Link to='/contests/ongoing' search={{ discipline: '3by3' }} className='inline-block rounded-xl'>
            {/* TODO: get from backend */}
            <CubeBadge
              cube='3by3'
              className='transition-base outline-ring hover:bg-secondary-40 active:bg-secondary-20'
            />
          </Link>
        </div>
      </div>
    </section>
  )
}

function Lists({
  className,
  latestContests,
  bestSolves,
}: {
  className?: string
  latestContests?: DashboardDTO['contests']
  bestSolves?: DashboardDTO['bestSolves']
}) {
  if (latestContests?.length === 0 && bestSolves?.length === 0) {
    return (
      <div className={cn('flex flex-col gap-6 rounded-2xl bg-black-80 px-6 pb-4 pt-9', className)}>
        <h2 className='title-h3 text-center'>
          Invite friends to participate in a contest, compare your results and share solves
        </h2>
        <div className='relative flex-1'>
          <img src={dashboardEmptyImg} className='absolute left-0 top-0 h-full w-full object-contain' />
        </div>
      </div>
    )
  }

  return (
    <div className={cn('flex flex-wrap gap-3', className)}>
      <LatestContests
        className='min-h-[calc(50%-0.75rem/2)] flex-grow-[1] basis-[calc(40%-0.75rem/2)]'
        contests={latestContests}
      />
      <BestSolves
        className='min-h-[calc(50%-0.75rem/2)] min-w-[35rem] flex-grow-[1] basis-[calc(60%-0.75rem/2)]'
        solves={bestSolves}
      />
    </div>
  )
}
