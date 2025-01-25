/* eslint-disable @typescript-eslint/no-unsafe-return */
import { ChevronLeftIcon, EllipsisIcon, ChevronRightIcon } from '@/components/ui'
import { cn } from '@/utils'
import { Link, type LinkComponent } from '@tanstack/react-router'
import { type ComponentProps } from 'react'

export function Pagination({
  className,
  currentPage,
  pages,
  ...props
}: Omit<ComponentProps<'nav'>, 'children'> & {
  currentPage: number | undefined
  pages: number | undefined
}) {
  if (pages === undefined || pages === 0 || currentPage === undefined) {
    return null
  }

  return (
    <nav role='navigation' aria-label='pagination' className={className} {...props}>
      <ul className='flex'>
        <PaginationLink
          className={cn({ invisible: currentPage === 1 })}
          // @ts-expect-error TODO: fix this later maybe
          search={(prev) => ({ ...prev, page: currentPage - 1 })}
        >
          <ChevronLeftIcon />
        </PaginationLink>
        {getLinks(currentPage, pages).map((link) => (
          // @ts-expect-error TODO: fix this later maybe
          <PaginationLink key={link.page} search={(prev) => ({ ...prev, page: link.page })}>
            {link.type === 'ellipsis' ? (
              <EllipsisIcon className='mt-[0.375rem]' />
            ) : (
              <span className='vertical-alignment-fix'>{link.page}</span>
            )}
          </PaginationLink>
        ))}
        <PaginationLink
          className={cn({ invisible: currentPage === pages })}
          // @ts-expect-error TODO: fix this later maybe
          search={(prev) => ({ ...prev, page: currentPage + 1 })}
        >
          <ChevronRightIcon />
        </PaginationLink>
      </ul>
    </nav>
  )
}

type PaginationLinkProps = ComponentProps<LinkComponent<'a'>>
function PaginationLink({ children, className, ...props }: PaginationLinkProps) {
  return (
    <li>
      <Link
        {...props}
        className={cn(
          'outline-ring transition-base flex h-11 w-11 items-center justify-center text-grey-40 hover:text-primary-60 active:text-primary-80 [&.active]:text-primary-60',
          className,
        )}
      >
        {children}
      </Link>
    </li>
  )
}

function getLinks(currentPage: number, pages: number) {
  const TOTAL_LINKS = 7
  const reach = Math.floor(TOTAL_LINKS / 2)
  let links: number[] = []

  let diffLeft = 0
  let diffRight = 0
  for (let i = currentPage - reach; i <= currentPage + reach; i++) {
    if (i < 1) {
      diffLeft++
      continue
    }
    if (i > pages) {
      diffRight++
      continue
    }
    links.push(i)
  }
  for (let i = 0; i < diffLeft; i++) {
    links.push(links.at(-1)! + 1)
  }
  for (let i = 0; i < diffRight; i++) {
    links.unshift(links.at(0)! - 1)
  }
  if (links[0] > 1) {
    links[0] = 1
  }
  if (links[links.length - 1] < pages) {
    links[links.length - 1] = pages
  }

  links = links.filter((page) => page >= 1 && page <= pages)

  const canHaveEllipsis = pages > TOTAL_LINKS
  if (!canHaveEllipsis) {
    return links.map((page) => ({ page, type: 'number' }))
  }

  return links.map((page, index) => {
    const isLeftEllipsis = index === 1 && page - 1 !== links[index - 1]
    const isRightEllipsis = index === links.length - 2 && page + 1 !== links[index + 1]
    return { page, type: isLeftEllipsis || isRightEllipsis ? 'ellipsis' : 'number' }
  })
}
