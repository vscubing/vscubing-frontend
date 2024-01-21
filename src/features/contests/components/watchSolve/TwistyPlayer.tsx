import { cn } from '@/utils'
import { type TwistyPlayer as Player, type TwistyPlayerConfig } from '@vscubing/cubing/twisty'
import { useRef, useEffect } from 'react'

interface TwistyPlayerProps extends TwistyPlayerConfig {
  className?: string
  player: Player
}
export const TwistyPlayer = ({ className, player }: TwistyPlayerProps) => {
  const spanRef = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    spanRef.current?.appendChild(player)
    return () => player.remove()
  }, [className, player])

  return <span className={cn('[&>twisty-player]:min-h-full [&>twisty-player]:min-w-full', className)} ref={spanRef} />
}
