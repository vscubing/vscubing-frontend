import { cn, matchesQuery } from '@/utils'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import { forwardRef, type ElementRef, type ComponentPropsWithoutRef } from 'react'
import { PrimaryButton, SecondaryButton } from '../buttons'

const AlertDialog = AlertDialogPrimitive.Root

const AlertDialogTrigger = AlertDialogPrimitive.Trigger

const AlertDialogPortal = AlertDialogPrimitive.Portal

const AlertDialogOverlay = forwardRef<
  ElementRef<typeof AlertDialogPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      'fixed inset-0 z-50 bg-black-100 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className,
    )}
    {...props}
    ref={ref}
  >
    <div className='fixed inset-0 bg-cubes bg-cover bg-bottom opacity-40'></div>
  </AlertDialogPrimitive.Overlay>
))
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName

const AlertDialogContent = forwardRef<
  ElementRef<typeof AlertDialogPrimitive.Content>,
  ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        'bg-card-gradient fixed left-[50%] top-[50%] z-50 flex max-w-[40rem] translate-x-[-50%] translate-y-[-50%] flex-col items-center gap-8 rounded-2xl px-24 py-10 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:w-[28rem] sm:min-w-0 sm:max-w-[calc(100%-2rem)] sm:gap-6 sm:px-4 sm:py-10',
        className,
      )}
      {...props}
    />
  </AlertDialogPortal>
))
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName

const AlertDialogTitle = forwardRef<
  ElementRef<typeof AlertDialogPrimitive.Title>,
  ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title ref={ref} className={cn('title-h2 text-center', className)} {...props} />
))
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName

const AlertDialogAction = forwardRef<
  ElementRef<typeof AlertDialogPrimitive.Action>,
  ComponentPropsWithoutRef<typeof PrimaryButton>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action asChild>
    <PrimaryButton
      size={matchesQuery('sm') ? 'sm' : 'lg'}
      ref={ref}
      className={cn('h-15 min-w-28 whitespace-nowrap sm:h-11 sm:min-w-20', className)}
      {...props}
    />
  </AlertDialogPrimitive.Action>
))
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName

const AlertDialogCancel = forwardRef<
  ElementRef<typeof AlertDialogPrimitive.Cancel>,
  ComponentPropsWithoutRef<typeof SecondaryButton>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel asChild>
    <SecondaryButton
      size={matchesQuery('sm') ? 'sm' : 'lg'}
      ref={ref}
      className={cn(
        'sm:btn-sm h-15 min-w-28 whitespace-nowrap text-xl leading-[inherit] sm:h-11 sm:min-w-20',
        className,
      )}
      {...props}
    />
  </AlertDialogPrimitive.Cancel>
))
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName

const AlertDialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex w-full justify-center gap-4', className)} {...props} />
)
AlertDialogFooter.displayName = 'AlertDialogFooter'

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
}
