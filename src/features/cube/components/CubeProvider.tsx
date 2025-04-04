import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import { useConditionalBeforeUnload } from '@/utils'
import { type SolveResult, type SolveFinishCallback, type InitSolveData } from './Simulator/Simulator.lazy'
import { AbortPrompt } from './AbortPrompt'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Dialog, DialogCloseCross, DialogOverlay, DialogPortal, LoadingSpinner } from '@/components/ui'
import { KeyMapDialogTrigger, KeyMapDialogContent } from '@/shared/KeyMapDialog'
import { CubeContext } from './CubeContext'
import { useMutateSettings, useSettings } from '@/features/settings/queries'
import { z } from 'zod'
import { type CameraPosition } from '@/vendor/cstimer/puzzlefactory'
const Simulator = lazy(() => import('./Simulator/Simulator.lazy'))

type CubeProviderProps = { children: React.ReactNode }
export function CubeProvider({ children }: CubeProviderProps) {
  const { data: settings } = useSettings()
  const { mutate: mutateSettings } = useMutateSettings()

  // debounce cameraPosition
  const [queuedCameraPosition, setQueuedCameraPosition] = useState<CameraPosition>()
  useEffect(() => {
    if (!queuedCameraPosition) return
    const timeout = setTimeout(
      () =>
        mutateSettings({
          cstimerCameraPositionTheta: queuedCameraPosition.theta,
          cstimerCameraPositionPhi: queuedCameraPosition.phi,
        }),
      500,
    )
    return () => clearTimeout(timeout)
  }, [queuedCameraPosition, mutateSettings])
  const cameraPosition = {
    theta: queuedCameraPosition?.theta ?? settings?.cstimerCameraPositionTheta ?? 0,
    phi: queuedCameraPosition?.phi ?? settings?.cstimerCameraPositionPhi ?? 6,
  }

  const [solveState, setSolveState] = useState<{
    initSolveData: InitSolveData
    solveCallback: SolveFinishCallback
    wasInspectionStarted: boolean
  } | null>(null)
  const [isAbortPromptVisible, setIsAbortPromptVisible] = useState(false)

  const initSolve = useCallback((initSolveData: InitSolveData, solveCallback: SolveFinishCallback) => {
    setSolveState({ initSolveData, solveCallback, wasInspectionStarted: false })
  }, [])

  const handleInspectionStart = useCallback(() => {
    setSolveState((prev) => prev && { ...prev, wasInspectionStarted: true })
  }, [])

  const solveCallback = solveState?.solveCallback
  const handleSolveFinish = useCallback(
    (result: SolveResult) => {
      solveCallback!(result)
      setSolveState(null)
    },
    [solveCallback],
  )

  const shouldDNFOnPageLeave = !!solveState && solveState.wasInspectionStarted
  useConditionalBeforeUnload(shouldDNFOnPageLeave, () => handleSolveFinish({ isDnf: true }))

  const abortOrShowPrompt = useCallback(() => {
    if (solveState!.wasInspectionStarted === false) {
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
  }, [])

  const contextValue = useMemo(
    () => ({
      initSolve,
    }),
    [initSolve],
  )

  const isModalOpen = !!solveState
  return (
    <>
      <DialogPrimitive.Root open={isModalOpen}>
        <DialogPrimitive.Portal>
          <div
            className='fixed inset-0 z-50 bg-black-100 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0'
            onClick={abortOrShowPrompt}
          ></div>

          <DialogPrimitive.Content
            aria-describedby={undefined}
            style={{ pointerEvents: undefined }}
            className='fixed inset-[1.625rem] z-50 rounded-2xl bg-black-80 duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0'
          >
            <DialogPrimitive.Title className='sr-only'>Virtual cube simulator</DialogPrimitive.Title>
            <div className='relative h-full rounded-2xl'>
              <Suspense
                fallback={
                  <div className='flex h-full items-center justify-center'>
                    <LoadingSpinner />
                  </div>
                }
              >
                {solveState && settings && (
                  <Simulator
                    initSolveData={solveState.initSolveData}
                    onSolveFinish={handleSolveFinish}
                    onInspectionStart={handleInspectionStart}
                    settings={{
                      animationDuration: settings.cstimerAnimationDuration ?? 100,
                      cameraPosition,
                      inspectionVoiceAlert: z
                        .enum(['Male', 'Female', 'None'])
                        .catch('Male')
                        .parse(settings.cstimerInspectionVoiceAlert),
                    }}
                    setCameraPosition={setQueuedCameraPosition}
                  />
                )}
              </Suspense>
              <div className='absolute left-6 right-6 top-6 flex items-start justify-between'>
                <Dialog>
                  <KeyMapDialogTrigger autoFocus={false} />
                  <DialogPortal>
                    <DialogOverlay className='bg-black-1000/25' withCubes={false} />
                    <KeyMapDialogContent
                      onCloseAutoFocus={(e) => {
                        e.preventDefault()
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
      <CubeContext.Provider value={contextValue}>{children}</CubeContext.Provider>
    </>
  )
}
