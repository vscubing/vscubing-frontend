import { useContext } from 'react'
import { SolverContext } from './SolverProvider'

export const useSolver = () => {
  return useContext(SolverContext)
}
