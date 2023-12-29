import { DashboardIcon, LeaderboardIcon, AllContestsIcon, OngoingContestIcon } from '@/components'
import { Link } from '@tanstack/react-router'

export function Navbar() {
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
          },
          {
            children: (
              <>
                <LeaderboardIcon />
                Leaderboard
              </>
            ),
            to: '/leaderboard',
          },
          {
            children: (
              <>
                <AllContestsIcon />
                All contests
              </>
            ),
            to: '/dev/ui-kit',
          },
          {
            children: (
              <>
                <OngoingContestIcon />
                Ongoing contest
              </>
            ),
            to: `/contest`,
          },
        ] as const
      ).map(({ children, to }) => (
        <Link
          key={to}
          to={to}
          activeProps={{ className: 'border-current text-primary-100' }}
          inactiveProps={{ className: 'border-transparent' }}
          className={'title-h3 transition-base flex items-center gap-4 border-b-2 p-4 hover:text-primary-100'}
        >
          {children}
        </Link>
      ))}
    </nav>
  )
}
