import { type Discipline, isDiscipline } from '@/types'
import { type PuzzleID, TwistyPlayer, Alg, LineComment, getSolveAnalyzer, Newline } from '@vscubing/cubing/twisty'
import { puzzles } from '@vscubing/cubing/puzzles'
import { useState, useEffect } from 'react'
import { formatSolveTime } from '@/utils'
import { type Move, Pause } from '@vscubing/cubing/alg'

// TODO: validate timestamps beforehand

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

      const animationLeaves = await doEverything(scramble, solution)

      const newPlayer = new TwistyPlayer({
        controlPanel: 'none',
        background: 'none',
        visualization: 'PG3D',
        experimentalSetupAlg: scramble,
        alg: new Alg([...animationLeaves.map(({ animLeaf }) => animLeaf)]),
        puzzle: TWISTY_PUZZLE_MAP[discipline],
      })

      newPlayer.experimentalModel.animationTimelineLeavesRequest.set(animationLeaves)

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

async function doEverything(scramble: string, solutionWithTimings: string) {
  const solution = new Alg(removeComments(solutionWithTimings))
  const timings = solutionWithTimings
    .split('*')
    .filter((_, idx) => idx % 2 === 1)
    .map(Number)

  const rawSignatures = await getSignatures(scramble, solution)
  const signaturesWithDurations = embedDurations(rawSignatures, timings)

  const rawLeaves = constructLeaves(solution, timings)
  const continuousLeaves = fillPauses(trimOverlapping(rawLeaves))

  return annotateMoves(continuousLeaves, signaturesWithDurations)
}

async function getSignatures(scramble: Alg | string, solution: Alg | string): Promise<(string | null)[]> {
  const puzzleLoader = puzzles['3x3x3']
  const kpuzzle = await puzzleLoader.kpuzzle()
  const solved = kpuzzle.defaultPattern()
  const analyzeSolve = await getSolveAnalyzer(puzzleLoader)

  const signatures: (string | null)[] = []
  let solutionSoFar = new Alg()
  for (const node of new Alg(solution).childAlgNodes()) {
    solutionSoFar = new Alg([...solutionSoFar.childAlgNodes(), node])

    const pattern = solved.applyAlg(scramble).applyAlg(solutionSoFar)
    signatures.push(analyzeSolve(pattern))
  }
  return signatures
}

function embedDurations(rawSignatures: (string | null)[], timings: number[]) {
  let lastIdxWithSignature = -1
  return rawSignatures.map((signature, idx) => {
    if (signature === null) return null
    const stepTime = lastIdxWithSignature === -1 ? timings[idx] : timings[idx] - timings[lastIdxWithSignature]
    lastIdxWithSignature = idx
    return ` ${signature} (${formatSolveTime(stepTime, true)}s)`
  })
}

function constructLeaves(solution: Alg, timings: number[]): AnimationTimelineLeaf[] {
  return [...solution.childAlgNodes()].map((algNode, idx) => {
    const animLeaf = algNode
    const start = timings[idx]
    let end = start + 120
    if (timings[idx + 1] === 0) {
      end = 0
    }

    return { animLeaf, start, end }
  })
}

function removeComments(moves: string): string {
  return moves
    .replace(/\/\*\d+?\*\//g, '')
    .trim()
    .replaceAll('  ', ' ') // TODO: we shouldn't need this, investigate discrepancies between cstimer and phpless-cstimer
}

// NOTE: use original type once available
type AnimationTimelineLeaf = { animLeaf: Pause | Move; start: number; end: number }

function trimOverlapping(leaves: AnimationTimelineLeaf[]): AnimationTimelineLeaf[] {
  return leaves.map((leaf, idx) => {
    const nextLeaf = leaves[idx]
    if (!nextLeaf) return leaf

    const end = Math.min(leaf.end, nextLeaf.end)
    return { animLeaf: leaf.animLeaf, start: leaf.start, end }
  })
}

function fillPauses(leaves: AnimationTimelineLeaf[]): AnimationTimelineLeaf[] {
  const withPauses: AnimationTimelineLeaf[] = [leaves[0]]
  for (let i = 1; i < leaves.length; i++) {
    const prev = leaves[i - 1]
    const cur = leaves[i]

    if (prev.end < cur.start) {
      withPauses.push({ animLeaf: new Pause(), start: prev.end, end: cur.start })
    }
    withPauses.push(cur)
  }
  return withPauses
}

function annotateMoves(continuousLeaves: AnimationTimelineLeaf[], signaturesWithDurations: (string | null)[]) {
  let realIdx = 0
  const res: AnimationTimelineLeaf[] = []
  for (const leaf of continuousLeaves) {
    res.push(leaf)
    if (leaf.animLeaf instanceof Pause) {
      continue
    }

    const comment = signaturesWithDurations[realIdx]
    if (comment !== null) {
      res.push({ animLeaf: new LineComment(comment), start: leaf.start, end: leaf.end })
      res.push({ animLeaf: new Newline(), start: leaf.start, end: leaf.end })
    }
    realIdx++
  }
  return res
}

function debugLeaves(animationLeaves: AnimationTimelineLeaf[]) {
  animationLeaves.forEach((leaf) => {
    console.log(leaf.start, leaf.end, leaf.animLeaf.toString())
  })
}
// const ANALYZERS_MAP = {
//   '3by3': async (scramble, solutionWithTimings) => {
//     const cleanSolution = removeComments(solutionWithTimings)
//     const timings = solutionWithTimings
//       .split('*')
//       .filter((_, idx) => idx % 2 === 1)
//       .map(Number)
//     let lastIdx = -1
//
//     const puzzleLoader = puzzles['3x3x3']
//     const kpuzzle = await puzzleLoader.kpuzzle()
//     const solved = kpuzzle.defaultPattern()
//     const analyzeSolve = await getSolveAnalyzer(puzzleLoader)
//
//     const fullSolutionAlg = new Alg(cleanSolution)
//     const fullSolutionNodes = [...fullSolutionAlg.childAlgNodes()]
//
//     let curAlg = new Alg()
//     fullSolutionNodes.forEach((node, idx) => {
//       curAlg = new Alg([...curAlg.childAlgNodes(), node])
//
//       const pattern = solved.applyAlg(scramble).applyAlg(curAlg)
//       const signature = analyzeSolve(pattern)
//       if (!signature) {
//         return
//       }
//
//       let comment = ' ' + signature
//       if (timings[idx]) {
//         const stepTime = lastIdx === -1 ? timings[idx] : timings[idx] - timings[lastIdx]
//         lastIdx = idx
//         comment += ` (${formatSolveTime(stepTime, true)}s)`
//       }
//
//       curAlg = new Alg([...curAlg.childAlgNodes(), new LineComment(comment), new Newline()])
//     })
//     return curAlg
//   },
//   '2by2': (_, solutionWithTimings) => {
//     const cleanSolution = removeComments(solutionWithTimings)
//     const fullSolutionAlg = new Alg(cleanSolution)
//
//     const alg = new Alg([
//       ...fullSolutionAlg.childAlgNodes(),
//       new Newline(),
//       new LineComment(' Analyzing 2x2 solves is not supported yet'),
//     ])
//     return new Promise((resolve) => resolve(alg))
//   },
// } satisfies Record<Discipline, (scramble: string, solutionWithTimings: string) => Promise<Alg>>
