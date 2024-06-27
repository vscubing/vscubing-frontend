import { DashboardIcon, LeaderboardIcon, AllContestsIcon, OngoingContestIcon } from '@/components/ui'
import { useOngoingSlug } from '@/shared/contests'
import { DEFAULT_DISCIPLINE } from '@/types'
import { cn } from '@/utils'
import { Link, useMatchRoute, type LinkProps } from '@tanstack/react-router'
import { type ReactNode } from 'react'

type NavbarProps = {
  onItemSelect?: () => void
  variant: 'vertical' | 'horizontal'
}

export function Navbar({ onItemSelect, variant }: NavbarProps) {
  const navbarLinks = useNavbar()

  if (variant === 'vertical') {
    return (
      <nav className='flex flex-col gap-4 xl-short:gap-1 sm:gap-0'>
        {navbarLinks.map(({ children, activeCondition = true, ...props }) => (
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
        ))}
      </nav>
    )
  }

  if (variant === 'horizontal') {
    return (
      <nav className='flex justify-between gap-2 overflow-y-auto px-1 py-2'>
        {navbarLinks.map(({ children, activeCondition = true, ...props }) => (
          <Link
            {...props}
            key={props.to}
            onClick={onItemSelect}
            activeProps={{
              className: cn({
                'text-primary-80 hover:text-primary-80': activeCondition,
              }),
            }}
            className='caption-sm transition-base flex min-w-[4.625rem] flex-col items-center gap-1 whitespace-nowrap px-1 text-grey-20 active:text-primary-80'
          >
            {children}
          </Link>
        ))}
      </nav>
    )
  }
}

function useNavbar() {
  const { data: ongoingSlug } = useOngoingSlug()
  const matchRoute = useMatchRoute()

  const isOnContests = !!matchRoute({
    to: '/contests',
    fuzzy: true,
  })
  const isOnOngoingContest = !!matchRoute({
    to: '/contests/$contestSlug/results',
    fuzzy: true,
    params: { contestSlug: ongoingSlug },
  })

  const shouldHighlightAllContests = isOnContests && !isOnOngoingContest
  return getLinks(ongoingSlug, shouldHighlightAllContests)
}

function getLinks(
  ongoingContest: string | undefined,
  shouldHighlightAllContests: boolean,
): (LinkProps & { children: ReactNode } & { activeCondition?: boolean })[] {
  return [
    {
      children: (
        <>
          <DashboardIcon />
          <span>Dashboard</span>
        </>
      ),
      to: '/',
    },
    {
      children: (
        <>
          <LeaderboardIcon />
          <span>Leaderboard</span>
        </>
      ),
      to: '/leaderboard',
    },
    {
      children: (
        <>
          <AllContestsIcon />
          <span>Past contests</span>
        </>
      ),
      to: '/contests',
      search: { discipline: DEFAULT_DISCIPLINE, page: 1 },
      activeOptions: {
        includeSearch: false,
      },
      activeCondition: shouldHighlightAllContests,
    },
    {
      children: (
        <>
          <OngoingContestIcon />
          <span>Ongoing contest</span>
        </>
      ),
      to: `/contests/$contestSlug`,
      params: {
        discipline: DEFAULT_DISCIPLINE,
        contestSlug: ongoingContest === undefined ? undefined : ongoingContest,
      },
    },
  ]
}
