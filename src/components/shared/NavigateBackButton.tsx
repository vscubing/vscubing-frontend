import { GhostButton, ArrowBackUpIcon } from '../ui'

export function NavigateBackButton({ className }: { className?: string }) {
  // TODO: add more intelligent logic with a 'from' search param
  return (
    <GhostButton className={className} size='sm' onClick={() => history.back()}>
      <ArrowBackUpIcon />
      Go back
    </GhostButton>
  )
}
