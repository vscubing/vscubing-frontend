import { createContext, useCallback, useMemo, useRef, useState } from 'react'
import { CubeSolveFinishCallback, CubeSolveResult, Cube } from './Cube'
import { cn, isTouchDevice, useConditionalBeforeUnload } from '@/utils'
import { useLocalStorage } from 'usehooks-ts'

type CubeContextValue = {
  initSolve: (scramble: string, solveFinishCallback: CubeSolveFinishCallback) => void
}

export const CubeContext = createContext<CubeContextValue>({
  initSolve: () => {
    throw new Error('cube context is missing')
  },
})

type CubeProviderProps = { children: React.ReactNode }
export const CubeProvider = ({ children }: CubeProviderProps) => {
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
    handleSolveFinish({ dnf: true, time_ms: null, reconstruction: null }),
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
    handleSolveFinish({ time_ms: null, dnf: true, reconstruction: null })
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
        className={cn({ invisible: !solveState?.scramble }, 'fixed	inset-0 bg-black bg-opacity-40 px-[146px] py-[5%]')}
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

type AbortPromptProps = { onConfirm: () => void; onCancel: () => void }
const AbortPrompt = ({ onCancel, onConfirm }: AbortPromptProps) => (
  <div className='absolute flex h-full w-full flex-col items-center justify-center rounded-[5px] bg-[#11191F] text-white'>
    <div className='rounded-[5px] bg-panels px-[40px] py-[25px]'>
      <p className='mb-[25px] text-center text-[24px]'>
        If you quit now,
        <br />
        your result will be DNFed
      </p>
      <div className='flex justify-center gap-[17px]'>
        <button onClick={onConfirm} className='w-[82px] rounded-[5px] bg-[#9B2527] py-[8px]'>
          quit
        </button>
        <button onClick={onCancel} className='w-[82px] rounded-[5px] bg-primary py-[8px]'>
          resume
        </button>
      </div>
    </div>
  </div>
)

const DeviceWarningModal = ({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void
  onConfirm: (isIgnoreChecked: boolean) => void
}) => {
  const [isIgnoreChecked, setIsIgnoreChecked] = useState(false)

  return (
    <div
      onClick={(event) => {
        if (event.target === event.currentTarget) onCancel()
      }}
      className='fixed flex h-full w-full flex-col items-center justify-center rounded-[5px] bg-black bg-opacity-40 px-5 text-white'
    >
      <div className='rounded-[5px] bg-panels px-[40px] py-[25px] text-center md:text-left'>
        <p className='mb-4 text-[24px]'>Solving without a keyboard is currently not supported.</p>
        <label className='mb-3 block'>
          <input
            checked={isIgnoreChecked}
            onChange={(event) => setIsIgnoreChecked(event.target.checked)}
            type='checkbox'
          />
          Do not show this message again
        </label>
        <div className='flex justify-center gap-[17px] md:justify-start'>
          <button onClick={onCancel} className='rounded-[5px] bg-[#9B2527] px-2 py-2'>
            go back
          </button>
          <button onClick={() => onConfirm(isIgnoreChecked)} className='rounded-[5px] bg-primary px-2 py-2'>
            continue anyway
          </button>
        </div>
      </div>
    </div>
  )
}
