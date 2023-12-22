import { useContext } from 'react'
import { ReconstructorContext } from './ReconstructorProvider'

export function useReconstructor() {
  return useContext(ReconstructorContext)
}
