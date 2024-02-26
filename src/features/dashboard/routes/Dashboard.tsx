import { useQuery } from '@tanstack/react-query'
import { CubeBadge, PrimaryButton } from '@/components/ui'
import { Header } from '@/components/layout'
import { userQuery } from '@/features/auth'
import { Link, getRouteApi } from '@tanstack/react-router'
import { BestSolves, LatestContests } from '../components'
import { type DashboardDTO } from '../api'
import { cn } from '@/utils'
import dashboardEmptyImg from '@/assets/images/dashboard-empty.svg'

const route = getRouteApi('/')
export function Dashboard() {
  const { data: user } = useQuery(userQuery)
  const query = route.useLoaderData()
  const { data } = useQuery(query)

  return (
    <div className='flex flex-1 flex-col gap-3'>
      <Header caption={user?.username ? `Greetings, ${user.username}` : 'Greetings, SpeedCubers'} />
      <h1 className='flex min-h-28 items-center px-4 font-kanit text-[clamp(1.75rem,2.5vw,2.25rem)] text-secondary-20 lg-short:min-h-0 lg-short:py-2'>
        <span>
          Are you ready to take your love for cubing <span className='whitespace-nowrap'>to the next level?</span>
        </span>
      </h1>
      <OngoingContestBanner className='' />
      <Lists className='flex-1' latestContests={data?.contests} bestSolves={data?.bestSolves} />
    </div>
  )
}

function OngoingContestBanner({ className }: { className: string }) {
  return (
    <section className={cn('bg-card-gradient overflow-x-clip rounded-2xl', className)}>
      <div className='flex pl-4'>
        <div className='relative mr-32 after:absolute after:-right-36 after:top-0 after:block after:h-full after:w-40 after:bg-banner-divider after:bg-[length:100%]'>
          <div className='flex h-full flex-col justify-end gap-2 py-4 lg-short:pt-0'>
            <h3 className='title-h3 text-center'>Type</h3>
            <Link
              to='/contests/ongoing'
              search={{ discipline: '3by3' }}
              className='group flex flex-col gap-2 rounded-xl'
            >
              {/* TODO: get from backend */}
              <CubeBadge
                cube='3by3'
                className='transition-base outline-ring group-hover:bg-secondary-40 group-active:bg-secondary-20'
              />
              <span className='btn-lg text-center'>3x3</span>
            </Link>
          </div>
        </div>

        <div className='relative mr-32 after:absolute after:-right-40 after:top-0 after:block after:h-full after:w-40 after:bg-banner-divider after:bg-[length:100%]'>
          <div className='flex flex-col items-start justify-between gap-4 py-4 lg-short:pt-0'>
            <h2 className='title-lg'>
              <span className='text-secondary-20'>Ongoing</span> Contest
            </h2>
            <div className='flex w-full items-end justify-between'>
              <div>
                <p className='title-h3 mb-2'>Duration</p>
                <p className='text-lg' /* TODO: get from backend */>10 Dec 2023-17 Dec 2023</p>
              </div>
              <PrimaryButton asChild>
                <Link to='/contests/ongoing'>Solve now</Link>
              </PrimaryButton>
            </div>
          </div>
        </div>
        <div className='relative flex-1 @container'>
          <div className='absolute -left-10 top-0 h-full w-[calc(100%+20*(.25rem))] bg-[length:auto_100%] @[4rem]:bg-dashboard-banner-cubes @[24rem]:bg-dashboard-banner-cubes-wide'></div>
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
