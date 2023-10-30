import { MouseEventHandler, createContext, useMemo, useState } from 'react'
import { Reconstruction, ReconstructionMetadata, Reconstructor } from './Reconstructor'
import { SolveReconstructionResponse, useSolveReconstruction } from '@/api/contests'
import { formatTimeResult } from '@/utils'
import classNames from 'classnames'

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
    if (!data) return null
    return parseReconstructionResponse(data)
  }, [data])

  const closeHandler: MouseEventHandler = (event) => {
    if (event.target !== event.currentTarget) {
      return
    }
    setSolveId(null)
    if (!savedCloseCallback) throw Error('no saved close callback provided')
    savedCloseCallback()
    setSavedCloseCallback(undefined)
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
      <div
        onClick={closeHandler}
        className={classNames({ invisible: !content }, 'fixed	inset-0 flex justify-center bg-black bg-opacity-40 pt-20')}
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
