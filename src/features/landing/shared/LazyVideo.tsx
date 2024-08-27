import { ComponentPropsWithoutRef, useRef } from 'react'
import { useIntersectionObserver } from 'usehooks-ts'

export function LazyVideo({
  thumbnail,
  webm,
  mp4,
  ...props
}: { thumbnail: string; webm: string; mp4: string } & ComponentPropsWithoutRef<'video'>) {
  const ref = useRef<HTMLVideoElement | null>(null)
  const { ref: intersectionRef } = useIntersectionObserver({
    threshold: 1,
    freezeOnceVisible: true,
    onChange: (isIntersecting) => {
      if (isIntersecting) {
        ref.current?.play()
      }
    },
  })

  return (
    <video
      preload='none'
      poster={thumbnail}
      {...props}
      ref={(el) => {
        ref.current = el
        intersectionRef(el)
      }}
    >
      {/* <source src={webm} type='video/webm; codecs=vp9' /> */}
      <source src={mp4} type='video/mp4' />
    </video>
  )
}
