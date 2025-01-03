import { Header } from '@/components/layout'
import { BestSolves, LatestContests, OngoingContestBanner } from '../components'
import dashboardEmptyImg from '@/assets/images/dashboard-empty.svg'
import { useContests } from '@/shared/contests'
import { useUser } from '@/features/auth'
import { useQuery } from '@tanstack/react-query'
import { contestsSolvesBestInEveryDisciplineList } from '@/api'

export function Dashboard() {
  const { data: user } = useUser()

  const title = user?.username ? `Greetings, ${user.username}` : 'Greetings, speedcubers'
  return (
    <div className='flex flex-1 flex-col gap-3 sm:gap-2'>
      <Header title={title} />
      <h1 className='flex min-h-28 items-center px-4 font-kanit text-secondary-20 xl-short:min-h-0 xl-short:py-2 lg:min-h-0 sm:p-0'>
        <span className='text-[clamp(1.75rem,2.5vw,2.25rem)] lg:hidden'>
          Are you ready to take your love for cubing <span className='whitespace-nowrap'>to the next level?</span>
        </span>

        <span className='title-h1 sm:title-lg hidden lg:inline'>{title}</span>
      </h1>
      <OngoingContestBanner />
      <Lists />
    </div>
  )
}

function Lists() {
  const { data: latestContests } = useContests({
    page: 1,
    pageSize: 5,
    disciplineSlug: '3by3',
  })
  const { data: bestSolves } = useQuery({
    queryKey: ['bestSolves'],
    queryFn: contestsSolvesBestInEveryDisciplineList,
  })

  if (latestContests?.results.length === 0 && bestSolves?.length === 0) {
    return (
      <div className='flex flex-1 flex-col gap-6 rounded-2xl bg-black-80 px-6 pb-4 pt-10'>
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
    <div className='flex flex-grow gap-3 md:flex-grow-0 md:flex-col sm:gap-2'>
      <LatestContests className='h-full basis-[calc(40%-0.75rem/2)]' contests={latestContests?.results} />
      <BestSolves className='h-full basis-[calc(60%-0.75rem/2)]' solves={bestSolves} />
    </div>
  )
}
