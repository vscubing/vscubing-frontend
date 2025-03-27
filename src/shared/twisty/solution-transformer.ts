import { formatSolveTime } from '@/utils/formatSolveTime'
import { type AlgNode, Move, Pause } from '@vscubing/cubing/alg'
import { puzzles } from '@vscubing/cubing/puzzles'
import { Alg, getSolveAnalyzer, LineComment } from '@vscubing/cubing/twisty'

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

  const nodes = annotateMoves(solution, signaturesWithDurations)

  const leafSlots = prepareLeaveSlots(timestamps)
  const alg = new Alg(new Alg(insertPauses(nodes, leafSlots)).toString())
  const animatableNodes = Array.from(alg.childAlgNodes()).filter(
    (node) => node.is(Move) || node.is(Pause),
  )

  if (animatableNodes.length !== leafSlots.length) return { alg }

  const animLeaves: AnimationTimelineLeaf[] = []
  for (const [idx, leaf] of leafSlots.entries()) {
    if (!animatableNodes[idx].is(leaf.animLeafType)) return { alg }

    animLeaves.push({
      start: leaf.start,
      end: leaf.end,
      animLeaf: animatableNodes[idx],
    })
  }

  return { alg, animLeaves }
}

async function getSignatures(
  scramble: Alg | string,
  solution: Alg | string,
): Promise<(string | null)[]> {
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
    const stepTime =
      lastIdxWithSignature === -1
        ? timings[idx]
        : timings[idx] - timings[lastIdxWithSignature]
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

function annotateMoves(
  solution: Alg,
  signaturesWithDurations: (string | null)[],
) {
  const res: AlgNode[] = []
  Array.from(solution.childAlgNodes()).forEach((node, idx) => {
    res.push(node)

    const comment = signaturesWithDurations[idx]
    if (comment !== null) {
      res.push(new LineComment(comment))
    }
  })
  return res
}

// NOTE: use original type once available
type AnimationTimelineLeaf = {
  animLeaf: Pause | Move
  start: number
  end: number
}
type AnimationTimelineLeafSlot = {
  animLeafType: typeof Pause | typeof Move
  start: number
  end: number
}

export function prepareLeaveSlots(
  timestamps: number[],
): AnimationTimelineLeafSlot[] {
  return fillPauses(trimOverlapping(constructLeaves(timestamps)))
}

function constructLeaves(timestamps: number[]): AnimationTimelineLeafSlot[] {
  return timestamps.map((start, idx) => {
    let end = start + 120
    if (timestamps[idx + 1] === 0) {
      end = 0
    }

    return { animLeafType: Move, start, end }
  })
}

function trimOverlapping(
  leaves: AnimationTimelineLeafSlot[],
): AnimationTimelineLeafSlot[] {
  return leaves.map((leaf, idx) => {
    const nextLeaf = leaves[idx + 1]
    if (!nextLeaf) return leaf

    const end = Math.min(leaf.end, nextLeaf.start)
    return { ...leaf, end }
  })
}

function fillPauses(
  leaves: AnimationTimelineLeafSlot[],
): AnimationTimelineLeafSlot[] {
  const withPauses: AnimationTimelineLeafSlot[] = [leaves[0]]
  for (let i = 1; i < leaves.length; i++) {
    const prev = leaves[i - 1]
    const cur = leaves[i]

    if (prev.end < cur.start) {
      withPauses.push({
        animLeafType: Pause,
        start: prev.end,
        end: cur.start,
      })
    }
    withPauses.push(cur)
  }
  return withPauses
}

function insertPauses(
  nodes: AlgNode[],
  leafSlots: AnimationTimelineLeafSlot[],
): AlgNode[] {
  const res: AlgNode[] = []
  let realIdx = 0
  for (const node of nodes) {
    if (!node.is(Move)) {
      res.push(node)
      continue
    }

    if (leafSlots[realIdx].animLeafType === Pause) {
      res.push(new Pause())
      realIdx++
    }
    res.push(node)
    realIdx++
  }
  return res
}

function generateLeaves(alg: Alg): AnimationTimelineLeaf[] {
  return Array.from(alg.childAlgNodes()).map((node, idx) => ({
    animLeaf: node,
    start: idx * 500,
    end: (idx + 1) * 500,
  }))
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
