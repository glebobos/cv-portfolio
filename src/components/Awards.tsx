import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award as AwardIcon } from 'lucide-react';
import { markdownResumeData } from '../data/markdownResumeData';

const Awards = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const awardsData = markdownResumeData.awards;

  if (!awardsData || awardsData.length === 0) {
    return null;
  }

  return (
    <section id="awards" className="py-20 bg-white">
      <div className="container section-padding">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <h2 className="section-header">Awards & Recognition</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-primary-700 mx-auto mb-8"></div>
            <p className="text-secondary-600 max-w-2xl mx-auto">
              Acknowledgments of professional excellence and contributions to the field.
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
            {awardsData.map((award, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-secondary-50 rounded-xl p-6 border border-secondary-100 hover:border-primary-200 transition-colors duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <AwardIcon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-secondary-900 mb-1">
                      {award.name}
                    </h3>
                    <p className="text-md font-semibold text-primary-600 mb-2">
                      {award.issuer}
                    </p>
                    <p className="text-secondary-700 text-sm">
                      {award.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Awards;
