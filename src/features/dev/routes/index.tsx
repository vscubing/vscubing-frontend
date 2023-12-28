import { rootRoute } from '@/router'
import { Route } from '@tanstack/react-router'
import { UiKit } from './UiKit'
import { ResetSession } from './ResetSession'

const route = new Route({
  getParentRoute: () => rootRoute,
  path: 'dev',
})

const resetSessionRoute = new Route({
  getParentRoute: () => route,
  path: 'reset-session',
  component: ResetSession,
})

const uiKitRoute = new Route({
  getParentRoute: () => route,
  path: 'ui-kit',
  component: UiKit,
})

export const devRoute = route.addChildren([resetSessionRoute, uiKitRoute])
