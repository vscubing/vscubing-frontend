/* eslint-disable */

export function init(options: Options, moveListener: MoveListener, cameraPositionListener: CameraPositionListener, parent): Promise<Puzzle>

type MoveListener = (move: CsMove, mstep: Mstep, timestamp: number) => void
type CameraPositionListener = (theta: number, phi: number) => void
type Options = {
  puzzle: 'cube2' | 'cube3'
  animationDuration
}

export class Puzzle {
  constructor(twistyScene, twisty)
  keydown(args): unknown
  resize(): unknown
  addMoves(args): unknown
  applyMoves(args): unknown
  addMoveListener(listener): unknown
  getDomElement(): unknown
  isRotation(move: CsMove): boolean
  move2str(move: CsMove): string
  moveInv(move): unknown
  toggleColorVisible(args): unknown
  isSolved(args?: unknown): number
  moveCnt(clr): unknown
  parseScramble(scramble, addPreScr?: boolean): unknown
}

type CsMove = [number, number, string, number]

type Mstep = MstepStart | MstepDoing | MstepFinish
type MstepStart = 0
type MstepDoing = 1
type MstepFinish = 2
