import { createContext, useState } from 'react'
import { Solver, SolverCallback, SolverResult } from './Solver'

type SolverContextValue = {
  startSolve: (scramble: string, onSolve: SolverCallback) => void
}

export const SolverContext = createContext<SolverContextValue>({
  startSolve: () => {
    throw new Error('solver context is missing')
  },
})

type SolverProviderProps = { children: React.ReactNode }
export const SolverProvider = ({ children }: SolverProviderProps) => {
  const [scramble, setScramble] = useState<string | null>(null)
  const [onSolveCallback, setOnSolveCallback] = useState<SolverCallback | null>(null)

  const onSolveHandler = (result: SolverResult) => {
    if (!onSolveCallback) throw Error('no solve callback')
    onSolveCallback(result)
    setOnSolveCallback(null)
    setScramble(null)
  }

  const value = {
    startSolve: (scramble: string, onSolve: SolverCallback) => {
      setOnSolveCallback(() => onSolve)
      setScramble(scramble)
    },
  }
  return (
    <SolverContext.Provider value={value}>
      <Solver scramble={scramble} onSolve={onSolveHandler} />
      {children}
    </SolverContext.Provider>
  )
}
