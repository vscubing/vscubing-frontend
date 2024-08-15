import { GhostButton, ArrowBackUpIcon } from '@/components/ui'

export function NavigateBackButton({ className }: { className?: string }) {
  // TODO: add more sophisticated logic with a 'from' search param
  return (
    <GhostButton className={className} size='sm' onClick={() => history.back()}>
      <ArrowBackUpIcon />
      Go back
    </GhostButton>
  )
}
