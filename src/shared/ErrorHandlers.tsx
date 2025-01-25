import { Navigate } from '@tanstack/react-router'
import { type AxiosError } from 'axios'
import { type ReactNode } from 'react'

// this handles the case when the page number is greater than the total number of pages, so that we can redirect to the first page
export function PaginationInvalidPageHandler({ children, error }: { children: ReactNode; error: AxiosError | null }) {
  if (isCustomError(error, 'Invalid page.')) {
    // @ts-expect-error TODO: fix this maybe
    return <Navigate search={(prev) => ({ ...prev, page: 1 })} replace />
  }
  return children
}

export function NotFoundHandler({ children, error }: { children: ReactNode; error: AxiosError | null }) {
  if (isCustomError(error, 'Not found.')) {
    return <Navigate to='/404' />
  }
  return children
}

function isCustomError(error: AxiosError | null, detail: string) {
  const response = error?.response
  return (
    response?.status === 404 &&
    response.data &&
    typeof response.data === 'object' &&
    'detail' in response.data &&
    response.data.detail === detail
  )
}
