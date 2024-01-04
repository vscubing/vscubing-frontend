import { DashboardIcon, LeaderboardIcon, AllContestsIcon, OngoingContestIcon } from '@/components/ui'
import { ongoingContestNumberQuery } from '@/features/contests'
import { useQuery } from '@tanstack/react-query'
import { Link, type LinkProps } from '@tanstack/react-router'

export function Navbar() {
  const { data: ongoingContestNumber } = useQuery(ongoingContestNumberQuery)
  return (
    <nav className='flex flex-col gap-4 lg-short:gap-1'>
      {getLinks(ongoingContestNumber).map(({ children, ...props }) => (
        <Link
          {...props}
          key={props.to}
          activeProps={{
            className: 'text-primary-80 after:h-[1.5px] after:scale-x-100',
          }}
          className='title-h3 after-border-bottom transition-base outline-ring flex items-center gap-4 p-4 after:origin-[0%_50%] after:bg-primary-80 hover:text-primary-80 [&>svg]:h-6 [&>svg]:w-6'
        >
          {children}
        </Link>
      ))}
    </nav>
  )
}

function getLinks(ongoingContestNumber?: number): LinkProps[] {
  return [
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
      to: '/contest',
    },
    {
      children: (
        <>
          <OngoingContestIcon />
          Ongoing contest
        </>
      ),
      to: `/contest/$contestNumber`,
      params: { contestNumber: ongoingContestNumber === undefined ? undefined : String(ongoingContestNumber) },
    },
  ]
}
