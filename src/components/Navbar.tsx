import { axiosClient } from '@/api/axios'
import { useAuth } from '@/providers/AuthProvider'
import { useGoogleLogin } from '@react-oauth/google'
import { useEffect, useState } from 'react'

export const Navbar = () => {
  const { loggedIn, login, logout } = useAuth()
  const [userData, setUserData] = useState<string | null>(null)
  const loginHandler = useGoogleLogin({
    onSuccess: ({ code }) => login(code),
    onError: () => console.log('error'),
    flow: 'auth-code',
  })

  useEffect(() => {
    axiosClient.get('/accounts/user_test/').then((res) => setUserData(res.data))
  }, [loggedIn])

  return (
    <>
      {userData}
      {loggedIn ? (
        <>
          <button className='border-2 px-5 py-2' onClick={() => logout()}>
            log out
          </button>
        </>
      ) : (
        <button className='border-2 px-5 py-2' onClick={() => loginHandler()}>
          log in with google
        </button>
      )}
    </>
  )
}
