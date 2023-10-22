import { getAccessTokenLS, axiosClient, setAccessTokenLS, setRefreshTokenLS } from '@/api'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

type AuthContextValue = {
  loggedIn: boolean
  login: (googleToken: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue>({
  loggedIn: false,
  login: () => {
    throw new Error('context is missing')
  },
  logout: () => {
    throw new Error('context is missing')
  },
})

export const useAuth = () => {
  return useContext(AuthContext)
}

type AuthProviderProps = { children: React.ReactNode }
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const savedAccessToken = getAccessTokenLS()

    if (savedAccessToken) {
      setLoggedIn(true)
    }
  }, [])

  const login = async (googleCode: string) => {
    // TODO move to api/routes
    const response = await axiosClient.post<{ code: string }, { data: { access: string; refresh: string } }>(
      '/accounts/google/login/',
      {
        code: googleCode,
      },
    )
    const { refresh, access } = response.data

    setRefreshTokenLS(refresh)
    setAccessTokenLS(access)
    setLoggedIn(true)
  }

  const logout = () => {
    setAccessTokenLS(null)
    setRefreshTokenLS(null)
    setLoggedIn(false)
  }

  const value = useMemo(
    () => ({
      loggedIn,
      login,
      logout,
    }),
    [loggedIn],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
