import { Reconstructor, ReconstructorSolve } from '@/components'
import { createContext, useContext, useState } from 'react'

type ReconstructorContextValue = {
  showSolve: (solve: ReconstructorSolve) => void
}

const ReconstructorContext = createContext<ReconstructorContextValue>({
  showSolve: () => {
    throw new Error('context is missing')
  },
})

export const useReconstructor = () => {
  return useContext(ReconstructorContext)
}

type ReconstructorProviderProps = { children: React.ReactNode }
export const ReconstructorProvider = ({ children }: ReconstructorProviderProps) => {
  const [currentSolve, setCurrentSolve] = useState<ReconstructorSolve | null>(null)

  const value = {
    showSolve: (solve: ReconstructorSolve) => {
      setCurrentSolve(solve)
    },
  }
  return (
    <ReconstructorContext.Provider value={value}>
      <Reconstructor solve={currentSolve} onClose={() => setCurrentSolve(null)} />
      {children}
    </ReconstructorContext.Provider>
  )
}
