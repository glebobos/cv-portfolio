import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown, Download, Mail } from 'lucide-react';
import { markdownResumeData } from '../data/markdownResumeData';
import { MarkdownRenderer } from './MarkdownRenderer';

interface HeroProps {
  isPrintView?: boolean;
}

const Hero = ({ isPrintView = false }: HeroProps) => {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const ctaButtons = (
    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 no-print">
      <Link to="/print" className="btn-primary">
        <Download size={20} className="mr-2" />
        Download CV
      </Link>
      <a
        href={`mailto:${markdownResumeData.personalInfo.email}`}
        className="btn-secondary"
      >
        <Mail size={20} className="mr-2" />
        Get In Touch
      </a>
    </div>
  );

  const animatedCtaButtons = (
    <motion.div
      className="flex flex-col sm:flex-row gap-4 justify-center pt-8 no-print"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.6 }}
    >
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link to="/print" className="btn-primary">
          <Download size={20} className="mr-2" />
          Download CV
        </Link>
      </motion.div>
      <motion.a
        href={`mailto:${markdownResumeData.personalInfo.email}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="btn-secondary"
      >
        <Mail size={20} className="mr-2" />
        Get In Touch
      </motion.a>
    </motion.div>
  );

  const content = (
    <div className="text-center max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-6 relative">
          <img
            src={`${import.meta.env.BASE_URL}images/${markdownResumeData.personalInfo.avatar || 'avatar.svg'}`}
            alt={markdownResumeData.personalInfo.name}
            className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
          />
          {!isPrintView && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-4 border-dashed border-primary-300 rounded-full"
            />
          )}
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-secondary-900 mb-4">
            <span className={!isPrintView ? "gradient-text" : ""}>
              {markdownResumeData.personalInfo.name}
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-secondary-600 mb-6 leading-relaxed">
            {markdownResumeData.personalInfo.title}
          </p>
        </div>

        <div className="text-lg text-secondary-700 max-w-3xl mx-auto leading-relaxed">
          <MarkdownRenderer content={markdownResumeData.summary} />
        </div>

        {isPrintView ? ctaButtons : animatedCtaButtons}
      </div>

      {!isPrintView && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 no-print"
        >
          <motion.button
            onClick={scrollToAbout}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="p-2 text-secondary-400 hover:text-primary-600 transition-colors duration-200"
            aria-label="Scroll to about section"
          >
            <ChevronDown size={24} />
          </motion.button>
        </motion.div>
      )}
    </div>
  );

  if (isPrintView) {
    return (
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="container section-padding relative z-10">{content}</div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50" />
      
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-primary-200 to-primary-300 rounded-full opacity-20 blur-3xl"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1.1, 1, 1.1],
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-r from-secondary-200 to-secondary-300 rounded-full opacity-20 blur-3xl"
        />
      </div>

      <div className="container section-padding relative z-10">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {content}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
