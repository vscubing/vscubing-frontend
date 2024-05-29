import { Header } from '@/components/layout'
import { BestSolves, LatestContests, OngoingContestBanner } from '../components'
import { cn } from '@/utils'
import dashboardEmptyImg from '@/assets/images/dashboard-empty.svg'
import { type ContestListDTO } from '@/shared/contests'
import { useUser } from '@/features/auth'

export function Dashboard() {
  const { data: user } = useUser()
  const latestContests = undefined // TODO: fix when codegen from OpenAPI is ready

  const title = user?.username ? `Greetings, ${user.username}` : 'Greetings, SpeedCubers'
  return (
    <div className='flex flex-1 flex-col gap-3 sm:gap-2'>
      <Header title={title} />
      <h1 className='flex min-h-28 items-center px-4 font-kanit text-secondary-20 xl-short:min-h-0 xl-short:py-2 lg:min-h-0 lg:p-4 sm:p-0'>
        <span className='text-[clamp(1.75rem,2.5vw,2.25rem)] lg:hidden'>
          Are you ready to take your love for cubing <span className='whitespace-nowrap'>to the next level?</span>
        </span>

        <span className='title-h1 sm:title-lg hidden lg:inline'>{title}</span>
      </h1>
      <OngoingContestBanner />
      <Lists className='flex-1' latestContests={latestContests} bestSolves={undefined} />
    </div>
  )
}

function Lists({
  className,
  latestContests,
  bestSolves,
}: {
  className?: string
  latestContests?: ContestListDTO
  bestSolves?: unknown[] // TODO:
}) {
  if (latestContests?.results.length === 0 && bestSolves?.length === 0) {
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
    <div className={cn('flex flex-wrap gap-3 sm:flex-col sm:flex-nowrap sm:gap-2', className)}>
      <LatestContests
        className='min-h-[calc(50%-0.75rem/2)] flex-grow-[1] basis-[calc(40%-0.75rem/2)] sm:min-h-0 sm:basis-auto'
        contests={latestContests?.results}
      />
      <BestSolves
        className='min-h-[calc(50%-0.75rem/2)] min-w-[35rem] flex-grow-[1] basis-[calc(60%-0.75rem/2)] sm:min-h-0 sm:min-w-0 sm:flex-1 sm:basis-auto'
        solves={undefined}
      />
    </div>
  )
}
