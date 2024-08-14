import { createLazyRoute } from '@tanstack/react-router'

export const Route = createLazyRoute('/landing')({
  component: LandingPage,
})

function LandingPage() {
  return <div>LandingPage</div>
}
