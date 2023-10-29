import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { CubeSolveFinishCallback, CubeSolveResult, Cube } from './Cube'

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

  const timeStartHandler = useCallback(() => setIsTimeStarted(true), [])

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
      <Cube scramble={scramble} onSolveFinish={solveFinishHandler} onTimeStart={timeStartHandler} />
      {children}
    </CubeContext.Provider>
  )
}
