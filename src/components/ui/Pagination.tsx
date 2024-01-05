import { cn } from '@/utils'
import { Link, type LinkProps } from '@tanstack/react-router'
import { useState, type ComponentProps, useEffect } from 'react'
import { ChevronLeftIcon, ChevronRightIcon, EllipsisIcon } from './icons'

export function Pagination({
  className,
  currentPage,
  totalPages,
  ...props
}: Omit<ComponentProps<'nav'>, 'children'> & {
  currentPage: number
  totalPages?: number
}) {
  if (totalPages === undefined) {
    return null
  }

  return (
    <nav role='navigation' aria-label='pagination' className={className} {...props}>
      <ul className='flex'>
        <PaginationLink
          className={cn({ invisible: currentPage === 1 })}
          search={(prev) => ({ ...prev, page: currentPage - 1 })}
        >
          <ChevronLeftIcon />
        </PaginationLink>
        {getLinks(currentPage, totalPages).map((link) => (
          <PaginationLink key={link.page} search={(prev) => ({ ...prev, page: link.page })}>
            {link.type === 'ellipsis' ? <EllipsisIcon className='mt-[0.375rem]' /> : link.page}
          </PaginationLink>
        ))}
        <PaginationLink
          className={cn({ invisible: currentPage === totalPages })}
          search={(prev) => ({ ...prev, page: currentPage + 1 })}
        >
          <ChevronRightIcon />
        </PaginationLink>
      </ul>
    </nav>
  )
}

function PaginationLink({ children, className, ...props }: LinkProps) {
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

function getLinks(currentPage: number, totalPages: number) {
  const TOTAL_LINKS = 7
  const reach = Math.floor(TOTAL_LINKS / 2)
  let pages: number[] = []

  let diffLeft = 0
  let diffRight = 0
  for (let i = currentPage - reach; i <= currentPage + reach; i++) {
    if (i < 1) {
      diffLeft++
      continue
    }
    if (i > totalPages) {
      diffRight++
      continue
    }
    pages.push(i)
  }
  for (let i = 0; i < diffLeft; i++) {
    pages.push(pages.at(-1)! + 1)
  }
  for (let i = 0; i < diffRight; i++) {
    pages.unshift(pages.at(0)! - 1)
  }
  if (pages[0] > 1) {
    pages[0] = 1
  }
  if (pages[pages.length - 1] < totalPages) {
    pages[pages.length - 1] = totalPages
  }

  pages = pages.filter((page) => page >= 1 && page <= totalPages)

  const canHaveEllipsis = totalPages > TOTAL_LINKS
  if (!canHaveEllipsis) {
    return pages.map((page) => ({ page, type: 'number' }))
  }

  return pages.map((page, index) => {
    const isLeftEllipsis = index === 1 && page - 1 !== pages[index - 1]
    const isRightEllipsis = index === pages.length - 2 && page + 1 !== pages[index + 1]
    return { page, type: isLeftEllipsis || isRightEllipsis ? 'ellipsis' : 'number' }
  })
}
