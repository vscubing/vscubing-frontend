import { DashboardIcon, LeaderboardIcon, AllContestsIcon, OngoingContestIcon } from '@/components/ui'
import { ongoingContestNumberQuery } from '@/features/contests'
import { DEFAULT_DISCIPLINE } from '@/types'
import { cn } from '@/utils'
import { useQuery } from '@tanstack/react-query'
import { Link, useMatchRoute, type LinkProps } from '@tanstack/react-router'

type NavbarProps = {
  onItemSelect?: () => void
}

export function Navbar({ onItemSelect }: NavbarProps) {
  const { data: ongoingContestNumber } = useQuery(ongoingContestNumberQuery)
  const matchRoute = useMatchRoute()
  const isOnContests = !!matchRoute({
    to: '/contests',
    fuzzy: true,
  })
  const isOnOngoingContest = !!matchRoute({
    to: '/contests/$contestNumber',
    fuzzy: true,
    params: { contestNumber: String(ongoingContestNumber) },
  })
  const shouldHighlightAllContests = isOnContests && !isOnOngoingContest

  return (
    <nav className='flex flex-col gap-4 xl-short:gap-1 sm:gap-0'>
      {getLinks(ongoingContestNumber, shouldHighlightAllContests).map(
        ({ children, activeCondition = true, ...props }) => (
          <Link
            {...props}
            key={props.to}
            activeProps={{
              className: cn({
                'text-primary-80 hover:text-primary-80 after:h-[1.5px] after:scale-x-100': activeCondition,
              }),
            }}
            onClick={onItemSelect}
            className='title-h3 after-border-bottom transition-base outline-ring flex items-center gap-4 p-4 text-grey-20 after:origin-[0%_50%] after:bg-primary-80 hover:text-primary-60 active:text-primary-80 sm:gap-3 sm:p-3'
          >
            {children}
          </Link>
        ),
      )}
    </nav>
  )
}

function getLinks(
  ongoingContestNumber: number | undefined,
  shouldHighlightAllContests: boolean,
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
      activeCondition: shouldHighlightAllContests,
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
