import { useAuth } from '@/providers/AuthProvider'
import { useGoogleLogin } from '@react-oauth/google'

export const Navbar = () => {
  const { user, login, logout } = useAuth()
  const loginHandler = useGoogleLogin({
    onSuccess: ({ code }) => login(code),
    onError: () => console.log('error'),
    flow: 'auth-code',
  })

  return user ? (
    <>
      <div>user id: {user.user_id}</div>
      <button className='border-2 px-5 py-2' onClick={() => logout()}>
        log out
      </button>
    </>
  ) : (
    <button className='border-2 px-5 py-2' onClick={() => loginHandler()}>
      log in with google
    </button>
  )
}
