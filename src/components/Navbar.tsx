import { useAuth } from '@/providers/AuthProvider'
import { useGoogleLogin } from '@react-oauth/google'

export const Navbar = () => {
  const { login } = useAuth()
  const loginHandler = useGoogleLogin({
    onSuccess: ({ access_token }) => login(access_token),
    onError: () => console.log('error'),
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
