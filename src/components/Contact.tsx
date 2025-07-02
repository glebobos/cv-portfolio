import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';
import { markdownResumeData } from '../data/markdownResumeData';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: markdownResumeData.personalInfo.email,
      href: `mailto:${markdownResumeData.personalInfo.email}`
    },
    {
      icon: Phone,
      label: 'Phone',
      value: markdownResumeData.personalInfo.phone,
      href: `tel:${markdownResumeData.personalInfo.phone}`
    },
    {
      icon: MapPin,
      label: 'Location',
      value: markdownResumeData.personalInfo.location,
      href: '#'
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: markdownResumeData.personalInfo.github
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: markdownResumeData.personalInfo.linkedin
    }
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container section-padding">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <h2 className="section-header">Get In Touch</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-primary-700 mx-auto mb-8"></div>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Ready to discuss your next project or explore collaboration opportunities? 
              I'd love to hear from you!
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-2xl font-bold text-secondary-900 mb-6">
                    Contact Information
                  </h3>
                  
                  <div className="space-y-4">
                    {contactInfo.map((item, index) => (
                      <motion.a
                        key={item.label}
                        href={item.href}
                        whileHover={{ x: 10 }}
                        className="flex items-center space-x-4 p-4 rounded-lg bg-secondary-50 hover:bg-primary-50 transition-colors duration-200 group"
                      >
                        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors duration-200">
                          <item.icon className="w-6 h-6 text-primary-600" />
                        </div>
                        <div>
                          <p className="font-medium text-secondary-900">{item.label}</p>
                          <p className="text-secondary-600">{item.value}</p>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div>
                  <h4 className="text-lg font-semibold text-secondary-900 mb-4">
                    Follow Me
                  </h4>
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center hover:bg-primary-200 transition-colors duration-200"
                      >
                        <social.icon className="w-6 h-6 text-primary-600" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* CTA Section */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-8"
              >
                <h3 className="text-2xl font-bold text-secondary-900 mb-4">
                  Ready to Work Together?
                </h3>
                <p className="text-secondary-600 mb-6 leading-relaxed">
                  Whether you're looking for cloud architecture expertise, DevOps automation, 
                  or technical leadership, I'm here to help bring your vision to life.
                </p>
                
                <div className="space-y-4">
                  <motion.a
                    href={`mailto:${markdownResumeData.personalInfo.email}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary w-full justify-center"
                  >
                    <Mail size={20} className="mr-2" />
                    Send Email
                  </motion.a>
                  
                  <motion.a
                    href={markdownResumeData.personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-secondary w-full justify-center"
                  >
                    <Linkedin size={20} className="mr-2" />
                    Connect on LinkedIn
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
