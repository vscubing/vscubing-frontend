import { appRoute } from '@/router'
import { createRoute } from '@tanstack/react-router'
import { SettingsPage } from './SettingsPage'

export const settingsRoute = createRoute({
  getParentRoute: () => appRoute,
  path: '/settings',
  component: SettingsPage,
})
