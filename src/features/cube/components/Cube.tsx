import { cn } from '@/utils'
import { type RefObject, useEffect, useState, type ReactNode } from 'react'

export type CubeSolveResult =
  | { reconstruction: string; timeMs: number; isDnf: false }
  | { reconstruction: null; timeMs: null; isDnf: true }
export type CubeSolveFinishCallback = (result: CubeSolveResult) => void
export type CubeTimeStartCallback = () => void

type CubeProps = {
  className?: string
  scramble?: string
  onTimeStart: CubeTimeStartCallback
  onSolveFinish: CubeSolveFinishCallback
  iframeRef: RefObject<HTMLIFrameElement>
}

export function Cube({
  className,
  fallback,
  scramble,
  onTimeStart,
  onSolveFinish,
  iframeRef,
}: CubeProps & { fallback: ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false)
  return (
    <div className={cn('h-full', className)}>
      {!isLoaded && <div className='h-full'>{fallback}</div>}
      <CubeIframe
        className={cn({ 'invisible absolute': !isLoaded })}
        isLoaded={isLoaded}
        setIsLoaded={setIsLoaded}
        scramble={scramble}
        onTimeStart={onTimeStart}
        onSolveFinish={onSolveFinish}
        iframeRef={iframeRef}
      />
    </div>
  )
}

function CubeIframe({
  setIsLoaded,
  isLoaded,
  className,
  scramble,
  onTimeStart,
  onSolveFinish,
  iframeRef,
}: CubeProps & { isLoaded: boolean; setIsLoaded: (isLoaded: boolean) => void }) {
  useHandleIframeLoaded(setIsLoaded, iframeRef)
  useInitSolve(isLoaded, iframeRef, onTimeStart, onSolveFinish, scramble)

  const isIframeInited = !!scramble || isLoaded
  return (
    <iframe
      ref={iframeRef}
      src={isIframeInited ? '/cstimer/php' : undefined}
      width='100%'
      height='100%'
      className={className}
    ></iframe>
  )
}

type EventMessage =
  | { source: undefined }
  | ({ source: typeof POST_MESSAGE_SOURCE } & (TimeStartEvent | SolveFinishEvent))
type TimeStartEvent = { event: 'timeStart' }
type SolveFinishEvent = { event: 'solveFinish'; payload: { reconstruction: string; timeMs: number } }
const POST_MESSAGE_SOURCE = 'vs-solver-integration'

function useHandleIframeLoaded(setIsLoaded: (isLoaded: boolean) => void, iframeRef: RefObject<HTMLIFrameElement>) {
  useEffect(() => {
    const iframe = iframeRef.current!
    function onLoad() {
      setIsLoaded(true)
    }
    iframe.addEventListener('load', onLoad)
    return () => {
      iframe.removeEventListener('load', onLoad)
    }
  })
}

function useInitSolve(
  isLoaded: boolean,
  iframeRef: RefObject<HTMLIFrameElement>,
  onTimeStart: CubeTimeStartCallback,
  onSolveFinish: CubeSolveFinishCallback,
  scramble?: string,
) {
  useEffect(() => {
    if (!scramble || !isLoaded) {
      return
    }

    const iframe = iframeRef.current!
    function initSolve() {
      iframe.contentWindow?.postMessage({
        source: POST_MESSAGE_SOURCE,
        scramble: scramble,
      })
    }
    function solveProgressListener(event: { data: EventMessage }) {
      if (event.data.source !== POST_MESSAGE_SOURCE) {
        return
      }

      if (event.data.event === 'timeStart') {
        onTimeStart()
      }

      if (event.data.event === 'solveFinish') {
        const { reconstruction, timeMs }: { reconstruction: string; timeMs: number } = event.data.payload
        onSolveFinish({ reconstruction, timeMs, isDnf: false })
      }
    }

    initSolve()
    window.addEventListener('message', solveProgressListener)
    return () => {
      window.removeEventListener('message', solveProgressListener)
    }
  }, [isLoaded, scramble, onTimeStart, onSolveFinish, iframeRef])
}
