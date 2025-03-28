import { type Discipline, isDiscipline } from '@/types'
import { type PuzzleID, TwistyPlayer } from '@vscubing/cubing/twisty'
import { useState, useEffect } from 'react'
import { doEverything } from './solution-transformer'

// TODO: validate timestamps beforehand

export function useTwistyPlayer({
  scramble,
  solution: rawSolution,
  discipline,
}: {
  scramble?: string
  solution?: string
  discipline?: string
}) {
  const [player, setPlayer] = useState<TwistyPlayer | null>(null)

  useEffect(() => {
    void (async () => {
      if (!scramble || !rawSolution || !discipline) {
        return
      }

      if (!isDiscipline(discipline)) {
        throw new Error(`invalid discipline: ${discipline}`)
      }

      const { solution, animLeaves } = await doEverything(scramble, rawSolution, discipline)

      const newPlayer = new TwistyPlayer({
        controlPanel: 'none',
        background: 'none',
        visualization: 'PG3D',
        experimentalSetupAlg: scramble,
        alg: solution,
        puzzle: TWISTY_PUZZLE_MAP[discipline],
      })

      if (animLeaves) {
        // @ts-expect-error I know what I'm doing
        newPlayer.experimentalModel.__vscubingAnimationTimelineLeavesSet = true
        newPlayer.experimentalModel.animationTimelineLeavesRequest.set(animLeaves)
      }

      setPlayer(newPlayer)
      return () => setPlayer(null)
    })()
  }, [scramble, rawSolution, discipline])

  return player
}

const TWISTY_PUZZLE_MAP: Record<Discipline, PuzzleID> = {
  '3by3': '3x3x3',
  '2by2': '2x2x2',
}
