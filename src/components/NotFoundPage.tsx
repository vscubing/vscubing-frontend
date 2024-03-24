import { Link } from '@tanstack/react-router'
import { Layout } from './layout'
import { PrimaryButton } from './ui'
import SeparateLimeCube from '@/assets/images/not-found/separate-lime-cube.svg'
import SeparatePurpleCube from '@/assets/images/not-found/separate-purple-cube.svg'
import BlackCube from '@/assets/images/not-found/black-cube.svg'
import BlueCube from '@/assets/images/not-found/blue-cube.svg'
import GreenCube from '@/assets/images/not-found/green-cube.svg'
import WhiteCube from '@/assets/images/not-found/white-cube.svg'
import WhiteSmCube from '@/assets/images/not-found/white-sm-cube.svg'

import { MouseParallaxChild, MouseParallaxContainer } from 'react-parallax-mouse'

export function NotFoundPage() {
  return (
    <MouseParallaxContainer globalFactorX={0.022} globalFactorY={0.02}>
      <Layout>
        <div className='relative flex-1 rounded-xl bg-black-80 p-16'>
          <ParallaxCubes />
          <div className='relative w-min'>
            <p className='title-lg mb-4 whitespace-nowrap'>Lost in cuberspace?</p>
            <p className='text-large mb-8 inline-block'>
              Sorry, the page you're looking for seems to have gone on a digital adventure of its own
            </p>
            <Link to='/'>
              <PrimaryButton>Go back to dashboard</PrimaryButton>
            </Link>
          </div>
        </div>
      </Layout>
    </MouseParallaxContainer>
  )
}

function ParallaxCubes() {
  return (
    <>
      <MouseParallaxChild factorX={1.1} factorY={1.1} className='pointer-events-none absolute bottom-[15%] left-[10%]'>
        <img src={SeparateLimeCube} alt='decorative cube' />
      </MouseParallaxChild>
      <MouseParallaxChild
        factorX={1.3}
        factorY={1.3}
        className='pointer-events-none absolute left-[10%] top-[max(40%,20rem)]'
      >
        <img src={SeparatePurpleCube} alt='decorative cube' />
      </MouseParallaxChild>
      <div className='pointer-events-none absolute left-[min(60%,40vw)] top-1/2 aspect-square w-[min(80%,80vh)] -translate-x-1/2 -translate-y-1/2 brightness-[60%]'>
        <MouseParallaxChild factorX={1.5} factorY={1.5} className='absolute right-[2%] top-[55%] w-[18%]'>
          <img src={WhiteSmCube} alt='decorative cube' className='h-full w-full' />
        </MouseParallaxChild>
        <MouseParallaxChild className='absolute bottom-[5%] left-[30%] w-[21%]'>
          <img src={BlackCube} alt='decorative cube' className='h-full w-full' />
        </MouseParallaxChild>
        <MouseParallaxChild factorX={0.8} factorY={0.8} className='absolute bottom-[3%] left-[40%] w-[37%]'>
          <img src={BlueCube} alt='decorative cube' className='h-full w-full' />
        </MouseParallaxChild>
        <MouseParallaxChild factorX={1.2} factorY={1.2} className='absolute left-[25%] top-[40%] w-[40%]'>
          <img src={WhiteCube} alt='decorative cube' className='h-full w-full' />
        </MouseParallaxChild>
        <MouseParallaxChild factorX={0.3} factorY={0.3} className='absolute right-0 top-0 w-[67%]'>
          <img src={GreenCube} alt='decorative cube' className='h-full w-full' />
        </MouseParallaxChild>
      </div>
    </>
  )
}
