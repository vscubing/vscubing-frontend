import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'

export type CubeSolveResult = { reconstruction: string; time_ms: number } // TODO fix to camelCase
export type CubeSolveFinishCallback = (result: CubeSolveResult) => void
export type CubeTimeStartCallback = () => void

type CubeProps = { scramble?: string; onTimeStart: CubeTimeStartCallback; onSolveFinish: CubeSolveFinishCallback }
export const Cube = ({ scramble, onTimeStart, onSolveFinish }: CubeProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement | null>(null)

  useEffect(() => {
    if (scramble && iframeRef.current) {
      setIsLoaded(true)
      startSolveOnLoad(iframeRef.current, scramble, onTimeStart, onSolveFinish)
    }
  }, [scramble, onTimeStart, onSolveFinish])

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
  let savedOnTimeStart: (() => void) | undefined
  let savedOnSolveFinish: CubeSolveFinishCallback | undefined

  window.addEventListener('message', (event) => {
    if (event.data.source !== POST_MESSAGE_SOURCE) {
      return
    }

    if (event.data.event === 'timeStart') {
      savedOnTimeStart?.()
      savedOnTimeStart = undefined
    }

    if (event.data.event === 'solveFinish') {
      const { reconstruction, timeMs }: { reconstruction: string; timeMs: number } = event.data.payload
      savedOnSolveFinish?.({ reconstruction, time_ms: timeMs })
      savedOnSolveFinish = undefined
    }
  })

  return (
    iframeElement: HTMLIFrameElement,
    scramble: string,
    onTimeStart: () => void,
    onSolveFinish: CubeSolveFinishCallback,
  ) => {
    savedOnSolveFinish = onSolveFinish
    savedOnTimeStart = onTimeStart
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
