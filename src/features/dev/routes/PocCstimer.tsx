import { PrimaryButton } from '@/components/ui'
import { type SimulatorPuzzle, initSimulator } from '@/vendor/cstimer'
import { type CsMove } from '@/vendor/cstimer/puzzlefactory'
import { type RefObject, useCallback, useEffect, useRef, useState } from 'react'

export function SimulatorPage() {
  const onMove = useCallback(
    (move: Move, isSolved: boolean) => console.log(`[SIMULATOR_PAGE]: ${move}, isSolved: ${isSolved}`),
    [],
  )
  const [scramble, setScramble] = useState<string>()
  return (
    <>
      <PrimaryButton
        onClick={() => {
          const newScr = Array.from({ length: 1 })
            .map(() => {
              const MOVES_POOL = ['R', 'U', 'F', 'B', 'L', 'D'].flatMap((move) => [move, `${move}'`])
              const moveIdx = Math.floor(Math.random() * MOVES_POOL.length)
              return MOVES_POOL[moveIdx]
            })
            .join(' ')
          console.log(newScr)
          setScramble(newScr)
        }}
        size='lg'
      >
        New scramble
      </PrimaryButton>
      <Simulator onMove={onMove} scramble={scramble} />
    </>
  )
}

type SimlatorProps = {
  onMove: (move: Move, isSolved: boolean) => void
  scramble?: string
}
export function Simulator({ onMove, scramble }: SimlatorProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const handlePuzzleMove = useCallback<MyMoveListener>(
    (rawMove, puzzle) => {
      const move = parseCstimerMove(puzzle.move2str(rawMove))
      onMove(move, puzzle.isSolved() === 0)
    },
    [onMove],
  )
  const _puzzle = useSimulator(containerRef, handlePuzzleMove, scramble)

  return (
    <div className='h-screen' ref={containerRef}>
      PocCstimer
    </div>
  )
}

type MyMoveListener = (move: CsMove, puzzle: SimulatorPuzzle) => void
function useSimulator(containerRef: RefObject<HTMLElement>, onMove: MyMoveListener, scramble?: string) {
  const [puzzle, setPuzzle] = useState<SimulatorPuzzle>()
  useEffect(() => {
    const abortSignal = new AbortController()

    let localPuzzle: SimulatorPuzzle
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
      (move) => {
        if (!localPuzzle) throw new Error('[SIMULATOR] puzzle undefined')
        onMove(move, localPuzzle)
      },
      containerRef.current!,
    ).then((pzl) => {
      setPuzzle(pzl)
      localPuzzle = pzl
      pzl.resize()
      if (scramble) pzl.applyMoves(pzl.parseScramble(scramble))
      window.addEventListener('keydown', (e) => pzl.keydown(e), abortSignal)
    })

    return () => abortSignal.abort()
  }, [onMove, containerRef, scramble])
  return puzzle
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
