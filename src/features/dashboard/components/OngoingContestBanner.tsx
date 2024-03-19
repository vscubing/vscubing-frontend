import { CubeBadge, ExclamationCircleIcon, PrimaryButton } from '@/components/ui'
import { cn } from '@/utils'
import { Link } from '@tanstack/react-router'

export function OngoingContestBanner() {
  return (
    <section className={cn('bg-card-gradient overflow-x-clip rounded-2xl')}>
      <BannerContent className='lg:hidden' />
      <BannerContentMobile className='hidden lg:flex' />
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
          <h2 className='title-lg'>
            <span className='text-secondary-20'>Ongoing</span> Contest
          </h2>
          <div className='flex w-full items-end justify-between'>
            <div>
              <p className='title-h3 mb-2'>Duration</p>
              <p className='text-lg' /* TODO: get from backend */>10 Dec 2023-17 Dec 2023</p>
            </div>
            <PrimaryButton asChild>
              <Link to='/contests/ongoing'>Solve now</Link>
            </PrimaryButton>
          </div>
        </div>
        <Divider className='absolute -right-40 top-0 h-full w-36' />
      </div>
      <div className='relative flex-1 @container'>
        <div className='absolute -left-10 top-0 h-full w-[calc(100%+20*(.25rem))] bg-[length:auto_100%] @[4rem]:bg-dashboard-banner-cubes @[24rem]:bg-dashboard-banner-cubes-wide'></div>
      </div>
    </div>
  )
}

function BannerContentMobile({ className }: { className?: string }) {
  return (
    <div className={cn('flex sm:flex-col sm:px-3 sm:py-4', className)}>
      <div className='relative z-10 py-4 pl-4 sm:flex sm:items-center sm:gap-4 sm:p-0'>
        <h2 className='title-lg'>
          <span className='text-secondary-20'>Ongoing</span> Contest
        </h2>
        <ExclamationCircleIcon className='absolute -right-11 top-4 sm:static' />
      </div>

      <div className='relative flex-1 sm:hidden'>
        <Divider className='absolute -right-6 bottom-0 top-0 w-[calc(100%+2.5rem)] min-w-32 max-w-64' />
      </div>
      <div className='flex flex-col items-end gap-6 py-4 pr-4 text-right sm:flex-row-reverse sm:items-center sm:justify-end sm:gap-2 sm:p-0 sm:text-left'>
        <div className='space-y-3 sm:space-y-1'>
          <p className='title-h3'>Duration</p>
          <p className='text-lg' /* TODO: get from backend */>10 Dec 2023-17 Dec 2023</p>
        </div>
        <Disciplines />
      </div>
    </div>
  )
}

function Disciplines({ className }: { className?: string }) {
  return (
    <div className={cn('flex', className)}>
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
