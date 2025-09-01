import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Awards from './components/Awards';
import Publications from './components/Publications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';
import PrintPage from './PrintPage';

const MainLayout = () => (
  <div className="relative min-h-screen">
    <ParticleBackground />

    <div className="relative z-10">
      <Header />

      <main>
        <Hero />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <Certifications />
        <Awards />
        <Publications />
        <Contact />
      </main>
      
      <Footer />
    </div>
  </div>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />} />
      <Route path="/print" element={<PrintPage />} />
    </Routes>
  );
}

export default App;
