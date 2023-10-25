import { createContext, useEffect, useMemo, useState } from 'react'
import { getAuthTokens, setAuthTokens, deleteAuthTokens } from '.'
import { postLogin } from '@/api/accounts'

type AuthContextValue = {
  loggedIn: boolean
  login: (googleToken: string) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue>({
  loggedIn: false,
  login: () => {
    throw new Error('context is missing')
  },
  logout: () => {
    throw new Error('context is missing')
  },
})

type AuthProviderProps = { children: React.ReactNode }
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const authenticated = !!getAuthTokens()

    if (authenticated) {
      setLoggedIn(true)
    }
  }, [])

  const login = async (googleCode: string) => {
    const response = await postLogin(googleCode)
    const { refresh, access } = response.data

    setAuthTokens({ refresh, access })
    window.location.reload()
  }

  const logout = () => {
    deleteAuthTokens()
    window.location.reload()
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
