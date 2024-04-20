import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core'
import { z } from 'zod'

const SocialLogin = z
  .object({ access_token: z.string(), code: z.string(), id_token: z.string() })
  .partial()
  .passthrough()
const TokenRefresh = z.object({ access: z.string(), refresh: z.string() }).passthrough()
const Output = z
  .object({
    id: z.number().int(),
    name: z.string(),
    slug: z.string(),
    start_date: z.string().datetime({ offset: true }),
    end_date: z.string().datetime({ offset: true }),
  })
  .passthrough()
const inline_serializer = z.object({ id: z.number().int(), username: z.string() }).passthrough()
const contests_RoundSessionWithSolvesListOutput = z
  .object({
    id: z.number().int(),
    avg_ms: z.number().int(),
    is_dnf: z.boolean(),
    is_finished: z.boolean(),
    created_at: z.string().datetime({ offset: true }),
    updated_at: z.string().datetime({ offset: true }),
    user: inline_serializer,
    contest: inline_serializer,
    solve_set: z.array(inline_serializer),
  })
  .passthrough()
const contests_SolveCreateOutput = z
  .object({
    id: z.number().int(),
    time_ms: z.number().int(),
    created_at: z.string().datetime({ offset: true }),
    scramble: inline_serializer,
  })
  .passthrough()

export const schemas = {
  SocialLogin,
  TokenRefresh,
  Output,
  inline_serializer,
  contests_RoundSessionWithSolvesListOutput,
  contests_SolveCreateOutput,
}

const endpoints = makeApi([
  {
    method: 'put',
    path: '/api/accounts/change-username/',
    requestFormat: 'json',
    response: z.void(),
  },
  {
    method: 'get',
    path: '/api/accounts/current-user/',
    requestFormat: 'json',
    response: z.void(),
  },
  {
    method: 'post',
    path: '/api/accounts/google/login/',
    description: `class used for social authentications
example usage for facebook with access_token
-------------
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter

class FacebookLogin(SocialLoginView):
    adapter_class &#x3D; FacebookOAuth2Adapter
-------------

example usage for facebook with code

-------------
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client

class FacebookLogin(SocialLoginView):
    adapter_class &#x3D; FacebookOAuth2Adapter
    client_class &#x3D; OAuth2Client
    callback_url &#x3D; &#x27;localhost:8000&#x27;
-------------`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: SocialLogin,
      },
    ],
    response: SocialLogin,
  },
  {
    method: 'post',
    path: '/api/accounts/token/refresh/',
    description: `Takes a refresh type JSON web token and returns an access type JSON web
token if the refresh token is valid.`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: TokenRefresh,
      },
    ],
    response: TokenRefresh,
  },
  {
    method: 'get',
    path: '/api/contests/contests/',
    requestFormat: 'json',
    parameters: [
      {
        name: 'limit',
        type: 'Query',
        schema: z.number().int().optional(),
      },
      {
        name: 'offset',
        type: 'Query',
        schema: z.number().int().optional(),
      },
      {
        name: 'order_by',
        type: 'Query',
        schema: z.enum(['-created_at', 'created_at']).optional(),
      },
    ],
    response: Output,
  },
  {
    method: 'get',
    path: '/api/contests/ongoing-contest/current-solve/',
    requestFormat: 'json',
    parameters: [
      {
        name: 'contest_slug',
        type: 'Query',
        schema: z.string(),
      },
      {
        name: 'discipline_slug',
        type: 'Query',
        schema: z.string(),
      },
    ],
    response: Output,
  },
  {
    method: 'get',
    path: '/api/contests/ongoing-contest/retrieve/',
    requestFormat: 'json',
    response: z.void(),
  },
  {
    method: 'get',
    path: '/api/contests/ongoing-contest/submitted-solves/',
    requestFormat: 'json',
    parameters: [
      {
        name: 'contest_slug',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'discipline_slug',
        type: 'Query',
        schema: z.string(),
      },
    ],
    response: Output,
  },
  {
    method: 'get',
    path: '/api/contests/round-sessions/with-solves/',
    requestFormat: 'json',
    parameters: [
      {
        name: 'contest_id',
        type: 'Query',
        schema: z.number().int(),
      },
      {
        name: 'discipline_id',
        type: 'Query',
        schema: z.number().int(),
      },
      {
        name: 'order_by',
        type: 'Query',
        schema: z.enum(['-avg_ms', 'avg_ms']).optional(),
      },
    ],
    response: contests_RoundSessionWithSolvesListOutput,
  },
  {
    method: 'get',
    path: '/api/contests/solves/:id/retrieve/',
    requestFormat: 'json',
    parameters: [
      {
        name: 'id',
        type: 'Path',
        schema: z.number().int(),
      },
    ],
    response: Output,
  },
  {
    method: 'get',
    path: '/api/contests/solves/best-in-every-discipline/',
    requestFormat: 'json',
    response: Output,
  },
  {
    method: 'get',
    path: '/api/contests/solves/best-of-every-user/',
    requestFormat: 'json',
    parameters: [
      {
        name: 'discipline',
        type: 'Query',
        schema: z.string(),
      },
    ],
    response: Output,
  },
  {
    method: 'post',
    path: '/api/contests/solves/create/',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z.object({}).partial().passthrough(),
      },
      {
        name: 'contest_id',
        type: 'Query',
        schema: z.number().int(),
      },
      {
        name: 'discipline_id',
        type: 'Query',
        schema: z.number().int(),
      },
      {
        name: 'scramble_id',
        type: 'Query',
        schema: z.number().int(),
      },
    ],
    response: contests_SolveCreateOutput,
  },
  {
    method: 'patch',
    path: '/api/contests/solves/submit/:id/',
    requestFormat: 'json',
    parameters: [
      {
        name: 'id',
        type: 'Path',
        schema: z.number().int(),
      },
    ],
    response: z.unknown(),
  },
])

export const api = new Zodios(endpoints)

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options)
}
