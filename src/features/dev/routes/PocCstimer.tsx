import { type SimulatorPuzzle, initSimulator } from '@/vendor/cstimer'
import { useEffect, useRef } from 'react'

export function SimulatorPage() {
  return <Simulator moveListener={(move) => console.log(`[SIMULATOR_PAGE]: ${move}`)} />
}

export function Simulator({ moveListener }: { moveListener: (move: Move) => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const puzzleRef = useRef<SimulatorPuzzle>()
  useEffect(() => {
    const abortSignal = new AbortController()

    void initSimulator(
      {
        allowDragging: true,
        dimension: 3,
        faceColors: [16777215, 16711680, 56576, 16776960, 16755200, 255],
        puzzle: 'cube3',
        scale: 0.9,
        stickerWidth: 1.7,
        style: 'v',
        type: 'cube',
      },
      (move, _mstep, _ts) => {
        const puzzle = puzzleRef.current
        if (!puzzle) throw new Error('[SIMULATOR] puzzle undefined')
        moveListener(parseCstimerMove(puzzle.move2str(move)))
      },
      containerRef.current!,
    ).then((puzzle) => {
      puzzleRef.current = puzzle
      puzzle.resize()
      window.addEventListener('keydown', (e) => puzzle.keydown(e), abortSignal)
    })

    return () => abortSignal.abort()
  }, [moveListener])
  return (
    <div className='h-screen' ref={containerRef}>
      PocCstimer
    </div>
  )
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

const MOVES = [
  'R',
  "R'",
  'U',
  "U'",
  'F',
  "F'",
  'B',
  "B'",
  'L',
  "L'",
  'D',
  "D'",
  'M',
  "M'",
  'E',
  "E'",
  'S',
  "S'",
  'x',
  "x'",
  'y',
  "y'",
  'z',
  "z'",
  'R',
  "R'",
  'Rw',
  "Rw'",
  'U',
  "U'",
  'Uw',
  "Uw'",
  'F',
  "F'",
  'Fw',
  "Fw'",
  'B',
  "B'",
  'Bw',
  "Bw'",
  'L',
  "L'",
  'Lw',
  "Lw'",
  'D',
  "D'",
  'Dw',
  "Dw'",
] as const
type Move = (typeof MOVES)[number]
