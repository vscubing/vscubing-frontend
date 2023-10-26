import { createContext, useState } from 'react'
import { CubeSolveCallback, CubeSolveResult, Cube } from './Cube'

type CubeContextValue = {
  startSolve: (scramble: string, onSolve: CubeSolveCallback) => void
}

export const CubeContext = createContext<CubeContextValue>({
  startSolve: () => {
    throw new Error('cube context is missing')
  },
})

type CubeProviderProps = { children: React.ReactNode }
export const CubeProvider = ({ children }: CubeProviderProps) => {
  const [scramble, setScramble] = useState<string | null>(null)
  const [savedSolveCallback, setSavedSolveCallback] = useState<CubeSolveCallback | null>(null)

  const onSolveHandler = (result: CubeSolveResult) => {
    if (!savedSolveCallback) throw Error('no saved solve callback')
    savedSolveCallback(result)
    setSavedSolveCallback(null)
    setScramble(null)
  }

  const value = {
    startSolve: (scramble: string, solveCallback: CubeSolveCallback) => {
      setSavedSolveCallback(() => solveCallback)
      setScramble(scramble)
    },
  }
  return (
    <CubeContext.Provider value={value}>
      <Cube scramble={scramble} onSolve={onSolveHandler} />
      {children}
    </CubeContext.Provider>
  )
}
