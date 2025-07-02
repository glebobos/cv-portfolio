import { ResumeDataLoader, ExtractorConfig } from './ResumeDataLoader';

// Import markdown files as raw text
import summaryMd from '../../resume/sections/summary.md?raw';
import experienceMd from '../../resume/sections/experience.md?raw';
import skillsMd from '../../resume/sections/skills.md?raw';
import educationMd from '../../resume/sections/education.md?raw';
import certificationsMd from '../../resume/sections/certifications.md?raw';
import projectsMd from '../../resume/sections/projects.md?raw';
import awardsMd from '../../resume/sections/awards.md?raw';
import publicationsMd from '../../resume/sections/publications.md?raw';
import referencesMd from '../../resume/sections/references.md?raw';

// Define markdown sections
const markdownSections = {
  summary: summaryMd,
  experience: experienceMd,
  skills: skillsMd,
  education: educationMd,
  certifications: certificationsMd,
  projects: projectsMd,
  awards: awardsMd,
  publications: publicationsMd,
  references: referencesMd
};

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
    companyPatterns: [/EPAM Systems/]
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
