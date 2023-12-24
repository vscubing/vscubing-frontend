import { useGoogleLogin } from '@react-oauth/google'
import googleLogo from '@/assets/google-logo.svg'
import { useQuery } from '@tanstack/react-query'
import { login, logout, userQuery } from '@/features/auth'

export function LoginSection() {
  const { data: userData } = useQuery(userQuery)

  const handleLogin = useGoogleLogin({
    onSuccess: ({ code }) => login(code),
    onError: () => console.log('error'),
    flow: 'auth-code',
  })

  return (
    <div className='py-1'>
      {userData ? (
        <>
          {userData.username}
          <button className='border-2 px-5 py-2' onClick={() => logout()}>
            log out
          </button>
        </>
      ) : (
        <button
          className='h-full rounded-md bg-panels pl-[12px] pr-[20px] text-[#CBCBCB]'
          onClick={() => handleLogin()}
        >
          <img src={googleLogo} alt='google logo' className='mr-[20px] inline-block' />
          Sign in with Google
        </button>
      )}
    </div>
  )
}
