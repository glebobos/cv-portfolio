import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Download, Mail, Github, Linkedin } from 'lucide-react';
import { markdownResumeData } from '../data/markdownResumeData';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#about', label: 'About' },
    { href: '#experience', label: 'Experience' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#education', label: 'Education' },
    { href: '#contact', label: 'Contact' },
  ];

  const socialLinks = [
    { href: markdownResumeData.personalInfo.github, icon: Github, label: 'GitHub' },
    { href: markdownResumeData.personalInfo.linkedin, icon: Linkedin, label: 'LinkedIn' },
    { href: `mailto:${markdownResumeData.personalInfo.email}`, icon: Mail, label: 'Email' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 no-print ${
        isScrolled 
          ? 'glass-effect shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <nav className="container section-padding py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                {markdownResumeData.personalInfo.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-lg text-secondary-900">
                {markdownResumeData.personalInfo.name}
              </h1>
              <p className="text-sm text-secondary-600">Systems Engineer</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                whileHover={{ scale: 1.05 }}
                className="text-secondary-700 hover:text-primary-600 font-medium transition-colors duration-200 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
              </motion.a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-secondary-600 hover:text-primary-600 transition-colors duration-200"
                aria-label={link.label}
              >
                <link.icon size={20} />
              </motion.a>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary ml-4"
              onClick={() => window.print()}
            >
              <Download size={18} className="mr-2" />
              Download CV
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-secondary-700 hover:text-primary-600 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isMenuOpen ? 1 : 0, 
            height: isMenuOpen ? 'auto' : 0 
          }}
          transition={{ duration: 0.3 }}
          className="lg:hidden overflow-hidden"
        >
          <div className="pt-4 pb-6 space-y-4">
            {navItems.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                whileHover={{ x: 10 }}
                className="block text-secondary-700 hover:text-primary-600 font-medium transition-colors duration-200"
              >
                {item.label}
              </motion.a>
            ))}
            
            <div className="flex items-center space-x-4 pt-4 border-t border-secondary-200">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-secondary-600 hover:text-primary-600 transition-colors duration-200"
                  aria-label={link.label}
                >
                  <link.icon size={20} />
                </motion.a>
              ))}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary flex-1"
                onClick={() => window.print()}
              >
                <Download size={18} className="mr-2" />
                Download CV
              </motion.button>
            </div>
          </div>
        </motion.div>
      </nav>
    </motion.header>
  );
};

export default Header;
