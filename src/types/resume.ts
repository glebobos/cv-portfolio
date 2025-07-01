export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  location: string;
}

export interface Experience {
  company: string;
  position: string;
  period: string;
  description: string;
  achievements: string[];
  technologies?: string[];
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  period: string;
  details?: string[];
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  highlights: string[];
  link?: string;
  github?: string;
}

export interface Skill {
  name: string;
  level: number; // 1-5
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
  credentialId?: string;
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
  link?: string;
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
}
