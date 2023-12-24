import { createContext, useCallback, useMemo, useRef, useState } from 'react'
import { cn, isTouchDevice, useConditionalBeforeUnload } from '@/utils'
import { useLocalStorage } from 'usehooks-ts'
import { CubeSolveResult } from '..'
import { CubeSolveFinishCallback, Cube } from './Cube'
import { AbortPrompt } from './AbortPrompt'
import { DeviceWarningModal } from './DeviceWarningModal'

type CubeContextValue = {
  initSolve: (scramble: string, solveFinishCallback: CubeSolveFinishCallback) => void
}

export const CubeContext = createContext<CubeContextValue>({
  initSolve: () => {
    throw new Error('cube context is missing')
  },
})

type CubeProviderProps = { children: React.ReactNode }
export function CubeProvider({ children }: CubeProviderProps) {
  const [solveState, setSolveState] = useState<{
    scramble: string
    solveCallback: CubeSolveFinishCallback
    wasTimeStarted: boolean
  } | null>(null)
  const [deviceWarningCallback, setDeviceWarningCallback] = useState<(() => void) | null>(null)
  const [isIgnoreDeviceWarning, setIsIgnoreDeviceWarning] = useLocalStorage('ignore-device-warning', false)
  const [isAbortPromptVisible, setIsAbortPromptVisible] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const handleTimeStart = useCallback(() => {
    setSolveState((prev) => prev && { ...prev, wasTimeStarted: true })
  }, [])

  const solveStateCallback = solveState?.solveCallback
  const handleSolveFinish = useCallback(
    (result: CubeSolveResult) => {
      if (!solveStateCallback) throw Error('no saved solve callback')
      solveStateCallback(result)
      setSolveState(null)
    },
    [solveStateCallback],
  )

  useConditionalBeforeUnload(solveState ? solveState.wasTimeStarted : false, () =>
    handleSolveFinish({ dnf: true, timeMs: null, reconstruction: null }),
  )

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target !== event.currentTarget || !solveState) {
      return
    }

    if (!solveState.wasTimeStarted) {
      setSolveState(null)
      return
    }

    setIsAbortPromptVisible(true)
  }

  const handleAbortConfirm = useCallback(() => {
    setIsAbortPromptVisible(false)
    handleSolveFinish({ timeMs: null, dnf: true, reconstruction: null })
  }, [handleSolveFinish])

  const handleAbortCancel = useCallback(() => {
    setIsAbortPromptVisible(false)
    iframeRef.current?.contentWindow?.focus()
  }, [])

  const contextValue = useMemo(
    () => ({
      initSolve: (scramble: string, solveCallback: CubeSolveFinishCallback) => {
        const initSolve = () => setSolveState({ scramble, solveCallback, wasTimeStarted: false })
        if (!isTouchDevice || isIgnoreDeviceWarning) {
          initSolve()
          return
        }

        setDeviceWarningCallback(() => initSolve)
      },
    }),
    [isIgnoreDeviceWarning],
  )

  return (
    <CubeContext.Provider value={contextValue}>
      {deviceWarningCallback && (
        <DeviceWarningModal
          onCancel={() => {
            setDeviceWarningCallback(null)
          }}
          onConfirm={(isIgnoreChecked) => {
            deviceWarningCallback?.()
            setDeviceWarningCallback(null)
            if (isIgnoreChecked) setIsIgnoreDeviceWarning(isIgnoreChecked)
          }}
        />
      )}
      <div
        onClick={handleOverlayClick}
        className={cn(
          { invisible: !solveState?.scramble },
          'wrapper fixed inset-0 z-20 bg-black bg-opacity-40 px-10 pb-5 pt-[50px] md:py-[max(5%,55px)]',
        )}
      >
        <div className='relative h-full'>
          {isAbortPromptVisible && <AbortPrompt onConfirm={handleAbortConfirm} onCancel={handleAbortCancel} />}
          <Cube
            scramble={solveState?.scramble}
            onSolveFinish={handleSolveFinish}
            onTimeStart={handleTimeStart}
            iframeRef={iframeRef}
          />
        </div>
      </div>
      {children}
    </CubeContext.Provider>
  )
}
