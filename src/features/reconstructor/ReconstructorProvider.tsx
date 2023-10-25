import { createContext, useState } from 'react'
import { Reconstructor } from './Reconstructor'
import { useSolveReconstruction } from '@/api/contests'

type ReconstructorContextValue = {
  showReconstruction: (solveId: number) => void
}

export const ReconstructorContext = createContext<ReconstructorContextValue>({
  showReconstruction: () => {
    throw new Error('context is missing')
  },
})

type ReconstructorProviderProps = { children: React.ReactNode }
export const ReconstructorProvider = ({ children }: ReconstructorProviderProps) => {
  const [solveId, setSolveId] = useState<number | null>(null)
  const { data: reconstruction } = useSolveReconstruction(solveId)

  const value = {
    showReconstruction: (solve: number) => {
      setSolveId(solve)
    },
  }
  return (
    <ReconstructorContext.Provider value={value}>
      <Reconstructor reconstruction={reconstruction} onClose={() => setSolveId(null)} />
      {children}
    </ReconstructorContext.Provider>
  )
}
