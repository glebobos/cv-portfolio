import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { markdownResumeData } from '../data/markdownResumeData';
import { MarkdownRenderer } from './MarkdownRenderer';

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="experience" className="py-20 bg-secondary-50">
      <div className="container section-padding">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <h2 className="section-header">Professional Experience</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-primary-700 mx-auto mb-8"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            {markdownResumeData.experience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-secondary-100"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-secondary-900 mb-2">
                      {exp.position}
                    </h3>
                    <h4 className="text-xl font-semibold text-primary-600 mb-2">
                      {exp.company}
                    </h4>
                    {exp.description && <MarkdownRenderer content={exp.description} className="text-secondary-600" />}
                  </div>
                  <div className="text-center lg:text-right">
                    <span className="inline-block bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium mt-4 lg:mt-0">
                      {exp.period}
                    </span>
                  </div>
                </div>

                {exp.achievements && exp.achievements.length > 0 && (
                  <div className="space-y-3">
                    {exp.achievements.map((achievement, achIndex) => (
                      <div key={achIndex} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                        <MarkdownRenderer content={achievement.replace(/^\s*[-*+]\s+/, '')} className="text-secondary-700" />
                      </div>
                    ))}
                  </div>
                )}

                {exp.technologies && (
                  <div className="mt-6 pt-6 border-t border-secondary-100">
                    <h5 className="font-semibold text-secondary-900 mb-3">Technologies Used:</h5>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="skill-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
