import { cn } from '@/utils'
import { CSSProperties } from 'react'
import { AnimationItem } from './animations'

export function ResultsAnimation() {
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
        toLeft='0%'
        toTop='52%'
        shouldRegisterAnimationEnd
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
        toLeft='42%'
        toTop='78%'
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
        toRotation='30deg'
        toLeft='30%'
        toTop='49%'
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
        toRotation='-22deg'
        toLeft='16%'
        toTop='76%'
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
        toRotation='16deg'
        toLeft='75%'
        toTop='74%'
      >
        Attempt 3
      </ResultsAnimationItem>
      <ResultsAnimationItem
        fromRotation='-21.5deg'
        fromLeft='58%'
        fromTop='-120%'
        transitionRotation='45deg'
        transitionLeft='50%'
        transitionTop='15%'
        toRotation='32deg'
        toLeft='52.5%'
        toTop='53.5%'
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
        toRotation='-16.5deg'
        toLeft='75%'
        toTop='41%'
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
    shouldRegisterAnimationEnd?: boolean
    children: string
  },
) {
  return (
    <AnimationItem
      shouldRegisterAnimationEnd={props.shouldRegisterAnimationEnd}
      block='results'
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
      className={cn(
        'absolute animate-landing-falling-text whitespace-nowrap rounded-3xl border border-secondary-20 px-6 py-1 text-[0.875rem] text-grey-20',
      )}
    >
      <div className='mb-[-.1em] pt-[.1em]'>{props.children}</div>
    </AnimationItem>
  )
}
