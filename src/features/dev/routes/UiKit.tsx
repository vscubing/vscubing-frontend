import {
  AllContestsIcon,
  ArrowBackUpIcon,
  ArrowRightIcon,
  AvatarIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  Cube3Icon,
  DashboardIcon,
  DiscordIcon,
  ExclamationCircleIcon,
  LeaderboardIcon,
  LinkedinIcon,
  LogoutIcon,
  MenuIcon,
  OngoingContestIcon,
  PlayForwardIcon,
  PlayIcon,
  PlaySkipBackIcon,
  PlaySkipForwardIcon,
  PlaybackIcon,
  ShareIcon,
  SortIcon,
  StopIcon,
} from '@/components/icons'
import { Button, ButtonUnderline } from '@/components'

export function UiKit() {
  return (
    <>
      <div className='bg-gradient flex h-40 gap-1 rounded-2xl text-primary-100'>
        <AllContestsIcon />
        <ArrowBackUpIcon />
        <ArrowRightIcon />
        <AvatarIcon />
        <CheckIcon />
        <CloseIcon />
        <Cube3Icon />
        <DashboardIcon />
        <DiscordIcon />
        <ExclamationCircleIcon />
        <LeaderboardIcon />
        <ChevronLeftIcon />
        <ChevronRightIcon />
        <LinkedinIcon />
        <LogoutIcon />
        <MenuIcon />
        <OngoingContestIcon />
        <PlayForwardIcon />
        <PlayIcon />
        <PlaySkipBackIcon />
        <PlaySkipForwardIcon />
        <PlaybackIcon />
        <ShareIcon />
        <SortIcon />
        <StopIcon />
      </div>

      <div className='mt-2 flex flex-wrap items-start gap-2 [&>div]:flex [&>div]:items-start [&>div]:gap-2'>
        <div>
          <Button>Button</Button>
          <Button disabled>Button</Button>
          <Button size='sm'>Button</Button>
          <Button size='sm' disabled>
            Button
          </Button>
        </div>
        <div>
          <Button variant='secondary'>Button</Button>
          <Button variant='secondary' disabled>
            Button
          </Button>
          <Button variant='secondary' size='sm'>
            Button
          </Button>
          <Button variant='secondary' size='sm' disabled>
            Button
          </Button>
        </div>
        <div>
          <Button variant='secondary' size='icon'>
            <ArrowRightIcon />
          </Button>
          <Button variant='secondary' size='icon' disabled>
            <ArrowRightIcon />
          </Button>
          <Button variant='secondary' size='iconSm'>
            <ArrowRightIcon />
          </Button>
          <Button variant='secondary' size='iconSm' disabled>
            <ArrowRightIcon />
          </Button>
        </div>
        <div>
          <ButtonUnderline>Button</ButtonUnderline>
          <ButtonUnderline disabled>Button</ButtonUnderline>
          <ButtonUnderline size='sm'>Button</ButtonUnderline>
          <ButtonUnderline size='sm' disabled>
            Button
          </ButtonUnderline>
        </div>
      </div>
    </>
  )
}
