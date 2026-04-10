import { useState } from 'react'
import AnnouncementBar from './components/layout/AnnouncementBar.jsx'
import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'
import Hero from './components/sections/Hero.jsx'
import Ticker from './components/sections/Ticker.jsx'
import Mission from './components/sections/Mission.jsx'
import DigitalPipeline from './components/sections/digitalPipelineIndex.jsx'
import Sustainability from './components/sections/Sustainability/index.jsx'
import IndustryApplications from './components/sections/IndustryApplications/index.jsx'
import GlobalSupply from './components/sections/GlobalSupply/index.jsx'
import QuoteModal from './components/ui/QuoteModal.jsx'

function App() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false)

  return (
    <div className="min-h-screen w-full bg-bg text-text transition-colors duration-300">
      <div className="w-full">
        <AnnouncementBar />
        <Navbar />
        <Hero onOpenQuote={() => setIsQuoteOpen(true)} />
        <Ticker />
        <Mission />
        <DigitalPipeline />
        <Sustainability />
        <IndustryApplications />
        <GlobalSupply />
        <Footer />
      </div>
      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </div>
  )
}

export default App
