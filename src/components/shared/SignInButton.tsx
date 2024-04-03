import { useLogin } from '@/features/auth'
import { cn } from '@/utils'
import { GhostButton, GoogleIcon, PrimaryButton } from '../ui'

const buttons = {
  primary: PrimaryButton,
  ghost: GhostButton,
} as const

type SignInButtonProps = { variant: keyof typeof buttons; className?: string }
export function SignInButton({ variant, className }: SignInButtonProps) {
  const { login, isPending } = useLogin()

  const Comp = buttons[variant]
  return (
    <Comp className={cn('h-12 gap-3 px-4 sm:h-12', className)} disabled={isPending} onClick={login}>
      <GoogleIcon />
      Sign in with Google
    </Comp>
  )
}
