import {
  CubeSwitcher,
  GhostButton,
  GoogleIcon,
  PrimaryButton,
  SecondaryButton,
  UnderlineButton,
  AllContestsIcon,
  ArrowBackUpIcon,
  ArrowRightIcon,
  AvatarIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  DashboardIcon,
  DiscordIcon,
  ExclamationCircleIcon,
  GithubIcon,
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
  CubeIcon,
  CubeBadge,
} from '@/components/ui'
import {
  toast,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui'

export function UiKit() {
  return (
    <div>
      <div className='bg-card-gradient flex h-40 gap-1 rounded-2xl text-primary-80'>
        <AllContestsIcon />
        <ArrowBackUpIcon />
        <ArrowRightIcon />
        <AvatarIcon />
        <CheckIcon />
        <CloseIcon />
        <CubeIcon cube='3by3' />
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
        <GithubIcon />
        <GoogleIcon />
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
          <SecondaryButton size='iconLg'>
            <ArrowRightIcon />
          </SecondaryButton>
          <SecondaryButton size='iconLg' disabled>
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
          <CubeSwitcher cube='3by3' />
        </div>

        <SecondaryButton
          onClick={() => {
            toast({ title: 'Test toast!', description: 'This is a test toast.' })
          }}
        >
          Toast!
        </SecondaryButton>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <PrimaryButton>Modal</PrimaryButton>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}
