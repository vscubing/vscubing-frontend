import { useGoogleLogin } from '@react-oauth/google'

export const Navbar = () => {
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => console.log(codeResponse),
    onError: () => console.log('error'),
  })

  return (
    <div>
      Navbar:
      <button className='border-2 px-5 py-2' onClick={() => login()}>
        log in with google{' '}
      </button>
    </div>
  )
}
