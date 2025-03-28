import { formatSolveTime } from '@/utils/formatSolveTime'
import { type AlgNode, Move, Newline } from '@vscubing/cubing/alg'
import { puzzles } from '@vscubing/cubing/puzzles'
import { type AnimationTimelineLeaf, getSolveAnalyzer } from '@vscubing/cubing/twisty'
import { Alg, LineComment } from '@vscubing/cubing/alg'

export async function doEverything(
  scramble: string,
  solutionWithTimings: string,
): Promise<{ alg: Alg; animLeaves?: AnimationTimelineLeaf[] }> {
  const solution = new Alg(removeComments(solutionWithTimings))
  const timestamps = solutionWithTimings
    .split('*')
    .filter((_, idx) => idx % 2 === 1)
    .map(Number)

  const rawSignatures = await getSignatures(scramble, solution)
  const signaturesWithDurations = embedDurations(rawSignatures, timestamps)

  const alg = annotateMoves(solution, signaturesWithDurations)

  const animatableNodes = Array.from(alg.childAlgNodes()).filter((node) => node.is(Move))

  if (animatableNodes.length !== timestamps.length) {
    console.error('[TWISTY] animatableNodes.length !== leafSlots.length')
    return { alg }
  }

  const animLeaves: AnimationTimelineLeaf[] = animatableNodes.map((node, idx) => ({
    start: timestamps[idx],
    end: Math.min(timestamps[idx] + 120, timestamps[idx + 1] ?? Infinity),
    animLeaf: node,
  }))

  return { alg, animLeaves }
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

function removeComments(moves: string): string {
  return moves
    .replace(/\/\*\d+?\*\//g, '')
    .trim()
    .replaceAll('  ', ' ') // TODO: we shouldn't need this, investigate discrepancies between cstimer and phpless-cstimer
}

function annotateMoves(solution: Alg, signaturesWithDurations: (string | null)[]) {
  const res: AlgNode[] = []
  Array.from(solution.childAlgNodes()).forEach((node, idx) => {
    res.push(node)

    const comment = signaturesWithDurations[idx]
    if (comment !== null) {
      res.push(new LineComment(comment))
      res.push(new Newline())
    }
  })
  return new Alg(res)
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
