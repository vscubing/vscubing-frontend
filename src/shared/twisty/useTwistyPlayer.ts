import { type Discipline, isDiscipline } from '@/types'
import { type PuzzleID, TwistyPlayer, Alg, LineComment, getSolveAnalyzer, Newline } from '@vscubing/cubing/twisty'
import { puzzles } from '@vscubing/cubing/puzzles'
import { useState, useEffect } from 'react'
import { formatSolveTime } from '@/utils'
import { Move, Pause } from '@vscubing/cubing/alg'

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
        alg: await ANALYZERS_MAP[discipline](scramble, solution),
        puzzle: TWISTY_PUZZLE_MAP[discipline],
      })

      // @ts-expect-error cubing.js bundling issue (Pause$1 and Move$1) https://github.com/cubing/cubing.js/issues/341
      newPlayer.experimentalModel.animationTimelineLeavesRequest.set(getAnimLeaves(solution))

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

const ANALYZERS_MAP = {
  '3by3': async (scramble, solutionWithTimings) => {
    const cleanSolution = removeComments(solutionWithTimings)
    const timings = solutionWithTimings
      .split('*')
      .filter((_, idx) => idx % 2 === 1)
      .map(Number)
    let lastIdx = -1

    const puzzleLoader = puzzles['3x3x3']
    const kpuzzle = await puzzleLoader.kpuzzle()
    const solved = kpuzzle.defaultPattern()
    const analyzeSolve = await getSolveAnalyzer(puzzleLoader)

    const fullSolutionAlg = new Alg(cleanSolution)
    const fullSolutionNodes = [...fullSolutionAlg.childAlgNodes()]

    let curAlg = new Alg()
    fullSolutionNodes.forEach((node, idx) => {
      curAlg = new Alg([...curAlg.childAlgNodes(), node])

      const pattern = solved.applyAlg(scramble).applyAlg(curAlg)
      const signature = analyzeSolve(pattern)
      if (!signature) {
        return
      }

      let comment = ' ' + signature
      if (timings[idx]) {
        const stepTime = lastIdx === -1 ? timings[idx] : timings[idx] - timings[lastIdx]
        lastIdx = idx
        comment += ` (${formatSolveTime(stepTime, true)}s)`
      }

      curAlg = new Alg([...curAlg.childAlgNodes(), new LineComment(comment), new Newline()])
    })
    return curAlg
  },
  '2by2': (_, solutionWithTimings) => {
    const cleanSolution = removeComments(solutionWithTimings)
    const fullSolutionAlg = new Alg(cleanSolution)

    const alg = new Alg([
      ...fullSolutionAlg.childAlgNodes(),
      new Newline(),
      new LineComment(' Analyzing 2x2 solves is not supported yet'),
    ])
    return new Promise((resolve) => resolve(alg))
  },
} satisfies Record<Discipline, (scramble: string, solutionWithTimings: string) => Promise<Alg>>

function removeComments(moves: string): string {
  return moves.replace(/\/\*\d+?\*\//g, '').trim()
}

function getAnimLeaves(solutionWithTimings: string) {
  const cleanSolution = removeComments(solutionWithTimings)
  const timings = solutionWithTimings
    .split('*')
    .filter((_, idx) => idx % 2 === 1)
    .map(Number)

  const noPauses = cleanSolution.split('  ').map((move, idx) => {
    const animLeaf = new Move(move)
    const start = timings[idx]
    const end = start === 0 ? 0 : start + 100

    return { animLeaf, start, end }
  })

  const res: AnimationTimelineLeaf[] = [noPauses[0]]
  for (let i = 1; i < noPauses.length; i++) {
    res.push({ animLeaf: new Pause(), start: noPauses[i - 1].end, end: noPauses[i].start })
    res.push(noPauses[i])
  }

  return res
}

type AnimationTimelineLeaf = { animLeaf: Pause | Move; start: number; end: number }
