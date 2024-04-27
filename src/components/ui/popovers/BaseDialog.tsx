import { tw } from '@/utils'

export const baseDialogOverlay = tw(
  'fixed inset-0 z-50 bg-black-100 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
)
export const baseDialogOverlayInner = tw('fixed inset-0 bg-cubes bg-cover bg-bottom opacity-40')

export const baseDialogContent = tw(
  'bg-card-gradient fixed left-[50%] top-[50%] z-50 flex max-w-[40rem] translate-x-[-50%] translate-y-[-50%] flex-col items-center gap-8 rounded-2xl px-24 py-10 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:w-[28rem] sm:min-w-0 sm:max-w-[calc(100%-2rem)] sm:gap-6 sm:px-4 sm:py-10',
)
export const baseDialogTitle = tw('title-h2 text-center')
export const baseDialogPrimary = tw('h-15 min-w-28 whitespace-nowrap sm:h-11 sm:min-w-20')
export const baseDialogSecondary = tw(
  'sm:btn-sm h-15 min-w-28 whitespace-nowrap text-xl leading-[inherit] sm:h-11 sm:min-w-20',
)
export const baseDialogFooter = tw('flex w-full justify-center gap-4')
