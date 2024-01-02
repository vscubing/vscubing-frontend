import { GhostButton, ArrowBackUpIcon } from './ui'

export function NavigateBackButton({ className }: { className?: string }) {
  return (
    <GhostButton className={className} size='sm' onClick={() => history.back()}>
      <ArrowBackUpIcon />
      Go back
    </GhostButton>
  )
}
