import { queryClient } from '@/lib/reactQuery'
import { useGoogleLogin } from '@react-oauth/google'
import { USER_QUERY_KEY } from './userQueryKey'
import { deleteAuthTokens, setAuthTokens } from '@/utils'
import { useState } from 'react'
import { toast } from '@/components/ui'

export * from './api'
export * from './userQueryKey'

export function useLogin() {
  const [isPending, setIsPending] = useState(false)

  const initGoogleAuth = useGoogleLogin({
    onSuccess: ({ code }) => {
      void login(code).then(() => setIsPending(false))
    },
    onError: () => {
      setIsPending(false)
      toast({
        title: 'Uh-oh! An unexpected error occurred while signing in',
        description: 'Please try again or let us know if the problem persists',
      })
    },
    flow: 'auth-code',
  })

  return {
    login: () => {
      setIsPending(true)
      initGoogleAuth()
    },
    isPending,
  }
}

async function login(googleCode: string) {
  // const response = await postLogin(googleCode)
  // const { refresh, access } = response.data

  // setAuthTokens({ refresh, access })
  // TODO: fix when codegen is done
  await queryClient.resetQueries({ queryKey: [USER_QUERY_KEY] })
}

export async function logout() {
  deleteAuthTokens()
  await queryClient.resetQueries({ queryKey: [USER_QUERY_KEY] })
}
