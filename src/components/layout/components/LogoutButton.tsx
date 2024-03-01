import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/AlertDialog'
import { GhostButton, LogoutIcon } from '@/components/ui'
import { logout, userQuery } from '@/features/auth'
import { useQuery } from '@tanstack/react-query'

export function LogoutButton({ className }: { className?: string }) {
  const { data: user } = useQuery(userQuery)

  if (user === undefined || user.isAuthed === false) {
    return null
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <GhostButton className={className}>
          Log out <LogoutIcon />
        </GhostButton>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
        <AlertDialogFooter>
          <AlertDialogCancel>Stay</AlertDialogCancel>
          <AlertDialogAction onClick={() => logout()}>Log out</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
