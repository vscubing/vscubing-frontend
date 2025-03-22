import { initVirtual } from '@/vendor/cstimer'
import { useEffect, useRef } from 'react'

export function PocCstimer() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    void (async () => {
      // @ts-expect-error ddddddd
      window.pzl = await initVirtual(
        {
          allowDragging: true,
          dimension: 3,
          faceColors: [16777215, 16711680, 56576, 16776960, 16755200, 255],
          puzzle: 'cube3',
          scale: 0.9,
          stickerWidth: 1.7,
          style: 'v',
          type: 'cube',
        },
        console.log,
        ref.current,
      )
    })()
  }, [])
  return (
    <div className='h-screen' ref={ref}>
      PocCstimer
    </div>
  )
}
