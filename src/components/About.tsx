import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { resumeData } from '../data/resumeData';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container section-padding">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="section-header">About Me</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-primary-700 mx-auto mb-8"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="prose prose-lg">
                {resumeData.summary.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-secondary-700 leading-relaxed">
                    {paragraph.trim()}
                  </p>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-6 pt-6">
                <div>
                  <h4 className="font-semibold text-secondary-900 mb-2">Location</h4>
                  <p className="text-secondary-600">{resumeData.personalInfo.location}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-secondary-900 mb-2">Experience</h4>
                  <p className="text-secondary-600">5+ Years</p>
                </div>
              </div>
            </motion.div>

            {/* Visual Element */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-primary-50 to-secondary-50 p-8 rounded-2xl">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { label: 'Projects Led', value: '15+' },
                    { label: 'Cloud Environments', value: '24+' },
                    { label: 'Team Members', value: '70+' },
                    { label: 'Cost Savings', value: '$1.2M+' },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={inView ? { scale: 1, opacity: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      className="text-center p-4 bg-white rounded-xl shadow-sm"
                    >
                      <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                      <div className="text-sm text-secondary-600">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
