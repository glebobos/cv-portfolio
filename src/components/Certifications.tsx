import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Award } from 'lucide-react';
import { markdownResumeData } from '../data/markdownResumeData';

const Certifications = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Group certifications by issuer
  const certificationGroups = markdownResumeData.certifications.reduce((groups, cert) => {
    const key = cert.issuer;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(cert);
    return groups;
  }, {} as Record<string, typeof markdownResumeData.certifications>);

  const getIssuerIcon = (issuer: string) => {
    if (issuer.includes('AWS') || issuer.includes('Amazon')) return '☁️';
    if (issuer.includes('Microsoft') || issuer.includes('Azure')) return '🔷';
    if (issuer.includes('Google') || issuer.includes('GCP')) return '🟢';
    if (issuer.includes('HashiCorp')) return '🟣';
    if (issuer.includes('Kubernetes') || issuer.includes('Cloud Native')) return '⚡';
    if (issuer.includes('Docker')) return '🐳';
    if (issuer.includes('GitHub')) return '🐙';
    return '🏆';
  };

  return (
    <section id="certifications" className="py-20 bg-secondary-50">
      <div className="container section-padding">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <h2 className="section-header">Professional Certifications</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-primary-700 mx-auto mb-8"></div>
            <p className="text-secondary-600 max-w-2xl mx-auto">
              Industry-recognized certifications demonstrating expertise across cloud platforms, DevOps, and enterprise technologies.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid gap-8">
              {Object.entries(certificationGroups).map(([issuer, certs], groupIndex) => (
                <motion.div
                  key={issuer}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: groupIndex * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-primary-500 to-primary-700 p-6">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{getIssuerIcon(issuer)}</span>
                      <h3 className="text-xl font-bold text-white">{issuer}</h3>
                      <span className="ml-auto bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {certs.length} {certs.length === 1 ? 'Certification' : 'Certifications'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {certs.map((cert, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={inView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ duration: 0.5, delay: (groupIndex * 0.1) + (index * 0.05) }}
                          className="group"
                        >
                          <div className="bg-secondary-50 rounded-xl p-4 h-full hover:bg-primary-50 transition-all duration-300 border border-transparent hover:border-primary-200 hover:shadow-md">
                            <div className="flex items-start justify-between mb-3">
                              <Award className="w-5 h-5 text-primary-500 flex-shrink-0 mt-1" />
                              {cert.link && cert.link !== '#' && (
                                <a 
                                  href={cert.link} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-primary-500 hover:text-primary-700 transition-colors duration-300"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              )}
                            </div>
                            
                            <h4 className="font-semibold text-secondary-900 group-hover:text-primary-700 transition-colors duration-300 leading-tight mb-2">
                              {cert.name}
                            </h4>
                            
                            <div className="text-sm text-secondary-600">
                              <span className="font-medium">Issued:</span> {cert.date}
                            </div>
                            
                            {cert.expiryDate && (
                              <div className="text-sm text-secondary-600 mt-1">
                                <span className="font-medium">Expires:</span> {cert.expiryDate}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 text-center"
            >
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">Certification Summary</h3>
                <div className="flex flex-wrap justify-center gap-4 text-sm text-secondary-600">
                  <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full">
                    Total: {markdownResumeData.certifications.length} Certifications
                  </span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                    Active & Current
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                    Continuously Updated
                  </span>
                </div>
                <p className="text-xs text-secondary-500 mt-3">
                  All certifications can be verified through respective vendor verification systems
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
