import { appRoute } from '@/router'
import { createRoute } from '@tanstack/react-router'
import { UiKit } from './UiKit'
import { ResetSession } from './ResetSession'
import { SimulatorPage } from './PocCstimer'

const route = createRoute({
  getParentRoute: () => appRoute,
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

const csPocRouter = createRoute({
  getParentRoute: () => route,
  path: 'poc-cstimer',
  component: SimulatorPage,
})

export const devRoute = route.addChildren([resetSessionRoute, uiKitRoute, csPocRouter])
