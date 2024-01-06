import { DashboardIcon, LeaderboardIcon, AllContestsIcon, OngoingContestIcon } from '@/components/ui'
import { ongoingContestNumberQuery } from '@/features/contests'
import { DEFAULT_DISCIPLINE } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { Link, useMatchRoute, type LinkProps, type RegisteredRouter } from '@tanstack/react-router'

export function Navbar() {
  const { data: ongoingContestNumber } = useQuery(ongoingContestNumberQuery)
  const matchRoute = useMatchRoute()

  return (
    <nav className='flex flex-col gap-4 lg-short:gap-1'>
      {getLinks(ongoingContestNumber, matchRoute).map(({ children, activeCondition = true, ...props }) => (
        <Link
          {...props}
          key={props.to}
          activeProps={
            activeCondition
              ? {
                  className: 'text-primary-80 after:h-[1.5px] after:scale-x-100',
                }
              : undefined
          }
          className='title-h3 after-border-bottom transition-base outline-ring flex items-center gap-4 p-4 after:origin-[0%_50%] after:bg-primary-80 hover:text-primary-80 [&>svg]:h-6 [&>svg]:w-6'
        >
          {children}
        </Link>
      ))}
    </nav>
  )
}

function getLinks(
  ongoingContestNumber: number | undefined,
  matchRoute: ReturnType<typeof useMatchRoute<RegisteredRouter['routeTree']>>,
): (LinkProps & { activeCondition?: boolean })[] {
  return [
    {
      children: (
        <>
          <DashboardIcon />
          Dashboard
        </>
      ),
      to: '/',
      params: {},
    },
    {
      children: (
        <>
          <LeaderboardIcon />
          Leaderboard
        </>
      ),
      to: '/leaderboard',
      params: {},
    },
    {
      children: (
        <>
          <AllContestsIcon />
          All contests
        </>
      ),
      to: '/contests',
      activeCondition: !matchRoute({
        to: '/contests/$contestNumber',
        params: { contestNumber: String(ongoingContestNumber) },
      }),
      params: {},
    },
    {
      children: (
        <>
          <OngoingContestIcon />
          Ongoing contest
        </>
      ),
      to: `/contests/$contestNumber`,
      params: {
        discipline: DEFAULT_DISCIPLINE,
        contestNumber: ongoingContestNumber === undefined ? undefined : String(ongoingContestNumber),
      },
    },
  ]
}
