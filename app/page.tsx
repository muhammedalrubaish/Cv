import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Templates from '@/components/Templates'
import HowItWorks from '@/components/HowItWorks'
import Pricing from '@/components/Pricing'
import Testimonials from '@/components/Testimonials'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <Templates />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <Footer />
      <WhatsAppFloat />
    </main>
  )
}
