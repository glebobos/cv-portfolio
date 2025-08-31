import React, { useEffect } from 'react';
import Awards from './components/Awards';
import Certifications from './components/Certifications';
import Education from './components/Education';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Publications from './components/Publications';
import Skills from './components/Skills';
import Hero from './components/Hero';
import Contact from './components/Contact';

const PrintPage: React.FC = () => {
  useEffect(() => {
    window.print();
  }, []);

  return (
    <div className="bg-white text-black">
      <main className="p-8">
        <Hero isPrintView={true} />
        <Experience isPrintView={true} />
        <Skills isPrintView={true} />
        <Projects isPrintView={true} />
        <Education isPrintView={true} />
        <Certifications isPrintView={true} />
        <Awards isPrintView={true} />
        <Publications isPrintView={true} />
        <Contact isPrintView={true} />
      </main>
    </div>
  );
};

export default PrintPage;
