import { initVirtual } from '@/vendor/cstimer'
import { useEffect, useRef } from 'react'

export function PocCstimer() {
  const containerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const abortSignal = new AbortController()
    void initVirtual(
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
      containerRef.current!,
    ).then((puzzle) => {
      puzzle.resize()
      window.addEventListener('keydown', (e) => puzzle.keydown(e), abortSignal)
    })

    return () => abortSignal.abort()
  }, [])
  return (
    <div className='h-screen' ref={containerRef}>
      PocCstimer
    </div>
  )
}
