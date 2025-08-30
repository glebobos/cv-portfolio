import { Heart, Github, Linkedin, Mail } from 'lucide-react';
import { markdownResumeData } from '../data/markdownResumeData';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary-900 text-white py-12 no-print">
      <div className="container section-padding">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">
                  {markdownResumeData.personalInfo.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <h3 className="text-lg font-bold">{markdownResumeData.personalInfo.name}</h3>
            </div>
            <p className="text-secondary-300 leading-relaxed">
              Building the future of cloud infrastructure, one solution at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              {[
                { href: '#about', label: 'About' },
                { href: '#experience', label: 'Experience' },
                { href: '#skills', label: 'Skills' },
                { href: '#projects', label: 'Projects' },
                { href: '#contact', label: 'Contact' },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-secondary-300 hover:text-primary-400 transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Get In Touch</h4>
            <div className="space-y-3">
              <a
                href={`mailto:${markdownResumeData.personalInfo.email}`}
                className="flex items-center space-x-2 text-secondary-300 hover:text-primary-400 transition-colors duration-200"
              >
                <Mail size={16} />
                <span>{markdownResumeData.personalInfo.email}</span>
              </a>
              <div className="flex space-x-4 pt-2">
                <a
                  href={markdownResumeData.personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary-300 hover:text-primary-400 transition-colors duration-200"
                >
                  <Github size={20} />
                </a>
                <a
                  href={markdownResumeData.personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary-300 hover:text-primary-400 transition-colors duration-200"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-secondary-400 flex items-center">
            © {currentYear} {markdownResumeData.personalInfo.name}. Made with{' '}
            <Heart size={16} className="mx-1 text-red-500" fill="currentColor" />
            and lots of coffee.
          </p>
          <p className="text-secondary-400 mt-2 md:mt-0">
            Built with React, TypeScript & Docker
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
