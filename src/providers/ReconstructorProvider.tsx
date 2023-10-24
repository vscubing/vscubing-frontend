import { useSolveReconstruction } from '@/api'
import { Reconstructor } from '@/components'
import { createContext, useContext, useState } from 'react'

type ReconstructorContextValue = {
  showReconstruction: (solveId: number) => void
}

const ReconstructorContext = createContext<ReconstructorContextValue>({
  showReconstruction: () => {
    throw new Error('context is missing')
  },
})

export const useReconstructor = () => {
  return useContext(ReconstructorContext)
}

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
