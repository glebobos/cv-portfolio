import { parseMarkdown, extractListItems } from '../utils/markdownParser';

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

// Generic extractor class
export class ResumeDataLoader {
  private config: ExtractorConfig;
  private markdownSections: Record<string, string>;
  private parsedSections: Record<string, any>;

  constructor(
    markdownSections: Record<string, string>,
    config: ExtractorConfig
  ) {
    this.markdownSections = markdownSections;
    this.config = config;
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

  // Extract personal information
  extractPersonalInfo(): PersonalInfo {
    const summaryContent = this.markdownSections.summary || '';
    const config = this.config.personalInfo || {};
    
    // Extract name - find headers that look like names
    const allHeaders = summaryContent.match(/# ([^\n]+)/g) || [];
    let name = config.fallbacks?.name || "Professional Name";
    
    const nameHeader = allHeaders.find(header => {
      const headerText = header.replace('# ', '');
      return headerText.match(/^[A-Z\s]+$/) && 
             !headerText.includes('SUMMARY') && 
             !headerText.includes('PROFESSIONAL');
    });
    
    if (nameHeader) {
      name = nameHeader.replace('# ', '').trim();
    }

    const title = this.findPattern(summaryContent, config.titlePatterns) || config.fallbacks?.title || "Professional Title";
    const email = this.findPattern(summaryContent, config.emailPatterns) || config.fallbacks?.email || "contact@example.com";
    const phone = this.findPattern(summaryContent, config.phonePatterns) || config.fallbacks?.phone || "+1 (555) 123-4567";
    
    let linkedin = config.fallbacks?.linkedin || "https://linkedin.com/in/profile";
    const linkedinMatch = this.findPattern(summaryContent, config.linkedinPatterns);
    if (linkedinMatch) {
      linkedin = linkedinMatch.includes('http') ? linkedinMatch : `https://www.linkedin.com/in/${linkedinMatch.replace(/[\[\]]/g, '')}`;
    }
    
    let github = config.fallbacks?.github || "https://github.com/username";
    const githubMatch = this.findPattern(summaryContent, config.githubPatterns);
    if (githubMatch) {
      github = githubMatch.includes('http') ? githubMatch : `https://${githubMatch.replace(/[\[\]]/g, '')}`;
    }
    
    const location = this.findPattern(summaryContent, config.locationPatterns) || config.fallbacks?.location || "Remote";
    const avatar = this.extractAvatar();

    return { name, title, email, phone, linkedin, github, location, avatar };
  }

  // Extract summary
  extractSummary(): string {
    const summaryContent = this.parsedSections.summary;
    const config = this.config.summary || {};
    const sectionTitles = config.sectionTitles || ['EXECUTIVE SUMMARY', 'SUMMARY', 'ABOUT'];
    
    if (!summaryContent) return '';
    
    // Find the summary section
    const summarySection = summaryContent.sections.find((s: any) => 
      sectionTitles.some(title => s.title.includes(title))
    );
    
    if (summarySection) {
      return config.cleanMarkdown ? 
        this.cleanMarkdownForDisplay(summarySection.content) : 
        summarySection.content.trim();
    }
    
    // Fallback: look for content after summary headers
    for (const title of sectionTitles) {
      const content = this.markdownSections.summary?.split(`## ${title}`)[1]?.split('##')[0]?.trim();
      if (content) return content;
    }
    
    return '';
  }

  // Extract avatar image name from summary
  extractAvatar(): string | undefined {
    const summaryContent = this.markdownSections.summary;
    if (!summaryContent) return undefined;
    
    // Look for markdown image pattern: ![alt text](../images/filename.jpg)
    const imageMatch = summaryContent.match(/!\[.*?\]\(\.\.\/images\/([^)]+)\)/i);
    if (imageMatch) {
      return imageMatch[1].trim();
    }
    
    // Legacy patterns for backward compatibility
    const legacyPatterns = [
      /\*\*Avatar:\*\*\s*([^\s\n]+)/i,
      /Avatar:\s*([^\s\n]+)/i,
      /Image:\s*([^\s\n]+)/i,
      /Profile:\s*([^\s\n]+)/i
    ];
    
    for (const pattern of legacyPatterns) {
      const match = summaryContent.match(pattern);
      if (match) {
        return match[1].trim();
      }
    }
    
    return undefined;
  }

  // Extract experience (flexible for any company/role structure)
  extractExperience(): Experience[] {
    const experienceContent = this.parsedSections.experience;
    if (!experienceContent) return [];
    
    const experiences: Experience[] = [];
    
    // Look for company sections (level 2 or 3 headers)
    const companySections = experienceContent.sections.filter((s: any) => s.level <= 3);
    
    for (const section of companySections) {
      const lines = section.content.split('\n');
      let position = '';
      let period = '';
      let description = '';
      const achievements: string[] = [];
      const technologies: string[] = [];
      
      for (const line of lines) {
        // Extract position and period
        if (line.includes('**') && (line.includes('Engineer') || line.includes('Lead') || line.includes('Manager'))) {
          const parts = line.split('|');
          position = parts[0].replace(/\*\*/g, '').trim();
          period = parts[1]?.trim() || '';
        }
        // Extract role description
        else if (line.includes('**Role:**') || line.includes('**Description:**')) {
          description = line.replace(/\*\*[^*]+\*\*/, '').trim();
        }
        // Extract achievements
        else if (line.startsWith('- ')) {
          const achievement = line.replace(/^- \*\*[^*]+\*\*/, '').replace(/^- /, '').trim();
          if (achievement) achievements.push(achievement);
        }
      }
      
      if (position || section.title) {
        experiences.push({
          company: section.title || "Company",
          position: position || "Position",
          period: period || "Period",
          description: description || "Role description",
          achievements,
          technologies: technologies.length > 0 ? technologies : ["Technology Stack"]
        });
      }
    }
    
    return experiences;
  }

  // Extract education
  extractEducation(): Education[] {
    const educationContent = this.parsedSections.education;
    if (!educationContent) return [];
    
    const education: Education[] = [];
    const config = this.config.education || {};
    const sectionTitles = config.sectionTitles || ['Technical Education', 'Professional Development', 'Education'];
    
    const educationSections = educationContent.sections.filter((s: any) => 
      sectionTitles.some(title => s.title.includes(title))
    );
    
    for (const section of educationSections) {
      education.push({
        institution: section.title,
        degree: "Degree/Program",
        field: "Field of Study",
        period: "Period",
        details: extractListItems(section.content)
      });
    }
    
    return education;
  }

  // Extract skills
  extractSkills(): SkillCategory[] {
    const skillsContent = this.parsedSections.skills;
    if (!skillsContent) return [];
    
    const skillCategories: SkillCategory[] = [];
    const config = this.config.skills || {};
    const sectionTitles = config.sectionTitles || ['Platforms', 'Infrastructure', 'Container', 'CI/CD', 'Programming'];
    const levelKeywords = config.levelKeywords || {
      5: ['Expert', 'Advanced', 'Senior'],
      4: ['Proficient', 'Experienced'],
      3: ['Intermediate', 'Working'],
      2: ['Familiar', 'Basic'],
      1: ['Beginner', 'Learning']
    };
    
    const skillSections = skillsContent.sections.filter((s: any) => 
      s.level === 3 && sectionTitles.some(title => s.title.includes(title))
    );
    
    for (const section of skillSections) {
      const skills = extractListItems(section.content).map(skill => {
        const cleanSkill = skill.replace(/\*\*([^*]+)\*\*:?/, '$1').split(':')[0].trim();
        
        // Determine skill level based on keywords
        let level = 3; // Default intermediate
        for (const [levelNum, keywords] of Object.entries(levelKeywords)) {
          if (keywords.some(keyword => skill.includes(keyword))) {
            level = parseInt(levelNum);
            break;
          }
        }
        
        return {
          name: cleanSkill,
          level,
          category: section.title.split(' ')[0]
        };
      });
      
      skillCategories.push({
        name: section.title,
        skills
      });
    }
    
    return skillCategories;
  }

  // Extract certifications
  extractCertifications(): Certification[] {
    const certificationsContent = this.parsedSections.certifications;
    if (!certificationsContent) return [];
    
    const certifications: Certification[] = [];
    const config = this.config.certifications || {};
    const sectionLevel = config.sectionLevel || 3;
    const issuerPatterns = config.issuerPatterns || [/Issued by/, /Issuer:/];
    
    const certSections = certificationsContent.sections.filter((s: any) => s.level === sectionLevel);
    
    for (const section of certSections) {
      const lines = section.content.split('\n');
      let issuer = '';
      let date = '';
      
      for (const line of lines) {
        const issuerMatch = this.findPattern(line, issuerPatterns);
        if (issuerMatch) {
          const parts = line.split('|');
          issuer = parts[0].replace(/\*\*[^*]*\*\*/, '').trim();
          date = parts[1]?.trim() || '';
        }
      }
      
      certifications.push({
        name: section.title,
        issuer: issuer || "Certification Authority",
        date: date || "Date",
        link: "#"
      });
    }
    
    return certifications;
  }

  // Extract projects
  extractProjects(): Project[] {
    const projectsContent = this.parsedSections.projects;
    if (!projectsContent) return [];
    
    const projects: Project[] = [];
    const config = this.config.projects || {};
    const sectionLevel = config.sectionLevel || 2;
    const descriptionKeywords = config.descriptionKeywords || ['Description', 'Overview'];
    
    const projectSections = projectsContent.sections.filter((s: any) => s.level === sectionLevel);
    
    for (const section of projectSections) {
      const lines = section.content.split('\n');
      let description = '';
      const technologies: string[] = [];
      const highlights: string[] = [];
      
      for (const line of lines) {
        if (descriptionKeywords.some(keyword => line.includes(keyword))) {
          description = lines[lines.indexOf(line) + 1]?.trim() || '';
        } else if (line.includes('- **') && line.includes('%')) {
          highlights.push(line.replace(/^- \*\*[^*]+\*\*/, '').trim());
        } else if (line.includes('- ')) {
          const item = line.replace('- ', '').trim();
          if (item.length < 50) technologies.push(item);
        }
      }
      
      if (section.title) {
        projects.push({
          name: section.title,
          description: description || "Project description",
          technologies: technologies.length > 0 ? technologies : ["Technology Stack"],
          highlights
        });
      }
    }
    
    return projects;
  }

  // Extract awards
  extractAwards(): Award[] {
    const awardsContent = this.parsedSections.awards;
    if (!awardsContent) return [];
    
    const awards: Award[] = [];
    const config = this.config.awards || {};
    const sectionLevel = config.sectionLevel || 3;
    const issuerPatterns = config.issuerPatterns || [/Presented by/, /Awarded by/];
    
    const awardSections = awardsContent.sections.filter((s: any) => s.level === sectionLevel);
    
    for (const section of awardSections) {
      const lines = section.content.split('\n');
      let issuer = '';
      let description = '';
      
      for (const line of lines) {
        const issuerMatch = this.findPattern(line, issuerPatterns);
        if (issuerMatch) {
          issuer = issuerMatch;
        } else if (line.startsWith('- ')) {
          description += line.replace('- ', '').trim() + ' ';
        }
      }
      
      awards.push({
        name: section.title,
        issuer: issuer || "Award Authority",
        date: "Date",
        description: description.trim() || "Award description"
      });
    }
    
    return awards;
  }

  // Extract publications
  extractPublications(): Publication[] {
    const publicationsContent = this.parsedSections.publications;
    if (!publicationsContent) return [];
    
    const publications: Publication[] = [];
    const config = this.config.publications || {};
    const sectionLevel = config.sectionLevel || 3;
    const publisherPatterns = config.publisherPatterns || [/Published on/, /Issued by/];
    
    const pubSections = publicationsContent.sections.filter((s: any) => s.level === sectionLevel);
    
    for (const section of pubSections) {
      const lines = section.content.split('\n');
      let publisher = '';
      let date = '';
      let description = '';
      
      for (const line of lines) {
        const publisherMatch = this.findPattern(line, publisherPatterns);
        if (publisherMatch) {
          const parts = line.split('|');
          publisher = parts[0].replace(/\*\*[^*]*\*\*/, '').trim();
          date = parts[1]?.trim() || '';
        } else if (line.startsWith('- ')) {
          description += line.replace('- ', '').trim() + ' ';
        }
      }
      
      publications.push({
        title: section.title,
        publisher: publisher || "Publication Platform",
        date: date || "Date",
        description: description.trim() || "Publication description",
        link: "#"
      });
    }
    
    return publications;
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
      personalInfo: this.extractPersonalInfo(),
      summary: this.extractSummary(),
      experience: this.extractExperience(),
      education: this.extractEducation(),
      projects: this.extractProjects(),
      skillCategories: this.extractSkills(),
      certifications: this.extractCertifications(),
      awards: this.extractAwards(),
      publications: this.extractPublications(),
      raw: this.markdownSections,
      parsed: this.parsedSections
    };
  }
}
