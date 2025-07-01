// Alternative approach: Direct markdown import example
// This shows how you can use markdown content directly in components

// Example 1: Simple direct import and display
import educationMarkdown from '../../resume/sections/education.md?raw';

// You can then use the markdown content directly
export const rawEducationContent = educationMarkdown;

// Example 2: Parse specific sections from markdown
export function parseEducationSections() {
  const sections = educationMarkdown.split('##').filter(section => section.trim());
  
  const technicalEducation = sections.find(s => s.includes('Technical Education'));
  const professionalDevelopment = sections.find(s => s.includes('Professional Development'));
  const futureDevelopment = sections.find(s => s.includes('Future Technical Development'));
  
  return {
    technical: technicalEducation,
    professional: professionalDevelopment,
    future: futureDevelopment
  };
}

// Example 3: Extract specific data from markdown
export function extractEducationData() {
  const content = educationMarkdown;
  
  // Extract mechanical engineering info
  const mechanicalEngMatch = content.match(/Decade\+ experience in mechanical engineering[^.]*\./);
  const mechanicalEng = mechanicalEngMatch ? mechanicalEngMatch[0] : '';
  
  // Extract continuous learning info
  const learningMatch = content.match(/Daily technology exploration[^.]*\./);
  const learning = learningMatch ? learningMatch[0] : '';
  
  // Extract future goals
  const shortTermGoals = content.match(/Short-term Objectives[\s\S]*?- ([^\n]*)\n- ([^\n]*)\n- ([^\n]*)\n- ([^\n]*)/);
  const longTermGoals = content.match(/Long-term Vision[\s\S]*?- ([^\n]*)\n- ([^\n]*)\n- ([^\n]*)\n- ([^\n]*)/);
  
  return {
    mechanicalEngineering: mechanicalEng,
    continuousLearning: learning,
    shortTermGoals: shortTermGoals ? shortTermGoals.slice(1) : [],
    longTermGoals: longTermGoals ? longTermGoals.slice(1) : []
  };
}

// Example 4: Create structured data from markdown
export const educationFromMarkdown = {
  sections: parseEducationSections(),
  data: extractEducationData(),
  raw: educationMarkdown
};
