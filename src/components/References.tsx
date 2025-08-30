import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { markdownResumeData } from '../data/markdownResumeData';
import { MarkdownRenderer } from './MarkdownRenderer';

const References = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const referencesContent = markdownResumeData.raw.references;

  if (!referencesContent) {
    return null;
  }

  return (
    <section id="references" className="py-20 bg-white">
      <div className="container section-padding">
        <motion.div
          ref={ref}
          initial={{ y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-4xl mx-auto text-center">
             <MarkdownRenderer content={referencesContent} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default References;
