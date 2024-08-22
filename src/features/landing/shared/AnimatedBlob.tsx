import { cn } from '@/utils'
import { CSSProperties } from 'react'

export function AnimatedBlob({
  fromLeft,
  fromTop,
  toLeft,
  toTop,
  className,
}: {
  fromLeft: string
  fromTop: string
  toLeft: string
  toTop: string
  className: string
}) {
  return (
    <div
      style={
        {
          '--from-left': fromLeft,
          '--from-top': fromTop,
          '--to-left': toLeft,
          '--to-top': toTop,
        } as CSSProperties
      }
      className={cn('animate-landing-blobs absolute aspect-square rounded-[100%] blur-xl', className)}
    ></div>
  )
}
