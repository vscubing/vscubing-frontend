import { type Discipline, isDiscipline } from '@/types'
import { type PuzzleID, TwistyPlayer, Alg, LineComment, getMultiCheck, Newline } from '@vscubing/cubing/twisty'
import { puzzles } from '@vscubing/cubing/puzzles'
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
    void (async () => {
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
        alg: discipline === '3by3' ? await solutionTransformer(scramble, solution) : solution,
        puzzle: TWISTY_PUZZLE_MAP[discipline],
      })
      setPlayer(newPlayer)
      return () => setPlayer(null)
    })()
  }, [scramble, solution, discipline])

  return player
}

const TWISTY_PUZZLE_MAP: Record<Discipline, PuzzleID> = {
  '3by3': '3x3x3',
  '2by2': '2x2x2',
}

async function solutionTransformer(scramble: string, solution: string) {
  const puzzleLoader = puzzles['3x3x3']
  const kpuzzle = await puzzleLoader.kpuzzle()
  const solved = kpuzzle.defaultPattern()
  const multiCheckFn = await getMultiCheck(puzzleLoader)

  const fullSolutionAlg = new Alg(solution)
  let curAlg = new Alg()
  for (const node of fullSolutionAlg.childAlgNodes()) {
    curAlg = new Alg([...curAlg.childAlgNodes(), node])

    const pattern = solved.applyAlg(scramble).applyAlg(curAlg)
    const signature = multiCheckFn(pattern)
    if (!signature) {
      continue
    }

    curAlg = new Alg([
      ...curAlg.childAlgNodes(),
      new LineComment(` ${signature}`),
      new Newline(), // TODO: this should not be necessary
    ])
  }
  return curAlg
}
