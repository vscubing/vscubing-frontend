import { useAuth } from '@/providers/AuthProvider'
import { useGoogleLogin } from '@react-oauth/google'

export const Navbar = () => {
  const { login } = useAuth()
  const loginHandler = useGoogleLogin({
    onSuccess: ({ code }) => login(code),
    onError: () => console.log('error'),
    flow: 'auth-code',
  })

  return (
    <div>
      Navbar:
      <button className='border-2 px-5 py-2' onClick={() => loginHandler()}>
        log in with google
      </button>
    </div>
  )
}
