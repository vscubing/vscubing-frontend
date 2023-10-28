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
  const [savedCloseCallback, setSavedCloseCallback] = useState<() => void>()
  const { data } = useSolveReconstruction(solveId)
  const content = useMemo(() => {
    if (!data) return undefined

    const link = `${window.location.origin}/contest/${data.contest_number}/${data.discipline}?solveId=${data.id}`
    return { reconstruction: { scramble: data.scramble, reconstruction: data.reconstruction }, link }
  }, [data])

  const closeHandler = () => {
    setSolveId(null)
    if (savedCloseCallback) {
      savedCloseCallback()
      setSavedCloseCallback(undefined)
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
      <Reconstructor content={content} onClose={closeHandler} />
      {children}
    </ReconstructorContext.Provider>
  )
}
