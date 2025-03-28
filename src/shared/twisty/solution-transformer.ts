import { formatSolveTime } from '@/utils/formatSolveTime'
import { type AlgNode, Move, Newline } from '@vscubing/cubing/alg'
import { puzzles } from '@vscubing/cubing/puzzles'
import { type AnimationTimelineLeaf, getSolveAnalyzer } from '@vscubing/cubing/twisty'
import { Alg, LineComment } from '@vscubing/cubing/alg'
import { type Discipline } from '@/types'

// TODO: simultaneous moves???
// TODO: realtime animation speed
export async function doEverything(
  scramble: string,
  solutionWithTimings: string,
  discipline: Discipline,
): Promise<{ solution: Alg; animLeaves?: AnimationTimelineLeaf[] }> {
  const timestamps = parseTimestamps(solutionWithTimings)

  let solution = new Alg(removeComments(solutionWithTimings))
  if (discipline === '3by3') {
    const rawSignatures = await getSignatures(scramble, solution)
    const signaturesWithDurations = embedDurations(rawSignatures, timestamps)
    solution = annotateMoves(solution, signaturesWithDurations)
  } else {
    solution = new Alg([
      ...solution.childAlgNodes(),
      new Newline(),
      new LineComment(' Analyzing 2x2 solves is not supported yet'),
    ])
  }

  if (!timestamps) {
    return { solution }
  }

  const animatableNodes = Array.from(solution.childAlgNodes()).filter((node) => node.is(Move))

  if (animatableNodes.length !== timestamps?.length) {
    console.error('[TWISTY] animatableNodes.length !== leafSlots.length')
    return { solution: solution }
  }

  const animLeaves: AnimationTimelineLeaf[] = animatableNodes.map((node, idx) => ({
    start: timestamps[idx],
    end: Math.min(timestamps[idx] + 120, timestamps[idx + 1] ?? Infinity),
    animLeaf: node,
  }))

  return { solution, animLeaves }
}

async function getSignatures(scramble: Alg | string, solution: Alg | string): Promise<(string | null)[]> {
  const puzzleLoader = puzzles['3x3x3']
  const kpuzzle = await puzzleLoader.kpuzzle()
  const solved = kpuzzle.defaultPattern()
  const analyzeSolve = await getSolveAnalyzer(puzzleLoader)

  const signatures: (string | null)[] = []

  let inInspection = true
  let solutionSoFar = new Alg()
  for (const [idx, node] of Array.from(new Alg(solution).childAlgNodes()).entries()) {
    solutionSoFar = new Alg([...solutionSoFar.childAlgNodes(), node])

    const pattern = solved.applyAlg(scramble).applyAlg(solutionSoFar)
    signatures.push(analyzeSolve(pattern))

    if (!isRotation(node) && inInspection) {
      inInspection = false
      if (idx > 0) {
        signatures[signatures.length - 2] = INSPECTION_SIGNATURE
      }
    }
  }
  return signatures
}

function embedDurations(rawSignatures: (string | null)[], timestamps?: number[]) {
  let lastIdxWithSignature = -1
  return rawSignatures.map((signature, idx) => {
    if (signature === null) return null
    let comment = ` ${signature}`

    if (timestamps) {
      const stepDuration =
        lastIdxWithSignature === -1 ? timestamps[idx] : timestamps[idx] - timestamps[lastIdxWithSignature]
      lastIdxWithSignature = idx
      if (stepDuration > 0 && signature !== INSPECTION_SIGNATURE) {
        comment += ` (${formatSolveTime(stepDuration, true)}s)`
      }
    }

    return comment
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

function parseTimestamps(solutionWithTimestamps: string): number[] | undefined {
  const timestamps = solutionWithTimestamps
    .split('*')
    .filter((_, idx) => idx % 2 === 1)
    .map(Number)
  if (timestamps.length === 0) return undefined

  const hasInspection = timestamps[0] === 0 && timestamps[1] === 0
  if (!hasInspection) return timestamps

  let shift = 0
  return timestamps.map((timestamp, idx) => {
    if (timestamp === 0 && idx > 0) shift += 300
    return timestamp + shift
  })
}

const INSPECTION_SIGNATURE = 'Inspection'

function isRotation(node: AlgNode): boolean {
  return ['x', 'y', 'z'].includes(node.toString()[0])
}
