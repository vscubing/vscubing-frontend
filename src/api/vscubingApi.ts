/**
 * Generated by orval v6.27.1 🍺
 * Do not edit manually.
 * Vscubing Api
 * vscubing Api
 * OpenAPI spec version: 0.0.0
 */
import { useMutation, useQuery } from '@tanstack/react-query'
import type {
  MutationFunction,
  QueryFunction,
  QueryKey,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query'
import type {
  ContestsContestsRetrieveParams,
  ContestsOngoingContestCurrentSolveRetrieveParams,
  ContestsOngoingContestSubmittedSolvesRetrieveParams,
  ContestsRoundSessionWithSolvesListOutput,
  ContestsRoundSessionsWithSolvesRetrieveParams,
  ContestsSolveCreateOutput,
  ContestsSolvesBestOfEveryUserRetrieveParams,
  ContestsSolvesCreateCreateBodyOne,
  ContestsSolvesCreateCreateBodyThree,
  ContestsSolvesCreateCreateBodyTwo,
  ContestsSolvesCreateCreateParams,
  Output,
  SocialLogin,
  TokenRefresh,
} from './vscubingApi.schemas'
import { axiosInstance } from '../lib/orval.axiosInstance'
import type { ErrorType } from '../lib/orval.axiosInstance'

type IsAny<T> = 0 extends 1 & T ? true : false
type IsUnknown<T> = IsAny<T> extends true ? false : unknown extends T ? true : false
type Primitive = string | number | boolean | bigint | symbol | undefined | null
type isBuiltin = Primitive | Function | Date | Error | RegExp
type NonReadonly<T> = T extends Exclude<isBuiltin, Error>
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

export const accountsChangeUsernameUpdate = () => {
  return axiosInstance<void>({ url: `/api/accounts/change-username/`, method: 'PUT' })
}

export const getAccountsChangeUsernameUpdateMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof accountsChangeUsernameUpdate>>, TError, void, TContext>
}): UseMutationOptions<Awaited<ReturnType<typeof accountsChangeUsernameUpdate>>, TError, void, TContext> => {
  const { mutation: mutationOptions } = options ?? {}

  const mutationFn: MutationFunction<Awaited<ReturnType<typeof accountsChangeUsernameUpdate>>, void> = () => {
    return accountsChangeUsernameUpdate()
  }

  return { mutationFn, ...mutationOptions }
}

export type AccountsChangeUsernameUpdateMutationResult = NonNullable<
  Awaited<ReturnType<typeof accountsChangeUsernameUpdate>>
>

export type AccountsChangeUsernameUpdateMutationError = ErrorType<unknown>

export const useAccountsChangeUsernameUpdate = <TError = ErrorType<unknown>, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof accountsChangeUsernameUpdate>>, TError, void, TContext>
}): UseMutationResult<Awaited<ReturnType<typeof accountsChangeUsernameUpdate>>, TError, void, TContext> => {
  const mutationOptions = getAccountsChangeUsernameUpdateMutationOptions(options)

  return useMutation(mutationOptions)
}

export const accountsCurrentUserRetrieve = (signal?: AbortSignal) => {
  return axiosInstance<void>({ url: `/api/accounts/current-user/`, method: 'GET', signal })
}

export const getAccountsCurrentUserRetrieveQueryKey = () => {
  return [`/api/accounts/current-user/`] as const
}

export const getAccountsCurrentUserRetrieveQueryOptions = <
  TData = Awaited<ReturnType<typeof accountsCurrentUserRetrieve>>,
  TError = ErrorType<unknown>,
>(options?: {
  query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof accountsCurrentUserRetrieve>>, TError, TData>>
}) => {
  const { query: queryOptions } = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getAccountsCurrentUserRetrieveQueryKey()

  const queryFn: QueryFunction<Awaited<ReturnType<typeof accountsCurrentUserRetrieve>>> = ({ signal }) =>
    accountsCurrentUserRetrieve(signal)

  return {
    queryKey,
    queryFn,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: Infinity,
    retry: (_, err) => {
      var _a, _b, _c, _d
      return (
        ((_a = err == null ? void 0 : err.response) == null ? void 0 : _a.status) !== 403 &&
        ((_b = err == null ? void 0 : err.response) == null ? void 0 : _b.status) !== 401 &&
        ((_c = err == null ? void 0 : err.response) == null ? void 0 : _c.status) !== 404 &&
        ((_d = err == null ? void 0 : err.response) == null ? void 0 : _d.status) !== 400
      )
    },
    ...queryOptions,
  } as UseQueryOptions<Awaited<ReturnType<typeof accountsCurrentUserRetrieve>>, TError, TData> & { queryKey: QueryKey }
}

export type AccountsCurrentUserRetrieveQueryResult = NonNullable<
  Awaited<ReturnType<typeof accountsCurrentUserRetrieve>>
>
export type AccountsCurrentUserRetrieveQueryError = ErrorType<unknown>

export const useAccountsCurrentUserRetrieve = <
  TData = Awaited<ReturnType<typeof accountsCurrentUserRetrieve>>,
  TError = ErrorType<unknown>,
>(options?: {
  query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof accountsCurrentUserRetrieve>>, TError, TData>>
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getAccountsCurrentUserRetrieveQueryOptions(options)

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

  query.queryKey = queryOptions.queryKey

  return query
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
export const accountsGoogleLoginCreate = (socialLogin: SocialLogin) => {
  const formUrlEncoded = new URLSearchParams()
  if (socialLogin.accessToken !== undefined) {
    formUrlEncoded.append('accessToken', socialLogin.accessToken)
  }
  if (socialLogin.code !== undefined) {
    formUrlEncoded.append('code', socialLogin.code)
  }
  if (socialLogin.idToken !== undefined) {
    formUrlEncoded.append('idToken', socialLogin.idToken)
  }

  return axiosInstance<SocialLogin>({
    url: `/api/accounts/google/login/`,
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: formUrlEncoded,
  })
}

export const getAccountsGoogleLoginCreateMutationOptions = <TError = ErrorType<unknown>, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof accountsGoogleLoginCreate>>,
    TError,
    { data: SocialLogin },
    TContext
  >
}): UseMutationOptions<
  Awaited<ReturnType<typeof accountsGoogleLoginCreate>>,
  TError,
  { data: SocialLogin },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {}

  const mutationFn: MutationFunction<Awaited<ReturnType<typeof accountsGoogleLoginCreate>>, { data: SocialLogin }> = (
    props,
  ) => {
    const { data } = props ?? {}

    return accountsGoogleLoginCreate(data)
  }

  return { mutationFn, ...mutationOptions }
}

export type AccountsGoogleLoginCreateMutationResult = NonNullable<Awaited<ReturnType<typeof accountsGoogleLoginCreate>>>
export type AccountsGoogleLoginCreateMutationBody = SocialLogin
export type AccountsGoogleLoginCreateMutationError = ErrorType<unknown>

export const useAccountsGoogleLoginCreate = <TError = ErrorType<unknown>, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof accountsGoogleLoginCreate>>,
    TError,
    { data: SocialLogin },
    TContext
  >
}): UseMutationResult<
  Awaited<ReturnType<typeof accountsGoogleLoginCreate>>,
  TError,
  { data: SocialLogin },
  TContext
> => {
  const mutationOptions = getAccountsGoogleLoginCreateMutationOptions(options)

  return useMutation(mutationOptions)
}

/**
 * Takes a refresh type JSON web token and returns an access type JSON web
token if the refresh token is valid.
 */
export const accountsTokenRefreshCreate = (tokenRefresh: NonReadonly<TokenRefresh>) => {
  const formUrlEncoded = new URLSearchParams()
  formUrlEncoded.append('access', tokenRefresh.access)
  formUrlEncoded.append('refresh', tokenRefresh.refresh)

  return axiosInstance<TokenRefresh>({
    url: `/api/accounts/token/refresh/`,
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: formUrlEncoded,
  })
}

export const getAccountsTokenRefreshCreateMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof accountsTokenRefreshCreate>>,
    TError,
    { data: NonReadonly<TokenRefresh> },
    TContext
  >
}): UseMutationOptions<
  Awaited<ReturnType<typeof accountsTokenRefreshCreate>>,
  TError,
  { data: NonReadonly<TokenRefresh> },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {}

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof accountsTokenRefreshCreate>>,
    { data: NonReadonly<TokenRefresh> }
  > = (props) => {
    const { data } = props ?? {}

    return accountsTokenRefreshCreate(data)
  }

  return { mutationFn, ...mutationOptions }
}

export type AccountsTokenRefreshCreateMutationResult = NonNullable<
  Awaited<ReturnType<typeof accountsTokenRefreshCreate>>
>
export type AccountsTokenRefreshCreateMutationBody = NonReadonly<TokenRefresh>
export type AccountsTokenRefreshCreateMutationError = ErrorType<unknown>

export const useAccountsTokenRefreshCreate = <TError = ErrorType<unknown>, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof accountsTokenRefreshCreate>>,
    TError,
    { data: NonReadonly<TokenRefresh> },
    TContext
  >
}): UseMutationResult<
  Awaited<ReturnType<typeof accountsTokenRefreshCreate>>,
  TError,
  { data: NonReadonly<TokenRefresh> },
  TContext
> => {
  const mutationOptions = getAccountsTokenRefreshCreateMutationOptions(options)

  return useMutation(mutationOptions)
}

export const contestsContestsRetrieve = (params?: ContestsContestsRetrieveParams, signal?: AbortSignal) => {
  return axiosInstance<Output>({ url: `/api/contests/contests/`, method: 'GET', params, signal })
}

export const getContestsContestsRetrieveQueryKey = (params?: ContestsContestsRetrieveParams) => {
  return [`/api/contests/contests/`, ...(params ? [params] : [])] as const
}

export const getContestsContestsRetrieveQueryOptions = <
  TData = Awaited<ReturnType<typeof contestsContestsRetrieve>>,
  TError = ErrorType<unknown>,
>(
  params?: ContestsContestsRetrieveParams,
  options?: { query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof contestsContestsRetrieve>>, TError, TData>> },
) => {
  const { query: queryOptions } = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getContestsContestsRetrieveQueryKey(params)

  const queryFn: QueryFunction<Awaited<ReturnType<typeof contestsContestsRetrieve>>> = ({ signal }) =>
    contestsContestsRetrieve(params, signal)

  return {
    queryKey,
    queryFn,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: Infinity,
    retry: (_, err) => {
      var _a, _b, _c, _d
      return (
        ((_a = err == null ? void 0 : err.response) == null ? void 0 : _a.status) !== 403 &&
        ((_b = err == null ? void 0 : err.response) == null ? void 0 : _b.status) !== 401 &&
        ((_c = err == null ? void 0 : err.response) == null ? void 0 : _c.status) !== 404 &&
        ((_d = err == null ? void 0 : err.response) == null ? void 0 : _d.status) !== 400
      )
    },
    ...queryOptions,
  } as UseQueryOptions<Awaited<ReturnType<typeof contestsContestsRetrieve>>, TError, TData> & { queryKey: QueryKey }
}

export type ContestsContestsRetrieveQueryResult = NonNullable<Awaited<ReturnType<typeof contestsContestsRetrieve>>>
export type ContestsContestsRetrieveQueryError = ErrorType<unknown>

export const useContestsContestsRetrieve = <
  TData = Awaited<ReturnType<typeof contestsContestsRetrieve>>,
  TError = ErrorType<unknown>,
>(
  params?: ContestsContestsRetrieveParams,
  options?: { query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof contestsContestsRetrieve>>, TError, TData>> },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getContestsContestsRetrieveQueryOptions(params, options)

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

  query.queryKey = queryOptions.queryKey

  return query
}

export const contestsOngoingContestCurrentSolveRetrieve = (
  params: ContestsOngoingContestCurrentSolveRetrieveParams,
  signal?: AbortSignal,
) => {
  return axiosInstance<Output>({ url: `/api/contests/ongoing-contest/current-solve/`, method: 'GET', params, signal })
}

export const getContestsOngoingContestCurrentSolveRetrieveQueryKey = (
  params: ContestsOngoingContestCurrentSolveRetrieveParams,
) => {
  return [`/api/contests/ongoing-contest/current-solve/`, ...(params ? [params] : [])] as const
}

export const getContestsOngoingContestCurrentSolveRetrieveQueryOptions = <
  TData = Awaited<ReturnType<typeof contestsOngoingContestCurrentSolveRetrieve>>,
  TError = ErrorType<unknown>,
>(
  params: ContestsOngoingContestCurrentSolveRetrieveParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof contestsOngoingContestCurrentSolveRetrieve>>, TError, TData>
    >
  },
) => {
  const { query: queryOptions } = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getContestsOngoingContestCurrentSolveRetrieveQueryKey(params)

  const queryFn: QueryFunction<Awaited<ReturnType<typeof contestsOngoingContestCurrentSolveRetrieve>>> = ({ signal }) =>
    contestsOngoingContestCurrentSolveRetrieve(params, signal)

  return {
    queryKey,
    queryFn,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: Infinity,
    retry: (_, err) => {
      var _a, _b, _c, _d
      return (
        ((_a = err == null ? void 0 : err.response) == null ? void 0 : _a.status) !== 403 &&
        ((_b = err == null ? void 0 : err.response) == null ? void 0 : _b.status) !== 401 &&
        ((_c = err == null ? void 0 : err.response) == null ? void 0 : _c.status) !== 404 &&
        ((_d = err == null ? void 0 : err.response) == null ? void 0 : _d.status) !== 400
      )
    },
    ...queryOptions,
  } as UseQueryOptions<Awaited<ReturnType<typeof contestsOngoingContestCurrentSolveRetrieve>>, TError, TData> & {
    queryKey: QueryKey
  }
}

export type ContestsOngoingContestCurrentSolveRetrieveQueryResult = NonNullable<
  Awaited<ReturnType<typeof contestsOngoingContestCurrentSolveRetrieve>>
>
export type ContestsOngoingContestCurrentSolveRetrieveQueryError = ErrorType<unknown>

export const useContestsOngoingContestCurrentSolveRetrieve = <
  TData = Awaited<ReturnType<typeof contestsOngoingContestCurrentSolveRetrieve>>,
  TError = ErrorType<unknown>,
>(
  params: ContestsOngoingContestCurrentSolveRetrieveParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof contestsOngoingContestCurrentSolveRetrieve>>, TError, TData>
    >
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getContestsOngoingContestCurrentSolveRetrieveQueryOptions(params, options)

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

  query.queryKey = queryOptions.queryKey

  return query
}

export const contestsOngoingContestRetrieveRetrieve = (signal?: AbortSignal) => {
  return axiosInstance<void>({ url: `/api/contests/ongoing-contest/retrieve/`, method: 'GET', signal })
}

export const getContestsOngoingContestRetrieveRetrieveQueryKey = () => {
  return [`/api/contests/ongoing-contest/retrieve/`] as const
}

export const getContestsOngoingContestRetrieveRetrieveQueryOptions = <
  TData = Awaited<ReturnType<typeof contestsOngoingContestRetrieveRetrieve>>,
  TError = ErrorType<unknown>,
>(options?: {
  query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof contestsOngoingContestRetrieveRetrieve>>, TError, TData>>
}) => {
  const { query: queryOptions } = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getContestsOngoingContestRetrieveRetrieveQueryKey()

  const queryFn: QueryFunction<Awaited<ReturnType<typeof contestsOngoingContestRetrieveRetrieve>>> = ({ signal }) =>
    contestsOngoingContestRetrieveRetrieve(signal)

  return {
    queryKey,
    queryFn,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: Infinity,
    retry: (_, err) => {
      var _a, _b, _c, _d
      return (
        ((_a = err == null ? void 0 : err.response) == null ? void 0 : _a.status) !== 403 &&
        ((_b = err == null ? void 0 : err.response) == null ? void 0 : _b.status) !== 401 &&
        ((_c = err == null ? void 0 : err.response) == null ? void 0 : _c.status) !== 404 &&
        ((_d = err == null ? void 0 : err.response) == null ? void 0 : _d.status) !== 400
      )
    },
    ...queryOptions,
  } as UseQueryOptions<Awaited<ReturnType<typeof contestsOngoingContestRetrieveRetrieve>>, TError, TData> & {
    queryKey: QueryKey
  }
}

export type ContestsOngoingContestRetrieveRetrieveQueryResult = NonNullable<
  Awaited<ReturnType<typeof contestsOngoingContestRetrieveRetrieve>>
>
export type ContestsOngoingContestRetrieveRetrieveQueryError = ErrorType<unknown>

export const useContestsOngoingContestRetrieveRetrieve = <
  TData = Awaited<ReturnType<typeof contestsOngoingContestRetrieveRetrieve>>,
  TError = ErrorType<unknown>,
>(options?: {
  query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof contestsOngoingContestRetrieveRetrieve>>, TError, TData>>
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getContestsOngoingContestRetrieveRetrieveQueryOptions(options)

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

  query.queryKey = queryOptions.queryKey

  return query
}

export const contestsOngoingContestSubmittedSolvesRetrieve = (
  params: ContestsOngoingContestSubmittedSolvesRetrieveParams,
  signal?: AbortSignal,
) => {
  return axiosInstance<Output>({
    url: `/api/contests/ongoing-contest/submitted-solves/`,
    method: 'GET',
    params,
    signal,
  })
}

export const getContestsOngoingContestSubmittedSolvesRetrieveQueryKey = (
  params: ContestsOngoingContestSubmittedSolvesRetrieveParams,
) => {
  return [`/api/contests/ongoing-contest/submitted-solves/`, ...(params ? [params] : [])] as const
}

export const getContestsOngoingContestSubmittedSolvesRetrieveQueryOptions = <
  TData = Awaited<ReturnType<typeof contestsOngoingContestSubmittedSolvesRetrieve>>,
  TError = ErrorType<unknown>,
>(
  params: ContestsOngoingContestSubmittedSolvesRetrieveParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof contestsOngoingContestSubmittedSolvesRetrieve>>, TError, TData>
    >
  },
) => {
  const { query: queryOptions } = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getContestsOngoingContestSubmittedSolvesRetrieveQueryKey(params)

  const queryFn: QueryFunction<Awaited<ReturnType<typeof contestsOngoingContestSubmittedSolvesRetrieve>>> = ({
    signal,
  }) => contestsOngoingContestSubmittedSolvesRetrieve(params, signal)

  return {
    queryKey,
    queryFn,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: Infinity,
    retry: (_, err) => {
      var _a, _b, _c, _d
      return (
        ((_a = err == null ? void 0 : err.response) == null ? void 0 : _a.status) !== 403 &&
        ((_b = err == null ? void 0 : err.response) == null ? void 0 : _b.status) !== 401 &&
        ((_c = err == null ? void 0 : err.response) == null ? void 0 : _c.status) !== 404 &&
        ((_d = err == null ? void 0 : err.response) == null ? void 0 : _d.status) !== 400
      )
    },
    ...queryOptions,
  } as UseQueryOptions<Awaited<ReturnType<typeof contestsOngoingContestSubmittedSolvesRetrieve>>, TError, TData> & {
    queryKey: QueryKey
  }
}

export type ContestsOngoingContestSubmittedSolvesRetrieveQueryResult = NonNullable<
  Awaited<ReturnType<typeof contestsOngoingContestSubmittedSolvesRetrieve>>
>
export type ContestsOngoingContestSubmittedSolvesRetrieveQueryError = ErrorType<unknown>

export const useContestsOngoingContestSubmittedSolvesRetrieve = <
  TData = Awaited<ReturnType<typeof contestsOngoingContestSubmittedSolvesRetrieve>>,
  TError = ErrorType<unknown>,
>(
  params: ContestsOngoingContestSubmittedSolvesRetrieveParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof contestsOngoingContestSubmittedSolvesRetrieve>>, TError, TData>
    >
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getContestsOngoingContestSubmittedSolvesRetrieveQueryOptions(params, options)

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

  query.queryKey = queryOptions.queryKey

  return query
}

export const contestsRoundSessionsWithSolvesRetrieve = (
  params: ContestsRoundSessionsWithSolvesRetrieveParams,
  signal?: AbortSignal,
) => {
  return axiosInstance<ContestsRoundSessionWithSolvesListOutput>({
    url: `/api/contests/round-sessions/with-solves/`,
    method: 'GET',
    params,
    signal,
  })
}

export const getContestsRoundSessionsWithSolvesRetrieveQueryKey = (
  params: ContestsRoundSessionsWithSolvesRetrieveParams,
) => {
  return [`/api/contests/round-sessions/with-solves/`, ...(params ? [params] : [])] as const
}

export const getContestsRoundSessionsWithSolvesRetrieveQueryOptions = <
  TData = Awaited<ReturnType<typeof contestsRoundSessionsWithSolvesRetrieve>>,
  TError = ErrorType<unknown>,
>(
  params: ContestsRoundSessionsWithSolvesRetrieveParams,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof contestsRoundSessionsWithSolvesRetrieve>>, TError, TData>>
  },
) => {
  const { query: queryOptions } = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getContestsRoundSessionsWithSolvesRetrieveQueryKey(params)

  const queryFn: QueryFunction<Awaited<ReturnType<typeof contestsRoundSessionsWithSolvesRetrieve>>> = ({ signal }) =>
    contestsRoundSessionsWithSolvesRetrieve(params, signal)

  return {
    queryKey,
    queryFn,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: Infinity,
    retry: (_, err) => {
      var _a, _b, _c, _d
      return (
        ((_a = err == null ? void 0 : err.response) == null ? void 0 : _a.status) !== 403 &&
        ((_b = err == null ? void 0 : err.response) == null ? void 0 : _b.status) !== 401 &&
        ((_c = err == null ? void 0 : err.response) == null ? void 0 : _c.status) !== 404 &&
        ((_d = err == null ? void 0 : err.response) == null ? void 0 : _d.status) !== 400
      )
    },
    ...queryOptions,
  } as UseQueryOptions<Awaited<ReturnType<typeof contestsRoundSessionsWithSolvesRetrieve>>, TError, TData> & {
    queryKey: QueryKey
  }
}

export type ContestsRoundSessionsWithSolvesRetrieveQueryResult = NonNullable<
  Awaited<ReturnType<typeof contestsRoundSessionsWithSolvesRetrieve>>
>
export type ContestsRoundSessionsWithSolvesRetrieveQueryError = ErrorType<unknown>

export const useContestsRoundSessionsWithSolvesRetrieve = <
  TData = Awaited<ReturnType<typeof contestsRoundSessionsWithSolvesRetrieve>>,
  TError = ErrorType<unknown>,
>(
  params: ContestsRoundSessionsWithSolvesRetrieveParams,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof contestsRoundSessionsWithSolvesRetrieve>>, TError, TData>>
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getContestsRoundSessionsWithSolvesRetrieveQueryOptions(params, options)

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

  query.queryKey = queryOptions.queryKey

  return query
}

export const contestsSolvesRetrieveRetrieve = (id: number, signal?: AbortSignal) => {
  return axiosInstance<Output>({ url: `/api/contests/solves/${id}/retrieve/`, method: 'GET', signal })
}

export const getContestsSolvesRetrieveRetrieveQueryKey = (id: number) => {
  return [`/api/contests/solves/${id}/retrieve/`] as const
}

export const getContestsSolvesRetrieveRetrieveQueryOptions = <
  TData = Awaited<ReturnType<typeof contestsSolvesRetrieveRetrieve>>,
  TError = ErrorType<unknown>,
>(
  id: number,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof contestsSolvesRetrieveRetrieve>>, TError, TData>>
  },
) => {
  const { query: queryOptions } = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getContestsSolvesRetrieveRetrieveQueryKey(id)

  const queryFn: QueryFunction<Awaited<ReturnType<typeof contestsSolvesRetrieveRetrieve>>> = ({ signal }) =>
    contestsSolvesRetrieveRetrieve(id, signal)

  return {
    queryKey,
    queryFn,
    enabled: !!id,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: Infinity,
    retry: (_, err) => {
      var _a, _b, _c, _d
      return (
        ((_a = err == null ? void 0 : err.response) == null ? void 0 : _a.status) !== 403 &&
        ((_b = err == null ? void 0 : err.response) == null ? void 0 : _b.status) !== 401 &&
        ((_c = err == null ? void 0 : err.response) == null ? void 0 : _c.status) !== 404 &&
        ((_d = err == null ? void 0 : err.response) == null ? void 0 : _d.status) !== 400
      )
    },
    ...queryOptions,
  } as UseQueryOptions<Awaited<ReturnType<typeof contestsSolvesRetrieveRetrieve>>, TError, TData> & {
    queryKey: QueryKey
  }
}

export type ContestsSolvesRetrieveRetrieveQueryResult = NonNullable<
  Awaited<ReturnType<typeof contestsSolvesRetrieveRetrieve>>
>
export type ContestsSolvesRetrieveRetrieveQueryError = ErrorType<unknown>

export const useContestsSolvesRetrieveRetrieve = <
  TData = Awaited<ReturnType<typeof contestsSolvesRetrieveRetrieve>>,
  TError = ErrorType<unknown>,
>(
  id: number,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof contestsSolvesRetrieveRetrieve>>, TError, TData>>
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getContestsSolvesRetrieveRetrieveQueryOptions(id, options)

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

  query.queryKey = queryOptions.queryKey

  return query
}

export const contestsSolvesBestInEveryDisciplineRetrieve = (signal?: AbortSignal) => {
  return axiosInstance<Output>({ url: `/api/contests/solves/best-in-every-discipline/`, method: 'GET', signal })
}

export const getContestsSolvesBestInEveryDisciplineRetrieveQueryKey = () => {
  return [`/api/contests/solves/best-in-every-discipline/`] as const
}

export const getContestsSolvesBestInEveryDisciplineRetrieveQueryOptions = <
  TData = Awaited<ReturnType<typeof contestsSolvesBestInEveryDisciplineRetrieve>>,
  TError = ErrorType<unknown>,
>(options?: {
  query?: Partial<
    UseQueryOptions<Awaited<ReturnType<typeof contestsSolvesBestInEveryDisciplineRetrieve>>, TError, TData>
  >
}) => {
  const { query: queryOptions } = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getContestsSolvesBestInEveryDisciplineRetrieveQueryKey()

  const queryFn: QueryFunction<Awaited<ReturnType<typeof contestsSolvesBestInEveryDisciplineRetrieve>>> = ({
    signal,
  }) => contestsSolvesBestInEveryDisciplineRetrieve(signal)

  return {
    queryKey,
    queryFn,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: Infinity,
    retry: (_, err) => {
      var _a, _b, _c, _d
      return (
        ((_a = err == null ? void 0 : err.response) == null ? void 0 : _a.status) !== 403 &&
        ((_b = err == null ? void 0 : err.response) == null ? void 0 : _b.status) !== 401 &&
        ((_c = err == null ? void 0 : err.response) == null ? void 0 : _c.status) !== 404 &&
        ((_d = err == null ? void 0 : err.response) == null ? void 0 : _d.status) !== 400
      )
    },
    ...queryOptions,
  } as UseQueryOptions<Awaited<ReturnType<typeof contestsSolvesBestInEveryDisciplineRetrieve>>, TError, TData> & {
    queryKey: QueryKey
  }
}

export type ContestsSolvesBestInEveryDisciplineRetrieveQueryResult = NonNullable<
  Awaited<ReturnType<typeof contestsSolvesBestInEveryDisciplineRetrieve>>
>
export type ContestsSolvesBestInEveryDisciplineRetrieveQueryError = ErrorType<unknown>

export const useContestsSolvesBestInEveryDisciplineRetrieve = <
  TData = Awaited<ReturnType<typeof contestsSolvesBestInEveryDisciplineRetrieve>>,
  TError = ErrorType<unknown>,
>(options?: {
  query?: Partial<
    UseQueryOptions<Awaited<ReturnType<typeof contestsSolvesBestInEveryDisciplineRetrieve>>, TError, TData>
  >
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getContestsSolvesBestInEveryDisciplineRetrieveQueryOptions(options)

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

  query.queryKey = queryOptions.queryKey

  return query
}

export const contestsSolvesBestOfEveryUserRetrieve = (
  params: ContestsSolvesBestOfEveryUserRetrieveParams,
  signal?: AbortSignal,
) => {
  return axiosInstance<Output>({ url: `/api/contests/solves/best-of-every-user/`, method: 'GET', params, signal })
}

export const getContestsSolvesBestOfEveryUserRetrieveQueryKey = (
  params: ContestsSolvesBestOfEveryUserRetrieveParams,
) => {
  return [`/api/contests/solves/best-of-every-user/`, ...(params ? [params] : [])] as const
}

export const getContestsSolvesBestOfEveryUserRetrieveQueryOptions = <
  TData = Awaited<ReturnType<typeof contestsSolvesBestOfEveryUserRetrieve>>,
  TError = ErrorType<unknown>,
>(
  params: ContestsSolvesBestOfEveryUserRetrieveParams,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof contestsSolvesBestOfEveryUserRetrieve>>, TError, TData>>
  },
) => {
  const { query: queryOptions } = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getContestsSolvesBestOfEveryUserRetrieveQueryKey(params)

  const queryFn: QueryFunction<Awaited<ReturnType<typeof contestsSolvesBestOfEveryUserRetrieve>>> = ({ signal }) =>
    contestsSolvesBestOfEveryUserRetrieve(params, signal)

  return {
    queryKey,
    queryFn,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: Infinity,
    retry: (_, err) => {
      var _a, _b, _c, _d
      return (
        ((_a = err == null ? void 0 : err.response) == null ? void 0 : _a.status) !== 403 &&
        ((_b = err == null ? void 0 : err.response) == null ? void 0 : _b.status) !== 401 &&
        ((_c = err == null ? void 0 : err.response) == null ? void 0 : _c.status) !== 404 &&
        ((_d = err == null ? void 0 : err.response) == null ? void 0 : _d.status) !== 400
      )
    },
    ...queryOptions,
  } as UseQueryOptions<Awaited<ReturnType<typeof contestsSolvesBestOfEveryUserRetrieve>>, TError, TData> & {
    queryKey: QueryKey
  }
}

export type ContestsSolvesBestOfEveryUserRetrieveQueryResult = NonNullable<
  Awaited<ReturnType<typeof contestsSolvesBestOfEveryUserRetrieve>>
>
export type ContestsSolvesBestOfEveryUserRetrieveQueryError = ErrorType<unknown>

export const useContestsSolvesBestOfEveryUserRetrieve = <
  TData = Awaited<ReturnType<typeof contestsSolvesBestOfEveryUserRetrieve>>,
  TError = ErrorType<unknown>,
>(
  params: ContestsSolvesBestOfEveryUserRetrieveParams,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof contestsSolvesBestOfEveryUserRetrieve>>, TError, TData>>
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getContestsSolvesBestOfEveryUserRetrieveQueryOptions(params, options)

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

  query.queryKey = queryOptions.queryKey

  return query
}

export const contestsSolvesCreateCreate = (
  contestsSolvesCreateCreateBody:
    | ContestsSolvesCreateCreateBodyOne
    | ContestsSolvesCreateCreateBodyTwo
    | ContestsSolvesCreateCreateBodyThree,
  params: ContestsSolvesCreateCreateParams,
) => {
  return axiosInstance<ContestsSolveCreateOutput>({
    url: `/api/contests/solves/create/`,
    method: 'POST',
    data: contestsSolvesCreateCreateBody,
    params,
  })
}

export const getContestsSolvesCreateCreateMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof contestsSolvesCreateCreate>>,
    TError,
    {
      data: ContestsSolvesCreateCreateBodyOne | ContestsSolvesCreateCreateBodyTwo | ContestsSolvesCreateCreateBodyThree
      params: ContestsSolvesCreateCreateParams
    },
    TContext
  >
}): UseMutationOptions<
  Awaited<ReturnType<typeof contestsSolvesCreateCreate>>,
  TError,
  {
    data: ContestsSolvesCreateCreateBodyOne | ContestsSolvesCreateCreateBodyTwo | ContestsSolvesCreateCreateBodyThree
    params: ContestsSolvesCreateCreateParams
  },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {}

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof contestsSolvesCreateCreate>>,
    {
      data: ContestsSolvesCreateCreateBodyOne | ContestsSolvesCreateCreateBodyTwo | ContestsSolvesCreateCreateBodyThree
      params: ContestsSolvesCreateCreateParams
    }
  > = (props) => {
    const { data, params } = props ?? {}

    return contestsSolvesCreateCreate(data, params)
  }

  return { mutationFn, ...mutationOptions }
}

export type ContestsSolvesCreateCreateMutationResult = NonNullable<
  Awaited<ReturnType<typeof contestsSolvesCreateCreate>>
>
export type ContestsSolvesCreateCreateMutationBody =
  | ContestsSolvesCreateCreateBodyOne
  | ContestsSolvesCreateCreateBodyTwo
  | ContestsSolvesCreateCreateBodyThree
export type ContestsSolvesCreateCreateMutationError = ErrorType<unknown>

export const useContestsSolvesCreateCreate = <TError = ErrorType<unknown>, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof contestsSolvesCreateCreate>>,
    TError,
    {
      data: ContestsSolvesCreateCreateBodyOne | ContestsSolvesCreateCreateBodyTwo | ContestsSolvesCreateCreateBodyThree
      params: ContestsSolvesCreateCreateParams
    },
    TContext
  >
}): UseMutationResult<
  Awaited<ReturnType<typeof contestsSolvesCreateCreate>>,
  TError,
  {
    data: ContestsSolvesCreateCreateBodyOne | ContestsSolvesCreateCreateBodyTwo | ContestsSolvesCreateCreateBodyThree
    params: ContestsSolvesCreateCreateParams
  },
  TContext
> => {
  const mutationOptions = getContestsSolvesCreateCreateMutationOptions(options)

  return useMutation(mutationOptions)
}

export const contestsSolvesSubmitPartialUpdate = (id: number) => {
  return axiosInstance<unknown>({ url: `/api/contests/solves/submit/${id}/`, method: 'PATCH' })
}

export const getContestsSolvesSubmitPartialUpdateMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof contestsSolvesSubmitPartialUpdate>>,
    TError,
    { id: number },
    TContext
  >
}): UseMutationOptions<
  Awaited<ReturnType<typeof contestsSolvesSubmitPartialUpdate>>,
  TError,
  { id: number },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {}

  const mutationFn: MutationFunction<Awaited<ReturnType<typeof contestsSolvesSubmitPartialUpdate>>, { id: number }> = (
    props,
  ) => {
    const { id } = props ?? {}

    return contestsSolvesSubmitPartialUpdate(id)
  }

  return { mutationFn, ...mutationOptions }
}

export type ContestsSolvesSubmitPartialUpdateMutationResult = NonNullable<
  Awaited<ReturnType<typeof contestsSolvesSubmitPartialUpdate>>
>

export type ContestsSolvesSubmitPartialUpdateMutationError = ErrorType<unknown>

export const useContestsSolvesSubmitPartialUpdate = <TError = ErrorType<unknown>, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof contestsSolvesSubmitPartialUpdate>>,
    TError,
    { id: number },
    TContext
  >
}): UseMutationResult<
  Awaited<ReturnType<typeof contestsSolvesSubmitPartialUpdate>>,
  TError,
  { id: number },
  TContext
> => {
  const mutationOptions = getContestsSolvesSubmitPartialUpdateMutationOptions(options)

  return useMutation(mutationOptions)
}
