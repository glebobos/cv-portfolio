import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { markdownResumeData } from '../data/markdownResumeData';

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const getSkillLevelWidth = (level: number) => {
    return `${(level / 5) * 100}%`;
  };

  const getSkillLevelColor = (level: number) => {
    if (level >= 4) return 'bg-gradient-to-r from-green-500 to-green-600';
    if (level >= 3) return 'bg-gradient-to-r from-blue-500 to-blue-600';
    if (level >= 2) return 'bg-gradient-to-r from-yellow-500 to-yellow-600';
    return 'bg-gradient-to-r from-red-500 to-red-600';
  };

  const getSkillLevelText = (level: number) => {
    if (level >= 5) return 'Expert';
    if (level >= 4) return 'Advanced';
    if (level >= 3) return 'Intermediate';
    if (level >= 2) return 'Beginner';
    return 'Learning';
  };

  const getCategoryIcon = (categoryName: string) => {
    if (categoryName.includes('Cloud')) return '☁️';
    if (categoryName.includes('Infrastructure') || categoryName.includes('IaC')) return '🏗️';
    if (categoryName.includes('Container')) return '📦';
    if (categoryName.includes('CI/CD') || categoryName.includes('DevOps')) return '🔄';
    if (categoryName.includes('Programming')) return '💻';
    return '🛠️';
  };

  return (
    <section id="skills" className="py-20 bg-white overflow-x-hidden">
      <div className="container section-padding">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <h2 className="section-header">Technical Skills & Expertise</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-primary-700 mx-auto mb-8"></div>
            <p className="text-secondary-600 max-w-2xl mx-auto">
              Comprehensive technical expertise across cloud platforms, infrastructure, and modern development practices.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid gap-8">
              {markdownResumeData.skillCategories.map((category, categoryIndex) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                  className="bg-secondary-50 rounded-2xl p-6 border border-secondary-100 hover:border-primary-200 transition-colors duration-300"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">{getCategoryIcon(category.name)}</span>
                    <h3 className="text-xl font-bold text-secondary-900">{category.name}</h3>
                    <span className="ml-auto bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                      {category.skills.length} Skills
                    </span>
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ 
                          duration: 0.5, 
                          delay: (categoryIndex * 0.1) + (skillIndex * 0.05) 
                        }}
                        className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-secondary-900 text-sm leading-tight">
                            {skill.name}
                          </h4>
                          <span className="text-xs font-medium text-secondary-600">
                            {getSkillLevelText(skill.level)}
                          </span>
                        </div>
                        
                        <div className="relative">
                          <div className="w-full bg-secondary-200 rounded-full h-2">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={inView ? { width: getSkillLevelWidth(skill.level) } : {}}
                              transition={{ 
                                duration: 1, 
                                delay: (categoryIndex * 0.1) + (skillIndex * 0.05) + 0.3,
                                ease: "easeOut"
                              }}
                              className={`h-2 rounded-full ${getSkillLevelColor(skill.level)}`}
                            />
                          </div>
                          <div className="flex justify-between text-xs text-secondary-500 mt-1">
                            <span>1</span>
                            <span>2</span>
                            <span>3</span>
                            <span>4</span>
                            <span>5</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Skills Summary */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12"
            >
              <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-secondary-900 mb-6 text-center">
                  Expertise Summary
                </h3>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { 
                      label: 'Expert Level Skills',                      value: markdownResumeData.skillCategories.reduce((count, cat) =>
                        count + cat.skills.filter(skill => skill.level >= 5).length, 0
                      ),
                      color: 'from-green-500 to-green-600'
                    },
                    { 
                      label: 'Advanced Skills',                      value: markdownResumeData.skillCategories.reduce((count, cat) =>
                        count + cat.skills.filter(skill => skill.level === 4).length, 0
                      ),
                      color: 'from-blue-500 to-blue-600'
                    },
                    { 
                      label: 'Total Technologies', 
                      value: markdownResumeData.skillCategories.reduce((count, cat) => count + cat.skills.length, 0),
                      color: 'from-primary-500 to-primary-600'
                    },
                    { 
                      label: 'Skill Categories', 
                      value: markdownResumeData.skillCategories.length,
                      color: 'from-secondary-500 to-secondary-600'
                    }
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={inView ? { scale: 1, opacity: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                      className="text-center p-6 bg-white rounded-xl shadow-sm"
                    >
                      <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                        {stat.value}
                      </div>
                      <div className="text-sm text-secondary-600 font-medium">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Additional Skills Note */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-8 text-center"
            >
              <div className="bg-white rounded-xl p-6 shadow-md border border-secondary-100">
                <p className="text-secondary-600 text-sm">
                  <strong>Note:</strong> Skill levels represent proficiency in enterprise-grade implementations. 
                  Expert (5) indicates capability to architect and lead implementations, 
                  Advanced (4) indicates independent development and optimization capabilities.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
