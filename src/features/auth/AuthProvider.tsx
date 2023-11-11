import { createContext, useEffect, useMemo, useState } from 'react'
import { getAuthTokens, setAuthTokens, deleteAuthTokens } from '.'
import { UserData, postLogin, useUserData } from '@/api/accounts'

type AuthContextValue = {
  isAuthenticated: boolean
  userData: UserData | null
  login: (googleToken: string) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue>({
  isAuthenticated: false,
  userData: null,
  login: () => {
    throw new Error('context is missing')
  },
  logout: () => {
    throw new Error('context is missing')
  },
})

type AuthProviderProps = { children: React.ReactNode }
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!getAuthTokens())
  const { data: userData } = useUserData(isAuthenticated)

  const login = async (googleCode: string) => {
    const response = await postLogin(googleCode)
    const { refresh, access } = response.data

    setAuthTokens({ refresh, access })
    setIsAuthenticated(true)
  }

  const logout = () => {
    deleteAuthTokens()
    setIsAuthenticated(false)
  }

  const value = useMemo(
    () => ({
      isAuthenticated,
      userData,
      login,
      logout,
    }),
    [isAuthenticated, userData],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
