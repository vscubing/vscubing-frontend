import { Link } from '@tanstack/react-router'
import { Layout } from './layout'
import { PrimaryButton } from './ui'
import BgCubes from '@/assets/images/not-found-bg.svg'
import LimeCube from '@/assets/images/not-found-lime-cube.svg'
import PurpleCube from '@/assets/images/not-found-purple-cube.svg'

export function NotFoundPage() {
  return (
    <Layout>
      <div className='relative flex-1 rounded-xl bg-black-80 p-16'>
        <img src={BgCubes} alt='decorative cubes' className='absolute inset-0 h-full w-full' />
        <img src={LimeCube} alt='decorative lime cube' className='absolute bottom-[15%] left-[10%]' />
        <img src={PurpleCube} alt='decorative purple cube' className='absolute left-[10%] top-[max(40%,20rem)]' />
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
  )
}
