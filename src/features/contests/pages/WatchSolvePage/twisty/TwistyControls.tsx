import {
  PlayForwardIcon,
  PlayIcon,
  PlaySkipBackIcon,
  PlaySkipForwardIcon,
  PlaybackIcon,
  StopIcon,
} from '@/components/ui'
import { BoundaryType, type TwistyPlayer } from '@vscubing/cubing/twisty'
import { cn } from '@/utils'
import { type HTMLAttributes, useEffect, useState } from 'react'

export function TwistyControls({ twistyPlayer, className }: { twistyPlayer: TwistyPlayer; className?: string }) {
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const updateIsPlaying = (buttonAppearances: Record<string, { icon: string }>) => {
      if (buttonAppearances['play-pause'].icon === 'play') {
        setIsPlaying(false)
      } else {
        setIsPlaying(true)
      }
    }
    twistyPlayer.experimentalModel.buttonAppearance.addFreshListener(updateIsPlaying)
    return () => twistyPlayer.experimentalModel.buttonAppearance.removeFreshListener(updateIsPlaying)
  }, [twistyPlayer])

  function jumpToStart() {
    void twistyPlayer.controller?.jumpToStart({ flash: true })
  }
  function playStepBackwards() {
    void twistyPlayer.controller?.animationController.play({
      direction: -1,
      untilBoundary: BoundaryType.Move,
    })
  }
  function playPause() {
    void twistyPlayer.controller?.togglePlay()
  }
  function playStep() {
    void twistyPlayer.controller?.animationController.play({
      direction: 1,
      untilBoundary: BoundaryType.Move,
    })
  }

  function jumpToEnd() {
    void twistyPlayer.controller?.jumpToEnd({ flash: true })
  }

  return (
    <div className={cn('flex items-center justify-between', className)}>
      <ControlButton onClick={jumpToStart}>{CONTROL_ICONS.jumpToStart}</ControlButton>
      <ControlButton onClick={playStepBackwards}>{CONTROL_ICONS.playStepBackwards}</ControlButton>
      <button
        className='outline-ring transition-base flex h-16 w-16 items-center justify-center rounded-full bg-primary-60 text-black-100 hover:bg-primary-80 active:bg-primary-60 sm:h-14 sm:w-14'
        onClick={playPause}
      >
        {isPlaying ? CONTROL_ICONS.pause : CONTROL_ICONS.play}
      </button>
      <ControlButton onClick={playStep}>{CONTROL_ICONS.playStep}</ControlButton>
      <ControlButton onClick={jumpToEnd}>{CONTROL_ICONS.jumpToEnd}</ControlButton>
    </div>
  )
}

function ControlButton({ className, children, ...props }: HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        'transition-base outline-ring flex h-14 w-14 items-center justify-center text-[1.5rem] hover:text-primary-60 active:text-primary-80 sm:h-11 sm:w-11',
        className,
      )}
    >
      {children}
    </button>
  )
}

const CONTROL_ICONS = {
  jumpToStart: <PlaySkipBackIcon />,
  playStepBackwards: <PlaybackIcon />,
  play: <PlayIcon />,
  pause: <StopIcon />,
  playStep: <PlayForwardIcon />,
  jumpToEnd: <PlaySkipForwardIcon />,
} as const
