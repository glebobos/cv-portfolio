import { parseMarkdown, extractListItems } from '../utils/markdownParser';
import { extractExperience } from './parsers/experienceParser';
import { extractSkills } from './parsers/skillsParser';
import { extractEducation } from './parsers/educationParser';
import { extractCertifications } from './parsers/certificationsParser';
import { extractProjects } from './parsers/projectsParser';
import { extractAwards } from './parsers/awardsParser';
import { extractPublications } from './parsers/publicationsParser';
import { extractPersonalInfo, extractSummary } from './parsers/summaryParser';

// Generic interfaces for resume data structure
export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  location: string;
  avatar?: string;
}

export interface Experience {
  company: string;
  position: string;
  period: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  period: string;
  details: string[];
}

export interface Skill {
  name: string;
  level: number;
  category: string;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  link: string;
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  highlights: string[];
  github?: string;
  link?: string;
}

export interface Award {
  name: string;
  issuer: string;
  date: string;
  description: string;
}

export interface Publication {
  title: string;
  publisher: string;
  date: string;
  description: string;
  link: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  projects: Project[];
  skillCategories: SkillCategory[];
  certifications: Certification[];
  awards: Award[];
  publications: Publication[];
  raw: Record<string, string>;
  parsed: Record<string, any>;
}

// Configuration interface for extractors
export interface ExtractorConfig {
  personalInfo?: {
    namePatterns?: RegExp[];
    titlePatterns?: RegExp[];
    emailPatterns?: RegExp[];
    phonePatterns?: RegExp[];
    linkedinPatterns?: RegExp[];
    githubPatterns?: RegExp[];
    locationPatterns?: RegExp[];
    fallbacks?: Partial<PersonalInfo>;
  };
  summary?: {
    sectionTitles?: string[];
    cleanMarkdown?: boolean;
  };
  experience?: {
    companyPatterns?: RegExp[];
    positionPatterns?: RegExp[];
    periodPatterns?: RegExp[];
    achievementPatterns?: RegExp[];
  };
  education?: {
    sectionTitles?: string[];
    institutionPatterns?: RegExp[];
    degreePatterns?: RegExp[];
  };
  skills?: {
    sectionTitles?: string[];
    levelKeywords?: Record<number, string[]>;
  };
  certifications?: {
    sectionLevel?: number;
    issuerPatterns?: RegExp[];
    datePatterns?: RegExp[];
  };
  projects?: {
    sectionLevel?: number;
    descriptionKeywords?: string[];
    technologyIndicators?: string[];
  };
  awards?: {
    sectionLevel?: number;
    issuerPatterns?: RegExp[];
  };
  publications?: {
    sectionLevel?: number;
    publisherPatterns?: RegExp[];
  };
}

// Default configuration for common markdown patterns
export const DEFAULT_EXTRACTOR_CONFIG: ExtractorConfig = {
  personalInfo: {
    namePatterns: [/# ([A-Z\s]+)(?:\s*\n)/],
    titlePatterns: [/\*\*([^*]+)\*\*/],
    emailPatterns: [/📧\s*([^\s|]+)/],
    phonePatterns: [/📱\s*([^\s|]+)/],
    linkedinPatterns: [/LinkedIn:\s*([^)]+)/],
    githubPatterns: [/GitHub:\s*([^)]+)/],
    locationPatterns: [/📍\s*([^\s|]+)/],
    fallbacks: {
      name: "Professional Name",
      title: "Professional Title",
      email: "contact@example.com",
      phone: "+1 (555) 123-4567",
      linkedin: "https://linkedin.com/in/profile",
      github: "https://github.com/username",
      location: "Remote"
    }
  },
  summary: {
    sectionTitles: ['EXECUTIVE SUMMARY', 'SUMMARY', 'ABOUT'],
    cleanMarkdown: false
  },
  experience: {
    companyPatterns: [/EPAM Systems/, /Company Name/],
    positionPatterns: [/Engineer/, /Lead/, /Manager/, /Director/],
    periodPatterns: [/\d{4}\s*-\s*\d{4}/, /\d{4}\s*-\s*Present/]
  },
  education: {
    sectionTitles: ['Technical Education', 'Professional Development', 'Education'],
    institutionPatterns: [/Institution:/, /University:/, /School:/]
  },
  skills: {
    sectionTitles: ['Platforms', 'Infrastructure', 'Container', 'CI/CD', 'Programming'],
    levelKeywords: {
      5: ['Expert', 'Advanced', 'Senior'],
      4: ['Proficient', 'Experienced'],
      3: ['Intermediate', 'Working'],
      2: ['Familiar', 'Basic'],
      1: ['Beginner', 'Learning']
    }
  },
  certifications: {
    sectionLevel: 3,
    issuerPatterns: [/Issued by/, /Issuer:/],
    datePatterns: [/\d{4}/, /\w+ \d{4}/]
  },
  projects: {
    sectionLevel: 2,
    descriptionKeywords: ['Description', 'Overview'],
    technologyIndicators: ['Technologies', 'Tech Stack', 'Built with']
  },
  awards: {
    sectionLevel: 3,
    issuerPatterns: [/Presented by/, /Awarded by/]
  },
  publications: {
    sectionLevel: 3,
    publisherPatterns: [/Published on/, /Issued by/]
  }
};

// Generic extractor class
export class ResumeDataLoader {
  private config: ExtractorConfig;
  private markdownSections: Record<string, string>;
  private parsedSections: Record<string, any>;

  constructor(
    markdownSections: Record<string, string>,
    config: ExtractorConfig = DEFAULT_EXTRACTOR_CONFIG
  ) {
    this.markdownSections = markdownSections;
    this.config = { ...DEFAULT_EXTRACTOR_CONFIG, ...config };
    this.parsedSections = {};
    
    // Parse all markdown sections
    Object.entries(markdownSections).forEach(([key, content]) => {
      this.parsedSections[key] = parseMarkdown(content);
    });
  }

  // Generic pattern matcher
  private findPattern(content: string, patterns: RegExp[] | undefined): string | null {
    if (!patterns || !Array.isArray(patterns)) return null;
    
    for (const pattern of patterns) {
      const match = content.match(pattern);
      if (match) return match[1]?.trim() || match[0]?.trim();
    }
    return null;
  }









  // Helper method to clean markdown
  private cleanMarkdownForDisplay(content: string): string {
    return content
      .replace(/#{1,6}\s+/g, '')
      .replace(/\*([^*]+)\*/g, '$1')
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/---+/g, '')
      .replace(/^\s*[-*+]\s+/gm, '• ')
      .trim();
  }

  // Main method to extract all resume data
  extractAll(): ResumeData {
    return {
      personalInfo: extractPersonalInfo(this.markdownSections.summary, this.config.personalInfo, this.findPattern),
      summary: extractSummary(this.markdownSections.summary, this.config.summary),
      experience: extractExperience(this.parsedSections.experience, this.config.experience),
      education: extractEducation(this.parsedSections.education, this.config.education),
      projects: extractProjects(this.parsedSections.projects, this.config.projects),
      skillCategories: extractSkills(this.parsedSections.skills, this.config.skills),
      certifications: extractCertifications(this.parsedSections.certifications, this.config.certifications, this.findPattern),
      awards: extractAwards(this.parsedSections.awards, this.config.awards, this.findPattern),
      publications: extractPublications(this.parsedSections.publications, this.config.publications, this.findPattern),
      raw: this.markdownSections,
      parsed: this.parsedSections
    };
  }
}
