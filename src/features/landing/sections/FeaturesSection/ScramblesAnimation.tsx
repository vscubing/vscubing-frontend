import { AnimationItem } from './animations'

export function ScramblesAnimation() {
  return (
    <div className='relative h-full'>
      <AnimationItem
        block='scrambles'
        className='animate-landing-features-scrambles absolute right-12 top-[40%] whitespace-nowrap text-[2rem] text-grey-20'
      >
        R' B U L' U' D2 R' U D2 B' U2 D2 L2 F'
      </AnimationItem>
    </div>
  )
}
