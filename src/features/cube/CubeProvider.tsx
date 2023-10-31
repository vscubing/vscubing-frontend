import { MouseEventHandler, createContext, useCallback, useMemo, useState } from 'react'
import { CubeSolveFinishCallback, CubeSolveResult, Cube } from './Cube'
import classNames from 'classnames'

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
  const [isTimeStarted, setIsTimeStarted] = useState(false)

  const handleTimeStart = useCallback(() => setIsTimeStarted(true), [])

  const handleSolveFinish = useCallback(
    (result: CubeSolveResult) => {
      if (!savedSolveFinishCallback) throw Error('no saved solve callback')
      savedSolveFinishCallback(result)

      setIsTimeStarted(false)
      setSavedSolveFinishCallback(undefined)
      setScramble(undefined)
    },
    [savedSolveFinishCallback],
  )

  const handleAbort: MouseEventHandler = (event) => {
    if (event.target !== event.currentTarget) {
      return
    }

    if (isTimeStarted) {
      handleSolveFinish({ time_ms: null, dnf: true, reconstruction: null })
      return
    }

    setSavedSolveFinishCallback(undefined)
    setScramble(undefined)
  }

  const value = useMemo(
    () => ({
      startSolve: (scramble: string, solveCallback: CubeSolveFinishCallback) => {
        setSavedSolveFinishCallback(() => solveCallback)
        setScramble(scramble)
      },
    }),
    [],
  )
  return (
    <CubeContext.Provider value={value}>
      <div
        onClick={handleAbort}
        className={classNames(
          { invisible: !scramble },
          'fixed	inset-0 flex justify-center bg-black bg-opacity-40 pt-20',
        )}
      >
        <Cube scramble={scramble} onSolveFinish={handleSolveFinish} onTimeStart={handleTimeStart} />
      </div>
      {children}
    </CubeContext.Provider>
  )
}
