import { useContext } from 'react'
import { CubeContext } from './components/CubeProvider'

export * from './components/CubeProvider'
export { type CubeSolveResult } from './components/Cube'

export function useCube() {
  return useContext(CubeContext)
}
