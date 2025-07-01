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

// Custom configuration for this specific resume
const customConfig: ExtractorConfig = {
  personalInfo: {
    fallbacks: {
      name: "Hleb Yarmolchyk",
      title: "Chief Systems Engineer I | AWS Cloud Architecture & DevOps Expert",
      email: "hleb.yarmolchyk@example.com",
      phone: "+1 (555) 123-4567",
      linkedin: "https://www.linkedin.com/in/hleb-yarmolchyk-573142153",
      github: "https://github.com/glebobos",
      location: "Remote / International"
    }
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
const resumeLoader = new ResumeDataLoader(markdownSections, customConfig);

// Export the extracted resume data
export const markdownResumeData = resumeLoader.extractAll();
