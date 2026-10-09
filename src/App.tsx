import { ReactLenis } from 'lenis/react'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Services } from './components/Services'
import { Projects } from './components/Projects'
import { Stats } from './components/Stats'
import { Gallery } from './components/Gallery'
import { Reviews } from './components/Reviews'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

export function App() {
  return (
    <ReactLenis root>
      <div className="min-h-screen bg-[#ffffff] text-[#111111] selection:bg-[#111111] selection:text-[#ffffff]">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Services />
          <Projects />
          <Stats />
          <Gallery />
          <Reviews />
          <Contact />
        </main>
        <Footer />
      </div>
    </ReactLenis>
  )
}

export default App
