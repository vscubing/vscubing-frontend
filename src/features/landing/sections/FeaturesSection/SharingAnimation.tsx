import { ShareIcon, secondaryButtonVariants } from '@/components/ui'
import smileyArrowImg from '../../assets/features-sharing-img.svg'
import cursorIcon from '../../assets/features-sharing-cursor.svg'
import { AnimationItem } from './animations'
import { cn } from '@/utils'

export function SharingAnimation() {
  return (
    <div className='flex h-full items-center justify-center gap-3'>
      <div className='relative'>
        <AnimationItem
          className={cn(
            secondaryButtonVariants({ size: 'iconSm' }),
            'animate-landing-features-sharing-button cursor-pointer',
          )}
          shouldRegisterAnimationEnd={false}
          block='sharing'
        >
          <ShareIcon />
        </AnimationItem>
        <AnimationItem
          block='sharing'
          shouldRegisterAnimationEnd={false}
          className='absolute left-[70%] top-[80%] animate-landing-features-sharing-cursor'
        >
          <img src={cursorIcon} alt='' />
        </AnimationItem>
      </div>
      <AnimationItem block='sharing' className='animate-landing-features-sharing-img [clip-path:inset(0_100%_0_0)]'>
        <img src={smileyArrowImg} alt='' />
      </AnimationItem>
    </div>
  )
}
