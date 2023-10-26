import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'

export type CubeSolveResult = { reconstruction: string; time_ms: number } // TODO fix to camelCase
export type CubeSolveCallback = (result: CubeSolveResult) => void

type CubeProps = { scramble: string | null; onSolve: (result: CubeSolveResult) => void }
export const Cube = ({ scramble, onSolve }: CubeProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement | null>(null)

  useEffect(() => {
    if (scramble && iframeRef.current) {
      setIsLoaded(true)
      startSolveOnLoad(iframeRef.current, scramble, onSolve)
    }
  }, [scramble, onSolve])

  return (
    <div
      className={classNames({ invisible: !scramble }, 'fixed	inset-0 flex justify-center bg-black bg-opacity-40 pt-20')}
    >
      <iframe
        ref={iframeRef}
        className='rounded-[5px]'
        src={isLoaded ? '/cstimer/timer.php' : undefined}
        width='1300'
        height='550'
      ></iframe>
    </div>
  )
}

const POST_MESSAGE_SOURCE = 'vs-solver-integration'
const startSolveOnLoad = (() => {
  let loaded = false
  let savedOnSolve: CubeSolveCallback | undefined

  window.addEventListener(
    'message',
    (event) => {
      if (event.data.source !== POST_MESSAGE_SOURCE) {
        return
      }

      const { reconstruction, timeMs }: { reconstruction: string; timeMs: number } = event.data.payload
      savedOnSolve && savedOnSolve({ reconstruction, time_ms: timeMs })
      savedOnSolve = undefined
    },
    false,
  )

  return (iframeElement: HTMLIFrameElement, scramble: string, onSolve: CubeSolveCallback) => {
    savedOnSolve = onSolve
    const startSolve = () =>
      iframeElement.contentWindow?.postMessage({
        source: POST_MESSAGE_SOURCE,
        scramble: scramble,
      })

    if (loaded) {
      startSolve()
      return
    }

    iframeElement.onload = () => {
      loaded = true
      startSolve()
    }
  }
})()
