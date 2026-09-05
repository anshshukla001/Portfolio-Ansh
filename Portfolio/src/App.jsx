import { Suspense, lazy } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'

// Performance optimization: Lazy-load below-the-fold sections
const About = lazy(() => import('./components/About'))
const Education = lazy(() => import('./components/Education'))
const Skills = lazy(() => import('./components/Skills'))
const Projects = lazy(() => import('./components/Projects'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))

// Skeleton Fallback for smooth UX
function SectionFallback() {
  return (
    <div style={{
      minHeight: '300px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--text-muted)',
      fontFamily: 'var(--font-mono)',
      fontSize: '14px'
    }}>
      Loading...
    </div>
  )
}

function App() {
  return (
    <div className="app">
      <div className="bg-grid" />
      <div className="bg-glow bg-glow-1" />
      <div className="bg-glow bg-glow-2" />

      <Navbar />
      <Hero />

      <Suspense fallback={<SectionFallback />}>
        <About />
        <Education />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </Suspense>
    </div>
  )
}

export default App
