import { rootRoute } from '@/router'
import { Navigate, createRoute } from '@tanstack/react-router'
import { NotFoundPage } from '.'

export const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '404',
  component: NotFoundPage,
})

// NOTE: this is a workaround because we can't throw notFound() from tanstack/react-router in components
export function NotFoundRedirect() {
  return <Navigate to='/404' />
}
