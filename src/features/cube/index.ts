import { useContext } from 'react'
import { CubeContext } from './components/CubeContext'

export * from './components/CubeProvider'
export { type SolveResult } from './components/Simulator/Simulator.lazy'

export function useCube() {
  return useContext(CubeContext)
}
