import { LoadingSpinner, PrimaryButton } from '@/components/ui'
import { Link } from '@tanstack/react-router'
import { StopwatchIcon } from '../components/icons'
import { TwistyControls, TwistyCube, TwistyScrubber, useTwistyPlayer } from '@/shared/twisty'
import { TwistyPlayer } from '@vscubing/cubing/twisty'

export function HeroSection() {
  return (
    <section className='flex flex-1 flex-col items-center justify-center'>
      <div className='grid max-h-[44rem] min-h-[40rem] flex-1 grid-cols-[1fr,auto] grid-rows-[auto,1fr] gap-3 pb-10 pt-3'>
        <div className='landing-gradient-1 landing-hero-clip-polygon row-span-2 flex h-full flex-col items-start justify-center rounded-3xl p-10'>
          <h1 className='landing-h1 mb-10 flex flex-wrap text-white-100'>
            <span className='whitespace-nowrap'>
              Join <span className='landing-h3 text-grey-40'>the</span> exciting world
            </span>
            <span className='whitespace-nowrap'>
              <span className='landing-h3 text-grey-40'>of</span> <StopwatchIcon className='-mt-2 inline' /> virtual
              speedcubing
            </span>
          </h1>
          <p className='mb-6 text-white-100'>
            <span>Compete</span> with our online contests
          </p>
          <PrimaryButton asChild className='h-auto px-20 py-5'>
            <Link>Start cubing now</Link>
          </PrimaryButton>
        </div>
        <div className='flex h-[21rem] w-[21rem] shrink-0 flex-col items-center justify-center rounded-3xl bg-black-100 pb-4'>
          <TwistySection />
        </div>
        <div className='-ml-[22rem] rounded-3xl bg-secondary-20'></div>
      </div>
    </section>
  )
}

function TwistySection() {
  const player = useTwistyPlayer('R U', 'R U')

  if (!player) {
    return <LoadingSpinner />
  }

  return (
    <>
      <TwistyCube player={player} className='mb-2 h-full w-full flex-1' />

      <TwistyScrubber player={player} className='mb-1 w-full px-12' />
      <TwistyControls player={player} className='w-full px-8' size='sm' />
    </>
  )
}
