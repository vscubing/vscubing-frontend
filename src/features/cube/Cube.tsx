import { RefObject, useEffect, useState } from 'react'

export type CubeSolveResult =
  | { reconstruction: string; time_ms: number; dnf: false }
  | { reconstruction: null; time_ms: null; dnf: true } // TODO fix to camelCase
export type CubeSolveFinishCallback = (result: CubeSolveResult) => void
export type CubeTimeStartCallback = () => void

type CubeProps = {
  scramble?: string
  onTimeStart: CubeTimeStartCallback
  onSolveFinish: CubeSolveFinishCallback
  iframeRef: RefObject<HTMLIFrameElement>
}
export const Cube = ({ scramble, onTimeStart, onSolveFinish, iframeRef }: CubeProps) => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (scramble && iframeRef.current) {
      setIsLoaded(true)
      startSolveOnLoad(iframeRef.current, scramble, onTimeStart, onSolveFinish)
    }
  }, [scramble, onTimeStart, onSolveFinish, iframeRef])

  return (
    <iframe
      ref={iframeRef}
      className='rounded-[5px]'
      src={isLoaded ? '/cstimer/php' : undefined}
      width='100%'
      height='100%'
    ></iframe>
  )
}

const POST_MESSAGE_SOURCE = 'vs-solver-integration'
const startSolveOnLoad = (() => {
  let isLoaded = false
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
      savedOnSolveFinish?.({ reconstruction, time_ms: timeMs, dnf: false })
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

    if (isLoaded) {
      startSolve()
      return
    }

    iframeElement.onload = () => {
      isLoaded = true
      startSolve()
    }
  }
})()
