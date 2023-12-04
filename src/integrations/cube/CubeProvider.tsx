import { createContext, useCallback, useMemo, useRef, useState } from 'react'
import { CubeSolveFinishCallback, CubeSolveResult, Cube } from './Cube'
import { cn, useConditionalBeforeUnload } from '@/utils'

type CubeContextValue = {
  startSolve: (scramble: string, solveFinishCallback: CubeSolveFinishCallback) => void
}

export const CubeContext = createContext<CubeContextValue>({
  startSolve: () => {
    throw new Error('cube context is missing')
  },
})

type CubeProviderProps = { children: React.ReactNode }
export const CubeProvider = ({ children }: CubeProviderProps) => {
  const [scramble, setScramble] = useState<string>()
  const [savedSolveFinishCallback, setSavedSolveFinishCallback] = useState<CubeSolveFinishCallback>()
  const [wasTimeStarted, setWasTimeStarted] = useState(false)
  const [isAbortPromptVisible, setIsAbortPromptVisible] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const hideCube = () => {
    setSavedSolveFinishCallback(undefined)
    setScramble(undefined)
  }

  const handleTimeStart = useCallback(() => {
    return setWasTimeStarted(true)
  }, [])

  const handleSolveFinish = useCallback(
    (result: CubeSolveResult) => {
      if (!savedSolveFinishCallback) throw Error('no saved solve callback')

      savedSolveFinishCallback(result)

      setWasTimeStarted(false)

      hideCube()
    },
    [savedSolveFinishCallback],
  )

  useConditionalBeforeUnload(wasTimeStarted, () =>
    handleSolveFinish({ dnf: true, time_ms: null, reconstruction: null }),
  )

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target !== event.currentTarget) {
      return
    }

    if (!wasTimeStarted) {
      hideCube()
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
      startSolve: (scramble: string, solveCallback: CubeSolveFinishCallback) => {
        setSavedSolveFinishCallback(() => solveCallback)
        setScramble(scramble)
      },
    }),
    [],
  )

  return (
    <CubeContext.Provider value={contextValue}>
      <div
        onClick={handleOverlayClick}
        className={cn({ invisible: !scramble }, 'fixed	inset-0 bg-black bg-opacity-40 px-[146px] py-[5%]')}
      >
        <div className='relative h-full'>
          {isAbortPromptVisible ? <AbortPrompt onConfirm={handleAbortConfirm} onCancel={handleAbortCancel} /> : null}
          <Cube
            scramble={scramble}
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
