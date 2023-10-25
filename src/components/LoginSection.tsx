import { useGoogleLogin } from '@react-oauth/google'
import googleLogo from '@/assets/google-logo.svg'
import { useAuth } from '@/features/auth'
import { useCurrentUser } from '@/api/accounts'

export const LoginSection = () => {
  const { loggedIn, login, logout } = useAuth()
  const { data: userData } = useCurrentUser()

  const loginHandler = useGoogleLogin({
    onSuccess: ({ code }) => login(code),
    onError: () => console.log('error'),
    flow: 'auth-code',
  })

  return (
    <div>
      {userData}
      {loggedIn ? (
        <>
          <button className='border-2 px-5 py-2' onClick={() => logout()}>
            log out
          </button>
        </>
      ) : (
        <button
          className='rounded-md bg-panels py-[10px] pl-[12px] pr-[31px] text-[#CBCBCB]'
          onClick={() => loginHandler()}
        >
          <img src={googleLogo} alt='google logo' className='mr-[20px] inline-block' />
          Sign in with Google
        </button>
      )}
    </div>
  )
}
