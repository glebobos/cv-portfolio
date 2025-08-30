import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BookMarked, ExternalLink } from 'lucide-react';
import { markdownResumeData } from '../data/markdownResumeData';

const Publications = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const publicationsData = markdownResumeData.publications;

  if (!publicationsData || publicationsData.length === 0) {
    return null;
  }

  return (
    <section id="publications" className="py-20 bg-secondary-50">
      <div className="container section-padding">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <h2 className="section-header">Publications & Contributions</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-primary-700 mx-auto mb-8"></div>
            <p className="text-secondary-600 max-w-2xl mx-auto">
              Contributions to professional literature, research, and knowledge sharing.
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid gap-8">
            {publicationsData.map((pub, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 border border-secondary-100 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <BookMarked className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-secondary-900 mb-1">
                          {pub.title}
                        </h3>
                        <p className="text-md font-semibold text-primary-600 mb-2">
                          {pub.publisher} - <span className="font-normal text-secondary-600">{pub.date}</span>
                        </p>
                      </div>
                      {pub.link && pub.link !== '#' && (
                        <a
                          href={pub.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-500 hover:text-primary-700 transition-colors duration-300 ml-4"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                    <p className="text-secondary-700 text-sm">
                      {pub.description}
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

export default Publications;
