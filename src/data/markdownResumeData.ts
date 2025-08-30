import { ResumeDataLoader } from './ResumeDataLoader';
import resumeConfig from '../../resume.config';

// Dynamically import markdown files based on the configuration
const markdownModules = import.meta.glob('../../resume/sections/*.md', { as: 'raw' });

// Prepare markdown sections from the imported modules
const markdownSections: Record<string, string> = {};
for (const key in resumeConfig.sections) {
  const path = `../../${resumeConfig.sections[key]}`;
  if (markdownModules[path]) {
    markdownSections[key] = markdownModules[path];
  }
}

// Create the resume data loader with the configuration
const resumeLoader = new ResumeDataLoader(markdownSections, resumeConfig.extractors);

// Export the extracted resume data
export const markdownResumeData = resumeLoader.extractAll();
