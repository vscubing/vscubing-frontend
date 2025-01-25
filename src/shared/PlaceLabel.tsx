import { cn } from '@/utils'
import { Link } from '@tanstack/react-router'

type PlaceLabelProps = {
  children: number
  linkToPage?: number
  className?: string
}
export function PlaceLabel({ children: place, linkToPage, className }: PlaceLabelProps) {
  const Comp = linkToPage ? Link : 'span'
  return (
    <Comp
      // @ts-expect-error TODO: fix this later maybe
      search={linkToPage ? (prev) => ({ ...prev, page: linkToPage }) : undefined}
      className={cn(
        'vertical-alignment-fix text-large flex h-11 w-11 items-center justify-center rounded-full border border-primary-60 sm:h-9 sm:w-9 sm:py-0',
        {
          'transition-base outline-ring hover:border-primary-80 active:border-primary-80 active:text-primary-80':
            !!linkToPage,
        },
        className,
      )}
    >
      {place}
    </Comp>
  )
}
