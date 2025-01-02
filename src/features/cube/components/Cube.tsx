import { type Settings, useSettings } from '@/features/settings/queries'
import { cn } from '@/utils'
import { type RefObject, useEffect, useState, type ReactNode } from 'react'

export type InitSolveData = { scramble: string; discipline: string }

export type CubeSolveResult = { isDnf: false; reconstruction: string; timeMs: number } | { isDnf: true }
export type CubeSolveFinishCallback = (result: CubeSolveResult) => void
export type CubeTimeStartCallback = () => void

type CubeProps = {
  className?: string
  initSolveData?: InitSolveData
  onSolveStart: CubeTimeStartCallback
  onSolveFinish: CubeSolveFinishCallback
  iframeRef: RefObject<HTMLIFrameElement>
}

export function Cube({
  className,
  fallback,
  initSolveData,
  onSolveStart,
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
        initSolveData={initSolveData}
        onSolveStart={onSolveStart}
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
  initSolveData,
  onSolveStart,
  onSolveFinish,
  iframeRef,
}: CubeProps & { isReady: boolean; setIsReady: (isReady: boolean) => void }) {
  useHandleIframeReady(setIsReady)
  useInitSolve(isReady, iframeRef, onSolveStart, onSolveFinish, initSolveData)
  usePassSettings(isReady, iframeRef)

  const isIframeInited = !!initSolveData || isReady
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

export const POST_MESSAGE_SOURCE = 'vs-solver-integration'

export type AppMessage = { source: typeof POST_MESSAGE_SOURCE } & (
  | SettingsMessage
  | InitSolveMessage
  | AbortSolveMessage
)
type SettingsMessage = { event: 'settings'; payload: { settings: Settings } }
type InitSolveMessage = { event: 'initSolve'; payload: InitSolveData }
type AbortSolveMessage = { event: 'abortSolve' }

type CsMessage =
  | { source: undefined }
  | ({ source: typeof POST_MESSAGE_SOURCE } & (ReadyEvent | SolveStartEvent | SolveFinishEvent))
type ReadyEvent = { event: 'ready'; payload: undefined }
type SolveStartEvent = { event: 'solveStart'; payload: undefined }
type SolveFinishEvent = { event: 'solveFinish'; payload: { result: CubeSolveResult } }

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
  onSolveStart: CubeTimeStartCallback,
  onSolveFinish: CubeSolveFinishCallback,
  initSolveData?: InitSolveData,
) {
  useEffect(() => {
    if (!initSolveData || !isReady) {
      return
    }

    function initSolve() {
      const message = {
        source: POST_MESSAGE_SOURCE,
        event: 'initSolve',
        payload: initSolveData!,
      } satisfies AppMessage
      iframeRef.current!.contentWindow!.postMessage(message)
    }
    function solveProgressListener(message: { data: CsMessage }) {
      if (message.data.source !== POST_MESSAGE_SOURCE) {
        return
      }

      const { event, payload } = message.data
      if (event === 'solveStart') {
        onSolveStart()
      }

      if (event === 'solveFinish') {
        onSolveFinish(payload.result)
      }
    }

    initSolve()
    window.addEventListener('message', solveProgressListener)
    return () => window.removeEventListener('message', solveProgressListener)
  }, [isReady, initSolveData, onSolveStart, onSolveFinish, iframeRef])
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
