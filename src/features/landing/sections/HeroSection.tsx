import { PrimaryButton } from '@/components/ui'
import { Link } from '@tanstack/react-router'
import { StopwatchIcon } from '../components/icons'

export function HeroSection() {
  return (
    <section className='flex flex-1 items-center'>
      <div className='grid h-full max-h-[44rem] flex-1 grid-cols-[1fr,auto] gap-3 pb-10 pt-3'>
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
        <div className='h-[21rem] w-[21rem] shrink-0 rounded-3xl bg-black-100'></div>
      </div>
    </section>
  )
}
