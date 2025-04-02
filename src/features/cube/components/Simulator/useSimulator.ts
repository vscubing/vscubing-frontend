import { isDiscipline } from '@/types'
import { type SimulatorPuzzle, initSimulator } from '@/vendor/cstimer'
import { type RefObject, useEffect } from 'react'
import { useLocalStorage } from 'usehooks-ts'

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
}: {
  containerRef: RefObject<HTMLElement>
  onMove: SimulatorMoveListener
  scramble: string | undefined
  discipline: string
  animationDuration: number
}) {
  const [cameraPos, setCameraPos] = useLocalStorage('vs-camera-pos', { theta: 0, phi: 6 })

  useEffect(() => {
    const abortSignal = new AbortController()

    if (!isDiscipline(discipline)) throw new Error(`[SIMULATOR] unsupported discipline: ${discipline}`)

    let puzzle: SimulatorPuzzle
    let wasScrambleApplied = false
    let isSolved = false
    void initSimulator(
      {
        puzzle: SIMULATOR_DISCIPLINES_MAP[discipline].puzzle,
        animationDuration,
      },
      (rawMove, mstep, timestamp) => {
        if (!puzzle) throw new Error('[SIMULATOR] puzzle undefined')

        if (mstep !== 2 || !wasScrambleApplied) return
        const move = parseCstimerMove(puzzle.move2str(rawMove))
        if (puzzle.isSolved() === 0) isSolved = true
        onMove({ move, timestamp, isRotation: puzzle.isRotation(rawMove), isSolved })
      },
      (theta, phi) => setCameraPos({ theta, phi }),
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
          const cameraAdjustment = e.key.startsWith('Arrow')
          if (!scramble && !cameraAdjustment) return
          puzzle.keydown(e)
        },
        abortSignal,
      )
    })

    return () => abortSignal.abort()
  }, [onMove, containerRef, scramble, discipline, animationDuration, setCameraPos])
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
