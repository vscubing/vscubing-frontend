import { CubeIcon, KeyboardIcon } from '../shared/icons'
import virtualCubeLaptopMp4 from '../assets/virtual-cube-laptop.mp4'
import virtualCubeLaptopWebM from '../assets/virtual-cube-laptop.webm'
import virtualCubeLaptopThumbnail from '../assets/virtual-cube-laptop-thumbnail.jpg'
import { useRef } from 'react'
import { useIntersectionObserver } from 'usehooks-ts'
import { Container } from '../shared/Container'

export function AboutSection({ className, id }: { className: string; id: string }) {
  return (
    <Container className={className}>
      <section className='landing-offset-anchor mx-auto max-w-[75rem] space-y-14' id={id}>
        <h2 className='landing-h2 text-center'>What is virtual speedcubing?</h2>
        <div className='flex justify-center gap-40'>
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
        <CubeVideo />
      </section>
    </Container>
  )
}

function CubeVideo() {
  const ref = useRef<HTMLVideoElement | null>(null)
  const { ref: intersectionRef } = useIntersectionObserver({
    threshold: 1,
    freezeOnceVisible: true,
    onChange: (isIntersecting) => {
      if (isIntersecting) {
        ref.current?.play()
      }
    },
  })

  return (
    <video
      width='100%'
      muted
      preload='none'
      className='rounded-3xl'
      poster={virtualCubeLaptopThumbnail}
      ref={(el) => {
        ref.current = el
        intersectionRef(el)
      }}
    >
      <source src={virtualCubeLaptopWebM} type='video/webm; codecs=vp9' />
      <source src={virtualCubeLaptopMp4} type='video/mp4' />
    </video>
  )
}