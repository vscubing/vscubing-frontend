import { PrimaryButton } from '@/components/ui'
import { type SimulatorPuzzle, initSimulator } from '@/vendor/cstimer'
import { type RefObject, useCallback, useEffect, useRef, useState } from 'react'

export function SimulatorPage() {
  const [scramble, setScramble] = useState<string>()

  useEffect(generateNewScramble, [setScramble])

  useEffect(() => {
    const abortSignal = new AbortController()
    window.addEventListener(
      'keydown',
      (e) => {
        if (e.keyCode === 13) generateNewScramble()
      },
      abortSignal,
    )
    return () => abortSignal.abort()
  }, [])

  function generateNewScramble() {
    const newScr = Array.from({ length: 3 })
      .map(() => {
        const MOVES_POOL = ['R', 'U', 'F', 'B', 'L', 'D'].flatMap((move) => [move, `${move}'`])
        const moveIdx = Math.floor(Math.random() * MOVES_POOL.length)
        return MOVES_POOL[moveIdx]
      })
      .join(' ')
    setScramble(newScr)
  }

  return (
    <>
      <PrimaryButton asChild onClick={generateNewScramble} size='lg'>
        <span>New scramble</span>
      </PrimaryButton>
      <div className='flex-1'>
        <Simulator scramble={scramble} />
      </div>
    </>
  )
}

type SimlatorProps = {
  scramble?: string
}
export function Simulator({ scramble }: SimlatorProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<'idle' | 'ready' | 'inspecting' | 'solving' | 'solved'>('idle')
  const [inspectionStartTimestamp, setInspectionStartTimestamp] = useState<number>()
  const [solveStartTimestamp, setSolveStartTimestamp] = useState<number>()
  const [currentTimestamp, setCurrentTimestamp] = useState<number>()
  const [moves, setMoves] = useState<Move[]>()

  useEffect(() => {
    setStatus(scramble ? 'ready' : 'idle')
    setSolveStartTimestamp(undefined)
    setInspectionStartTimestamp(undefined)
    setCurrentTimestamp(undefined)
    setMoves([])
  }, [scramble])

  useEffect(() => {
    if (status !== 'ready') return

    const abortSignal = new AbortController()
    window.addEventListener(
      'keydown',
      (e) => {
        if (e.keyCode === SPACEBAR_KEY_CODE) setStatus('inspecting')
      },
      abortSignal,
    )
    return () => abortSignal.abort()
  }, [scramble, status])

  useEffect(() => {
    if (status === 'inspecting') setInspectionStartTimestamp(performance.now())
  }, [status])

  useEffect(() => {
    if (status === 'solving') setSolveStartTimestamp(performance.now())
  }, [status])

  useEffect(() => {
    if (status !== 'inspecting' && status !== 'solving') return
    const abortSignal = new AbortController()

    setInspectionStartTimestamp(performance.now())
    requestAnimationFrame(function runningThread() {
      if (abortSignal.signal.aborted) return

      setCurrentTimestamp(performance.now())
      requestAnimationFrame(runningThread)
    })

    return () => abortSignal.abort()
  }, [status])

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
    if (status === 'solved') console.log(`[SIMULATOR_PAGE]: ${moves?.join(' ')}`)
  }, [status, moves])

  const displayedScramble = ['idle', 'ready'].includes(status) ? undefined : scramble
  useSimulator(containerRef, moveHandler, displayedScramble)

  return (
    <>
      <span className='fixed bottom-24 left-1/2 -translate-x-1/2 text-5xl'>
        {currentTimestamp
          ? solveStartTimestamp
            ? (currentTimestamp - solveStartTimestamp) / 1000
            : Math.floor((currentTimestamp - inspectionStartTimestamp!) / 1000)
          : null}
      </span>
      <div className='h-full' ref={containerRef}></div>
    </>
  )
}
const SPACEBAR_KEY_CODE = 32

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
function useSimulator(
  containerRef: RefObject<HTMLElement>,
  onMove: SimulatorMoveListener,
  scramble: string | undefined,
) {
  useEffect(() => {
    const abortSignal = new AbortController()

    let puzzle: SimulatorPuzzle
    let wasScrambleApplied = false
    let isSolved = false
    void initSimulator(
      {
        allowDragging: false,
        dimension: 3,
        faceColors: [16777215, 16711680, 56576, 16776960, 16755200, 255],
        puzzle: 'cube3',
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
  }, [onMove, containerRef, scramble])
}

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
