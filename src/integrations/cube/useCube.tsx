import { useContext } from 'react'
import { CubeContext } from './CubeProvider'

export function useCube() {
  return useContext(CubeContext)
}
