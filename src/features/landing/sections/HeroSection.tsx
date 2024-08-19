import { LoadingSpinner, PrimaryButton } from '@/components/ui'
import { Link } from '@tanstack/react-router'
import { StopwatchIcon } from '../components/icons'
import { TwistyControls, TwistyCube, TwistyScrubber, useTwistyPlayer } from '@/shared/twisty'
import { KEY_MAP, KeyMapTile } from '@/shared/KeyMapDialog'
import { useEffect } from 'react'
import { Container } from '../components/Container'

export function HeroSection() {
  return (
    <Container>
      <section className='flex min-h-svh flex-col justify-center pb-12 pt-28'>
        <div className='grid max-h-[40rem] min-h-[35rem] flex-1 grid-cols-[1fr,auto] grid-rows-[auto,1fr] gap-3'>
          <div className='landing-hero-clip-polygon row-span-2 flex h-full flex-col items-start justify-center rounded-3xl p-10 [background:linear-gradient(159deg,rgba(73,76,116,1)_0%,rgba(27,30,37,1)_71%)]'>
            <h1 className='landing-h1 mb-10 flex flex-wrap text-white-100'>
              <span className='whitespace-nowrap'>
                Join <span className='landing-h3 text-grey-40'>the</span> exciting world
              </span>
              <span className='whitespace-nowrap'>
                <span className='landing-h3 text-grey-40'>of</span> <StopwatchIcon className='-mt-2 inline' /> virtual
                speedcubing
              </span>
            </h1>
            <p className='mb-6 flex items-center gap-2 text-white-100'>
              <AlternatingText text1='Improve' text2='Compete' text3='Have fun' /> <span>with our online contests</span>
            </p>
            <PrimaryButton asChild className='h-auto px-20 py-5'>
              <Link to='/'>Start cubing now</Link>
            </PrimaryButton>
          </div>
          <div className='flex h-[21rem] w-[21rem] shrink-0 flex-col items-center justify-center rounded-3xl bg-black-100 pb-4'>
            <TwistySection />
          </div>
          <div className='relative -ml-[22rem] flex items-center justify-center overflow-clip rounded-3xl'>
            <div className='absolute left-[1%] top-[30%] h-[40%] w-[30%] rounded-[100%] bg-secondary-20 blur-xl'></div>
            <div className='absolute left-[25%] top-[-5%] h-[55%] w-[30%] rounded-[100%] bg-secondary-60 blur-xl'></div>
            <div className='absolute left-0 top-0 h-[40%] w-[35%] bg-primary-60 blur-xl'></div>
            <div className='absolute bottom-0 left-[-5%] h-[40%] w-[40%] bg-primary-60 blur-xl'></div>
            <div className='absolute bottom-[-15%] left-[50%] h-[60%] w-[30%] rounded-[100%] bg-secondary-20 blur-xl'></div>
            <div className='absolute right-0 top-0 h-[35%] w-[30%] rounded-[100%] bg-secondary-60 blur-xl'></div>
            <div className='absolute bottom-0 right-[-5%] h-[70%] w-[30%] rounded-[100%] bg-primary-100 blur-xl'></div>
            <div className='absolute left-[52%] top-[5%] h-[40%] w-[30%] rounded-[100%] bg-primary-60 blur-xl'></div>
            <div className='absolute bottom-[5%] left-[30%] h-[40%] w-[30%] rounded-[100%] bg-primary-100 blur-xl'></div>
            <ul className='relative grid -rotate-[18deg] grid-cols-[repeat(10,auto)] gap-1'>
              {KEY_MAP.map(({ keyName, cubeMovement }) => (
                <KeyMapTile
                  key={keyName}
                  keyName={keyName}
                  cubeMovement={cubeMovement}
                  className='h-12 w-12 rounded-lg py-1 pl-2 pr-2 text-sm'
                />
              ))}
            </ul>
          </div>
        </div>
      </section>
    </Container>
  )
}

function AlternatingText({ text1, text2, text3 }: { text1: string; text2: string; text3: string }) {
  return (
    <span className='relative inline-block h-9 w-[6.5rem] overflow-y-clip rounded-xl border border-secondary-20 text-center font-medium'>
      <span className='vertical-alignment-fix absolute left-0 h-9 w-full animate-landing-alternating-text'>
        {text1}
      </span>
      <span className='vertical-alignment-fix absolute left-0 h-9 w-full animate-landing-alternating-text [animation-delay:-2s]'>
        {text2}
      </span>
      <span className='vertical-alignment-fix absolute left-0 h-9 w-full animate-landing-alternating-text [animation-delay:-4s]'>
        {text3}
      </span>
    </span>
  )
}

function TwistySection() {
  const player = useTwistyPlayer(VALK_474_WR)

  useEffect(() => player?.play(), [player])

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

const VALK_474_WR = {
  scramble: "F2 U2 R2 F' L2 F2 U' R F D U F2 U R B R2 U B' R'",
  solution:
    "z r' D R2 R U' R' U' L' U' L U' U' R U R' d' U' R U R' d' U' R U' R' L U' L' y' U' U' R' U2 R U' U' R' U R' F R F' U R U",
}
