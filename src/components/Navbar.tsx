import { useCurrentUser } from '@/api'
import { useAuth } from '@/providers'
import { useGoogleLogin } from '@react-oauth/google'

export const Header = () => {
  const { loggedIn, login, logout } = useAuth()
  const { data: userData } = useCurrentUser()

  const loginHandler = useGoogleLogin({
    onSuccess: ({ code }) => login(code),
    onError: () => console.log('error'),
    flow: 'auth-code',
  })

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
