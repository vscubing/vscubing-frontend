/* eslint-disable */

export function init(options, moveListener: MoveListener, parent): Promise<Puzzle>

type MoveListener = (move: CsMove, mstep: Mstep, timestamp: number) => void

export class Puzzle {
  constructor(twistyScene, twisty)
  keydown(args): unknown
  resize(): unknown
  addMoves(args): unknown
  applyMoves(args): unknown
  addMoveListener(listener): unknown
  getDomElement(): unknown
  isRotation(move): unknown
  move2str(move: CsMove): string
  moveInv(move): unknown
  toggleColorVisible(args): unknown
  isSolved(args): unknown
  moveCnt(clr): unknown
  parseScramble(scramble, addPreScr): unknown
}

type CsMove = [number, number, string, number]

type Mstep = MstepStart | MstepDoing | MstepFinish
type MstepStart = 0
type MstepDoing = 1
type MstepFinish = 2
