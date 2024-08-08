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
  contest: S01j4s2jjtpw8y6k26m0ncsvw48
  discipline: S01j4s2jjtp01zjerv2q6hvdgbr
  id: number
  isDnf: boolean
  reconstruction: string
  scramble: S01j4s2jjtpa9zrcns14c9k3afe
  submissionState: string
  timeMs: number
  user: S01j4s2jjtp1tmtqyptm3yz0efz
}

export interface ContestsSolveListBestInEveryDiscipline {
  contest: S01j4s2jjtq6gazm27xq90bc5sg
  createdAt: string
  discipline: S01j4s2jjtqah30ett934c75en8
  id: number
  scramble: S01j4s2jjtqmqv7sgcat4ask38d
  timeMs: number
  user: S01j4s2jjtqwvj5e3hts5mfscz2
}

export interface ContestsSingleResultLeaderboardOutput {
  page: number
  pages: number
  pageSize: number
  results: S01j4s2jjtsyb030zwxj95x2fgr
}

export interface ContestsRoundSessionWithSolvesListOutput {
  page: number
  pages: number
  pageSize: number
  results: S01j4s2jjtrkgvtcwxvgjsh498d
}

export interface ContestsCurrentSolveOutput {
  currentSolve: S01j4s2jjtr5h4bq6t43wb37bgt
  submittedSolveSet?: S01j4s2jjtsz2ecrmkkdndgmgxr[]
}

export interface ContestsCreateSolveOutput {
  createdAt: string
  id: number
  isDnf: boolean
  scramble: S01j4s2jjtqpcstdzq8nftbwrje
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
  results: S01j4s2jjtrfx5cg2aj67t7b1dx[]
}

export interface AccountsGoogleLoginOutput {
  access: string
  refresh: string
  user: S01j4s2jjtfxm6g24tjy5j6s672
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

export interface S01j4s2jjtsz2ecrmkkdndgmgxr {
  solve: S01j4s2jjtsjt6zhkz2j18jbzz0
}

export interface S01j4s2jjtsyb030zwxj95x2fgr {
  ownResult?: S01j4s2jjts7zndnqxgmhw9k9zk
  solveSet: S01j4s2jjts709gsqba109e6sxc[]
}

export interface S01j4s2jjtssy8xjq1dwtth88v5 {
  id: number
  slug: string
}

export interface S01j4s2jjtsjt6zhkz2j18jbzz0 {
  id: number
  isDnf: boolean
  scramble: S01j4s2jjts97ewygede20yzj8k
  timeMs: number
}

export interface S01j4s2jjtsgcsynpkdzydw2hay {
  contest: S01j4s2jjtssy8xjq1dwtth88v5
  createdAt: string
  id: number
  isDnf: boolean
  timeMs: number
}

export interface S01j4s2jjtsezwdveqtnhj9zjyj {
  id: number
  username: string
}

export interface S01j4s2jjtsccvtcas3926a9nrj {
  id: number
  slug: string
}

export interface S01j4s2jjtsdn0240mq2r2z4gtf {
  contest: S01j4s2jjtsccvtcas3926a9nrj
  createdAt: string
  id: number
  isDnf: boolean
  timeMs: number
  user: S01j4s2jjtsezwdveqtnhj9zjyj
}

export interface S01j4s2jjts97ewygede20yzj8k {
  id: number
  isExtra: boolean
  moves: string
  position: string
}

export interface S01j4s2jjts7zndnqxgmhw9k9zk {
  isDisplayedSeparately: boolean
  page: number
  place: number
  solve: S01j4s2jjtsgcsynpkdzydw2hay
}

export interface S01j4s2jjts709gsqba109e6sxc {
  place: number
  solve: S01j4s2jjtsdn0240mq2r2z4gtf
}

export interface S01j4s2jjtrz3hxkwqr9616vcv7 {
  extraId: number
  id: number
  isDnf: boolean
  scramble: S01j4s2jjtr6pqnwz30zkr08fh3
  submissionState: string
  timeMs: number
}

export interface S01j4s2jjtrz3bch0b9czzrbw6t {
  place: number
  roundSession: S01j4s2jjtrrw25cchk6ts71r0h
}

export interface S01j4s2jjtrxvrg1k7wm56qbsre {
  id: number
  isExtra: boolean
  moves: string
  position: string
}

export interface S01j4s2jjtrsyw3z88x3bej635f {
  id: number
  isDnf: boolean
  scramble: S01j4s2jjtr9g0cejspn5a622cg
  timeMs: number
}

export interface S01j4s2jjtrskzh5syvayper5st {
  id: number
  username: string
}

export interface S01j4s2jjtrrw25cchk6ts71r0h {
  avgMs: number
  contest: S01j4s2jjtr1a0dyeh4ff4tb60q
  createdAt: string
  discipline: S01j4s2jjtr9gtmmaq77m0nktz2
  id: number
  isDnf: boolean
  isFinished: boolean
  solveSet: S01j4s2jjtrz3hxkwqr9616vcv7[]
  updatedAt: string
  user: S01j4s2jjtrskzh5syvayper5st
}

export interface S01j4s2jjtrmrt322x60mqy0fbn {
  isDisplayedSeparately: boolean
  page: number
  place: number
  roundSession: S01j4s2jjtr4v3jfbgp6tfg8s75
}

export interface S01j4s2jjtrkgvtcwxvgjsh498d {
  contest: S01j4s2jjtqt14kmch5edy13kxp
  ownResult?: S01j4s2jjtrmrt322x60mqy0fbn
  roundSessionSet: S01j4s2jjtrz3bch0b9czzrbw6t[]
}

export interface S01j4s2jjtrfx5cg2aj67t7b1dx {
  endDate: string
  id: number
  name: string
  slug: string
  startDate: string
}

export interface S01j4s2jjtr9gtmmaq77m0nktz2 {
  id: number
}

export interface S01j4s2jjtr9g0cejspn5a622cg {
  id: number
  isExtra: boolean
  moves: string
  position: string
}

export interface S01j4s2jjtr6pqnwz30zkr08fh3 {
  id: number
  position: string
}

export interface S01j4s2jjtr5h4bq6t43wb37bgt {
  canChangeToExtra: boolean
  scramble: S01j4s2jjtrxvrg1k7wm56qbsre
  solve?: S01j4s2jjtrsyw3z88x3bej635f
}

export interface S01j4s2jjtr4v3jfbgp6tfg8s75 {
  avgMs: number
  contest: S01j4s2jjtqcxe9pv0w19h5ay9s
  createdAt: string
  discipline: S01j4s2jjtqddkr03gtwdew76f9
  id: number
  isDnf: boolean
  isFinished: boolean
  solveSet: S01j4s2jjtqjskkzjt0py09jzkw[]
  updatedAt: string
  user: S01j4s2jjtq2yfh42gm0wjmyz83
}

export interface S01j4s2jjtr1a0dyeh4ff4tb60q {
  id: number
}

export interface S01j4s2jjtqwvj5e3hts5mfscz2 {
  id: number
  username: string
}

export interface S01j4s2jjtqt14kmch5edy13kxp {
  endDate: string
  id: number
  slug: string
  startDate: string
}

export interface S01j4s2jjtqpcstdzq8nftbwrje {
  id: number
  moves: string
}

export interface S01j4s2jjtqmqv7sgcat4ask38d {
  id: number
  moves: string
}

export interface S01j4s2jjtqk4qkjmd7ja1xfnbr {
  id: number
  position: string
}

export interface S01j4s2jjtqjskkzjt0py09jzkw {
  extraId: number
  id: number
  isDnf: boolean
  scramble: S01j4s2jjtqk4qkjmd7ja1xfnbr
  submissionState: string
  timeMs: number
}

export interface S01j4s2jjtqddkr03gtwdew76f9 {
  id: number
}

export interface S01j4s2jjtqcxe9pv0w19h5ay9s {
  id: number
}

export interface S01j4s2jjtqah30ett934c75en8 {
  id: number
  name: string
  slug: string
}

export interface S01j4s2jjtq6gazm27xq90bc5sg {
  id: number
  name: string
  slug: string
}

export interface S01j4s2jjtq2yfh42gm0wjmyz83 {
  id: number
  username: string
}

export interface S01j4s2jjtpw8y6k26m0ncsvw48 {
  id: number
  slug: string
}

export interface S01j4s2jjtpa9zrcns14c9k3afe {
  id: number
  moves: string
  position: string
}

export interface S01j4s2jjtp1tmtqyptm3yz0efz {
  id: number
  username: string
}

export interface S01j4s2jjtp01zjerv2q6hvdgbr {
  id: number
  slug: string
}

export interface S01j4s2jjtfxm6g24tjy5j6s672 {
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
