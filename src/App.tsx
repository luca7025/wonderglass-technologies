import { lazy, Suspense } from 'react'
import { ReactLenis } from 'lenis/react'
import { Splash } from './components/ui/Splash'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Services } from './components/Services'
import { Projects } from './components/Projects'
import { Stats } from './components/Stats'
import { Gallery } from './components/Gallery'
import { Reviews } from './components/Reviews'
import { Contact } from './components/Contact'
import { Location } from './components/Location'
import { Footer } from './components/Footer'

const ChatBot = lazy(() =>
  import('./components/ChatBot').then((mod) => ({ default: mod.ChatBot }))
)

export function App() {
  return (
    <>
      <Splash text="WONDERGLASS" />
      <ReactLenis root>
        <div className="min-h-screen bg-[#ffffff] text-[#111111] selection:bg-[#111111] selection:text-[#ffffff]">
          <Navbar />
          <main className="pt-20 md:pt-[84px]">
            <Hero />
            <About />
            <Services />
            <Projects />
            <Stats />
            <Gallery />
            <Reviews />
            <Contact />
            <Location />
          </main>
          <Footer />
          <Suspense fallback={null}>
            <ChatBot />
          </Suspense>
        </div>
      </ReactLenis>
    </>
  )
}

export default App
