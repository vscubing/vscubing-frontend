import { LS_REFRESH_TOKEN, LS_ACCESS_TOKEN, postLogin } from '@/api'
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
    const savedAccessToken = localStorage.getItem(LS_REFRESH_TOKEN)

    if (savedAccessToken) {
      setLoggedIn(true)
    }
  }, [])

  const login = async (googleCode: string) => {
    const response = await postLogin(googleCode)
    const { refresh, access } = response.data

    localStorage.setItem(LS_REFRESH_TOKEN, refresh)
    localStorage.setItem(LS_ACCESS_TOKEN, access)
    window.location.reload()
  }

  const logout = () => {
    localStorage.removeItem(LS_REFRESH_TOKEN)
    localStorage.removeItem(LS_ACCESS_TOKEN)
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
