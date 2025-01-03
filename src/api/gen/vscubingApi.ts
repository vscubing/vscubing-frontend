/**
 * Generated by orval v6.27.1 🍺
 * Do not edit manually.
 * Vscubing Api
 * vscubing Api
 * OpenAPI spec version: 0.0.0
 */
import type {
  AccountsChangeUsernameInput,
  AccountsCurrentUserOutput,
  AccountsGoogleLoginInput,
  AccountsGoogleLoginOutput,
  ContestsContestListOutput,
  ContestsContestsLeaderboardRetrieveParams,
  ContestsContestsRetrieveParams,
  ContestsCreateSolveInput,
  ContestsCreateSolveOutput,
  ContestsCurrentSolveOutput,
  ContestsOngoingContestCurrentRoundSessionProgressRetrieveParams,
  ContestsOngoingContestSolveCreateCreateParams,
  ContestsOngoingContestSubmitCreateParams,
  ContestsRoundSessionWithSolvesListOutput,
  ContestsSingleResultLeaderboardOutput,
  ContestsSolveListBestInEveryDiscipline,
  ContestsSolveRetrieveOutput,
  ContestsSolvesSingleResultLeaderboardRetrieveParams,
  Input,
  OngoingContestRetrieve,
  Output,
  TokenRefresh,
} from './vscubingApi.schemas'
import accountsChangeUsernameUpdateMutator from '../axiosInstance'
import accountsCurrentUserRetrieveMutator from '../axiosInstance'
import accountsGoogleLoginCreateMutator from '../axiosInstance'
import accountsTokenRefreshCreateMutator from '../axiosInstance'
import contestsAvailableDisciplinesListMutator from '../axiosInstance'
import contestsContestsRetrieveMutator from '../axiosInstance'
import contestsContestsLeaderboardRetrieveMutator from '../axiosInstance'
import contestsDevNewContestCreateCreateMutator from '../axiosInstance'
import contestsDevOwnRoundSessionDeleteDestroyMutator from '../axiosInstance'
import contestsOngoingContestSubmitCreateMutator from '../axiosInstance'
import contestsOngoingContestCurrentRoundSessionProgressRetrieveMutator from '../axiosInstance'
import contestsOngoingContestRetrieveRetrieveMutator from '../axiosInstance'
import contestsOngoingContestSolveCreateCreateMutator from '../axiosInstance'
import contestsSolvesRetrieveRetrieveMutator from '../axiosInstance'
import contestsSolvesBestInEveryDisciplineListMutator from '../axiosInstance'
import contestsSolvesSingleResultLeaderboardRetrieveMutator from '../axiosInstance'

type IsAny<T> = 0 extends 1 & T ? true : false
type IsUnknown<T> = IsAny<T> extends true ? false : unknown extends T ? true : false
type Primitive = string | number | boolean | bigint | symbol | undefined | null
type isBuiltin = Primitive | Function | Date | Error | RegExp
type NonReadonly<T> =
  T extends Exclude<isBuiltin, Error>
    ? T
    : T extends Map<infer Key, infer Value>
      ? Map<NonReadonly<Key>, NonReadonly<Value>>
      : T extends ReadonlyMap<infer Key, infer Value>
        ? Map<NonReadonly<Key>, NonReadonly<Value>>
        : T extends WeakMap<infer Key, infer Value>
          ? WeakMap<NonReadonly<Key>, NonReadonly<Value>>
          : T extends Set<infer Values>
            ? Set<NonReadonly<Values>>
            : T extends ReadonlySet<infer Values>
              ? Set<NonReadonly<Values>>
              : T extends WeakSet<infer Values>
                ? WeakSet<NonReadonly<Values>>
                : T extends Promise<infer Value>
                  ? Promise<NonReadonly<Value>>
                  : T extends {}
                    ? { -readonly [Key in keyof T]: NonReadonly<T[Key]> }
                    : IsUnknown<T> extends true
                      ? unknown
                      : T

export const accountsChangeUsernameUpdate = (accountsChangeUsernameInput: AccountsChangeUsernameInput) => {
  const formUrlEncoded = new URLSearchParams()
  formUrlEncoded.append('username', accountsChangeUsernameInput.username)

  return accountsChangeUsernameUpdateMutator<void>({
    url: `/api/accounts/change-username/`,
    method: 'PUT',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: formUrlEncoded,
  })
}

export const accountsCurrentUserRetrieve = () => {
  return accountsCurrentUserRetrieveMutator<AccountsCurrentUserOutput>({
    url: `/api/accounts/current-user/`,
    method: 'GET',
  })
}

/**
 * class used for social authentications
example usage for facebook with access_token
-------------
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter

class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter
-------------

example usage for facebook with code

-------------
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client

class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter
    client_class = OAuth2Client
    callback_url = 'localhost:8000'
-------------
 */
export const accountsGoogleLoginCreate = (accountsGoogleLoginInput: AccountsGoogleLoginInput) => {
  const formUrlEncoded = new URLSearchParams()
  formUrlEncoded.append('code', accountsGoogleLoginInput.code)

  return accountsGoogleLoginCreateMutator<AccountsGoogleLoginOutput>({
    url: `/api/accounts/google/login/`,
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: formUrlEncoded,
  })
}

/**
 * Takes a refresh type JSON web token and returns an access type JSON web
token if the refresh token is valid.
 */
export const accountsTokenRefreshCreate = (tokenRefresh: NonReadonly<TokenRefresh>) => {
  const formUrlEncoded = new URLSearchParams()
  formUrlEncoded.append('access', tokenRefresh.access)
  formUrlEncoded.append('refresh', tokenRefresh.refresh)

  return accountsTokenRefreshCreateMutator<TokenRefresh>({
    url: `/api/accounts/token/refresh/`,
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: formUrlEncoded,
  })
}

export const contestsAvailableDisciplinesList = () => {
  return contestsAvailableDisciplinesListMutator<Output[]>({
    url: `/api/contests/available_disciplines/`,
    method: 'GET',
  })
}

export const contestsContestsRetrieve = (params: ContestsContestsRetrieveParams) => {
  return contestsContestsRetrieveMutator<ContestsContestListOutput>({
    url: `/api/contests/contests/`,
    method: 'GET',
    params,
  })
}

export const contestsContestsLeaderboardRetrieve = (params: ContestsContestsLeaderboardRetrieveParams) => {
  return contestsContestsLeaderboardRetrieveMutator<ContestsRoundSessionWithSolvesListOutput>({
    url: `/api/contests/contests/leaderboard/`,
    method: 'GET',
    params,
  })
}

export const contestsDevNewContestCreateCreate = () => {
  return contestsDevNewContestCreateCreateMutator<void>({
    url: `/api/contests/dev/new-contest/create/`,
    method: 'POST',
  })
}

export const contestsDevOwnRoundSessionDeleteDestroy = () => {
  return contestsDevOwnRoundSessionDeleteDestroyMutator<void>({
    url: `/api/contests/dev/own-round-session/delete/`,
    method: 'DELETE',
  })
}

export const contestsOngoingContestSubmitCreate = (
  solveId: number,
  input: Input,
  params: ContestsOngoingContestSubmitCreateParams,
) => {
  const formUrlEncoded = new URLSearchParams()
  formUrlEncoded.append('idDnf', input.idDnf.toString())

  return contestsOngoingContestSubmitCreateMutator<void>({
    url: `/api/contests/ongoing-contest/${solveId}/submit/`,
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: formUrlEncoded,
    params,
  })
}

export const contestsOngoingContestCurrentRoundSessionProgressRetrieve = (
  params: ContestsOngoingContestCurrentRoundSessionProgressRetrieveParams,
) => {
  return contestsOngoingContestCurrentRoundSessionProgressRetrieveMutator<ContestsCurrentSolveOutput>({
    url: `/api/contests/ongoing-contest/current-round-session-progress/`,
    method: 'GET',
    params,
  })
}

export const contestsOngoingContestRetrieveRetrieve = () => {
  return contestsOngoingContestRetrieveRetrieveMutator<OngoingContestRetrieve>({
    url: `/api/contests/ongoing-contest/retrieve/`,
    method: 'GET',
  })
}

export const contestsOngoingContestSolveCreateCreate = (
  contestsCreateSolveInput: ContestsCreateSolveInput,
  params: ContestsOngoingContestSolveCreateCreateParams,
) => {
  const formUrlEncoded = new URLSearchParams()
  if (contestsCreateSolveInput.reconstruction !== undefined) {
    formUrlEncoded.append('reconstruction', contestsCreateSolveInput.reconstruction)
  }
  formUrlEncoded.append('isDnf', contestsCreateSolveInput.isDnf.toString())
  if (contestsCreateSolveInput.timeMs !== undefined) {
    formUrlEncoded.append('timeMs', contestsCreateSolveInput.timeMs.toString())
  }

  return contestsOngoingContestSolveCreateCreateMutator<ContestsCreateSolveOutput>({
    url: `/api/contests/ongoing-contest/solve/create/`,
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: formUrlEncoded,
    params,
  })
}

export const contestsSolvesRetrieveRetrieve = (id: number) => {
  return contestsSolvesRetrieveRetrieveMutator<ContestsSolveRetrieveOutput>({
    url: `/api/contests/solves/${id}/retrieve/`,
    method: 'GET',
  })
}

export const contestsSolvesBestInEveryDisciplineList = () => {
  return contestsSolvesBestInEveryDisciplineListMutator<ContestsSolveListBestInEveryDiscipline[]>({
    url: `/api/contests/solves/best-in-every-discipline/`,
    method: 'GET',
  })
}

export const contestsSolvesSingleResultLeaderboardRetrieve = (
  params: ContestsSolvesSingleResultLeaderboardRetrieveParams,
) => {
  return contestsSolvesSingleResultLeaderboardRetrieveMutator<ContestsSingleResultLeaderboardOutput>({
    url: `/api/contests/solves/single-result-leaderboard`,
    method: 'GET',
    params,
  })
}

export type AccountsChangeUsernameUpdateResult = NonNullable<Awaited<ReturnType<typeof accountsChangeUsernameUpdate>>>
export type AccountsCurrentUserRetrieveResult = NonNullable<Awaited<ReturnType<typeof accountsCurrentUserRetrieve>>>
export type AccountsGoogleLoginCreateResult = NonNullable<Awaited<ReturnType<typeof accountsGoogleLoginCreate>>>
export type AccountsTokenRefreshCreateResult = NonNullable<Awaited<ReturnType<typeof accountsTokenRefreshCreate>>>
export type ContestsAvailableDisciplinesListResult = NonNullable<
  Awaited<ReturnType<typeof contestsAvailableDisciplinesList>>
>
export type ContestsContestsRetrieveResult = NonNullable<Awaited<ReturnType<typeof contestsContestsRetrieve>>>
export type ContestsContestsLeaderboardRetrieveResult = NonNullable<
  Awaited<ReturnType<typeof contestsContestsLeaderboardRetrieve>>
>
export type ContestsDevNewContestCreateCreateResult = NonNullable<
  Awaited<ReturnType<typeof contestsDevNewContestCreateCreate>>
>
export type ContestsDevOwnRoundSessionDeleteDestroyResult = NonNullable<
  Awaited<ReturnType<typeof contestsDevOwnRoundSessionDeleteDestroy>>
>
export type ContestsOngoingContestSubmitCreateResult = NonNullable<
  Awaited<ReturnType<typeof contestsOngoingContestSubmitCreate>>
>
export type ContestsOngoingContestCurrentRoundSessionProgressRetrieveResult = NonNullable<
  Awaited<ReturnType<typeof contestsOngoingContestCurrentRoundSessionProgressRetrieve>>
>
export type ContestsOngoingContestRetrieveRetrieveResult = NonNullable<
  Awaited<ReturnType<typeof contestsOngoingContestRetrieveRetrieve>>
>
export type ContestsOngoingContestSolveCreateCreateResult = NonNullable<
  Awaited<ReturnType<typeof contestsOngoingContestSolveCreateCreate>>
>
export type ContestsSolvesRetrieveRetrieveResult = NonNullable<
  Awaited<ReturnType<typeof contestsSolvesRetrieveRetrieve>>
>
export type ContestsSolvesBestInEveryDisciplineListResult = NonNullable<
  Awaited<ReturnType<typeof contestsSolvesBestInEveryDisciplineList>>
>
export type ContestsSolvesSingleResultLeaderboardRetrieveResult = NonNullable<
  Awaited<ReturnType<typeof contestsSolvesSingleResultLeaderboardRetrieve>>
>
