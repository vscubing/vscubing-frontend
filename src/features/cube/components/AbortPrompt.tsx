import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
} from '@/components/AlertDialog'

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
    <AlertDialog open={isVisible}>
      <AlertDialogContent>
        <AlertDialogTitle>If you quit now your result will be DFNed</AlertDialogTitle>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onConfirm}>Quit</AlertDialogCancel>
          <AlertDialogAction onClick={onCancel}>Resume</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
