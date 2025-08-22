import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Calendar } from 'lucide-react';
import { markdownResumeData } from '../data/markdownResumeData';

const Education = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Use markdown data (single source of truth)
  const educationData = markdownResumeData.education;

  return (
    <section id="education" className="py-20 bg-white">
      <div className="container section-padding">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <h2 className="section-header">Education & Background</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-primary-700 mx-auto mb-8"></div>
            <p className="text-secondary-600 max-w-2xl mx-auto">
              Academic foundation and continuous learning journey that supports technical expertise and innovation.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Formal Education from Markdown */}
            <div className="space-y-8">
              {educationData.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-secondary-50 rounded-xl p-6 border border-secondary-100 hover:border-primary-200 transition-colors duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-primary-100 p-3 rounded-lg">
                      <GraduationCap className="w-6 h-6 text-primary-600" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-secondary-900 mb-1">
                            {edu.degree}
                          </h3>
                          <h4 className="text-lg font-semibold text-primary-600 mb-1">
                            {edu.field}
                          </h4>
                          <p className="text-secondary-700 font-medium">
                            {edu.institution}
                          </p>
                        </div>
                        
                        <div className="lg:text-right">
                          <span className="inline-flex items-center gap-1 bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                            <Calendar className="w-3 h-3" />
                            {edu.period}
                          </span>
                        </div>
                      </div>
                      
                      {edu.details && edu.details.length > 0 && (
                        <div className="space-y-2">
                          {edu.details.map((detail, detailIndex) => (
                            <div key={detailIndex} className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                              <p className="text-secondary-700">{detail}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Professional Development & Continuous Learning */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12"
            >
              <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-secondary-900 mb-6 text-center">
                  Professional Development & Continuous Learning
                </h3>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-primary-100">
                    <div className="text-center">
                      <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">🔧</span>
                      </div>
                      <h4 className="font-semibold text-secondary-900 mb-2">
                        Engineering Background
                      </h4>
                      <p className="text-sm text-secondary-600">
                        10+ years in mechanical engineering with expertise in off-road vehicle design and serial production
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-primary-100">
                    <div className="text-center">
                      <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">📚</span>
                      </div>
                      <h4 className="font-semibold text-secondary-900 mb-2">
                        Daily Learning
                      </h4>
                      <p className="text-sm text-secondary-600">
                        Continuous technology exploration with rapid adoption of emerging tools and platforms
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-primary-100">
                    <div className="text-center">
                      <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">☁️</span>
                      </div>
                      <h4 className="font-semibold text-secondary-900 mb-2">
                        Multi-Cloud Expertise
                      </h4>
                      <p className="text-sm text-secondary-600">
                        Cross-platform expertise across AWS, Azure, and GCP with language agility in multiple technologies
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Future Development Goals */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8"
            >
              <div className="bg-white rounded-xl p-6 shadow-md border border-secondary-100">
                <h3 className="text-lg font-semibold text-secondary-900 mb-4 text-center">
                  Future Development Objectives
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-primary-600 mb-2">Short-term (6-12 months)</h4>
                    <ul className="space-y-1 text-sm text-secondary-600">
                      <li>• Advance to Principal Engineer role</li>
                      <li>• Deepen GCP expertise</li>
                      <li>• Enhance security specialization</li>
                      <li>• Expand Go programming skills</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-primary-600 mb-2">Long-term (1-3 years)</h4>
                    <ul className="space-y-1 text-sm text-secondary-600">
                      <li>• Lead SWAT technical initiatives</li>
                      <li>• Contribute to AWS Proton adoption</li>
                      <li>• Develop advanced AI/ML integration</li>
                      <li>• Establish thought leadership</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
