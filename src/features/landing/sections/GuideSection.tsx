import { type ReactNode } from 'react'
import { Container } from '../shared/Container'
import { Dialog, DialogOverlay, DialogPortal, DialogTrigger } from '@/components/ui'
import { KeyMapDialogContent } from '@/shared/KeyMapDialog'
import virtualCubeMp4 from '../assets/virtual-cube-screen.mp4'
import virtualCubeWebM from '../assets/virtual-cube-screen.webm'
import virtualCubeThumbnail from '../assets/virtual-cube-screen-thumbnail.jpg'
import { StaticLinkToApp } from '../shared/LinkToApp'
import { LazyAutoplayVideo } from '../shared/LazyAutoplayVideo'

export function GuideSection({ id }: { id: string }) {
  return (
    <Container>
      <section id={id} className='landing-offset-anchor'>
        <h2 className='landing-h2 mb-14 text-center text-gradient animate-pulse-glow'>Three easy steps to get started</h2>
        <div className='grid grid-flow-col grid-cols-2 grid-rows-[repeat(3,auto)] gap-3 lg:mx-auto lg:max-w-[40rem] lg:grid-cols-1 lg:grid-rows-[repeat(4,auto)]'>
          <ul className='contents'>
            <StepsListItem
              number={1}
              title='Master the basics'
              text={
                <>
                  If you don't know how to solve Rubik's Cube, start by watching{' '}
                  <a className='text-primary-60 hover:text-primary-40 transition-colors duration-300 hover:underline'>the Rubik's Cube tutorial</a> to brush up on your
                  skills
                </>
              }
            />
            <StepsListItem
              number={2}
              title='Know your keys'
              text={
                <>
                  Our platform is intuitive — if you can solve a real cube, you can solve a virtual one.
                  <br />
                  <KeyMapDialogTrigger className='text-primary-60 hover:text-primary-40 transition-colors duration-300 hover:underline'>
                    Check the keymap
                  </KeyMapDialogTrigger>{' '}
                  to learn the controls
                </>
              }
            />
            <StepsListItem
              number={3}
              title='Practice regularly'
              text={
                <>
                  <a className='text-primary-60 hover:text-primary-40 transition-colors duration-300 hover:underline' href='https://cstimer.net/'>
                    Use csTimer
                  </a>{' '}
                  for regular practice sessions, to track progress, and improve your skills. <br />
                  Also{' '}
                  <a
                    className='text-primary-60 hover:text-primary-40 transition-colors duration-300 hover:underline'
                    href='https://youtube.com/clip/UgkxcFC_Cw_ea1xKLOjcfLbNJMXjIOaAbcMZ?si=i2qFLqXnyFZW4dNA'
                  >
                    check out the guide
                  </a>{' '}
                  for enabling the virtual cube mode in csTimer
                </>
              }
            />
          </ul>
          <div className='row-span-3 flex flex-col items-center justify-end gap-14 lg:row-span-1 lg:pt-12'>
            <div className='relative group'>
              <div className='absolute inset-0 rounded-3xl bg-gradient-to-r from-secondary-40/20 via-primary-60/20 to-secondary-40/20 animate-gradient-shift opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
              <LazyAutoplayVideo
                thumbnail={virtualCubeThumbnail}
                mp4={virtualCubeMp4}
                webm={virtualCubeWebM}
                width={380}
                className='rounded-3xl hover-glow transition-all duration-500'
              />
            </div>
            <StaticLinkToApp className='h-[4.5rem] px-[4.625rem] sm:h-[4.5rem] hover-lift' />
          </div>
        </div>
      </section>
    </Container>
  )
}

function StepsListItem({ number, title, text }: { number: number; title: string; text: ReactNode }) {
  return (
    <li className='group flex gap-10 rounded-3xl py-10 pl-10 pr-[6.25rem] glass-effect hover-glow transition-all duration-500 sm:flex-col sm:items-start sm:pr-10'>
      <span className='font-outline-2 shrink-0 basis-[4.625rem] text-center font-kanit text-[8.75rem] leading-[.75] text-transparent [-webkit-text-stroke:_1px_#8F8FFE] group-hover:scale-110 transition-transform duration-300'>
        {number}
      </span>
      <div>
        <h3 className='landing-h3 mb-4 text-gradient group-hover:scale-105 transition-transform duration-300'>{title}</h3>
        <p className='text-grey-40 group-hover:text-white-100 transition-colors duration-300'>{text}</p>
      </div>
    </li>
  )
}

function KeyMapDialogTrigger({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <Dialog>
      <DialogTrigger className={className}>{children}</DialogTrigger>
      <DialogPortal>
        <DialogOverlay className='bg-black-1000/50 backdrop-blur-sm' withCubes={false} />
        <KeyMapDialogContent />
      </DialogPortal>
    </Dialog>
  )
}
