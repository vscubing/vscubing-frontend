import * as Sonner from 'sonner'

export function Toaster() {
  return (
    <Sonner.Toaster
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: 'bg-grey-80 py-4 pl-4 pr-10 rounded-xl flex gap-4',
          title: 'text-white-100 btn-sm mb-3',
          description: 'text-white caption',
          // we can remove !imporant in actionButton and closeButton after https://github.com/emilkowalski/sonner/issues/321 is fixed
          actionButton:
            'self-end underline underline-offset-2 decoration-from-font -mb-[.15rem] !btn-sm !bg-transparent !text-base !rounded-none !transition-base !outline-ring !inline-flex !items-center !justify-center !h-auto !px-0 !text-primary-80 !hover:text-primary-60 !active:text-primary-80 !disabled:text-grey-60',
          closeButton:
            '!left-auto [&>svg]:!h-[1.1rem] [&>svg]:!w-[1.1rem] [&>svg]:stroke-[.2rem] !right-2 !top-2 !translate-x-0 !translate-y-0 !h-8 !w-8 !bg-transparent !border-none !text-grey-40',
        },
      }}
    ></Sonner.Toaster>
  )
}

export function toast({ title, description }: ToastData, autoClose = true) {
  Sonner.toast(title, {
    closeButton: true,
    description,
    action: { label: 'Contact us', onClick: () => alert('clicked on toast') /* TODO: add contact link (discord?) */ },
    duration: autoClose ? 60_000 : Infinity,
  })
}

type ToastData = { title: string; description: string }
export const TOASTS_PRESETS = {
  noConnection: {
    title: 'Uh-oh! No Internet connection',
    description: 'Check your connection and get back to the fun. Need help?',
  },
  internalError: {
    title: 'Uh-oh! Something went wrong',
    description: 'Give it a moment, or reach out to our support team',
  },
} satisfies Record<string, ToastData>
