import { type TwistyPlayer as Player, type TwistyPlayerConfig } from 'cubing/twisty'
import { useRef, useEffect } from 'react'

interface TwistyPlayerProps extends TwistyPlayerConfig {
  className?: string
  player: Player
}
export const TwistyPlayer = ({ className, player }: TwistyPlayerProps) => {
  const spanRef = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    if (className) {
      player.className = className
    }
    spanRef.current?.appendChild(player)
    return () => player.remove()
  }, [className, player])

  return <span className={className} ref={spanRef} />
}
