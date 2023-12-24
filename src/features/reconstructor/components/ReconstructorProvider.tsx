import { createContext, useCallback, useMemo, useState } from 'react'
import { Reconstruction, ReconstructionMetadata, Reconstructor } from './Reconstructor'
import { cn, formatTimeResult } from '@/utils'
import { useQuery } from '@tanstack/react-query'
import { reconstructionQuery, ReconstructionDTO } from '../api'

type ReconstructorContextValue = {
  showReconstruction: (solveId: number, onClose?: () => void) => void
  closeReconstruction: () => void
}

export const ReconstructorContext = createContext<ReconstructorContextValue>({
  showReconstruction: () => {
    throw new Error('context is missing')
  },
  closeReconstruction: () => {
    throw new Error('context is missing')
  },
})

export function ReconstructorProvider({ children }: { children: React.ReactNode }) {
  const [solveId, setSolveId] = useState<number | null>(null)
  const [savedCloseCallback, setSavedCloseCallback] = useState<() => void>()
  const { data } = useQuery(reconstructionQuery(solveId))
  const content = useMemo(() => {
    if (!data) return null
    return parseReconstructionDTO(data)
  }, [data])

  const close = useCallback(() => {
    setSolveId(null)
    savedCloseCallback?.()
    setSavedCloseCallback(undefined)
  }, [savedCloseCallback])

  function handleOverlayClick(event: React.MouseEvent) {
    if (event.target !== event.currentTarget) {
      return
    }
    close()
  }

  const contextValue = useMemo(
    () => ({
      showReconstruction: (solve: number, closeCallback?: () => void) => {
        setSolveId(solve)
        setSavedCloseCallback(() => closeCallback)
      },
      closeReconstruction: close,
    }),
    [close],
  )

  return (
    <ReconstructorContext.Provider value={contextValue}>
      <div
        onClick={handleOverlayClick}
        className={cn(
          { invisible: !content },
          'wrapper fixed  inset-0	z-20 flex justify-center bg-black bg-opacity-40 pb-5 pt-[50px] md:py-[max(5%,55px)]',
        )}
      >
        <Reconstructor content={content} />
      </div>
      {children}
    </ReconstructorContext.Provider>
  )
}

function parseReconstructionDTO({
  contestNumber: contestNumber,
  discipline,
  id,
  scramble,
  user: { username },
  reconstruction: solution,
}: ReconstructionDTO) {
  const link = `${window.location.origin}/contest/${contestNumber}/${discipline.name}?solveId=${id}`
  const reconstruction = { scramble: scramble.scramble, solution } satisfies Reconstruction
  const metadata = {
    link,
    contestNumber,
    username,
    scramblePosition: scramble.position,
    formattedTime: formatTimeResult(parseTimeMsFromSolution(reconstruction.solution)),
  } satisfies ReconstructionMetadata
  return { reconstruction, metadata }
}

function parseTimeMsFromSolution(solution: string) {
  const withoutLastTwoChars = solution.slice(0, -2)
  const parts = withoutLastTwoChars.split('/*')
  const timeMs = Number(parts[parts.length - 1])
  if (isNaN(timeMs)) throw Error('invalid time in reconstruction')
  return Number(timeMs)
}
