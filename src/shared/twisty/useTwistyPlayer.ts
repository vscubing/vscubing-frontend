import { type Discipline, isDiscipline } from '@/types'
import { type PuzzleID, TwistyPlayer } from '@vscubing/cubing/twisty'
import { useState, useEffect } from 'react'

export function useTwistyPlayer({
  scramble,
  solution,
  discipline,
}: {
  scramble?: string
  solution?: string
  discipline?: string
}) {
  const [player, setPlayer] = useState<TwistyPlayer | null>(null)

  useEffect(() => {
    if (!scramble || !solution || !discipline) {
      return
    }

    if (!isDiscipline(discipline)) {
      throw new Error(`invalid discipline: ${discipline}`)
    }

    const newPlayer = new TwistyPlayer({
      controlPanel: 'none',
      background: 'none',
      visualization: 'PG3D',
      experimentalSetupAlg: scramble,
      alg: solution,
      puzzle: TWISTY_PUZZLE_MAP[discipline],
    })
    setPlayer(newPlayer)
    return () => setPlayer(null)
  }, [scramble, solution, discipline])

  return player
}

const TWISTY_PUZZLE_MAP: Record<Discipline, PuzzleID> = {
  '3by3': '3x3x3',
  '2by2': '2x2x2',
}
