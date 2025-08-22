import { motion } from 'framer-motion';
import { ChevronDown, Download, Mail } from 'lucide-react';
import { markdownResumeData } from '../data/markdownResumeData';

const Hero = () => {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50" />
      
      {/* Floating shapes */}
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
        <div className="text-center max-w-4xl mx-auto">
          {/* Profile Image */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8"
          >
            <div className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-6 relative">
              <img 
                src={`${import.meta.env.BASE_URL}images/${markdownResumeData.personalInfo.avatar || 'avatar.jpg'}`}
                alt={markdownResumeData.personalInfo.name}
                className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-4 border-dashed border-primary-300 rounded-full"
              />
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <motion.h1 
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-secondary-900 mb-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <span className="gradient-text">
                  {markdownResumeData.personalInfo.name}
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-secondary-600 mb-6 leading-relaxed"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                {markdownResumeData.personalInfo.title}
              </motion.p>
            </div>

            <motion.p 
              className="text-lg text-secondary-700 max-w-3xl mx-auto leading-relaxed"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              Architect of innovative cloud solutions with ~5 years of impact in enterprise environments.
              Leading 70+ developers across 24+ production environments with a focus on serverless transformation
              and DevOps excellence.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
              >
                <Download size={20} className="mr-2" />
                Download Resume
              </motion.button>
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

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              {[
                { number: '5+', label: 'Years Experience' },
                { number: '70+', label: 'Developers Mentored' },
                { number: '24+', label: 'Production Environments' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.6 + index * 0.1, duration: 0.5 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold gradient-text">
                    {stat.number}
                  </div>
                  <div className="text-secondary-600 mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.6 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
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
        </div>
      </div>
    </section>
  );
};

export default Hero;
