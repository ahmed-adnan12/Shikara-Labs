import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import NeedSection from '../components/NeedSection'
import ObjectivesSection from '../components/ObjectivesSection'
import BenefitsSection from '../components/BeneFitsSsection'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div>
        <Header/>
        <Hero/>
        <NeedSection/>
        <ObjectivesSection/>
        <BenefitsSection/>
        <ContactSection/>
        <Footer/>
    </div>
  )
}
