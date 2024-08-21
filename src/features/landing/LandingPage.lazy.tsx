import { createLazyRoute } from '@tanstack/react-router'
import { Header } from './sections/Header'
import { HeroSection } from './sections/HeroSection'
import { AboutSection } from './sections/AboutSection'
import { FeaturesSection } from './sections/FeaturesSection'
import featuresBackground from './assets/features-bg.svg'
import { GuideSection } from './sections/GuideSection'
import { ContactsSection } from './sections/ContactsSection'
import { AcknowledgmentsSection } from './sections/AcknowledgmentsSection'
import { Footer } from './sections/Footer'

export const Route = createLazyRoute('/landing')({
  component: LandingPage,
})

const NAVIGATION_ANCHORS = {
  about: { id: 'about', name: 'About' },
  features: { id: 'features', name: 'Features' },
  guide: { id: 'guide', name: 'Guide' },
  contacts: { id: 'contacts', name: 'Contacts' },
}

function LandingPage() {
  return (
    <div className='bg-black-120 text-lg text-grey-40'>
      <Header navigationAnchors={Object.values(NAVIGATION_ANCHORS)} />
      <main className='space-y-40'>
        <HeroSection />
        <AboutSection className='relative z-10' id={NAVIGATION_ANCHORS.about.id} />
        <div className='relative'>
          <img src={featuresBackground} loading='lazy' className='top absolute bottom-[calc(100%-28rem)] w-screen' />
          <FeaturesSection className='relative' id={NAVIGATION_ANCHORS.features.id} />
        </div>
        <GuideSection id={NAVIGATION_ANCHORS.guide.id} />
        <ContactsSection id={NAVIGATION_ANCHORS.contacts.id} />
        <AcknowledgmentsSection />
      </main>
      <Footer className='mt-40' navigationAnchors={Object.values(NAVIGATION_ANCHORS)} />
    </div>
  )
}
