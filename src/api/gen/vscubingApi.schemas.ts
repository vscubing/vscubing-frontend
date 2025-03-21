/**
 * Generated by orval v6.31.0 🍺
 * Do not edit manually.
 * Vscubing Api
 * vscubing Api
 * OpenAPI spec version: 0.0.0
 */
export type ContestsSolvesSingleResultLeaderboardRetrieveParams = {
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
}

export type ContestsDevOwnRoundSessionDeleteDestroy401 = { [key: string]: unknown }

export type ContestsDevOwnRoundSessionDeleteDestroyParams = {
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

export interface ContestsSolveRetrieveOutput {
  contest: S01jpwwf02dmcr1xb9ezbw2xjpg
  discipline: S01jpwwf02d41kdddjv686gk56h
  id: number
  isDnf: boolean
  reconstruction: string
  scramble: S01jpwwf02d705fxp9t6tmsxw3t
  submissionState: string
  timeMs: number
  user: S01jpwwf02dat8q9s5mhr6q4v52
}

export interface ContestsSolveListBestInEveryDiscipline {
  contest: S01jpwwf02de5cwqbdq16me9ads
  createdAt: string
  discipline: S01jpwwf02d8y1c7gzd8s7xvgd4
  id: number
  scramble: S01jpwwf02dq3v5rnd219j5hgnq
  timeMs: number
  user: S01jpwwf02dsevt5zgh0b515mfe
}

export interface ContestsSingleResultLeaderboardOutput {
  page: number
  pages: number
  pageSize: number
  results: S01jpwwf02g7a614sqa6jamt00a
}

export interface ContestsRoundSessionWithSolvesListOutput {
  page: number
  pages: number
  pageSize: number
  results: S01jpwwf02fhjgpcrjb3zkwkasn
}

export interface ContestsCurrentSolveOutput {
  currentSolve: S01jpwwf02gc914y6hg8r1qsqfe
  submittedSolveSet?: S01jpwwf02g0rc2909qm5bnj20m[]
}

export interface ContestsCreateSolveOutput {
  createdAt: string
  id: number
  isDnf: boolean
  scramble: S01jpwwf02etgzqhtb8gm5bhnt1
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
  results: S01jpwwf02f0vax9kmvetgcwmrs[]
}

export interface AccountsSettingsUpdateOutput {
  cstimerAnimationDuration: number
  cstimerInspectionVoiceAlert: string
}

export interface AccountsSettingsUpdateInput {
  cstimerAnimationDuration?: number
  cstimerInspectionVoiceAlert?: string
}

export interface AccountsGoogleLoginOutput {
  access: string
  refresh: string
  user: S01jpwwf02549cmbrmn7t3e8z4e
}

export interface AccountsGoogleLoginInput {
  code: string
}

export interface AccountsCurrentUserOutput {
  email: string
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

export interface S01jpwwf02gsz428x1rtfmd8t1r {
  id: number
  username: string
}

export interface S01jpwwf02gq4wmwh2rfef9ws7z {
  id: number
  slug: string
}

export interface S01jpwwf02gp400z09ambw69krw {
  id: number
  isDnf: boolean
  scramble: S01jpwwf02g3arcm4xjybgtq46s
  timeMs: number
}

export interface S01jpwwf02gmy3kccze6skvw9sk {
  isDisplayedSeparately: boolean
  page: number
  place: number
  solve: S01jpwwf02g2kdtwk50wwkydgg2
}

export interface S01jpwwf02gm5cy8c035yqc637n {
  id: number
  isExtra: boolean
  moves: string
  position: string
}

export interface S01jpwwf02gejr0dzr2k7fc2hgn {
  contest: S01jpwwf02gb6sxg16dce957b7r
  createdAt: string
  id: number
  isDnf: boolean
  timeMs: number
  user: S01jpwwf02gsz428x1rtfmd8t1r
}

export interface S01jpwwf02gc914y6hg8r1qsqfe {
  canChangeToExtra: boolean
  scramble: S01jpwwf02f62g8txdsnrtvggmj
  solve?: S01jpwwf02gp400z09ambw69krw
}

export interface S01jpwwf02gb6sxg16dce957b7r {
  id: number
  slug: string
}

export interface S01jpwwf02gb66jwbgdjn2fy9g7 {
  place: number
  solve: S01jpwwf02gejr0dzr2k7fc2hgn
}

export interface S01jpwwf02g7a614sqa6jamt00a {
  ownResult?: S01jpwwf02gmy3kccze6skvw9sk
  solveSet: S01jpwwf02gb66jwbgdjn2fy9g7[]
}

export interface S01jpwwf02g4t9p0gbvdhpqvnzz {
  id: number
  isDnf: boolean
  scramble: S01jpwwf02gm5cy8c035yqc637n
  timeMs: number
}

export interface S01jpwwf02g3arcm4xjybgtq46s {
  id: number
  isExtra: boolean
  moves: string
  position: string
}

export interface S01jpwwf02g2kdtwk50wwkydgg2 {
  contest: S01jpwwf02gq4wmwh2rfef9ws7z
  createdAt: string
  id: number
  isDnf: boolean
  timeMs: number
}

export interface S01jpwwf02g0rc2909qm5bnj20m {
  solve: S01jpwwf02g4t9p0gbvdhpqvnzz
}

export interface S01jpwwf02fwvwq7s8xabrqt2kv {
  place: number
  roundSession: S01jpwwf02fktywz1bx70wvjvjd
}

export interface S01jpwwf02fpfhp2t1yk65r7kzh {
  id: number
  position: string
}

export interface S01jpwwf02fm4vgp56qvz4qgx3b {
  id: number
}

export interface S01jpwwf02fcydghxasq4wyh17h {
  extraId: number
  id: number
  isDnf: boolean
  scramble: S01jpwwf02fpfhp2t1yk65r7kzh
  submissionState: string
  timeMs: number
}

export interface S01jpwwf02fktywz1bx70wvjvjd {
  avgMs: number
  contest: S01jpwwf02fm4vgp56qvz4qgx3b
  createdAt: string
  discipline: S01jpwwf02f3mp0jm5hkz5d8gg1
  id: number
  isDnf: boolean
  isFinished: boolean
  solveSet: S01jpwwf02fcydghxasq4wyh17h[]
  updatedAt: string
  user: S01jpwwf02f4fz46kgavn32fk9j
}

export interface S01jpwwf02f78bxve5pwrcw1d5m {
  id: number
  name: string
  slug: string
}

export interface S01jpwwf02f62g8txdsnrtvggmj {
  id: number
  isExtra: boolean
  moves: string
  position: string
}

export interface S01jpwwf02f4s6bdhgjt83fwsem {
  id: number
  name: string
  slug: string
}

export interface S01jpwwf02f4fz46kgavn32fk9j {
  id: number
  username: string
}

export interface S01jpwwf02f3mp0jm5hkz5d8gg1 {
  id: number
}

export interface S01jpwwf02f0vax9kmvetgcwmrs {
  disciplineSet: S01jpwwf02f78bxve5pwrcw1d5m[]
  endDate: string
  id: number
  name: string
  slug: string
  startDate: string
}

export interface S01jpwwf02eyh23tbntmbxdkz02 {
  id: number
  position: string
}

export interface S01jpwwf02ett8h3jvq96r4hjy5 {
  id: number
}

export interface S01jpwwf02etgzqhtb8gm5bhnt1 {
  id: number
  moves: string
}

export interface S01jpwwf02eq4qfgjvgxap4vxy0 {
  extraId: number
  id: number
  isDnf: boolean
  scramble: S01jpwwf02eyh23tbntmbxdkz02
  submissionState: string
  timeMs: number
}

export interface S01jpwwf02eh9q0t8ff1061bywb {
  isDisplayedSeparately: boolean
  page: number
  place: number
  roundSession: S01jpwwf02evg6y0jjsnprrt7yz
}

export interface S01jpwwf02edkbcrmvqce5sbmwp {
  id: number
  name: string
  slug: string
}

export interface S01jpwwf02ec5nme0ed4e6vp4j2 {
  id: number
  username: string
}

export interface S01jpwwf02ebytqvp9025mmwpsh {
  disciplineSet: S01jpwwf02edkbcrmvqce5sbmwp[]
  endDate: string
  id: number
  slug: string
  startDate: string
}

export interface S01jpwwf02fhjgpcrjb3zkwkasn {
  contest: S01jpwwf02ebytqvp9025mmwpsh
  ownResult?: S01jpwwf02eh9q0t8ff1061bywb
  roundSessionSet: S01jpwwf02fwvwq7s8xabrqt2kv[]
}

export interface S01jpwwf02e3ps19geabqq366vz {
  id: number
}

export interface S01jpwwf02evg6y0jjsnprrt7yz {
  avgMs: number
  contest: S01jpwwf02e3ps19geabqq366vz
  createdAt: string
  discipline: S01jpwwf02ett8h3jvq96r4hjy5
  id: number
  isDnf: boolean
  isFinished: boolean
  solveSet: S01jpwwf02eq4qfgjvgxap4vxy0[]
  updatedAt: string
  user: S01jpwwf02ec5nme0ed4e6vp4j2
}

export interface S01jpwwf02dsevt5zgh0b515mfe {
  id: number
  username: string
}

export interface S01jpwwf02dq3v5rnd219j5hgnq {
  id: number
  moves: string
}

export interface S01jpwwf02dmcr1xb9ezbw2xjpg {
  id: number
  slug: string
}

export interface S01jpwwf02de5cwqbdq16me9ads {
  id: number
  name: string
  slug: string
}

export interface S01jpwwf02dat8q9s5mhr6q4v52 {
  id: number
  username: string
}

export interface S01jpwwf02d8y1c7gzd8s7xvgd4 {
  id: number
  name: string
  slug: string
}

export interface S01jpwwf02d705fxp9t6tmsxw3t {
  id: number
  moves: string
  position: string
}

export interface S01jpwwf02d41kdddjv686gk56h {
  id: number
  slug: string
}

export interface S01jpwwf02549cmbrmn7t3e8z4e {
  email: string
  pk: number
}

export interface Output {
  id: number
  name: string
  slug: string
}

export interface OngoingContestRetrieve {
  disciplineSet: S01jpwwf02f4s6bdhgjt83fwsem[]
  endDate: string
  id: number
  slug: string
  startDate: string
}

export interface Input {
  /** @maxLength 1500 */
  reasonForTakingExtra?: string
}
