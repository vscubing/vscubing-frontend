import { useUserTest } from '@/api'
import { useAuth } from '@/providers'
import { useGoogleLogin } from '@react-oauth/google'
import { useEffect } from 'react'

export const Navbar = () => {
  const { loggedIn, login, logout } = useAuth()
  const { data: userData, mutate: mutateUser } = useUserTest()

  const loginHandler = useGoogleLogin({
    onSuccess: ({ code }) => login(code),
    onError: () => console.log('error'),
    flow: 'auth-code',
  })

  useEffect(() => {
    mutateUser()
  }, [loggedIn, mutateUser])

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
