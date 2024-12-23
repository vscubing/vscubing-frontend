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
  contest: S01jft4msfbbgzhya7we2hy5j6b
  discipline: S01jft4msfb29vkn64az2bz64hg
  id: number
  isDnf: boolean
  reconstruction: string
  scramble: S01jft4msfbwk7kqydk5znzwf10
  submissionState: string
  timeMs: number
  user: S01jft4msfb3be74zs04npd0ggg
}

export interface ContestsSolveListBestInEveryDiscipline {
  contest: S01jft4msfcy1e2yvv3jhxf7jt3
  createdAt: string
  discipline: S01jft4msfcfn1q0x9q5sjat638
  id: number
  scramble: S01jft4msfbqb1a6n1z1zx1pmfa
  timeMs: number
  user: S01jft4msfbyxrexgqxxejhd4dm
}

export interface ContestsSingleResultLeaderboardOutput {
  page: number
  pages: number
  pageSize: number
  results: S01jft4msfek9prt4c262zmc733
}

export interface ContestsRoundSessionWithSolvesListOutput {
  page: number
  pages: number
  pageSize: number
  results: S01jft4msfdv4zw1myw1njjckz0
}

export interface ContestsCurrentSolveOutput {
  currentSolve: S01jft4msfd0fcd6mdec027w55w
  submittedSolveSet?: S01jft4msfdh25hwx99bd5k9b41[]
}

export interface ContestsCreateSolveOutput {
  createdAt: string
  id: number
  isDnf: boolean
  scramble: S01jft4msfcxm22nadb4e71gfer
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
  results: S01jft4msfd5a14xvy0309ymjgb[]
}

export interface AccountsGoogleLoginOutput {
  access: string
  refresh: string
  user: S01jft4mseqhexnsa11pkce9xds
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

export interface S01jft4msfez7ajandqjfb132p6 {
  id: number
  slug: string
}

export interface S01jft4msfeshs4m12yzqrhdhq1 {
  place: number
  solve: S01jft4msfe5rxtb5ncs4f025t1
}

export interface S01jft4msfek9prt4c262zmc733 {
  ownResult?: S01jft4msfec4eg1n67fg81s46g
  solveSet: S01jft4msfeshs4m12yzqrhdhq1[]
}

export interface S01jft4msfecv9xawnsvg6ybdap {
  id: number
  username: string
}

export interface S01jft4msfec4eg1n67fg81s46g {
  isDisplayedSeparately: boolean
  page: number
  place: number
  solve: S01jft4msfe6c75aqvmgqf1gbwz
}

export interface S01jft4msfe7k1q6fha18n77zh5 {
  id: number
  slug: string
}

export interface S01jft4msfe6c75aqvmgqf1gbwz {
  contest: S01jft4msfez7ajandqjfb132p6
  createdAt: string
  id: number
  isDnf: boolean
  timeMs: number
}

export interface S01jft4msfe5rxtb5ncs4f025t1 {
  contest: S01jft4msfe7k1q6fha18n77zh5
  createdAt: string
  id: number
  isDnf: boolean
  timeMs: number
  user: S01jft4msfecv9xawnsvg6ybdap
}

export interface S01jft4msfdv4zw1myw1njjckz0 {
  contest: S01jft4msfc1gmxrgfez1gz2wbj
  ownResult?: S01jft4msfc0mz5m7ywgjay5rkd
  roundSessionSet: S01jft4msfdnj1kw5yp6wgxmdfr[]
}

export interface S01jft4msfdv3smy2h4yj3vgq10 {
  id: number
  isExtra: boolean
  moves: string
  position: string
}

export interface S01jft4msfdsfcq56q3espqgz04 {
  id: number
  isExtra: boolean
  moves: string
  position: string
}

export interface S01jft4msfdv29f2pjwv6c0t7nj {
  id: number
  isDnf: boolean
  scramble: S01jft4msfdsfcq56q3espqgz04
  timeMs: number
}

export interface S01jft4msfdr8p1eab40qzns8pt {
  id: number
  isDnf: boolean
  scramble: S01jft4msfdv3smy2h4yj3vgq10
  timeMs: number
}

export interface S01jft4msfdn5r2xg8gvsknjxma {
  avgMs: number
  contest: S01jft4msfcgm21rbh695qc2kve
  createdAt: string
  discipline: S01jft4msfdfn0a89bytk7agy4d
  id: number
  isDnf: boolean
  isFinished: boolean
  solveSet: S01jft4msfdh0zg62d1ya3by8v1[]
  updatedAt: string
  user: S01jft4msfcgn94ztfahjg3j6g0
}

export interface S01jft4msfdnj1kw5yp6wgxmdfr {
  place: number
  roundSession: S01jft4msfdn5r2xg8gvsknjxma
}

export interface S01jft4msfdh25hwx99bd5k9b41 {
  solve: S01jft4msfdr8p1eab40qzns8pt
}

export interface S01jft4msfdgqafpyw9at9ce00h {
  id: number
  isExtra: boolean
  moves: string
  position: string
}

export interface S01jft4msfdfn0a89bytk7agy4d {
  id: number
}

export interface S01jft4msfd5a14xvy0309ymjgb {
  endDate: string
  id: number
  name: string
  slug: string
  startDate: string
}

export interface S01jft4msfd1gxwxxv9vejxdgs2 {
  id: number
  position: string
}

export interface S01jft4msfdh0zg62d1ya3by8v1 {
  extraId: number
  id: number
  isDnf: boolean
  scramble: S01jft4msfd1gxwxxv9vejxdgs2
  submissionState: string
  timeMs: number
}

export interface S01jft4msfd0fcd6mdec027w55w {
  canChangeToExtra: boolean
  scramble: S01jft4msfdgqafpyw9at9ce00h
  solve?: S01jft4msfdv29f2pjwv6c0t7nj
}

export interface S01jft4msfcy1e2yvv3jhxf7jt3 {
  id: number
  name: string
  slug: string
}

export interface S01jft4msfcxm22nadb4e71gfer {
  id: number
  moves: string
}

export interface S01jft4msfcsam0ap50tckmkeb4 {
  id: number
}

export interface S01jft4msfck1qz3wmpzpp9v6xp {
  id: number
  username: string
}

export interface S01jft4msfcwy434w4t53vwtysq {
  avgMs: number
  contest: S01jft4msfcdt58n4hmnes9py33
  createdAt: string
  discipline: S01jft4msfcsam0ap50tckmkeb4
  id: number
  isDnf: boolean
  isFinished: boolean
  solveSet: S01jft4msfc47ypvxe6g3r3xs08[]
  updatedAt: string
  user: S01jft4msfck1qz3wmpzpp9v6xp
}

export interface S01jft4msfcgn94ztfahjg3j6g0 {
  id: number
  username: string
}

export interface S01jft4msfcgm21rbh695qc2kve {
  id: number
}

export interface S01jft4msfcfn1q0x9q5sjat638 {
  id: number
  name: string
  slug: string
}

export interface S01jft4msfcdt58n4hmnes9py33 {
  id: number
}

export interface S01jft4msfc47ypvxe6g3r3xs08 {
  extraId: number
  id: number
  isDnf: boolean
  scramble: S01jft4msfc0rv8pzr8xzfgm8nf
  submissionState: string
  timeMs: number
}

export interface S01jft4msfc1gmxrgfez1gz2wbj {
  endDate: string
  id: number
  slug: string
  startDate: string
}

export interface S01jft4msfc0rv8pzr8xzfgm8nf {
  id: number
  position: string
}

export interface S01jft4msfc0mz5m7ywgjay5rkd {
  isDisplayedSeparately: boolean
  page: number
  place: number
  roundSession: S01jft4msfcwy434w4t53vwtysq
}

export interface S01jft4msfbyxrexgqxxejhd4dm {
  id: number
  username: string
}

export interface S01jft4msfbwk7kqydk5znzwf10 {
  id: number
  moves: string
  position: string
}

export interface S01jft4msfbqb1a6n1z1zx1pmfa {
  id: number
  moves: string
}

export interface S01jft4msfbbgzhya7we2hy5j6b {
  id: number
  slug: string
}

export interface S01jft4msfb3be74zs04npd0ggg {
  id: number
  username: string
}

export interface S01jft4msfb29vkn64az2bz64hg {
  id: number
  slug: string
}

export interface S01jft4mseqhexnsa11pkce9xds {
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
