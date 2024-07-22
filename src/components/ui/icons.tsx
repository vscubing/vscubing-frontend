import Cube3Icon from '@/assets/icons/cube-3.svg?react'
import AllContestsIcon from '@/assets/icons/all-contests.svg?react'
import ArrowBackUpIcon from '@/assets/icons/arrow-back-up.svg?react'
import ArrowRightIcon from '@/assets/icons/arrow-right.svg?react'
import AvatarIcon from '@/assets/icons/avatar.svg?react'
import CheckIcon from '@/assets/icons/check.svg?react'
import CloseIcon from '@/assets/icons/close.svg?react'
import DashboardIcon from '@/assets/icons/dashboard.svg?react'
import DiscordIcon from '@/assets/icons/discord.svg?react'
import ExclamationCircleIcon from '@/assets/icons/exclamation-circle.svg?react'
import GoogleIcon from '@/assets/icons/google.svg?react'
import LeaderboardIcon from '@/assets/icons/leaderboard.svg?react'
import ChevronLeftIcon from '@/assets/icons/chevron-left.svg?react'
import ChevronRightIcon from '@/assets/icons/chevron-right.svg?react'
import LinkedinIcon from '@/assets/icons/linkedin.svg?react'
import LogoutIcon from '@/assets/icons/logout.svg?react'
import MenuIcon from '@/assets/icons/menu.svg?react'
import OngoingContestIcon from '@/assets/icons/ongoing-contest.svg?react'
import PlaySkipBackIcon from '@/assets/icons/play-skip-back.svg?react'
import PlaySkipForwardIcon from '@/assets/icons/play-skip-forward.svg?react'
import PlaybackIcon from '@/assets/icons/play-back.svg?react'
import PlayForwardIcon from '@/assets/icons/play-forward.svg?react'
import PlayIcon from '@/assets/icons/play.svg?react'
import ShareIcon from '@/assets/icons/share.svg?react'
import SortIcon from '@/assets/icons/sort.svg?react'
import StopIcon from '@/assets/icons/stop.svg?react'
import GithubIcon from '@/assets/icons/github.svg?react'
import EllipsisIcon from '@/assets/icons/ellipsis.svg?react'
import PlusIcon from '@/assets/icons/plus.svg?react'
import MinusIcon from '@/assets/icons/minus.svg?react'
import { type Discipline } from '@/types'
import { cn } from '@/utils'
import { type HTMLAttributes, forwardRef } from 'react'

export {
  AllContestsIcon,
  ArrowBackUpIcon,
  ArrowRightIcon,
  AvatarIcon,
  CheckIcon,
  CloseIcon,
  DashboardIcon,
  DiscordIcon,
  ExclamationCircleIcon,
  GoogleIcon,
  GithubIcon,
  LeaderboardIcon,
  ChevronLeftIcon,
  LinkedinIcon,
  LogoutIcon,
  MenuIcon,
  OngoingContestIcon,
  PlayForwardIcon,
  PlayIcon,
  PlaySkipBackIcon,
  PlaySkipForwardIcon,
  PlaybackIcon,
  ChevronRightIcon,
  ShareIcon,
  SortIcon,
  StopIcon,
  EllipsisIcon,
  PlusIcon,
  MinusIcon,
}

type CubeIconProps = HTMLAttributes<SVGSVGElement> & {
  cube: Discipline
}

const ICONS = { '3by3': Cube3Icon } as const
const CubeIcon = forwardRef<SVGSVGElement, CubeIconProps>(({ cube, className, ...props }, ref) => {
  const Comp = ICONS[cube]
  return <Comp {...props} ref={ref} className={cn('h-[27px] w-[27px]', className)} />
})
CubeIcon.displayName = 'CubeIcon'

export { CubeIcon }
