import { axiosClient } from '@/api/axios'
import jwtDecode from 'jwt-decode'
import { createContext, useContext, useMemo } from 'react'

type AuthContextValue = {
  login: (googleToken: string) => void
  logout: () => void
}
const AuthContext = createContext<AuthContextValue>({
  login: () => {
    throw new Error('context is missing')
  },
  logout: () => {
    throw new Error('context is missing')
  },
})

type AuthProviderProps = { children: React.ReactNode }
export const AuthProvider = ({ children }: AuthProviderProps) => {
  // const [user, setUser] = useState<null>(null)

  const login = async (googleCode: string) => {
    const response = await axiosClient.post('/accounts/google/login/', { code: googleCode })
    const token: string = response.data.access

    console.log(jwtDecode(token))
  }

  const logout = () => {}

  const value = useMemo(
    () => ({
      login,
      logout,
    }),
    [],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
