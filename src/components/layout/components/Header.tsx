import { GhostButton, GoogleIcon } from '@/components'

export function Header({ caption }: { caption: string }) {
  return (
    <div className='flex items-center justify-between rounded-2xl bg-black-80 px-4 py-3'>
      <p className='title-h3'>{caption}</p>
      <GhostButton className='gap-3'>
        <GoogleIcon />
        Sign in with google
      </GhostButton>
    </div>
  )
}
