import { useContext } from 'react'
import { ReconstructorContext } from './components/ReconstructorProvider'

export { ReconstructorProvider } from './components'
export function useReconstructor() {
  return useContext(ReconstructorContext)
}
