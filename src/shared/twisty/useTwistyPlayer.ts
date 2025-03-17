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
  scramble = "R2 B U L' D2 B2 L' R2 D2 B2 U2 B L R F U' L' D'"
  solution =
    "x'/*0*/ x'/*0*/ y'/*0*/ y/*0*/ U'/*0*/ L'/*47*/ D'/*196*/ F'/*284*/ D'/*397*/ F/*572*/ y'/*870*/ L/*959*/ U'/*1034*/ L'/*1108*/ y'/*1226*/ U'/*1518*/ y'/*1693*/ U/*1796*/ U'/*2142*/ R'/*2249*/ U'/*2303*/ R/*2397*/ U/*2416*/ U/*2542*/ L/*2614*/ U'/*2682*/ L'/*2778*/ y'/*2919*/ U/*3370*/ R/*3454*/ U'/*3518*/ R'/*3577*/ F'/*3667*/ U'/*3718*/ F/*3769*/ U/*3912*/ U/*4671*/ R'/*4775*/ F'/*4843*/ L/*4996*/ F/*5068*/ R/*5122*/ F'/*5187*/ L'/*5337*/ F/*5392*/ U/*5526*/ U/*5632*/"

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

async function solutionTransformer(scramble: string, solutionWithTimings: string): Promise<Alg> {
  const cleanSolution = removeComments(solutionWithTimings)
  const timings = getTimings(solutionWithTimings)

  const puzzleLoader = puzzles['3x3x3']
  const kpuzzle = await puzzleLoader.kpuzzle()
  const solved = kpuzzle.defaultPattern()
  const multiCheckFn = await getMultiCheck(puzzleLoader)

  const fullSolutionAlg = new Alg(cleanSolution)
  const fullSolutionNodes = [...fullSolutionAlg.childAlgNodes()]

  let curAlg = new Alg()
  fullSolutionNodes.forEach((node, idx) => {
    curAlg = new Alg([...curAlg.childAlgNodes(), node])

    const pattern = solved.applyAlg(scramble).applyAlg(curAlg)
    const signature = multiCheckFn(pattern)
    if (!signature) {
      return
    }

    curAlg = new Alg([
      ...curAlg.childAlgNodes(),
      new LineComment(` ${signature} (${formatSolveTime(timings[idx])})`),
      new Newline(), // TODO: this should not be necessary
    ])
  })
  return curAlg
}

function removeComments(moves: string): string {
  return moves.replace(/\/\*\d+?\*\//g, '')
}

function getTimings(solutionWithTimings: string) {
  return solutionWithTimings
    .split('*')
    .filter((_, idx) => idx % 2 === 1)
    .map(Number)
}

// TODO: tidy up maybe + padding
export const SECOND_IN_MS = 1000
export const MINUTE_IN_SECONDS = 60
export const MINUTE_IN_MS = MINUTE_IN_SECONDS * SECOND_IN_MS
const getSeconds = (ms: number): number => Math.floor(ms / SECOND_IN_MS)
const getMinutes = (ms: number): number => Math.floor(ms / MINUTE_IN_MS)

function formatSolveTime(ms: number): string {
  const fullSeconds = getSeconds(ms)
  const minutes = getMinutes(ms)
  const seconds = fullSeconds - minutes * MINUTE_IN_SECONDS

  let msString = ms ? ms.toString().slice(-3) : '00'
  let secondsString = seconds.toString()
  let minutesString = minutes.toString()

  if (msString.length === 1) {
    msString = '0' + msString
  }
  if (secondsString.length === 1) {
    secondsString = '0' + secondsString
  }
  if (minutesString.length === 1) {
    minutesString = '0' + minutesString
  }

  if (minutesString === '00') return `${secondsString}.${msString}`
  return `${minutesString}:${secondsString}.${msString}`
}
