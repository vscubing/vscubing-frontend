import { createLazyRoute } from '@tanstack/react-router'
import { Header } from './sections/Header'
import { HeroSection } from './sections/HeroSection'
import { AboutSection } from './sections/AboutSection'
import { FeaturesSection } from './sections/FeaturesSection'
import aboutBackground from './assets/about-bg.svg'
import { GuideSection } from './sections/GuideSection'
import { ContactsSection } from './sections/ContactsSection'

export const Route = createLazyRoute('/landing')({
  component: LandingPage,
})

function LandingPage() {
  return (
    <>
      <Header />
      <main className='space-y-40 bg-black-120 pb-6 text-lg text-grey-40'>
        <HeroSection />
        <AboutSection className='relative z-10' />
        <div className='relative'>
          <img src={aboutBackground} className='top absolute bottom-[calc(100%-6rem)] w-screen' />
          <FeaturesSection className='relative' />
        </div>
        <GuideSection />
        <ContactsSection />
      </main>
    </>
  )
}
