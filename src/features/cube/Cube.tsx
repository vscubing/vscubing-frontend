import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'

export type SolveResult = { reconstruction: string; timeMs: number }
export type SolveCallback = (result: SolveResult) => void

type CubeProps = { scramble: string | null; onSolve: (result: SolveResult) => void }
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
        src={isLoaded ? 'http://localhost:8081/timer.php' : undefined}
        width='1300'
        height='550'
      ></iframe>
    </div>
  )
}

const POST_MESSAGE_SOURCE = 'vs-solver-integration'
const startSolveOnLoad = (() => {
  let loaded = false
  let savedOnSolve: SolveCallback | undefined

  window.addEventListener(
    'message',
    (event) => {
      if (event.data.source !== POST_MESSAGE_SOURCE) {
        return
      }

      const result: { reconstruction: string; timeMs: number } = event.data
      savedOnSolve && savedOnSolve(result)
      savedOnSolve = undefined
    },
    false,
  )

  return (iframeElement: HTMLIFrameElement, scramble: string, onSolve: SolveCallback) => {
    savedOnSolve = onSolve
    const startSolve = () =>
      iframeElement.contentWindow?.postMessage(
        {
          source: POST_MESSAGE_SOURCE,
          scramble: scramble,
        },
        '*',
      )

    if (loaded) {
      startSolve()
    }

    iframeElement.onload = () => {
      loaded = true
      startSolve()
    }
  }
})()
