import { deleteAuthTokens, getAuthTokens, postLogin, setAuthTokens } from '@/api'
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
