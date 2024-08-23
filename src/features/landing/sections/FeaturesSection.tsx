import { ReactNode } from '@tanstack/react-router'
import { Container } from '../shared/Container'
import { LeaderboardIcon, ResultIcon, ScrambleIcon, ShareIcon } from '../shared/icons'
import { CSSProperties } from 'react'

export function FeaturesSection({ className, id }: { className: string; id: string }) {
  return (
    <Container className={className}>
      <section id={id} className='landing-offset-anchor'>
        <h2 className='landing-h2 mb-14 text-center'>The problem we solve</h2>
        <ul className='grid grid-cols-2 grid-rows-[repeat(2,20rem)] gap-3'>
          <Feature
            title='Automated results'
            description='No more manual entering of results in Excel. Everything is automated!'
            icon={<ResultIcon />}
            visualization={<ResultsAnimation />}
          />
          <Feature
            title='Instant scrambles'
            description='Get your scrambles without any manual copy-pasting.'
            icon={<ScrambleIcon />}
            visualization='visual'
          />
          <Feature
            title='Leaderboards'
            description='Compete for top spots on both contest-wise and all-time leaderboards.'
            icon={<LeaderboardIcon />}
            visualization='visual'
          />
          <Feature
            title='Share your solves'
            description='Easily share your solves with friends and challenge them to beat your time!'
            icon={<ShareIcon />}
            visualization='visual'
          />
        </ul>
      </section>
    </Container>
  )
}

function Feature({
  title,
  description,
  icon,
  visualization,
}: {
  title: string
  description: string
  icon: ReactNode
  visualization: ReactNode
}) {
  return (
    <li className='flex flex-col rounded-3xl bg-black-100 px-10 pb-10'>
      <div className='flex flex-1 gap-28'>
        <div className='self-end pb-6'>{icon}</div>
        <div className='-mb-2 -ml-2 -mr-10 flex-1 border border-red-80'>{visualization}</div>
      </div>
      <h3 className='landing-h3 mb-2'>{title}</h3>
      <p>{description}</p>
    </li>
  )
}

function ResultsAnimation() {
  return (
    <div className='relative h-full'>
      <ResultsAnimationItem
        fromRotation='18deg'
        fromLeft='-5%'
        fromTop='-100%'
        transitionRotation='-31deg'
        transitionLeft='-3%'
        transitionTop='30%'
        toRotation='11deg'
        toLeft='-5%'
        toTop='52%'
      >
        Average time
      </ResultsAnimationItem>
      <ResultsAnimationItem
        fromRotation='-9.5deg'
        fromLeft='40%'
        fromTop='-75%'
        transitionRotation='41.5deg'
        transitionLeft='46%'
        transitionTop='57%'
        toRotation='-13deg'
        toLeft='40%'
        toTop='65%'
      >
        Single time
      </ResultsAnimationItem>
      <ResultsAnimationItem
        fromRotation='10.5deg'
        fromLeft='25%'
        fromTop='-120%'
        transitionRotation='-58deg'
        transitionLeft='25%'
        transitionTop='18%'
      >
        Attempt 1
      </ResultsAnimationItem>
      <ResultsAnimationItem
        fromRotation='-21.5deg'
        fromLeft='13%'
        fromTop='-60%'
        transitionRotation='29deg'
        transitionLeft='18%'
        transitionTop='68%'
      >
        Attempt 2
      </ResultsAnimationItem>
      <ResultsAnimationItem
        fromRotation='22deg'
        fromLeft='68%'
        fromTop='-50%'
        transitionRotation='-20deg'
        transitionLeft='75%'
        transitionTop='55%'
      >
        Attempt 3
      </ResultsAnimationItem>
      <ResultsAnimationItem
        fromRotation='-21.5deg'
        fromLeft='58%'
        fromTop='-120%'
        transitionRotation='45deg'
        transitionLeft='52%'
        transitionTop='15%'
      >
        Attempt 4
      </ResultsAnimationItem>
      <ResultsAnimationItem
        fromRotation='42deg'
        fromLeft='74%'
        fromTop='-85%'
        transitionRotation='-16.5deg'
        transitionLeft='76%'
        transitionTop='6%'
      >
        Attempt 5
      </ResultsAnimationItem>
    </div>
  )
}

function ResultsAnimationItem(
  props: Record<
    | 'fromLeft'
    | 'fromTop'
    | 'fromRotation'
    | 'transitionLeft'
    | 'transitionTop'
    | 'transitionRotation'
    | 'toLeft'
    | 'toTop'
    | 'toRotation',
    string
  > & {
    children: string
  },
) {
  return (
    <div
      style={
        {
          '--from-left': props.fromLeft,
          '--from-top': props.fromTop,
          '--from-rotation': props.fromRotation,
          '--transition-left': props.transitionLeft,
          '--transition-top': props.transitionTop,
          '--transition-rotation': props.transitionRotation,
          '--to-left': props.toLeft,
          '--to-top': props.toTop,
          '--to-rotation': props.toRotation,
        } as CSSProperties
      }
      className='animate-landing-falling-text absolute whitespace-nowrap rounded-3xl border border-secondary-20 px-6 py-1 text-[0.875rem] text-grey-20'
    >
      <div className='mb-[-.1em] pt-[.1em]'>{props.children}</div>
    </div>
  )
}
