import { useContext } from 'react'
import { CubeContext } from './CubeProvider'

export const useCube = () => {
  return useContext(CubeContext)
}
