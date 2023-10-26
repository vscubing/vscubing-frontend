import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'

export type SolverResult = { reconstruction: string; timeMs: number }
export type SolverCallback = (result: SolverResult) => void

type SolverProps = { scramble: string | null; onSolve: (result: SolverResult) => void }
export const Solver = ({ scramble, onSolve }: SolverProps) => {
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
  let savedOnSolve: SolverCallback | undefined

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

  return (iframeElement: HTMLIFrameElement, scramble: string, onSolve: SolverCallback) => {
    savedOnSolve = onSolve
    const startSolve = () =>
      iframeElement.contentWindow?.postMessage(
        {
          source: POST_MESSAGE_SOURCE,
          scramble: Math.random() > 0.5 ? "R U R' U R U2 R'" : "L' U' L U' L' U2 L",
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
