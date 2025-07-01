// Example usage for a different resume structure
import { ResumeDataLoader, ExtractorConfig } from '../ResumeDataLoader';

// Example: Different resume markdown files
const alternativeResumeSections = {
  summary: `
# John Doe
**Senior Software Engineer | Full-Stack Developer**

📧 john.doe@email.com | 📱 +1-555-123-4567 | 🔗 [LinkedIn: johndoe](https://linkedin.com/in/johndoe) | 📍 San Francisco, CA | 🌐 [GitHub: johndoe-dev]

## About Me

Passionate full-stack developer with 8+ years of experience building scalable web applications using **React**, **Node.js**, and **Python**. Expertise in **cloud architecture** and **DevOps practices**.
  `,
  experience: `
## Google LLC

### **Senior Software Engineer** | *2020 - Present*
**Role:** Lead full-stack development for Google Cloud Console
- Developed microservices serving 10M+ users
- Implemented CI/CD pipelines reducing deployment time by 60%
- Mentored 5 junior developers

### **Software Engineer** | *2018 - 2020*
**Role:** Frontend development for Google Search
- Built responsive UIs with React and TypeScript
- Optimized performance achieving 95+ Lighthouse scores

## Microsoft Corporation

### **Software Development Engineer** | *2016 - 2018*
**Role:** Backend development for Azure services
- Designed RESTful APIs using .NET Core
- Implemented caching strategies reducing latency by 40%
  `,
  skills: `
## Technical Skills

### **Frontend Technologies**
- **React:** Expert level - 5+ years building production apps
- **TypeScript:** Advanced - Strong typing and modern ES6+
- **Vue.js:** Proficient - 2+ years experience
- **HTML/CSS:** Expert - Semantic markup and responsive design

### **Backend Technologies**  
- **Node.js:** Expert - RESTful APIs and microservices
- **Python:** Advanced - Django and Flask frameworks
- **Java:** Proficient - Spring Boot applications
- **.NET Core:** Intermediate - Web API development

### **Cloud & DevOps**
- **AWS:** Advanced - EC2, S3, Lambda, RDS
- **Docker:** Expert - Containerization and orchestration
- **Kubernetes:** Proficient - Cluster management
- **CI/CD:** Expert - Jenkins, GitHub Actions, Azure DevOps
  `,
  education: `
## Academic Background

### Computer Science Education
**Institution:** Stanford University
**Degree:** Master of Science in Computer Science
**Period:** 2014 - 2016
- Specialized in Machine Learning and Distributed Systems
- GPA: 3.8/4.0
- Teaching Assistant for Data Structures course

### Undergraduate Studies
**Institution:** UC Berkeley
**Degree:** Bachelor of Science in Computer Engineering  
**Period:** 2010 - 2014
- Magna Cum Laude graduate
- Member of IEEE Computer Society
  `,
  certifications: `
## Professional Certifications

### AWS Certified Solutions Architect - Professional
**Issued by** Amazon Web Services | **Valid:** 2023 - 2026
- Advanced cloud architecture design
- Cost optimization strategies

### Google Cloud Professional Developer
**Issued by** Google Cloud Platform | **Valid:** 2022 - 2025
- Application development on GCP
- CI/CD pipeline implementation

### Certified Kubernetes Administrator (CKA)
**Issued by** Cloud Native Computing Foundation | **Valid:** 2023 - 2026
- Cluster management and troubleshooting
- Container orchestration expertise
  `,
  projects: `
## Featured Projects

## E-Commerce Platform
**Description**
Built a scalable e-commerce platform handling 100K+ daily transactions

**Technologies Used**
- React, Node.js, MongoDB, AWS, Docker
- Redis for caching, Stripe for payments

**Key Achievements**
- **Performance:** 40% faster page load times through optimization
- **Scalability:** Auto-scaling infrastructure handling traffic spikes
- **Security:** PCI DSS compliant payment processing

## Real-Time Chat Application  
**Description**
Developed a real-time messaging app with video calling capabilities

**Technologies Used**
- React Native, Socket.io, WebRTC, Firebase
- Push notifications, offline message sync

**Key Achievements**
- **Users:** 50K+ active users within 6 months
- **Performance:** Sub-100ms message delivery globally
- **Features:** End-to-end encryption, file sharing
  `,
  awards: `
## Recognition & Awards

### Employee of the Year 2023
**Presented by** Google LLC
- Recognized for outstanding contributions to Google Cloud Console
- Led cross-functional team delivering major product features
- Improved user satisfaction scores by 25%

### Hackathon Winner - Best Innovation
**Presented by** TechCrunch Disrupt 2022
- Built AI-powered code review tool in 48 hours
- Attracted interest from 3 major tech companies
- Open-sourced project with 1K+ GitHub stars
  `,
  publications: `
## Publications & Contributions

### "Scaling React Applications: Best Practices"
**Published on** Medium Engineering Blog | **Date:** March 2023
- 50K+ views and 500+ claps
- Comprehensive guide to React performance optimization
- Referenced by multiple tech companies in training materials

### "Microservices Architecture Patterns"  
**Published on** IEEE Software Magazine | **Date:** January 2023
- Peer-reviewed technical article
- Case study of Google's microservices implementation
- Cited by 25+ academic papers
  `,
  references: ''
};

// Custom configuration for this alternative resume
const alternativeConfig: ExtractorConfig = {
  personalInfo: {
    namePatterns: [/# ([A-Z][a-z]+ [A-Z][a-z]+)/], // Matches "John Doe" pattern
    emailPatterns: [/📧\s*([^\s|]+)/],
    phonePatterns: [/📱\s*([^\s|]+)/],
    linkedinPatterns: [/LinkedIn:\s*([^)]+)/],
    githubPatterns: [/GitHub:\s*([^)]+)/],
    locationPatterns: [/📍\s*([^|]+)/],
    fallbacks: {
      name: "John Doe",
      title: "Senior Software Engineer | Full-Stack Developer",
      email: "john.doe@email.com",
      phone: "+1-555-123-4567",
      linkedin: "https://linkedin.com/in/johndoe",
      github: "https://github.com/johndoe-dev",
      location: "San Francisco, CA"
    }
  },
  summary: {
    sectionTitles: ['About Me', 'EXECUTIVE SUMMARY', 'SUMMARY'],
    cleanMarkdown: false
  },
  experience: {
    companyPatterns: [/Google LLC/, /Microsoft Corporation/, /Amazon/, /Meta/],
    positionPatterns: [/Engineer/, /Developer/, /Manager/, /Lead/, /Architect/],
    periodPatterns: [/\d{4}\s*-\s*\d{4}/, /\d{4}\s*-\s*Present/]
  },
  education: {
    sectionTitles: ['Computer Science Education', 'Undergraduate Studies', 'Academic Background'],
    institutionPatterns: [/Institution:/, /University/, /College/]
  },
  skills: {
    sectionTitles: ['Frontend Technologies', 'Backend Technologies', 'Cloud & DevOps', 'Programming Languages'],
    levelKeywords: {
      5: ['Expert', 'Expert level', 'Advanced'],
      4: ['Advanced', 'Proficient'],
      3: ['Intermediate', 'Working knowledge'],
      2: ['Basic', 'Familiar'],
      1: ['Beginner', 'Learning']
    }
  },
  certifications: {
    sectionLevel: 3,
    issuerPatterns: [/Issued by/, /Certified by/],
    datePatterns: [/Valid:/, /Expires:/, /\d{4}/]
  },
  projects: {
    sectionLevel: 2,
    descriptionKeywords: ['Description', 'Overview', 'About'],
    technologyIndicators: ['Technologies Used', 'Tech Stack', 'Built with', 'Tools']
  },
  awards: {
    sectionLevel: 3,
    issuerPatterns: [/Presented by/, /Awarded by/, /From/]
  },
  publications: {
    sectionLevel: 3,
    publisherPatterns: [/Published on/, /In/, /Journal:/]
  }
};

// Usage example
export function createAlternativeResume() {
  const resumeLoader = new ResumeDataLoader(alternativeResumeSections, alternativeConfig);
  return resumeLoader.extractAll();
}

// You can also create resume loaders for different formats
export function createMinimalResume() {
  const minimalSections = {
    summary: `
# Jane Smith
**UX Designer**

📧 jane@example.com | 📍 Remote

## Summary
Creative UX designer with 5 years of experience creating user-centered designs.
    `,
    experience: `
## Design Studio XYZ
### **Senior UX Designer** | *2021 - Present*
- Lead design for 3 major product launches
- Improved user satisfaction by 40%
    `,
    skills: `
## Design Skills
### **Tools**
- **Figma:** Expert - 5+ years daily usage
- **Sketch:** Advanced - Complex design systems
- **Adobe Creative Suite:** Proficient - UI/UX workflows
    `,
    education: '',
    certifications: '',
    projects: '',
    awards: '',
    publications: '',
    references: ''
  };

  // Minimal config for simpler resumes
  const minimalConfig: ExtractorConfig = {
    personalInfo: {
      fallbacks: {
        name: "Jane Smith",
        title: "UX Designer",
        email: "jane@example.com",
        phone: "",
        linkedin: "",
        github: "",
        location: "Remote"
      }
    }
  };

  const resumeLoader = new ResumeDataLoader(minimalSections, minimalConfig);
  return resumeLoader.extractAll();
}
