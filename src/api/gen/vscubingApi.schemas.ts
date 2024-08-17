/**
 * Generated by orval v6.27.1 🍺
 * Do not edit manually.
 * Vscubing Api
 * vscubing Api
 * OpenAPI spec version: 0.0.0
 */
export type ContestsSolvesSingleResultLeaderboardRetrieveParams = {
  /**
   * page
   */
  page?: number
  /**
   * page size
   */
  pageSize?: number
}

export type ContestsOngoingContestSolveCreateCreateParams = {
  /**
   * discipline slug
   */
  disciplineSlug: string
  /**
   * scramble_id
   */
  scrambleId: number
}

export type ContestsOngoingContestCurrentRoundSessionProgressRetrieveParams = {
  /**
   * discipline slug
   */
  disciplineSlug: string
}

export type ContestsOngoingContestSubmitCreateAction =
  (typeof ContestsOngoingContestSubmitCreateAction)[keyof typeof ContestsOngoingContestSubmitCreateAction]

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ContestsOngoingContestSubmitCreateAction = {
  change_to_extra: 'change_to_extra',
  submit: 'submit',
} as const

export type ContestsOngoingContestSubmitCreateParams = {
  /**
   * action
   */
  action: ContestsOngoingContestSubmitCreateAction
  /**
   * discipline slug
   */
  disciplineSlug: string
}

export type ContestsDevOwnRoundSessionDeleteDestroy401 = { [key: string]: unknown }

export type ContestsContestsLeaderboardRetrieveParams = {
  /**
   * contest slug
   */
  contestSlug: string
  /**
   * discipline slug
   */
  disciplineSlug: string
  /**
   * page
   */
  page?: number
  /**
   * page size
   */
  pageSize?: number
}

export type ContestsContestsRetrieveParams = {
  /**
   * page
   */
  page?: number
  /**
   * page size
   */
  pageSize?: number
}

export interface ContestsSolveRetrieveOutput {
  contest: S01j5fmd1cgk52aj8hacxn6h7p4
  discipline: S01j5fmd1cgv6ce0k2a418pxmbd
  id: number
  isDnf: boolean
  reconstruction: string
  scramble: S01j5fmd1cg3wwf332819ykv42g
  submissionState: string
  timeMs: number
  user: S01j5fmd1cgt9yhybeech6rz06j
}

export interface ContestsSolveListBestInEveryDiscipline {
  contest: S01j5fmd1chv5ga4k5pxdmvyhtc
  createdAt: string
  discipline: S01j5fmd1ch1n3n4ccpghrc94sr
  id: number
  scramble: S01j5fmd1chyzzc6ar02qvbbkb9
  timeMs: number
  user: S01j5fmd1ch16atzj6azn5jk93j
}

export interface ContestsSingleResultLeaderboardOutput {
  page: number
  pages: number
  pageSize: number
  results: S01j5fmd1ckye8b5sww9er0nya6
}

export interface ContestsRoundSessionWithSolvesListOutput {
  page: number
  pages: number
  pageSize: number
  results: S01j5fmd1cjghd54f2g53s4dpfq
}

export interface ContestsCurrentSolveOutput {
  currentSolve: S01j5fmd1cjg84ezh67r2bx8k7b
  submittedSolveSet?: S01j5fmd1ckgsx4gd0s6m3xf81r[]
}

export interface ContestsCreateSolveOutput {
  createdAt: string
  id: number
  isDnf: boolean
  scramble: S01j5fmd1ch4v0xg0833xv8g7p0
  timeMs: number
}

export interface ContestsCreateSolveInput {
  isDnf: boolean
  reconstruction?: string
  timeMs?: number
}

export interface ContestsContestListOutput {
  page: number
  pages: number
  pageSize: number
  results: S01j5fmd1cjgfqry0pvr4jbc06j[]
}

export interface AccountsGoogleLoginOutput {
  access: string
  refresh: string
  user: S01j5fmd1bqe94mcamtk2stsb9a
}

export interface AccountsGoogleLoginInput {
  code: string
}

export interface AccountsCurrentUserOutput {
  id: number
  isVerified: boolean
  username: string
}

export interface AccountsChangeUsernameInput {
  /**
   * @minLength 3
   * @maxLength 20
   * @pattern ^[a-zA-Z0-9_]*$
   */
  username: string
}

export interface TokenRefresh {
  readonly access: string
  refresh: string
}

export interface S01j5fmd1ckz2wbfdx6q5r2kqyz {
  id: number
  isDnf: boolean
  scramble: S01j5fmd1cjr2e1djsmykt2wcg3
  timeMs: number
}

export interface S01j5fmd1ckx62cd8tskh1nj94h {
  contest: S01j5fmd1ck4xkm3q337c473nhy
  createdAt: string
  id: number
  isDnf: boolean
  timeMs: number
}

export interface S01j5fmd1cksthfhxz53v67yra4 {
  contest: S01j5fmd1ckdf45wemyar5smwxm
  createdAt: string
  id: number
  isDnf: boolean
  timeMs: number
  user: S01j5fmd1ckarpf5d2db61dq4hs
}

export interface S01j5fmd1ckvp6m1yf5ft8pbs68 {
  place: number
  solve: S01j5fmd1cksthfhxz53v67yra4
}

export interface S01j5fmd1ckye8b5sww9er0nya6 {
  ownResult?: S01j5fmd1ckbgw9aw5ba09vee49
  solveSet: S01j5fmd1ckvp6m1yf5ft8pbs68[]
}

export interface S01j5fmd1ckgsx4gd0s6m3xf81r {
  solve: S01j5fmd1ckz2wbfdx6q5r2kqyz
}

export interface S01j5fmd1ckdf45wemyar5smwxm {
  id: number
  slug: string
}

export interface S01j5fmd1ckbgw9aw5ba09vee49 {
  isDisplayedSeparately: boolean
  page: number
  place: number
  solve: S01j5fmd1ckx62cd8tskh1nj94h
}

export interface S01j5fmd1ckarpf5d2db61dq4hs {
  id: number
  username: string
}

export interface S01j5fmd1ck4xkm3q337c473nhy {
  id: number
  slug: string
}

export interface S01j5fmd1cjz2gdhg1dxp3dankn {
  id: number
  isDnf: boolean
  scramble: S01j5fmd1cj3tkhp1n90j2dsm2q
  timeMs: number
}

export interface S01j5fmd1cjr2e1djsmykt2wcg3 {
  id: number
  isExtra: boolean
  moves: string
  position: string
}

export interface S01j5fmd1cjmqk2fbkdjzg75whx {
  id: number
}

export interface S01j5fmd1cjpar46qx631facjg7 {
  avgMs: number
  contest: S01j5fmd1cjmqk2fbkdjzg75whx
  createdAt: string
  discipline: S01j5fmd1cj3v7aprnxefhckz99
  id: number
  isDnf: boolean
  isFinished: boolean
  solveSet: S01j5fmd1cj0vg0fffvy5mehtf6[]
  updatedAt: string
  user: S01j5fmd1cj0q4x6sehrwnb48cn
}

export interface S01j5fmd1cjjrhr38014cb68wyn {
  isDisplayedSeparately: boolean
  page: number
  place: number
  roundSession: S01j5fmd1chr3xwb6e20vwfhgrm
}

export interface S01j5fmd1cjghd54f2g53s4dpfq {
  contest: S01j5fmd1chbz961yte5peajy2b
  ownResult?: S01j5fmd1cjjrhr38014cb68wyn
  roundSessionSet: S01j5fmd1cj6h0z50f3kbg7cp34[]
}

export interface S01j5fmd1cjgfqry0pvr4jbc06j {
  endDate: string
  id: number
  name: string
  slug: string
  startDate: string
}

export interface S01j5fmd1cjeq94dqrv5m49y9p6 {
  id: number
  position: string
}

export interface S01j5fmd1cja7dhag1k493gk9gy {
  id: number
  isExtra: boolean
  moves: string
  position: string
}

export interface S01j5fmd1cjg84ezh67r2bx8k7b {
  canChangeToExtra: boolean
  scramble: S01j5fmd1cja7dhag1k493gk9gy
  solve?: S01j5fmd1cjz2gdhg1dxp3dankn
}

export interface S01j5fmd1cj6h0z50f3kbg7cp34 {
  place: number
  roundSession: S01j5fmd1cjpar46qx631facjg7
}

export interface S01j5fmd1cj3v7aprnxefhckz99 {
  id: number
}

export interface S01j5fmd1cj3tkhp1n90j2dsm2q {
  id: number
  isExtra: boolean
  moves: string
  position: string
}

export interface S01j5fmd1cj0vg0fffvy5mehtf6 {
  extraId: number
  id: number
  isDnf: boolean
  scramble: S01j5fmd1cjeq94dqrv5m49y9p6
  submissionState: string
  timeMs: number
}

export interface S01j5fmd1cj0q4x6sehrwnb48cn {
  id: number
  username: string
}

export interface S01j5fmd1chzzbetsddd66kkc35 {
  id: number
  position: string
}

export interface S01j5fmd1chyzzc6ar02qvbbkb9 {
  id: number
  moves: string
}

export interface S01j5fmd1chwx78v2gtthmqp8zv {
  id: number
}

export interface S01j5fmd1chv5ga4k5pxdmvyhtc {
  id: number
  name: string
  slug: string
}

export interface S01j5fmd1chtde65xer0r9zpnaj {
  id: number
  username: string
}

export interface S01j5fmd1chp4v8esyed62q6m2a {
  id: number
}

export interface S01j5fmd1chfv52ktp9s57mpyzr {
  extraId: number
  id: number
  isDnf: boolean
  scramble: S01j5fmd1chzzbetsddd66kkc35
  submissionState: string
  timeMs: number
}

export interface S01j5fmd1chr3xwb6e20vwfhgrm {
  avgMs: number
  contest: S01j5fmd1chwx78v2gtthmqp8zv
  createdAt: string
  discipline: S01j5fmd1chp4v8esyed62q6m2a
  id: number
  isDnf: boolean
  isFinished: boolean
  solveSet: S01j5fmd1chfv52ktp9s57mpyzr[]
  updatedAt: string
  user: S01j5fmd1chtde65xer0r9zpnaj
}

export interface S01j5fmd1chbz961yte5peajy2b {
  endDate: string
  id: number
  slug: string
  startDate: string
}

export interface S01j5fmd1ch4v0xg0833xv8g7p0 {
  id: number
  moves: string
}

export interface S01j5fmd1ch1n3n4ccpghrc94sr {
  id: number
  name: string
  slug: string
}

export interface S01j5fmd1ch16atzj6azn5jk93j {
  id: number
  username: string
}

export interface S01j5fmd1cgv6ce0k2a418pxmbd {
  id: number
  slug: string
}

export interface S01j5fmd1cgt9yhybeech6rz06j {
  id: number
  username: string
}

export interface S01j5fmd1cgk52aj8hacxn6h7p4 {
  id: number
  slug: string
}

export interface S01j5fmd1cg3wwf332819ykv42g {
  id: number
  moves: string
  position: string
}

export interface S01j5fmd1bqe94mcamtk2stsb9a {
  email: string
  pk: number
}

export interface OngoingContestRetrieve {
  endDate: string
  id: number
  slug: string
  startDate: string
}

export interface Input {
  idDnf: boolean
}
