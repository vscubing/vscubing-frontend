import { CubeIcon, KeyboardIcon } from '../shared/icons'
import virtualCubeLaptopMp4 from '../assets/virtual-cube-laptop.mp4'
import virtualCubeLaptopWebM from '../assets/virtual-cube-laptop.webm'
import virtualCubeLaptopThumbnail from '../assets/virtual-cube-laptop-thumbnail.jpg'
import { Container } from '../shared/Container'
import { LazyAutoplayVideo } from '../shared/LazyAutoplayVideo'

export function AboutSection({ className, id }: { className: string; id: string }) {
  return (
    <Container className={className}>
      <section className='landing-offset-anchor mx-auto max-w-[75rem]' id={id}>
        <h2 className='landing-h2 mb-14 text-center text-gradient animate-pulse-glow'>What is virtual speedcubing?</h2>
        <div className='mx-auto mb-12 flex justify-center gap-40 px-4 lg:gap-3 md:max-w-[33.5rem] md:flex-col'>
          <div className='group flex items-center gap-2 sm:flex-col sm:items-start hover-lift transition-all duration-300'>
            <CubeIcon className='flex-shrink-0 animate-float' />
            <p className='text-grey-40 group-hover:text-white-100 transition-colors duration-300'>
              Speedcubing is an art of solving a Rubik's Cube as fast as possible. It's a thrilling sport that
              challenges your mind and dexterity
            </p>
          </div>
          <div className='group flex max-w-[30rem] items-center gap-2 sm:flex-col sm:items-start hover-lift transition-all duration-300'>
            <KeyboardIcon className='flex-shrink-0 animate-float' />
            <p className='text-grey-40 group-hover:text-white-100 transition-colors duration-300'>
              Virtual speedcubing brings this excitement to your computer, allowing you to compete with others
              worldwide, anytime, anywhere
            </p>
          </div>
        </div>
        <div className='relative group'>
          <div className='absolute inset-0 rounded-3xl bg-gradient-to-r from-primary-60/20 via-secondary-40/20 to-primary-60/20 animate-gradient-shift opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
          <LazyAutoplayVideo
            width='100%'
            className='min-h-[19rem] rounded-3xl object-cover glass-effect hover-glow transition-all duration-500'
            replayable
            thumbnail={virtualCubeLaptopThumbnail}
            webm={virtualCubeLaptopWebM}
            mp4={virtualCubeLaptopMp4}
          />
        </div>
      </section>
    </Container>
  )
}
