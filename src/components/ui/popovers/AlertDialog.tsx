import { cn, matchesQuery } from '@/utils'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import { forwardRef, type ElementRef, type ComponentPropsWithoutRef } from 'react'
import { PrimaryButton, SecondaryButton } from '../buttons'
import {
  baseDialogContent,
  baseDialogFooter,
  baseDialogOverlay,
  baseDialogOverlayInner,
  baseDialogPrimary,
  baseDialogSecondary,
  baseDialogTitle,
} from './BaseDialog'

const AlertDialog = AlertDialogPrimitive.Root

const AlertDialogTrigger = AlertDialogPrimitive.Trigger

const AlertDialogPortal = AlertDialogPrimitive.Portal

const AlertDialogOverlay = forwardRef<
  ElementRef<typeof AlertDialogPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay className={cn(baseDialogOverlay, className)} {...props} ref={ref}>
    <div className={baseDialogOverlayInner}></div>
  </AlertDialogPrimitive.Overlay>
))
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName

const AlertDialogContent = forwardRef<
  ElementRef<typeof AlertDialogPrimitive.Content>,
  ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content ref={ref} className={cn(baseDialogContent, className)} {...props} />
  </AlertDialogPortal>
))
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName

const AlertDialogTitle = forwardRef<
  ElementRef<typeof AlertDialogPrimitive.Title>,
  ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title ref={ref} className={cn(baseDialogTitle, className)} {...props} />
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
      className={cn(baseDialogPrimary, className)}
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
      className={cn(baseDialogSecondary, className)}
      {...props}
    />
  </AlertDialogPrimitive.Cancel>
))
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName

const AlertDialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn(baseDialogFooter, className)} {...props} />
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
