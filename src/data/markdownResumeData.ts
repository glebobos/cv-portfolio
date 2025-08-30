import { ResumeDataLoader, ExtractorConfig } from './ResumeDataLoader';

import { resumeSectionsConfig } from './resume.config';

// Dynamically import all markdown files from the resume sections directory
const markdownFiles = import.meta.glob('../../resume/sections/*.md', { as: 'raw', eager: true });

// Construct the markdownSections object based on the configuration
const markdownSections: Record<string, string> = Object.entries(resumeSectionsConfig).reduce(
  (acc, [section, path]) => {
    if (markdownFiles[path]) {
      acc[section] = markdownFiles[path];
    }
    return acc;
  },
  {} as Record<string, string>
);

// Configuration for markdown data extraction
const extractorConfig: ExtractorConfig = {
  personalInfo: {
    // Let the system extract data from markdown content
    namePatterns: [/^# ([A-Z\s]+)$/m],
    titlePatterns: [/\*\*([^*]+)\*\*/],
    emailPatterns: [/📧\s*\[([^\]]+)\]|\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/],
    phonePatterns: [/📱\s*\[([^\]]+)\]|\+?\d[\d\s\-\(\)]{8,}/],
    linkedinPatterns: [/linkedin\.com\/in\/([^)\s]+)/],
    githubPatterns: [/github\.com\/([^)\s]+)/],
    locationPatterns: [/📍\s*\[([^\]]+)\]/]
  },
  experience: {
    companyPatterns: []
  },
  skills: {
    levelKeywords: {
      5: ['Expert', 'Advanced', 'Senior'],
      4: ['Proficient', 'Experienced'],
      3: ['Intermediate', 'Working'],
      2: ['Familiar', 'Basic'],
      1: ['Beginner', 'Learning']
    }
  }
};

// Create the resume data loader
const resumeLoader = new ResumeDataLoader(markdownSections, extractorConfig);

// Export the extracted resume data
export const markdownResumeData = resumeLoader.extractAll();
