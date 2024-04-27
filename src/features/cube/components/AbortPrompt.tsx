import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle } from '@/components/ui'

export function AbortPrompt({
  isVisible,
  onCancel,
  onConfirm,
}: {
  isVisible: boolean
  onConfirm: () => void
  onCancel: () => void
}) {
  return (
    <Dialog open={isVisible}>
      <DialogContent overlayProps={{ onClick: onCancel }} onEscapeKeyDown={onCancel}>
        <DialogTitle>If you quit now your result will be DFNed</DialogTitle>
        <DialogFooter>
          <DialogClose version='secondary' onClick={onConfirm}>
            Quit
          </DialogClose>
          <DialogClose version='primary' onClick={onCancel}>
            Resume
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
