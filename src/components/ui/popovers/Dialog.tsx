import * as DialogPrimitive from '@radix-ui/react-dialog'

import { cn } from '@/utils'
import { forwardRef, type ElementRef, type ComponentPropsWithoutRef } from 'react'
import {
  BaseDialogButton,
  baseDialogContent,
  baseDialogFooter,
  baseDialogOverlay,
  baseDialogOverlayInner,
  baseDialogTitle,
} from './BaseDialog'
import { SecondaryButton } from '../buttons'
import { CloseIcon } from '../icons'

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogOverlay = forwardRef<
  ElementRef<typeof DialogPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay className={cn(baseDialogOverlay, className)} {...props} ref={ref}>
    <div className={baseDialogOverlayInner}></div>
  </DialogPrimitive.Overlay>
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = forwardRef<
  ElementRef<typeof DialogPrimitive.Content>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    overlayProps?: ComponentPropsWithoutRef<typeof DialogOverlay>
  }
>(({ className, overlayProps, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay {...overlayProps} />
    <DialogPrimitive.Content ref={ref} className={cn(baseDialogContent, className)} {...props} />
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogTitle = forwardRef<
  ElementRef<typeof DialogPrimitive.Title>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title ref={ref} className={cn(baseDialogTitle, className)} {...props} />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogCloseCross = forwardRef<
  ElementRef<typeof DialogPrimitive.Close>,
  ComponentPropsWithoutRef<typeof SecondaryButton>
>((props, ref) => (
  <DialogPrimitive.Close asChild>
    <SecondaryButton size='iconSm' ref={ref} {...props}>
      <CloseIcon />
    </SecondaryButton>
  </DialogPrimitive.Close>
))
DialogCloseCross.displayName = DialogPrimitive.Close.displayName

const DialogClose = forwardRef<
  ElementRef<typeof DialogPrimitive.Close>,
  ComponentPropsWithoutRef<typeof BaseDialogButton>
>(({ version, ...props }, ref) => (
  <DialogPrimitive.Close asChild>
    <BaseDialogButton version={version} ref={ref} {...props} />
  </DialogPrimitive.Close>
))
DialogClose.displayName = DialogPrimitive.Close.displayName

const DialogFooter = ({ className, ...props }: ComponentPropsWithoutRef<'div'>) => (
  <div className={cn(baseDialogFooter, className)} {...props} />
)
DialogFooter.displayName = 'DialogFooter'

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogCloseCross,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogFooter,
  DialogTitle,
}
