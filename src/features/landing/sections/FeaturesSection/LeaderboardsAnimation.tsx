import { CubeIcon } from '@/components/ui'
import { SolveTimeLabel } from '@/shared/SolveTimeButton'
import { AnimationItem } from './animations'
import { CSSProperties } from 'react'

export function LeaderboardsAnimation() {
  return (
    <div className='flex justify-end'>
      <div className='w-[24rem] pr-10 pt-8'>
        <div className='mb-1 flex gap-3 text-[.75rem] text-grey-40'>
          <span>Place</span>
          <span>Type</span>
          <span>Nickname</span>
          <span className='ml-auto pr-[.6rem]'>Single time</span>
        </div>
        <ul className='flex flex-col gap-1'>
          <Row place={1} nickname='Leslie Alexander' timeMs={6252}></Row>
          <Row place={2} nickname='Darrell Steward' timeMs={6252}></Row>
          <Row place={3} nickname='Theresa Webb' timeMs={6252} shouldRegisterAnimationEnd></Row>
        </ul>
      </div>
    </div>
  )
}

function Row({
  place,
  nickname,
  timeMs,
  shouldRegisterAnimationEnd = false,
}: {
  place: number
  nickname: string
  timeMs: number
  shouldRegisterAnimationEnd?: boolean
}) {
  return (
    <li className='contents'>
      <AnimationItem
        block='leaderboards'
        style={{ '--delay': `${(place - 1) * 1.1}s` } as CSSProperties}
        className='animate-landing-features-leaderboards flex h-[2.8rem] items-center rounded-lg bg-grey-100 pl-1 text-white-100 [clip-path:inset(0_0_100%)]'
        shouldRegisterAnimationEnd={shouldRegisterAnimationEnd}
      >
        <div className='vertical-alignment-fix mr-2 flex h-8 w-8 items-center justify-center rounded-full border border-primary-80 text-[.75rem]'>
          {place}
        </div>
        <CubeIcon cube='3by3' className='mr-2 h-5 w-5' />
        <span className='vertical-alignment-fix text-sm'>{nickname}</span>
        <SolveTimeLabel timeMs={timeMs} className='ml-auto h-6 min-w-[4.5rem] text-[.75rem]' />
      </AnimationItem>
    </li>
  )
}
