import { createContext, useCallback, useMemo, useRef, useState } from 'react'
import { cn, isTouchDevice, useConditionalBeforeUnload } from '@/utils'
import { useLocalStorage } from 'usehooks-ts'
import { type CubeSolveResult } from '..'
import { type CubeSolveFinishCallback, Cube } from './Cube'
import { AbortPrompt } from './AbortPrompt'
import { DeviceWarningModal } from './DeviceWarningModal'
import { CloseIcon, SecondaryButton } from '@/components/ui'

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

  function handleOverlayClick(event: React.MouseEvent) {
    if (event.target === event.currentTarget) {
      abortOrShowPrompt()
    }
  }

  const abortOrShowPrompt = () => {
    if (!solveState) {
      return
    }

    if (!solveState.wasTimeStarted) {
      setSolveState(null)
      return
    }

    setIsAbortPromptVisible(true)
  }

  const confirmAbort = useCallback(() => {
    setIsAbortPromptVisible(false)
    handleSolveFinish({ timeMs: null, dnf: true, reconstruction: null })
  }, [handleSolveFinish])

  const cancelAbort = useCallback(() => {
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
          'wrapper bg-black-1000 fixed inset-0 z-20 bg-opacity-25 p-[1.625rem]',
        )}
      >
        <div className='relative h-full rounded-2xl bg-black-80'>
          <div className='bg-black-1000 absolute inset-0 h-full h-full w-full bg-opacity-25'></div>
          <div
            className={cn('bg-cubes absolute inset-0 h-full h-full w-full bg-cover bg-left-bottom opacity-40', {
              hidden: !solveState?.scramble,
            })}
          ></div>
          <Cube
            className='relative'
            scramble={solveState?.scramble}
            onSolveFinish={handleSolveFinish}
            onTimeStart={handleTimeStart}
            iframeRef={iframeRef}
          />
          <SecondaryButton size='iconSm' className='absolute right-4 top-4' onClick={abortOrShowPrompt}>
            <CloseIcon />
          </SecondaryButton>
          <AbortPrompt isVisible={isAbortPromptVisible} onConfirm={confirmAbort} onCancel={cancelAbort} />
        </div>
      </div>
      {children}
    </CubeContext.Provider>
  )
}
