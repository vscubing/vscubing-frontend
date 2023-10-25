import { useContext } from 'react'
import { AuthContext } from './AuthProvider'

export const useAuth = () => {
  return useContext(AuthContext)
}
