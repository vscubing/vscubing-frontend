import { createContext, useCallback, useMemo, useState } from 'react'
import { Reconstruction, ReconstructionMetadata, Reconstructor } from './Reconstructor'
import { SolveReconstructionResponse, useSolveReconstruction } from '@/api/contests'
import { formatTimeResult } from '@/utils'
import classNames from 'classnames'

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

type ReconstructorProviderProps = { children: React.ReactNode }
export const ReconstructorProvider = ({ children }: ReconstructorProviderProps) => {
  const [solveId, setSolveId] = useState<number | null>(null)
  const [savedCloseCallback, setSavedCloseCallback] = useState<() => void>()
  const { data } = useSolveReconstruction(solveId)
  const content = useMemo(() => {
    if (!data) return null
    return parseReconstructionResponse(data)
  }, [data])

  const close = useCallback(() => {
    setSolveId(null)
    savedCloseCallback?.()
    setSavedCloseCallback(undefined)
  }, [savedCloseCallback])

  const handleOverlayClick = (event: React.MouseEvent) => {
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
        className={classNames(
          { invisible: !content },
          'fixed	inset-0 flex justify-center bg-black bg-opacity-40 px-[146px] py-[5%]',
        )}
      >
        <Reconstructor content={content} />
      </div>
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
  const link = `${window.location.origin}/contest/${contest_number}/${discipline.name}?solveId=${id}`
  const reconstruction = { scramble: scramble.scramble, solution } satisfies Reconstruction
  const metadata = {
    link,
    contestNumber: contest_number,
    username,
    scramblePosition: scramble.position,
    formattedTime: formatTimeResult(parseTimeMsFromSolution(reconstruction.solution)),
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
