/**
 * Generated by orval v6.27.1 🍺
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
  contest: S01jgceby6ghjcs2zhzyeqbfw3t
  discipline: S01jgceby6gn1hqn4b2k12kcnx1
  id: number
  isDnf: boolean
  reconstruction: string
  scramble: S01jgceby6fg0mbw9m21wpbbrnk
  submissionState: string
  timeMs: number
  user: S01jgceby6gky8n3xawdm0evjvn
}

export interface ContestsSolveListBestInEveryDiscipline {
  contest: S01jgceby6g0n1p8jcfgxs76dew
  createdAt: string
  discipline: S01jgceby6gzb9b498xtd4s5mw6
  id: number
  scramble: S01jgceby6g6bncfhb2wv1vjze6
  timeMs: number
  user: S01jgceby6gy86f5004r3r45kqt
}

export interface ContestsSingleResultLeaderboardOutput {
  page: number
  pages: number
  pageSize: number
  results: S01jgceby6kynqy6q4t0z21jq7d
}

export interface ContestsRoundSessionWithSolvesListOutput {
  page: number
  pages: number
  pageSize: number
  results: S01jgceby6h1yr11cf9wmn9j72s
}

export interface ContestsCurrentSolveOutput {
  currentSolve: S01jgceby6jbpfs0bm3j32dpgvp
  submittedSolveSet?: S01jgceby6jptk2djjs9fm845dm[]
}

export interface ContestsCreateSolveOutput {
  createdAt: string
  id: number
  isDnf: boolean
  scramble: S01jgceby6gvcnay4rkebafdhq0
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
  results: S01jgceby6j3zkvkr13c31me6sx[]
}

export interface AccountsGoogleLoginOutput {
  access: string
  refresh: string
  user: S01jgceby67nsh8eq316nzk841h
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

export interface S01jgceby6ky8kg36hztg5nr4a8 {
  place: number
  solve: S01jgceby6knw4fwyymysr2pc2c
}

export interface S01jgceby6kynqy6q4t0z21jq7d {
  ownResult?: S01jgceby6jfgpybe5rskj8z7rr
  solveSet: S01jgceby6ky8kg36hztg5nr4a8[]
}

export interface S01jgceby6kwgyedd1zx2ddpbpf {
  id: number
  slug: string
}

export interface S01jgceby6knw4fwyymysr2pc2c {
  contest: S01jgceby6kwgyedd1zx2ddpbpf
  createdAt: string
  id: number
  isDnf: boolean
  timeMs: number
  user: S01jgceby6jrcv5gh4dthx2ekwj
}

export interface S01jgceby6jxqg2t94qrxpec5zh {
  id: number
  isExtra: boolean
  moves: string
  position: string
}

export interface S01jgceby6jw9atkbp33fv9y3f1 {
  id: number
  name: string
  slug: string
}

export interface S01jgceby6jrcv5gh4dthx2ekwj {
  id: number
  username: string
}

export interface S01jgceby6jp9nz2rqq622ggkqr {
  id: number
  isDnf: boolean
  scramble: S01jgceby6j7q56a716dga5yysr
  timeMs: number
}

export interface S01jgceby6jptk2djjs9fm845dm {
  solve: S01jgceby6jp9nz2rqq622ggkqr
}

export interface S01jgceby6jnbhv8xcryza6xmjz {
  id: number
  isExtra: boolean
  moves: string
  position: string
}

export interface S01jgceby6jkq763g4n7gm5rvv1 {
  id: number
  isDnf: boolean
  scramble: S01jgceby6jxqg2t94qrxpec5zh
  timeMs: number
}

export interface S01jgceby6jj9wfcy05mzwenw8v {
  id: number
  slug: string
}

export interface S01jgceby6jfgpybe5rskj8z7rr {
  isDisplayedSeparately: boolean
  page: number
  place: number
  solve: S01jgceby6j1r51qwpy1je6jy24
}

export interface S01jgceby6jbpfs0bm3j32dpgvp {
  canChangeToExtra: boolean
  scramble: S01jgceby6jnbhv8xcryza6xmjz
  solve?: S01jgceby6jkq763g4n7gm5rvv1
}

export interface S01jgceby6j7q56a716dga5yysr {
  id: number
  isExtra: boolean
  moves: string
  position: string
}

export interface S01jgceby6j3zkvkr13c31me6sx {
  disciplineSet: S01jgceby6h6s3xy5rypxqhm95q[]
  endDate: string
  id: number
  name: string
  slug: string
  startDate: string
}

export interface S01jgceby6j1r51qwpy1je6jy24 {
  contest: S01jgceby6jj9wfcy05mzwenw8v
  createdAt: string
  id: number
  isDnf: boolean
  timeMs: number
}

export interface S01jgceby6hyat5kvcp2ea5nrg4 {
  id: number
}

export interface S01jgceby6hwx75j7k7zcp44cga {
  extraId: number
  id: number
  isDnf: boolean
  scramble: S01jgceby6h4dknjm8dcx2mh32x
  submissionState: string
  timeMs: number
}

export interface S01jgceby6hw4k7yfmwdzvh8cg5 {
  id: number
}

export interface S01jgceby6hnyjqdv3vktenkjm7 {
  id: number
  position: string
}

export interface S01jgceby6hkfaep7pmtmf9vgxh {
  avgMs: number
  contest: S01jgceby6hw4k7yfmwdzvh8cg5
  createdAt: string
  discipline: S01jgceby6hyat5kvcp2ea5nrg4
  id: number
  isDnf: boolean
  isFinished: boolean
  solveSet: S01jgceby6hwx75j7k7zcp44cga[]
  updatedAt: string
  user: S01jgceby6h8gvechp9vbrt0g7p
}

export interface S01jgceby6hhkv31atdsnesyz1y {
  extraId: number
  id: number
  isDnf: boolean
  scramble: S01jgceby6hnyjqdv3vktenkjm7
  submissionState: string
  timeMs: number
}

export interface S01jgceby6hhknt9263zwxh1fq9 {
  isDisplayedSeparately: boolean
  page: number
  place: number
  roundSession: S01jgceby6h9kwvf25s7n45h9px
}

export interface S01jgceby6hff67y7v90b9ym7b5 {
  place: number
  roundSession: S01jgceby6hkfaep7pmtmf9vgxh
}

export interface S01jgceby6h9kwvf25s7n45h9px {
  avgMs: number
  contest: S01jgceby6h17dv108e0c33bakw
  createdAt: string
  discipline: S01jgceby6h0vdzddde35r601z8
  id: number
  isDnf: boolean
  isFinished: boolean
  solveSet: S01jgceby6hhkv31atdsnesyz1y[]
  updatedAt: string
  user: S01jgceby6h4fxy7pm3wn4d0rhp
}

export interface S01jgceby6h8gvechp9vbrt0g7p {
  id: number
  username: string
}

export interface S01jgceby6h6s3xy5rypxqhm95q {
  id: number
  name: string
  slug: string
}

export interface S01jgceby6h4fxy7pm3wn4d0rhp {
  id: number
  username: string
}

export interface S01jgceby6h4dknjm8dcx2mh32x {
  id: number
  position: string
}

export interface S01jgceby6h1yr11cf9wmn9j72s {
  contest: S01jgceby6g78w94x6ep12jan2k
  ownResult?: S01jgceby6hhknt9263zwxh1fq9
  roundSessionSet: S01jgceby6hff67y7v90b9ym7b5[]
}

export interface S01jgceby6h17dv108e0c33bakw {
  id: number
}

export interface S01jgceby6h0vdzddde35r601z8 {
  id: number
}

export interface S01jgceby6gzb9b498xtd4s5mw6 {
  id: number
  name: string
  slug: string
}

export interface S01jgceby6gy86f5004r3r45kqt {
  id: number
  username: string
}

export interface S01jgceby6gvcnay4rkebafdhq0 {
  id: number
  moves: string
}

export interface S01jgceby6gn1hqn4b2k12kcnx1 {
  id: number
  slug: string
}

export interface S01jgceby6gkyzmsdfjkjezc3z2 {
  id: number
  name: string
  slug: string
}

export interface S01jgceby6gky8n3xawdm0evjvn {
  id: number
  username: string
}

export interface S01jgceby6ghjcs2zhzyeqbfw3t {
  id: number
  slug: string
}

export interface S01jgceby6g78w94x6ep12jan2k {
  disciplineSet: S01jgceby6gkyzmsdfjkjezc3z2[]
  endDate: string
  id: number
  slug: string
  startDate: string
}

export interface S01jgceby6g6bncfhb2wv1vjze6 {
  id: number
  moves: string
}

export interface S01jgceby6g0n1p8jcfgxs76dew {
  id: number
  name: string
  slug: string
}

export interface S01jgceby6fg0mbw9m21wpbbrnk {
  id: number
  moves: string
  position: string
}

export interface S01jgceby67nsh8eq316nzk841h {
  email: string
  pk: number
}

export interface OngoingContestRetrieve {
  disciplineSet: S01jgceby6jw9atkbp33fv9y3f1[]
  endDate: string
  id: number
  slug: string
  startDate: string
}

export interface Input {
  idDnf: boolean
}
