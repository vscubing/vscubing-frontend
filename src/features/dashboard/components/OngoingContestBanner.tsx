import { CubeBadge, ExclamationCircleIcon, PrimaryButton } from '@/components/ui'
import { Popover, PopoverCloseButton, PopoverContent, PopoverTrigger } from '@/components/ui'
import { useOngoingContestDuration } from '@/shared/contests'
import { DEFAULT_DISCIPLINE } from '@/types'
import { cn } from '@/utils'
import { Link } from '@tanstack/react-router'

export function OngoingContestBanner() {
  const isOnMaintenance = false
  return (
    <section className={cn('bg-card-gradient overflow-x-clip rounded-2xl')}>
      {isOnMaintenance ? (
        <BannerOnMaintenance />
      ) : (
        <>
          <BannerContent className='lg:hidden' />
          <BannerContentMobile className='hidden lg:flex' />
        </>
      )}
    </section>
  )
}

function BannerContent({ className }: { className?: string }) {
  return (
    <div className={cn('flex', className)}>
      <div className='relative mr-32'>
        <div className={cn('flex h-full flex-col justify-end gap-2 py-4 pl-4 xl-short:pt-0', className)}>
          <h3 className='title-h3 text-center'>Type</h3>
          <Disciplines />
        </div>
        <Divider className='absolute -right-32 top-0 h-full w-36' />
      </div>

      <div className='relative mr-32'>
        <div className='flex flex-col items-start justify-between gap-4 py-4 xl-short:pt-0'>
          <Title />
          <div className='flex w-full items-end justify-between'>
            <div>
              <p className='title-h3 mb-2'>Duration</p>
              <Duration />
            </div>
            <PrimaryButton asChild>
              <Link search={{ discipline: DEFAULT_DISCIPLINE }} to='/contests/ongoing'>
                Solve now
              </Link>
            </PrimaryButton>
          </div>
        </div>
        <Divider className='absolute -right-40 top-0 h-full w-36' />
      </div>
      <ForegroundCubes />
    </div>
  )
}

function BannerContentMobile({ className }: { className?: string }) {
  return (
    <div className={cn('flex sm:flex-col sm:px-3 sm:py-4', className)}>
      <div className='relative z-10 py-4 pl-4 sm:flex sm:items-center sm:gap-4 sm:p-0'>
        <Title />

        <Popover>
          <PopoverContent>
            <p>Solving from mobile devices is currently not supported</p>
            <PopoverCloseButton />
          </PopoverContent>

          <PopoverTrigger className='absolute -right-11 top-4 sm:static'>
            <ExclamationCircleIcon />
          </PopoverTrigger>
        </Popover>
      </div>

      <div className='relative flex-1 sm:hidden'>
        <Divider className='absolute -right-6 bottom-0 top-0 w-[calc(100%+2.5rem)] min-w-32 max-w-64' />
      </div>
      <div className='flex flex-col items-end gap-6 py-4 pr-4 text-right sm:flex-row-reverse sm:items-center sm:justify-end sm:gap-2 sm:p-0 sm:text-left'>
        <div className='space-y-3 sm:space-y-1'>
          <p className='title-h3'>Duration</p>
          <Duration />
        </div>
        <Disciplines />
      </div>
    </div>
  )
}

function BannerOnMaintenance() {
  return (
    <div className='flex gap-60'>
      <div className='relative py-6 pl-4 sm:px-3 sm:py-4'>
        <div>
          <Title className='mb-3 sm:mb-0' />
          <p className='text-large'>Currently down for maintenance</p>
        </div>
        <Divider className='absolute -right-28 top-0 h-full w-28 sm:hidden' />
      </div>
      <ForegroundCubes className='sm:hidden' />
    </div>
  )
}

function Duration() {
  const duration = useOngoingContestDuration()
  return duration ? (
    <p className='text-large'>{duration}</p>
  ) : (
    <p className='text-large w-36 animate-pulse bg-grey-100 text-grey-100'>Loading...</p>
  )
}

function Disciplines() {
  return (
    <div className='flex'>
      <Link to='/contests/ongoing' search={{ discipline: '3by3' }} className='outline-ring group flex flex-col gap-2'>
        {/* TODO: get from backend */}
        <CubeBadge
          cube='3by3'
          className='transition-base outline-ring group-hover:bg-secondary-40 group-active:bg-secondary-20'
        />
        <span className='btn-lg text-center lg:hidden'>3x3</span>
      </Link>
    </div>
  )
}

function Divider({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'pointer-events-none bg-black-100 [clip-path:polygon(max(calc(100%_-_7px),0px)_0,100%_0%,7px_100%,0%_100%)]',
        className,
      )}
    ></div>
  )
}

function Title({ className }: { className?: string }) {
  return (
    <h2 className={cn('title-lg', className)}>
      <span className='text-secondary-20'>Ongoing</span> Contest
    </h2>
  )
}

function ForegroundCubes({ className }: { className?: string }) {
  return (
    <div className={cn('relative flex-1 @container', className)}>
      <div className='absolute -left-10 top-0 h-full w-[calc(100%+20*(.25rem))] bg-[length:auto_100%] @[4rem]:bg-dashboard-banner-cubes @[20rem]:bg-dashboard-banner-cubes-wide'></div>
    </div>
  )
}
