import { createContext, useMemo, useState } from 'react'
import { Reconstructor } from './Reconstructor'
import { useSolveReconstruction } from '@/api/contests'

type ReconstructorContextValue = {
  showReconstruction: (solveId: number, onClose?: () => void) => void
}

export const ReconstructorContext = createContext<ReconstructorContextValue>({
  showReconstruction: () => {
    throw new Error('context is missing')
  },
})

type ReconstructorProviderProps = { children: React.ReactNode }
export const ReconstructorProvider = ({ children }: ReconstructorProviderProps) => {
  const [solveId, setSolveId] = useState<number | null>(null)
  const [savedCloseCallback, setSavedCloseCallback] = useState<(() => void) | null>(null)
  const { data: reconstruction } = useSolveReconstruction(solveId)

  const closeHandler = () => {
    setSolveId(null)
    if (savedCloseCallback) {
      savedCloseCallback()
      setSavedCloseCallback(null)
    }
  }

  const value = useMemo(
    () => ({
      showReconstruction: (solve: number, closeCallback?: () => void) => {
        setSolveId(solve)
        setSavedCloseCallback(() => closeCallback)
      },
    }),
    [],
  )
  return (
    <ReconstructorContext.Provider value={value}>
      <Reconstructor reconstruction={reconstruction} onClose={closeHandler} />
      {children}
    </ReconstructorContext.Provider>
  )
}
