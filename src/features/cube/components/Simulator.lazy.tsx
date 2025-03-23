import { isDiscipline, type Discipline } from '@/types'
import { type SimulatorPuzzle, initSimulator } from '@/vendor/cstimer'
import { useRef, useState, useEffect, useCallback, type ReactNode, type RefObject } from 'react'

export type InitSolveData = { scramble: string; discipline: string }

export type SolveResult = { isDnf: false; reconstruction: string; timeMs: number } | { isDnf: true }
export type SolveFinishCallback = (result: SolveResult) => void

type SimulatorProps = {
  initSolveData: InitSolveData
  onSolveStart: () => void
  onSolveFinish: SolveFinishCallback
}
export default function Simulator({ initSolveData, onSolveFinish, onSolveStart }: SimulatorProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<'idle' | 'ready' | 'inspecting' | 'solving' | 'solved'>('idle')
  const [inspectionStartTimestamp, setInspectionStartTimestamp] = useState<number>()
  const [solveStartTimestamp, setSolveStartTimestamp] = useState<number>()
  const [currentTimestamp, setCurrentTimestamp] = useState<number>()
  const [moves, setMoves] = useState<Move[]>()

  useEffect(() => {
    setStatus(initSolveData ? 'ready' : 'idle')
  }, [initSolveData])

  useEffect(() => {
    if (status !== 'idle' && status !== 'ready') return

    setSolveStartTimestamp(undefined)
    setInspectionStartTimestamp(undefined)
    setCurrentTimestamp(undefined)
    setMoves([])
  }, [status])

  useEffect(() => {
    if (status !== 'ready') return
    containerRef.current?.focus()

    const abortSignal = new AbortController()
    window.addEventListener(
      'keydown',
      (e) => {
        if (e.keyCode === SPACEBAR_KEY_CODE) setStatus('inspecting')
      },
      abortSignal,
    )
    return () => abortSignal.abort()
  }, [status])

  useEffect(() => {
    if (status === 'inspecting') {
      requestAnimationFrame(() => setInspectionStartTimestamp(performance.now())) // we need requestAnimationFrame here to prevent these timestamps from getting ahead of current timestamp
      onSolveStart()
    }
  }, [status, onSolveStart])

  useEffect(() => {
    if (status === 'solving') {
      requestAnimationFrame(() => setSolveStartTimestamp(performance.now())) // we need requestAnimationFrame here to prevent these timestamps from getting ahead of current timestamp
    }
  }, [status])

  useEffect(() => {
    if (status !== 'inspecting' && status !== 'solving') return
    const abortSignal = new AbortController()

    requestAnimationFrame(function runningThread() {
      if (abortSignal.signal.aborted) return

      setCurrentTimestamp(performance.now())
      requestAnimationFrame(runningThread)
    })

    return () => abortSignal.abort()
  }, [status])

  useEffect(() => {
    if (status !== 'inspecting') return
    if (!inspectionStartTimestamp || !currentTimestamp) return

    const inspectionMs = currentTimestamp - inspectionStartTimestamp
    if (inspectionMs > INSPECTION_DNF_THRESHHOLD_MS) {
      onSolveFinish({ isDnf: true })
      setStatus('idle')
    }
  }, [status, inspectionStartTimestamp, currentTimestamp, onSolveFinish])

  const moveHandler = useCallback<SimulatorMoveListener>(({ move, isRotation, isSolved }) => {
    setMoves((prev) => {
      if (!prev) throw new Error('[SIMULATOR] moves undefined')
      return [...prev, move]
    })
    setStatus((prevStatus) => {
      if (prevStatus === 'inspecting' && !isRotation) {
        return 'solving'
      }
      if (prevStatus === 'solving' && isSolved) return 'solved'

      return prevStatus
    })
  }, [])

  useEffect(() => {
    if (status !== 'solved') return
    if (!moves || !currentTimestamp || !solveStartTimestamp || !inspectionStartTimestamp)
      throw new Error(
        `[SIMULATOR] invalid solved state. moves: ${moves?.toString()}, currentTimestamp: ${currentTimestamp}, solveStartTimestamp: ${solveStartTimestamp}, inspectionStartTimestamp: ${inspectionStartTimestamp}`,
      )

    const inspectionMs = solveStartTimestamp - inspectionStartTimestamp
    const rawSolveTimeMs = currentTimestamp - solveStartTimestamp
    const penalty = inspectionMs > INSPECTION_PLUS_TWO_THRESHHOLD_MS ? 2_000 : 0

    onSolveFinish({ timeMs: rawSolveTimeMs + penalty, isDnf: false, reconstruction: moves.join(' ') })
    setStatus('idle')
  }, [status, moves, inspectionStartTimestamp, solveStartTimestamp, currentTimestamp, onSolveFinish])

  const displayedScramble = ['idle', 'ready'].includes(status) ? undefined : initSolveData.scramble
  useSimulator({ containerRef, onMove: moveHandler, scramble: displayedScramble, discipline: initSolveData.discipline })

  return (
    <>
      <link href='https://fonts.googleapis.com/css2?family=M+Plus+1+Code&display=swap' rel='stylesheet' />

      <div className='relative flex h-full items-center justify-center'>
        <span className='absolute right-4 top-1/2 -translate-y-1/2 text-7xl [font-family:"M_Plus_1_Code",monospace] md:bottom-4 md:left-1/2 md:right-auto md:top-auto md:-translate-x-1/2 md:translate-y-0'>
          {getDisplay(solveStartTimestamp, inspectionStartTimestamp, currentTimestamp)}
        </span>
        {status === 'ready' && (
          <span className='absolute bottom-20 rounded-[.75rem] bg-black-100 px-10 py-6 font-kanit text-[1.25rem] text-secondary-20'>
            Press space to scramble the cube and start the preinspection
          </span>
        )}
        <div className='h-[60%] [&>div]:flex' tabIndex={-1} ref={containerRef}></div>
      </div>
    </>
  )
}
const SPACEBAR_KEY_CODE = 32

function getDisplay(
  solveStartTimestamp?: number,
  inspectionStartTimestamp?: number,
  currentTimestamp?: number,
): ReactNode {
  if (!currentTimestamp || !inspectionStartTimestamp) return ''
  if (solveStartTimestamp) {
    return formatElapsedTime(currentTimestamp - solveStartTimestamp)
  }

  const elapsedInspectionMs = currentTimestamp - inspectionStartTimestamp
  if (elapsedInspectionMs > INSPECTION_PLUS_TWO_THRESHHOLD_MS) return '+2'
  return INSPECTION_PLUS_TWO_THRESHHOLD_MS / 1_000 - Math.floor(elapsedInspectionMs / 1_000)
}

function formatElapsedTime(fullMs: number) {
  const fullSeconds = getSeconds(fullMs)
  const minutes = getMinutes(fullMs)
  const seconds = fullSeconds - minutes * MINUTE_IN_SECONDS
  const ms = fullMs - fullSeconds * SECOND_IN_MS
  const tenths = Math.floor(ms / 100)

  if (minutes) {
    return (
      <>
        {minutes}:{seconds.toString().padStart(2, '0')}.<span className='text-[.75em]'>{tenths}</span>
      </>
    )
  }
  return (
    <>
      {seconds}.<span className='text-[.75em]'>{tenths}</span>
    </>
  )
}

const getSeconds = (ms: number): number => Math.floor(ms / SECOND_IN_MS)
const getMinutes = (ms: number): number => Math.floor(ms / MINUTE_IN_MS)
export const SECOND_IN_MS = 1_000
export const MINUTE_IN_SECONDS = 60
export const MINUTE_IN_MS = MINUTE_IN_SECONDS * SECOND_IN_MS

const INSPECTION_PLUS_TWO_THRESHHOLD_MS = 15_000
const INSPECTION_DNF_THRESHHOLD_MS = 17_000

type SimulatorMoveListener = ({
  move,
  isRotation,
  isSolved,
}: {
  move: Move
  timestamp: number
  isRotation: boolean
  isSolved: boolean
}) => void
function useSimulator({
  containerRef,
  onMove,
  scramble,
  discipline,
}: {
  containerRef: RefObject<HTMLElement>
  onMove: SimulatorMoveListener
  scramble: string | undefined
  discipline: string
}) {
  useEffect(() => {
    const abortSignal = new AbortController()

    if (!isDiscipline(discipline)) throw new Error(`[SIMULATOR] unsupported discipline: ${discipline}`)

    let puzzle: SimulatorPuzzle
    let wasScrambleApplied = false
    let isSolved = false
    void initSimulator(
      {
        allowDragging: false,
        faceColors: [16777215, 16711680, 56576, 16776960, 16755200, 255],
        dimension: SIMULATOR_DISCIPLINES_MAP[discipline].dimension,
        puzzle: SIMULATOR_DISCIPLINES_MAP[discipline].puzzle,
        scale: 0.9,
        stickerWidth: 1.7,
        style: 'v',
        type: 'cube',
      },
      (rawMove, mstep, timestamp) => {
        if (!puzzle) throw new Error('[SIMULATOR] puzzle undefined')

        if (mstep !== 2 || !wasScrambleApplied) return
        const move = parseCstimerMove(puzzle.move2str(rawMove))
        if (puzzle.isSolved() === 0) isSolved = true
        onMove({ move, timestamp, isRotation: puzzle.isRotation(rawMove), isSolved })
      },
      containerRef.current!,
    ).then((pzl) => {
      puzzle = pzl

      setTimeout(() => puzzle.resize())
      if (scramble) {
        puzzle.applyMoves(puzzle.parseScramble(scramble))
        wasScrambleApplied = true
      }
      window.addEventListener(
        'keydown',
        (e) => {
          if (!scramble || isSolved) return
          puzzle.keydown(e)
        },
        abortSignal,
      )
    })

    return () => abortSignal.abort()
  }, [onMove, containerRef, scramble, discipline])
}

const SIMULATOR_DISCIPLINES_MAP = {
  '3by3': {
    dimension: 3,
    puzzle: 'cube3',
  },
  '2by2': {
    dimension: 2,
    puzzle: 'cube2',
  },
} as const

function parseCstimerMove(moveCstimer: string): Move {
  const move = moveCstimer
    .replace(/@(\d+)/g, '/*$1*/')
    .replace(/2-2Lw|2-2Rw'/g, 'M')
    .replace(/2-2Rw/g, "M'")
    .replace(/2-2Fw/g, 'S')
    .replace(/2-2Uw'/g, 'E')
    .replace(/2-2Uw/g, "E'")
    .trim()

  if (!isMove(move)) throw new Error(`[SIMULATOR] invalid move: ${move}`)
  return move
}

function isMove(moveStr: string): moveStr is Move {
  return (MOVES as readonly string[]).includes(moveStr)
}

const SIMPLE_MOVES = [
  'R',
  'U',
  'F',
  'B',
  'L',
  'D',
  'M',
  'E',
  'S',
  'Rw',
  'Uw',
  'Fw',
  'Bw',
  'Lw',
  'Dw',
  'x',
  'y',
  'z',
] as const
const MOVES = SIMPLE_MOVES.flatMap((move) => [move, `${move}'`, `${move}2`] as const)
type Move = (typeof MOVES)[number]
