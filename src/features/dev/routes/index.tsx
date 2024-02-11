import { rootRoute } from '@/router'
import { createRoute } from '@tanstack/react-router'
import { UiKit } from './UiKit'
import { ResetSession } from './ResetSession'

const route = createRoute({
  getParentRoute: () => rootRoute,
  path: 'dev',
})

const resetSessionRoute = createRoute({
  getParentRoute: () => route,
  path: 'reset-session',
  component: ResetSession,
})

const uiKitRoute = createRoute({
  getParentRoute: () => route,
  path: 'ui-kit',
  component: UiKit,
})

export const devRoute = route.addChildren([resetSessionRoute, uiKitRoute])
