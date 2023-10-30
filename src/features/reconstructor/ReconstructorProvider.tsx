import { createContext, useMemo, useState } from 'react'
import { Reconstruction, ReconstructionMetadata, Reconstructor } from './Reconstructor'
import { SolveReconstructionResponse, useSolveReconstruction } from '@/api/contests'
import { formatSolveTime } from '@/utils'

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
    return parseReconstructionResponse(data)
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

const parseReconstructionResponse = ({
  contest_number,
  discipline,
  id,
  scramble,
  user: { username },
  reconstruction: solution,
}: SolveReconstructionResponse) => {
  const link = `${window.location.origin}/contest/${contest_number}/${discipline}?solveId=${id}`
  const reconstruction = { scramble: scramble.scramble, solution } satisfies Reconstruction
  const metadata = {
    link,
    contestNumber: contest_number,
    username,
    scramblePosition: scramble.position,
    formattedTime: formatSolveTime(parseTimeMsFromSolution(reconstruction.solution)),
  } satisfies ReconstructionMetadata
  return { reconstruction, metadata }
}

const parseTimeMsFromSolution = (solution: string) => {
  const withoutLastTwoChars = solution.slice(0, -2)
  const parts = withoutLastTwoChars.split('/*')
  const timeMs = Number(parts[parts.length - 1])
  if (isNaN(timeMs)) throw Error('invalid time in reconstruction')
  return Number(timeMs)
}
