import { createContext } from 'react'
import { type InitSolveData, type CubeSolveFinishCallback } from './Cube'

type CubeContextValue = {
  initSolve: (data: InitSolveData, onSolveFinish: CubeSolveFinishCallback) => void
}

export const CubeContext = createContext<CubeContextValue>({
  initSolve: () => {
    throw new Error('cube context is missing')
  },
})
