import { useLogin } from '@/features/auth'
import { GhostButton, PrimaryButton } from './buttons'
import { GoogleIcon } from './icons'

const buttons = {
  primary: PrimaryButton,
  ghost: GhostButton,
} as const
export function SignInButton({ variant }: { variant: 'primary' | 'ghost' }) {
  const login = useLogin()

  const Comp = buttons[variant]
  return (
    <Comp className='h-12 gap-3 px-4' onClick={() => login()}>
      <GoogleIcon />
      Sign in with Google
    </Comp>
  )
}