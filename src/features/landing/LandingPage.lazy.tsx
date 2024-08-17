import { createLazyRoute } from '@tanstack/react-router'
import { Header } from './sections/Header'
import { HeroSection } from './sections/HeroSection'
import { Container } from './components/Container'
import { AboutSection } from './sections/AboutSection'

export const Route = createLazyRoute('/landing')({
  component: LandingPage,
})

function LandingPage() {
  return (
    <>
      <Header />
      <main className='bg-black-120 pb-6 text-lg text-grey-40'>
        <Container className='space-y-20'>
          <HeroSection />
          <AboutSection />
        </Container>
      </main>
    </>
  )
}
