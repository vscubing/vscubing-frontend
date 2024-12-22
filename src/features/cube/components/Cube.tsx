import { cn } from '@/utils'
import { type RefObject, useEffect, useState, type ReactNode } from 'react'

export type CubeSolveResult = { isDnf: false; reconstruction: string; timeMs: number } | { isDnf: true }
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
  const [isReady, setIsReady] = useState(false)
  return (
    <div className={cn('h-full', className)}>
      {!isReady && <div className='h-full'>{fallback}</div>}
      <CubeIframe
        className={cn({ 'invisible absolute': !isReady })}
        isReady={isReady}
        setIsReady={setIsReady}
        scramble={scramble}
        onTimeStart={onTimeStart}
        onSolveFinish={onSolveFinish}
        iframeRef={iframeRef}
      />
    </div>
  )
}

function CubeIframe({
  setIsReady,
  isReady,
  className,
  scramble,
  onTimeStart,
  onSolveFinish,
  iframeRef,
}: CubeProps & { isReady: boolean; setIsReady: (isReady: boolean) => void }) {
  useHandleIframeReady(setIsReady)
  useInitSolve(isReady, iframeRef, onTimeStart, onSolveFinish, scramble)

  const isIframeInited = !!scramble || isReady
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
  | ({ source: typeof POST_MESSAGE_SOURCE } & (ReadyEvent | TimeStartEvent | SolveFinishEvent))
type ReadyEvent = { event: 'ready' }
type TimeStartEvent = { event: 'timeStart' }
type SolveFinishEvent = { event: 'solveFinish'; payload: { reconstruction: string; timeMs: number } }
const POST_MESSAGE_SOURCE = 'vs-solver-integration'

function useHandleIframeReady(setIsReady: (isReady: boolean) => void) {
  useEffect(() => {
    function handleReadyMessage(event: { data: EventMessage }) {
      if (event.data.source === POST_MESSAGE_SOURCE && event.data.event === 'ready') {
        setIsReady(true)
      }
    }
    window.addEventListener('message', handleReadyMessage)
    return () => window.removeEventListener('message', handleReadyMessage)
  }, [])
}

function useInitSolve(
  isReady: boolean,
  iframeRef: RefObject<HTMLIFrameElement>,
  onTimeStart: CubeTimeStartCallback,
  onSolveFinish: CubeSolveFinishCallback,
  scramble?: string,
) {
  useEffect(() => {
    if (!scramble || !isReady) {
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
  }, [isReady, scramble, onTimeStart, onSolveFinish, iframeRef])
}
