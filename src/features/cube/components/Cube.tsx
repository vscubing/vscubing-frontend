import { type Settings, useSettings } from '@/features/settings/queries'
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
  usePassSettings(isReady, iframeRef)

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

const POST_MESSAGE_SOURCE = 'vs-solver-integration'

type AppMessage = { source: typeof POST_MESSAGE_SOURCE } & (SettingsMessage | InitSolveMessage)
type SettingsMessage = { event: 'settings'; payload: { settings: Settings } }
type InitSolveMessage = { event: 'initSolve'; payload: { scramble: string } }

type CsMessage =
  | { source: undefined }
  | ({ source: typeof POST_MESSAGE_SOURCE } & (ReadyEvent | TimeStartEvent | SolveFinishEvent))
type ReadyEvent = { event: 'ready'; payload: undefined }
type TimeStartEvent = { event: 'timeStart'; payload: undefined }
type SolveFinishEvent = { event: 'solveFinish'; payload: { result: { reconstruction: string; timeMs: number } } }

function useHandleIframeReady(setIsReady: (isReady: boolean) => void) {
  useEffect(() => {
    function handleReadyMessage(event: { data: CsMessage }) {
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

    function initSolve() {
      const message = {
        source: POST_MESSAGE_SOURCE,
        event: 'initSolve',
        payload: { scramble: scramble! },
      } satisfies AppMessage
      iframeRef.current!.contentWindow!.postMessage(message)
    }
    function solveProgressListener(message: { data: CsMessage }) {
      if (message.data.source !== POST_MESSAGE_SOURCE) {
        return
      }

      const { event, payload } = message.data
      if (event === 'timeStart') {
        onTimeStart()
      }

      if (event === 'solveFinish') {
        const { reconstruction, timeMs } = payload.result
        onSolveFinish({ reconstruction, timeMs, isDnf: false })
      }
    }

    initSolve()
    window.addEventListener('message', solveProgressListener)
    return () => window.removeEventListener('message', solveProgressListener)
  }, [isReady, scramble, onTimeStart, onSolveFinish, iframeRef])
}

function usePassSettings(isReady: boolean, iframeRef: RefObject<HTMLIFrameElement>) {
  const { data: settings } = useSettings()
  useEffect(() => {
    if (settings && isReady) {
      const message = {
        source: POST_MESSAGE_SOURCE,
        event: 'settings',
        payload: { settings },
      } satisfies AppMessage
      iframeRef.current!.contentWindow!.postMessage(message)
    }
  }, [settings, isReady, iframeRef])
}
