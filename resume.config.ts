import { ExtractorConfig } from './src/data/ResumeDataLoader';

// Define the structure of the resume sections
export interface ResumeSections {
  [key: string]: string;
}

// Define the master resume configuration
export interface ResumeConfig {
  sections: ResumeSections;
  extractors: ExtractorConfig;
}

// Configuration for the resume
const resumeConfig: ResumeConfig = {
  sections: {
    summary: 'resume/sections/summary.md',
    experience: 'resume/sections/experience.md',
    skills: 'resume/sections/skills.md',
    education: 'resume/sections/education.md',
    certifications: 'resume/sections/certifications.md',
    projects: 'resume/sections/projects.md',
    awards: 'resume/sections/awards.md',
    publications: 'resume/sections/publications.md',
    references: 'resume/sections/references.md'
  },
  extractors: {
    personalInfo: {
      namePatterns: [/^# ([A-Z\s]+)$/m],
      titlePatterns: [/\*\*([^*]+)\*\*/],
      emailPatterns: [/📧\s*\[([^\]]+)\]|\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/],
      phonePatterns: [/📱\s*\[([^\]]+)\]|\+?\d[\d\s\-\(\)]{8,}/],
      linkedinPatterns: [/linkedin\.com\/in\/([^)\s]+)/],
      githubPatterns: [/github\.com\/([^)\s]+)/],
      locationPatterns: [/📍\s*\[([^\]]+)\]/]
    },
    experience: {},
    skills: {
      levelKeywords: {
        5: ['Expert', 'Advanced', 'Senior'],
        4: ['Proficient', 'Experienced'],
        3: ['Intermediate', 'Working'],
        2: ['Familiar', 'Basic'],
        1: ['Beginner', 'Learning']
      }
    }
  }
};

export default resumeConfig;
