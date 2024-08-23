import { createContext } from 'react'
import { type CubeSolveFinishCallback } from './Cube'

type CubeContextValue = {
  initSolve: (scramble: string, onSolveFinish: CubeSolveFinishCallback) => void
}

export const CubeContext = createContext<CubeContextValue>({
  initSolve: () => {
    throw new Error('cube context is missing')
  },
})
