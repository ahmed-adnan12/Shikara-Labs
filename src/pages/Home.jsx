import Hero from '../components/Hero'
import NeedSection from '../components/NeedSection'
import ObjectivesSection from '../components/ObjectivesSection'
import BenefitsSection from '../components/BeneFitsSsection'
import ContactSection from '../components/ContactSection'

export default function Home() {
  return (
    <div>
        <Hero/>
        <NeedSection/>
        <ObjectivesSection/>
        <BenefitsSection/>
        <ContactSection/>
    </div>
  )
}
