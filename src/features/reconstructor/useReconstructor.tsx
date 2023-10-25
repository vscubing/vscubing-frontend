import { useContext } from 'react'
import { ReconstructorContext } from './ReconstructorProvider'

export const useReconstructor = () => {
  return useContext(ReconstructorContext)
}
