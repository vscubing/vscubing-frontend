import { AccessToken, getAccessTokenLS, axiosClient, setAccessTokenLS } from '@/api'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

type AuthContextValue = {
  accessToken: AccessToken
  loggedIn: boolean
  login: (googleToken: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue>({
  accessToken: null,
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
  const [accessToken, setAccessToken] = useState<AccessToken>(null)

  useEffect(() => {
    const savedToken = getAccessTokenLS()
    setAccessToken(savedToken)
  }, [])

  const login = async (googleCode: string) => {
    const response = await axiosClient.post('/accounts/google/login/', { code: googleCode })
    const token: string = response.data.access

    setAccessTokenLS(token)
    setAccessToken(token)
  }

  const logout = () => {
    setAccessTokenLS(null)
    setAccessToken(null)
  }

  const value = useMemo(
    () => ({
      accessToken: accessToken,
      loggedIn: !!accessToken,
      login,
      logout,
    }),
    [accessToken],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
