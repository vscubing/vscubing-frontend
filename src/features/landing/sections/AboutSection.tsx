import { CubeIcon, KeyboardIcon } from '../shared/icons'
import virtualCubeLaptopMp4 from '../assets/virtual-cube-laptop.mp4'
import virtualCubeLaptopWebM from '../assets/virtual-cube-laptop.webm'
import virtualCubeLaptopThumbnail from '../assets/virtual-cube-laptop-thumbnail.jpg'
import { Container } from '../shared/Container'
import { LazyVideo } from '../shared/LazyVideo'

export function AboutSection({ className, id }: { className: string; id: string }) {
  return (
    <Container className={className}>
      <section className='landing-offset-anchor mx-auto max-w-[75rem]' id={id}>
        <h2 className='landing-h2 mb-14 text-center'>What is virtual speedcubing?</h2>
        <div className='mb-12 flex justify-center gap-40'>
          <div className='flex items-center gap-2'>
            <CubeIcon className='flex-shrink-0' />
            <p>
              Speedcubing is an art of solving a Rubik's Cube as fast as possible. It’s a thrilling sport that
              challenges your mind and dexterity
            </p>
          </div>
          <div className='flex max-w-[30rem] items-center gap-2'>
            <KeyboardIcon className='flex-shrink-0' />
            <p>
              Virtual speedcubing brings this excitement to your computer, allowing you to compete with others
              worldwide, anytime, anywhere
            </p>
          </div>
        </div>
        <LazyVideo
          width='100%'
          muted
          preload='none'
          className='rounded-3xl'
          thumbnail={virtualCubeLaptopThumbnail}
          webm={virtualCubeLaptopWebM}
          mp4={virtualCubeLaptopMp4}
        />
      </section>
    </Container>
  )
}
