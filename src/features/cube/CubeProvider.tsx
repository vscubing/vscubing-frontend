import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
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

  useEffect(() => console.log(isTimeStarted), [isTimeStarted])

  const timeStartHandler = useCallback(() => setIsTimeStarted(true), [])

  const solveFinishHandler = useCallback(
    (result: CubeSolveResult) => {
      if (!savedSolveFinishCallback) throw Error('no saved solve callback')
      savedSolveFinishCallback(result)
      setIsTimeStarted(false)
      setSavedSolveFinishCallback(undefined)
      setScramble(undefined)
    },
    [savedSolveFinishCallback],
  )

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
        className={classNames(
          { invisible: !scramble },
          'fixed	inset-0 flex justify-center bg-black bg-opacity-40 pt-20',
        )}
      >
        <Cube scramble={scramble} onSolveFinish={solveFinishHandler} onTimeStart={timeStartHandler} />
      </div>
      {children}
    </CubeContext.Provider>
  )
}
