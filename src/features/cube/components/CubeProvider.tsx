import { createContext, useCallback, useMemo, useRef, useState } from 'react'
import { cn, useConditionalBeforeUnload } from '@/utils'
import { type CubeSolveResult, type CubeSolveFinishCallback, Cube } from './Cube'
import { AbortPrompt } from './AbortPrompt'
import { CloseIcon, LoadingSpinner, SecondaryButton } from '@/components/ui'

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
  const [isAbortPromptVisible, setIsAbortPromptVisible] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const initSolve = useCallback((scramble: string, solveCallback: CubeSolveFinishCallback) => {
    setSolveState({ scramble, solveCallback, wasTimeStarted: false })
  }, [])

  const handleTimeStart = useCallback(() => {
    setSolveState((prev) => prev && { ...prev, wasTimeStarted: true })
  }, [])

  const solveStateCallback = solveState?.solveCallback
  const handleSolveFinish = useCallback(
    (result: CubeSolveResult) => {
      solveStateCallback!(result)
      setSolveState(null)
    },
    [solveStateCallback],
  )

  const shouldDNFOnPageLeave = !!solveState && solveState.wasTimeStarted
  useConditionalBeforeUnload(shouldDNFOnPageLeave, () =>
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
      initSolve,
    }),
    [initSolve],
  )

  const isModalOpen = !!solveState
  return (
    <CubeContext.Provider value={contextValue}>
      <div
        onClick={handleOverlayClick}
        className={cn(
          'wrapper fixed inset-0 z-20 bg-black-1000 bg-opacity-25 p-[1.625rem] transition duration-100 ease-in-out',
          {
            'pointer-events-none opacity-0': !isModalOpen,
          },
        )}
        aria-hidden={!isModalOpen}
      >
        <div className='relative h-full rounded-2xl bg-black-80'>
          <div className='absolute inset-0 h-full w-full bg-black-1000 bg-opacity-25'></div>
          <div className={cn('absolute inset-0 h-full w-full bg-cubes bg-cover bg-bottom opacity-40')}></div>
          <Cube
            fallback={
              <div className='flex h-full items-center justify-center'>
                <LoadingSpinner />
              </div>
            }
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
