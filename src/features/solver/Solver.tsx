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
        src={isLoaded ? 'http://127.0.0.1:8081' : undefined}
        width='1300'
        height='550'
      ></iframe>
    </div>
  )
}

const startSolveOnLoad = (() => {
  let loaded = false

  return (iframeElement: HTMLIFrameElement, scramble: string, onSolve: (result: SolverResult) => void) => {
    const startSolve = () =>
      iframeElement.contentWindow?.postMessage({ source: 'vs-integration', scramble, onSolve }, 'http://127.0.0.1:8081')

    if (loaded) {
      startSolve()
    }
    iframeElement.onload = () => {
      loaded = true
      startSolve()
    }
  }
})()
