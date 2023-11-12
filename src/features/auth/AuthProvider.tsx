import { createContext, useEffect, useMemo, useState } from 'react'
import { setAuthTokens, deleteAuthTokens } from '.'
import { UserData, putChangeUsername, postLogin, useUserData } from '@/api/accounts'
import { PickUsernameModal } from './PickUsernameModal'

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
  const { data: userData } = useUserData()
  const [isPickUsernameVisible, setIsPickUsernameVisible] = useState(false)

  useEffect(() => {
    if (userData && !userData.auth_completed) {
      setIsPickUsernameVisible(true)
    }
  }, [userData])

  const handleUsernameSubmit = async (username: string) => {
    await putChangeUsername(username)
    window.location.reload()
  }

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
      isAuthenticated: !!userData,
      userData,
      login,
      logout,
    }),
    [userData],
  )

  return (
    <AuthContext.Provider value={value}>
      <>
        {isPickUsernameVisible ? <PickUsernameModal onSubmit={handleUsernameSubmit} /> : null}
        {children}
      </>
    </AuthContext.Provider>
  )
}
