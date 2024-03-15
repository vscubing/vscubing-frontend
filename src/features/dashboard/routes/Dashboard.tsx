import { useQuery } from '@tanstack/react-query'
import { Header } from '@/components/layout'
import { userQuery } from '@/features/auth'
import { getRouteApi } from '@tanstack/react-router'
import { BestSolves, LatestContests, OngoingContestBanner } from '../components'
import { type DashboardDTO } from '../api'
import { cn } from '@/utils'
import dashboardEmptyImg from '@/assets/images/dashboard-empty.svg'

const route = getRouteApi('/')
export function Dashboard() {
  const { data: user } = useQuery(userQuery)
  const query = route.useLoaderData()
  const { data } = useQuery(query)

  const greeting = user?.username ? `Greetings, ${user.username}` : 'Greetings, SpeedCubers'
  return (
    <div className='flex flex-1 flex-col gap-3 sm:gap-2'>
      <Header caption={greeting} />
      <h1 className='flex min-h-28 items-center px-4 font-kanit text-secondary-20 xl-short:min-h-0 xl-short:py-2 lg:min-h-0 lg:p-4 sm:p-0'>
        <span className='text-[clamp(1.75rem,2.5vw,2.25rem)] lg:hidden'>
          Are you ready to take your love for cubing <span className='whitespace-nowrap'>to the next level?</span>
        </span>

        <span className='title-lg hidden lg:inline'>{greeting}</span>
      </h1>
      <OngoingContestBanner />
      <Lists className='flex-1' latestContests={data?.contests} bestSolves={data?.bestSolves} />
    </div>
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
      <div className={cn('flex flex-col gap-6 rounded-2xl bg-black-80 px-6 pb-4 pt-10', className)}>
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
