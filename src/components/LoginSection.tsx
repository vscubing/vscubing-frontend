import { useGoogleLogin } from '@react-oauth/google'
import googleLogo from '@/assets/google-logo.svg'
import { useAuth } from '@/features/auth'

export const LoginSection = () => {
  const { isAuthenticated, userData, login, logout } = useAuth()

  const handleLogin = useGoogleLogin({
    onSuccess: ({ code }) => login(code),
    onError: () => console.log('error'),
    flow: 'auth-code',
  })

  return (
    <div className='py-1'>
      {userData ? userData.username : null}
      {isAuthenticated ? (
        <>
          <button className='border-2 px-5 py-2' onClick={() => logout()}>
            log out
          </button>
        </>
      ) : (
        <button
          className='rounded-md bg-panels py-[10px] pl-[12px] pr-[20px] text-[#CBCBCB]'
          onClick={() => handleLogin()}
        >
          <img src={googleLogo} alt='google logo' className='mr-[20px] inline-block' />
          Sign in with Google
        </button>
      )}
    </div>
  )
}
