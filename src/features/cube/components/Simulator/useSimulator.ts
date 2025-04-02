import { isDiscipline } from '@/types'
import { type TwistySimulatorMoveListener, type TwistySimulatorPuzzle, initTwistySimulator } from '@/vendor/cstimer'
import { type CameraPosition } from '@/vendor/cstimer/puzzlefactory'
import { type RefObject, useEffect, useState } from 'react'

export type Move = (typeof MOVES)[number]
export type SimulatorMoveListener = ({
  move,
  isRotation,
  isSolved,
}: {
  move: Move
  timestamp: number
  isRotation: boolean
  isSolved: boolean
}) => void
export function useSimulator({
  containerRef,
  onMove,
  scramble,
  discipline,
  animationDuration,
  cameraPosition,
  setCameraPosition,
}: {
  containerRef: RefObject<HTMLElement>
  onMove: SimulatorMoveListener
  scramble: string | undefined
  discipline: string
  animationDuration: number
  cameraPosition: CameraPosition
  setCameraPosition: (pos: CameraPosition) => void
}) {
  if (!isDiscipline(discipline)) throw new Error(`[SIMULATOR] unsupported discipline: ${discipline}`)

  const [puzzle, setPuzzle] = useState<TwistySimulatorPuzzle | undefined>()

  useEffect(() => {
    let _puzzle: TwistySimulatorPuzzle | undefined // we need this because move2str is tightly coupled with Puzzle

    const moveListener: TwistySimulatorMoveListener = (rawMove, timestamp) => {
      if (!_puzzle) throw new Error('[SIMULATOR] puzzle undefined')

      const move = parseCstimerMove(_puzzle.move2str(rawMove))
      const isSolved = _puzzle.isSolved() === 0
      onMove({ move, timestamp, isRotation: _puzzle.isRotation(rawMove), isSolved })
    }

    void initTwistySimulator(
      {
        puzzle: SIMULATOR_DISCIPLINES_MAP[discipline].puzzle,
        animationDuration,
      },
      moveListener,
      (pos) => setCameraPosition(pos),
      containerRef.current!,
    ).then((pzl) => {
      setTimeout(() => pzl.resize())
      _puzzle = pzl
      setPuzzle(pzl)
    })
  }, [animationDuration, containerRef, discipline, onMove, setCameraPosition])

  useEffect(() => {
    const abortSignal = new AbortController()

    if (!puzzle) return

    if (scramble) {
      puzzle.applyMoves(puzzle.parseScramble(scramble), undefined, true)
    }
    window.addEventListener(
      'keydown',
      (e) => {
        const cameraAdjustment = e.key.startsWith('Arrow')
        if (!scramble && !cameraAdjustment) return
        puzzle.keydown(e)
      },
      abortSignal,
    )

    return () => abortSignal.abort()
  }, [scramble, puzzle])

  useEffect(() => {
    if (puzzle) puzzle.setCameraPosition({ theta: cameraPosition.theta, phi: cameraPosition.phi })
  }, [cameraPosition.theta, cameraPosition.phi, puzzle, scramble])
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
function isMove(moveStr: string): moveStr is Move {
  return (MOVES as readonly string[]).includes(moveStr)
}
