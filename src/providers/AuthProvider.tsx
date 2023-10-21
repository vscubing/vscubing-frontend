import { axiosClient } from '@/api/axios'
import jwtDecode from 'jwt-decode'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const LS_KEY_JWT = 'jwt'

type User = null | { user_id: number }
type AuthContextValue = {
  user: User
  login: (googleToken: string) => void
  logout: () => void
}
const AuthContext = createContext<AuthContextValue>({
  user: null,
  login: () => {
    throw new Error('context is missing')
  },
  logout: () => {
    throw new Error('context is missing')
  },
})

type AuthProviderProps = { children: React.ReactNode }
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User>(null)

  useEffect(() => {
    const savedJwt = localStorage.getItem(LS_KEY_JWT)
    const savedUser = savedJwt ? (jwtDecode(savedJwt) as User) : null
    setUser(savedUser)
  }, [])

  const login = async (googleCode: string) => {
    const response = await axiosClient.post('/accounts/google/login/', { code: googleCode })
    const token: string = response.data.access

    localStorage.setItem(LS_KEY_JWT, token)
    setUser(jwtDecode(token))
  }

  const logout = () => {
    localStorage.removeItem(LS_KEY_JWT)
    setUser(null)
  }

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
