import { CubeBadge, CubeButton, GhostButton, PrimaryButton, SecondaryButton, UnderlineButton } from '@/components'
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

export function UiKit() {
  return (
    <>
      <div className='card-gradient flex h-40 gap-1 rounded-2xl text-primary-100'>
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
          <PrimaryButton>Button text</PrimaryButton>
          <PrimaryButton disabled>Button text</PrimaryButton>
          <PrimaryButton size='sm'>Button</PrimaryButton>
          <PrimaryButton size='sm' disabled>
            Button
          </PrimaryButton>
        </div>
        <div>
          <SecondaryButton>Button text</SecondaryButton>
          <SecondaryButton disabled>Button text</SecondaryButton>
          <SecondaryButton size='sm'>Button</SecondaryButton>
          <SecondaryButton size='sm' disabled>
            Button
          </SecondaryButton>
        </div>
        <div>
          <SecondaryButton size='icon'>
            <ArrowRightIcon />
          </SecondaryButton>
          <SecondaryButton size='icon' disabled>
            <ArrowRightIcon />
          </SecondaryButton>
          <SecondaryButton size='iconSm'>
            <ArrowRightIcon />
          </SecondaryButton>
          <SecondaryButton size='iconSm' disabled>
            <ArrowRightIcon />
          </SecondaryButton>
        </div>
        <div>
          <UnderlineButton>Button text</UnderlineButton>
          <UnderlineButton disabled>Button text</UnderlineButton>
          <UnderlineButton size='sm'>Button</UnderlineButton>
          <UnderlineButton size='sm' disabled>
            Button
          </UnderlineButton>
        </div>
        <div>
          <GhostButton>
            Button text <LogoutIcon />
          </GhostButton>
          <GhostButton disabled>
            Button text <LogoutIcon />
          </GhostButton>
          <GhostButton size='sm'>
            <ArrowBackUpIcon /> Go back
          </GhostButton>
          <GhostButton size='sm' disabled>
            <ArrowBackUpIcon /> Go back
          </GhostButton>
        </div>
        <div>
          <CubeBadge cube='3by3' />
          <CubeButton cube='3by3' />
        </div>
      </div>
    </>
  )
}
