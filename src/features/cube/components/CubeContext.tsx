import { createContext } from 'react'
import { type InitSolveData, type SolveFinishCallback } from './Simulator/Simulator.lazy'

type CubeContextValue = {
  initSolve: (data: InitSolveData, onSolveFinish: SolveFinishCallback) => void
}

export const CubeContext = createContext<CubeContextValue>({
  initSolve: () => {
    throw new Error('cube context is missing')
  },
})
