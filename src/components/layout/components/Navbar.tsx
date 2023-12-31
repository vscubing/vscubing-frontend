import { DashboardIcon, LeaderboardIcon, AllContestsIcon, OngoingContestIcon } from '@/components'
import { ongoingContestNumberQuery } from '@/features/contests'
import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'

export function Navbar() {
  const { data: ongoingContestNumber } = useQuery(ongoingContestNumberQuery)
  return (
    <nav className='flex flex-col gap-4'>
      {(
        [
          {
            children: (
              <>
                <DashboardIcon />
                Dashboard
              </>
            ),
            to: '/',
            params: undefined,
          },
          {
            children: (
              <>
                <LeaderboardIcon />
                Leaderboard
              </>
            ),
            to: '/leaderboard',
            params: undefined,
          },
          {
            children: (
              <>
                <AllContestsIcon />
                All contests
              </>
            ),
            to: '/dev/ui-kit',
            params: undefined,
          },
          {
            children: (
              <>
                <OngoingContestIcon />
                Ongoing contest
              </>
            ),
            to: `/contest/$contestNumber`,
            params: { contestNumber: ongoingContestNumber === undefined ? '' : String(ongoingContestNumber) },
          },
        ] as const
      ).map(({ children, to, params }) => (
        <Link
          key={to}
          to={to}
          params={params}
          activeProps={{
            className: 'text-primary-100 after:h-[2px] after:scale-x-100',
          }}
          className='title-h3 after-border-bottom flex items-center gap-4 p-4 after:origin-[0%_50%] after:bg-primary-100 hover:text-primary-100 [&>svg]:h-6 [&>svg]:w-6'
        >
          {children}
        </Link>
      ))}
    </nav>
  )
}
