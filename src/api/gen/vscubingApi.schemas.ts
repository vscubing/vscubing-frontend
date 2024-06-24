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
  disciplineSlug?: string
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
   * contest slug
   */
  contestSlug: string
  /**
   * discipline slug
   */
  disciplineSlug: string
}

/**
 * Unspecified response body
 */
export type ContestsOngoingContestSubmitCreate200 = { [key: string]: unknown }

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

export type ContestsContestsLeaderboardRetrieveOrderBy =
  (typeof ContestsContestsLeaderboardRetrieveOrderBy)[keyof typeof ContestsContestsLeaderboardRetrieveOrderBy]

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ContestsContestsLeaderboardRetrieveOrderBy = {
  '-avg_ms': '-avg_ms',
  avg_ms: 'avg_ms',
} as const

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
   * order by something
   */
  orderBy?: ContestsContestsLeaderboardRetrieveOrderBy
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
  contest: S01j14ndtr41e8pae96g9kpsevc
  discipline: S01j14ndtr4kz81fv8krz3qg53k
  id: number
  isDnf: boolean
  reconstruction: string
  roundSession: S01j14ndtr41cdagnjjn40yx5jd
  scramble: S01j14ndtr4qse7mfhmbxmcbc3e
  submissionState: string
  timeMs: number
  user: S01j14ndtr4szevq96nyfhh8pe8
}

export interface ContestsSolveListBestInEveryDiscipline {
  contest: S01j14ndtr41faqtm2amwxk2p9z
  createdAt: string
  discipline: S01j14ndtr4k2hwyq2w43m0vyyt
  id: number
  scramble: S01j14ndtr4kb8vwahj8q82djxn
  timeMs: number
  user: S01j14ndtr4742d9424dehd8nr3
}

export interface ContestsSingleResultLeaderboardOutput {
  page: number
  pages: number
  pageSize: number
  results: S01j14ndtr7hr669y9f01eh7jmf
}

export interface ContestsRoundSessionWithSolvesListOutput {
  page: number
  pages: number
  pageSize: number
  results: S01j14ndtr5p924zr3jpdx0ggxc
}

export interface ContestsCurrentSolveOutput {
  currentSolve: S01j14ndtr69cbyzarjb6jre7yv
  submittedSolveSet?: S01j14ndtr6bvg8dphb4x16mtea[]
}

export interface ContestsCreateSolveOutput {
  createdAt: string
  id: number
  isDnf: boolean
  scramble: S01j14ndtr5c8wq3yzg27qr8nt9
  timeMs: number
}

export interface ContestsCreateSolveInput {
  isDnf: boolean
  reconstruction: string
  timeMs: number
}

export interface ContestsContestListOutput {
  page: number
  pages: number
  pageSize: number
  results: S01j14ndtr6be73xyrq6w74zb58[]
}

export interface AccountsGoogleLoginOutput {
  access: string
  refresh: string
  user: S01j14ndtqwey8mq41jbfrsa0n4
}

export interface AccountsGoogleLoginInput {
  code: string
}

export interface AccountsCurrentUserOutput {
  authCompleted: boolean
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

export interface S01j14ndtr7z147zkvwpggrsd9b {
  place?: number
  solve: S01j14ndtr7gre83zpncb9d24dh
}

export interface S01j14ndtr7hr669y9f01eh7jmf {
  ownResult: S01j14ndtr6s4e79htcmxrj0h9a
  solveSet: S01j14ndtr7z147zkvwpggrsd9b[]
}

export interface S01j14ndtr7gre83zpncb9d24dh {
  contest: S01j14ndtr63m4amfh8y4tr40nc
  id: number
  isDnf: boolean
  reconstruction: string
  scramble: S01j14ndtr6nv7b5dw0nvjr4vkp
  submissionState: string
  timeMs: number
  user: S01j14ndtr68vqweb8qysnqaxbh
}

export interface S01j14ndtr6y28ahb9rw4n5pn9f {
  id: number
  isDnf: boolean
  scramble: string
  timeMs: number
}

export interface S01j14ndtr6s4e79htcmxrj0h9a {
  isDisplayedSeparately?: boolean
  page?: number
  place?: number
  solve?: S01j14ndtr6kte7c4y38jc9qsap
}

export interface S01j14ndtr6q574ren2j3rs65sb {
  id: number
  isExtra: boolean
  moves: string
  position: string
}

export interface S01j14ndtr6nv7b5dw0nvjr4vkp {
  id: number
}

export interface S01j14ndtr6kte7c4y38jc9qsap {
  contest: S01j14ndtr66771ye7v8bfahapk
  id: number
  isDnf: boolean
  reconstruction: string
  submissionState: string
  timeMs: number
}

export interface S01j14ndtr6jm3x4e5tnmq614td {
  id: number
  isDnf: boolean
  scramble: string
  timeMs: number
}

export interface S01j14ndtr6bvg8dphb4x16mtea {
  solve: S01j14ndtr6y28ahb9rw4n5pn9f
}

export interface S01j14ndtr6be73xyrq6w74zb58 {
  endDate: string
  id: number
  name: string
  slug: string
  startDate: string
}

export interface S01j14ndtr69cbyzarjb6jre7yv {
  canChangeToExtra: boolean
  scramble: S01j14ndtr6q574ren2j3rs65sb
  solve: S01j14ndtr6jm3x4e5tnmq614td
}

export interface S01j14ndtr68vqweb8qysnqaxbh {
  id: number
  username: string
}

export interface S01j14ndtr66771ye7v8bfahapk {
  id: number
}

export interface S01j14ndtr63m4amfh8y4tr40nc {
  id: number
}

export interface S01j14ndtr5p924zr3jpdx0ggxc {
  ownResult: S01j14ndtr55yd5mna2jhxf0n0x
  roundSessionSet: S01j14ndtr551wpednq2gjbk8be[]
}

export interface S01j14ndtr5kz4095z9nfjf2yv7 {
  id: number
}

export interface S01j14ndtr5kcmh0fvee7799bpw {
  avgMs: number
  contest: S01j14ndtr51gf3njtxt0et82x7
  createdAt: string
  discipline: S01j14ndtr54z7xccrv7ka41x01
  id: number
  isDnf: boolean
  isFinished: boolean
  solveSet: S01j14ndtr55c1n28e008fqsj55[]
  updatedAt: string
  user: S01j14ndtr5809bm4gw80yfa3s0
}

export interface S01j14ndtr5hhms88s3z4qdphvp {
  extraId: number
  id: number
  isDnf: boolean
  submissionState: string
}

export interface S01j14ndtr5c8wq3yzg27qr8nt9 {
  id: number
  moves: string
}

export interface S01j14ndtr5bvr1xqbnjhjmetw4 {
  id: number
  username: string
}

export interface S01j14ndtr5809bm4gw80yfa3s0 {
  id: number
  username: string
}

export interface S01j14ndtr56vszjx6cb591wrfg {
  id: number
}

export interface S01j14ndtr55yd5mna2jhxf0n0x {
  isDisplayedSeparately?: boolean
  page?: number
  place?: number
  roundSession?: S01j14ndtr5kcmh0fvee7799bpw
}

export interface S01j14ndtr55c1n28e008fqsj55 {
  extraId: number
  id: number
  isDnf: boolean
  submissionState: string
}

export interface S01j14ndtr551wpednq2gjbk8be {
  place?: number
  roundSession: S01j14ndtr53nhfe7ktmrag3hgf
}

export interface S01j14ndtr54z7xccrv7ka41x01 {
  id: number
}

export interface S01j14ndtr53nhfe7ktmrag3hgf {
  avgMs: number
  contest: S01j14ndtr5kz4095z9nfjf2yv7
  createdAt: string
  discipline: S01j14ndtr56vszjx6cb591wrfg
  id: number
  isDnf: boolean
  isFinished: boolean
  solveSet: S01j14ndtr5hhms88s3z4qdphvp[]
  updatedAt: string
  user: S01j14ndtr5bvr1xqbnjhjmetw4
}

export interface S01j14ndtr51gf3njtxt0et82x7 {
  id: number
}

export interface S01j14ndtr4szevq96nyfhh8pe8 {
  id: number
}

export interface S01j14ndtr4qse7mfhmbxmcbc3e {
  id: number
}

export interface S01j14ndtr4kz81fv8krz3qg53k {
  id: number
}

export interface S01j14ndtr4kb8vwahj8q82djxn {
  id: number
  moves: string
}

export interface S01j14ndtr4k2hwyq2w43m0vyyt {
  id: number
  name: string
  slug: string
}

export interface S01j14ndtr4742d9424dehd8nr3 {
  id: number
  username: string
}

export interface S01j14ndtr41faqtm2amwxk2p9z {
  id: number
  name: string
  slug: string
}

export interface S01j14ndtr41e8pae96g9kpsevc {
  id: number
}

export interface S01j14ndtr41cdagnjjn40yx5jd {
  id: number
}

export interface S01j14ndtqwey8mq41jbfrsa0n4 {
  email: string
  pk: number
}

export interface OngoingContestRetrieve {
  id: number
  slug: string
}
