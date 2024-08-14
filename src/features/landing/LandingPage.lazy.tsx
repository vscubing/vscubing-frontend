import { PrimaryButton } from '@/components/ui'
import { Link, createLazyRoute } from '@tanstack/react-router'

export const Route = createLazyRoute('/landing')({
  component: LandingPage,
})

function LandingPage() {
  return (
    <>
      <div className='title-lg h-screen w-screen p-20'>
        <h1>LandingPage</h1>
        <PrimaryButton asChild>
          <Link to='/'>Back to dashboard</Link>
        </PrimaryButton>
      </div>
    </>
  )
}
