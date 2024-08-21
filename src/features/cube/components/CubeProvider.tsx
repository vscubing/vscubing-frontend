import { createContext, useCallback, useMemo, useRef, useState } from 'react'
import { cn, useConditionalBeforeUnload } from '@/utils'
import { type CubeSolveResult, type CubeSolveFinishCallback, Cube } from './Cube'
import { AbortPrompt } from './AbortPrompt'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Dialog, DialogCloseCross, DialogOverlay, DialogPortal, LoadingSpinner } from '@/components/ui'
import { KeyMapDialogTrigger, KeyMapDialogContent } from '@/shared/KeyMapDialog'

type CubeContextValue = {
  initSolve: (scramble: string, onSolveFinish: CubeSolveFinishCallback) => void
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

  const focusCube = useCallback(() => {
    iframeRef.current?.contentWindow?.focus()
  }, [])

  const initSolve = useCallback((scramble: string, solveCallback: CubeSolveFinishCallback) => {
    setSolveState({ scramble, solveCallback, wasTimeStarted: false })
  }, [])

  const handleTimeStart = useCallback(() => {
    setSolveState((prev) => prev && { ...prev, wasTimeStarted: true })
  }, [])

  const solveCallback = solveState?.solveCallback
  const handleSolveFinish = useCallback(
    (result: CubeSolveResult) => {
      solveCallback!(result)
      setSolveState(null)
    },
    [solveCallback],
  )

  const shouldDNFOnPageLeave = !!solveState && solveState.wasTimeStarted
  useConditionalBeforeUnload(shouldDNFOnPageLeave, () => handleSolveFinish({ isDnf: true }))

  const abortOrShowPrompt = useCallback(() => {
    if (solveState!.wasTimeStarted === false) {
      setSolveState(null)
      return
    }

    setIsAbortPromptVisible(true)
  }, [solveState])

  const confirmAbort = useCallback(() => {
    setIsAbortPromptVisible(false)
    handleSolveFinish({ isDnf: true })
  }, [handleSolveFinish])

  const cancelAbort = useCallback(() => {
    setIsAbortPromptVisible(false)
    focusCube()
  }, [focusCube])

  const contextValue = useMemo(
    () => ({
      initSolve,
    }),
    [initSolve],
  )

  const isModalOpen = !!solveState
  return (
    <CubeContext.Provider value={contextValue}>
      <DialogPrimitive.Root open={isModalOpen}>
        <DialogPrimitive.Portal forceMount>
          <div
            style={{ pointerEvents: undefined }}
            className={cn('fixed inset-0 z-50 bg-black-100', { 'pointer-events-none opacity-0': !isModalOpen })}
            onClick={abortOrShowPrompt}
          ></div>

          <DialogPrimitive.Content
            aria-describedby={undefined}
            style={{ pointerEvents: undefined }}
            className={cn('fixed inset-[1.625rem] z-50 rounded-2xl bg-black-80 duration-200', {
              'pointer-events-none opacity-0': !isModalOpen,
            })}
          >
            <DialogPrimitive.Title className='sr-only'>Virtual cube simulator</DialogPrimitive.Title>
            <div className='relative h-full rounded-2xl'>
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
              <div className='absolute left-6 right-6 top-6 flex items-start justify-between'>
                <Dialog>
                  <KeyMapDialogTrigger />
                  <DialogPortal>
                    <DialogOverlay className='bg-black-1000/25' withCubes={false} />
                    <KeyMapDialogContent
                      onCloseAutoFocus={(e) => {
                        e.preventDefault()
                        focusCube()
                      }}
                    />
                  </DialogPortal>
                </Dialog>
                <DialogCloseCross onClick={abortOrShowPrompt} />
              </div>

              <AbortPrompt isVisible={isAbortPromptVisible} onConfirm={confirmAbort} onCancel={cancelAbort} />
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
      {children}
    </CubeContext.Provider>
  )
}
