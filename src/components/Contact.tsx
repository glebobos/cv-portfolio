import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';
import { markdownResumeData } from '../data/markdownResumeData';

interface ContactProps {
  isPrintView?: boolean;
}

const Contact = ({ isPrintView = false }: ContactProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    skip: isPrintView,
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

  const content = (
    <>
      <div className="text-center mb-16">
        <h2 className="section-header">Get In Touch</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-primary-700 mx-auto mb-8"></div>
        <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
          Ready to discuss your next project or explore collaboration opportunities?
          I&apos;d love to hear from you!
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-secondary-900 mb-6">
                Contact Information
              </h3>

              <div className="space-y-4">
                {contactInfo.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center space-x-4 p-4 rounded-lg bg-secondary-50 hover:bg-primary-50 transition-colors duration-200 group"
                  >
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors duration-200">
                      <item.icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium text-secondary-900">{item.label}</p>
                      <p className="text-secondary-600">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold text-secondary-900 mb-4">
                Follow Me
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center hover:bg-primary-200 transition-colors duration-200"
                  >
                    <social.icon className="w-6 h-6 text-primary-600" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-secondary-900 mb-4">
              Ready to Work Together?
            </h3>
            <p className="text-secondary-600 mb-6 leading-relaxed">
              Whether you&apos;re looking for cloud architecture expertise, DevOps automation,
              or technical leadership, I&apos;m here to help bring your vision to life.
            </p>

            <div className="space-y-4">
              <a
                href={`mailto:${markdownResumeData.personalInfo.email}`}
                className="btn-primary w-full justify-center"
              >
                <Mail size={20} className="mr-2" />
                Send Email
              </a>

              <a
                href={markdownResumeData.personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full justify-center"
              >
                <Linkedin size={20} className="mr-2" />
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <section id="contact" className="py-20 bg-white no-print overflow-x-hidden print:overflow-x-visible">
      <div className="container section-padding">
        {isPrintView ? (
          <div>{content}</div>
        ) : (
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {content}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Contact;
