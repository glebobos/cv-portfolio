# Resume Data Loader - Flexible Markdown-Based Resume System

This system provides a flexible, reusable way to extract structured resume data from markdown files. It's designed to work with different resume formats and structures while maintaining type safety and configurability.

## Key Features

- **📝 Markdown as Single Source of Truth** - Edit resume content in markdown files
- **🔧 Highly Configurable** - Adapt to different resume structures and patterns
- **🔄 Reusable** - Use with multiple resumes or different formats
- **⚡ Type Safe** - Full TypeScript support with proper interfaces
- **🎯 Pattern Matching** - Flexible regex patterns for data extraction
- **📦 Modular** - Separate concerns with clean architecture

## Architecture

```
src/data/
├── ResumeDataLoader.ts       # Core flexible resume data loader
├── markdownResumeData.ts     # Current resume implementation
├── examples/
│   └── AlternativeResumes.ts # Example configurations
└── utils/
    └── markdownParser.ts     # Markdown parsing utilities
```

## Usage

### Basic Usage (Current Resume)

```typescript
import { markdownResumeData } from './data/markdownResumeData';

// Use in components
const { personalInfo, summary, experience } = markdownResumeData;
```

### Creating a New Resume

```typescript
import { ResumeDataLoader, ExtractorConfig } from './data/ResumeDataLoader';

// 1. Define your markdown sections
const markdownSections = {
  summary: `# Your Name\n**Your Title**\n\n## Summary\nYour summary here...`,
  experience: `## Company Name\n### Position | Period\n- Achievement 1\n- Achievement 2`,
  skills: `## Technical Skills\n### Category\n- **Skill:** Proficiency level`,
  // ... other sections
};

// 2. Configure extraction patterns (optional)
const config: ExtractorConfig = {
  personalInfo: {
    namePatterns: [/# ([A-Z][a-z]+ [A-Z][a-z]+)/],
    fallbacks: {
      name: "Default Name",
      title: "Default Title",
      // ... other fallbacks
    }
  },
  // ... other configurations
};

// 3. Create and extract
const resumeLoader = new ResumeDataLoader(markdownSections, config);
const resumeData = resumeLoader.extractAll();
```

## Configuration Options

### Personal Info Extraction

```typescript
personalInfo: {
  namePatterns: [/# ([A-Z\s]+)/],           // Regex patterns to find name
  titlePatterns: [/\*\*([^*]+)\*\*/],        // Patterns for job title
  emailPatterns: [/📧\s*([^\s|]+)/],         // Email extraction
  phonePatterns: [/📱\s*([^\s|]+)/],         // Phone extraction
  linkedinPatterns: [/LinkedIn:\s*([^)]+)/], // LinkedIn URL
  githubPatterns: [/GitHub:\s*([^)]+)/],     // GitHub URL
  locationPatterns: [/📍\s*([^|]+)/],        // Location info
  fallbacks: {                               // Default values if not found
    name: "Professional Name",
    title: "Professional Title",
    // ... other fallbacks
  }
}
```

### Skills Level Detection

```typescript
skills: {
  sectionTitles: ['Frontend', 'Backend', 'DevOps'],  // Section names to look for
  levelKeywords: {                                    // Keywords for skill levels
    5: ['Expert', 'Advanced', 'Senior'],
    4: ['Proficient', 'Experienced'],
    3: ['Intermediate', 'Working'],
    2: ['Familiar', 'Basic'],
    1: ['Beginner', 'Learning']
  }
}
```

### Section Detection

```typescript
experience: {
  companyPatterns: [/Google/, /Microsoft/, /Apple/],  // Company name patterns
  positionPatterns: [/Engineer/, /Manager/, /Lead/],   // Position title patterns
  periodPatterns: [/\d{4}\s*-\s*\d{4}/]              // Date range patterns
}
```

## Markdown Format Examples

### Personal Info Section

```markdown
# JOHN DOE
**Senior Software Engineer | Full-Stack Developer**

📧 john.doe@email.com | 📱 +1-555-123-4567 | 🔗 [LinkedIn: johndoe] | 📍 San Francisco, CA | 🌐 [GitHub: johndoe-dev]

## EXECUTIVE SUMMARY

Your professional summary with **bold** text and formatting...
```

### Experience Section

```markdown
## Google LLC

### **Senior Software Engineer** | *2020 - Present*
**Role:** Lead full-stack development for Google Cloud Console

- **Achievement 1:** Built microservices serving 10M+ users
- **Achievement 2:** Implemented CI/CD pipelines reducing deployment time by 60%
- **Achievement 3:** Mentored 5 junior developers

### **Software Engineer** | *2018 - 2020*
**Role:** Frontend development for Google Search

- Built responsive UIs with React and TypeScript
- Optimized performance achieving 95+ Lighthouse scores
```

### Skills Section

```markdown
## Technical Skills

### **Frontend Technologies**
- **React:** Expert level - 5+ years building production apps
- **TypeScript:** Advanced - Strong typing and modern ES6+
- **Vue.js:** Proficient - 2+ years experience

### **Backend Technologies**
- **Node.js:** Expert - RESTful APIs and microservices
- **Python:** Advanced - Django and Flask frameworks
- **Java:** Intermediate - Spring Boot applications
```

### Projects Section

```markdown
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
```

## Type Definitions

All data structures are fully typed:

```typescript
interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  location: string;
}

interface Experience {
  company: string;
  position: string;
  period: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

// ... more interfaces for Education, Skills, Projects, etc.
```

## Benefits of This Approach

### 1. **Content Management**
- Edit resume content in familiar markdown format
- Version control your resume changes with git
- Easy to read and maintain without technical knowledge

### 2. **Flexibility**
- Adapt to different resume formats and structures
- Customize extraction patterns for specific needs
- Support multiple resume versions or languages

### 3. **Reusability**
- Use the same system for different people's resumes
- Share configurations for similar resume formats
- Easy to create variations (minimal, detailed, academic, etc.)

### 4. **Maintainability**
- Clear separation between data and presentation
- Type-safe data structures prevent runtime errors
- Modular architecture allows easy extension

### 5. **Integration**
- Works seamlessly with React components
- Supports both structured data and raw markdown rendering
- Easy to integrate with different UI frameworks

## Migration Guide

If you have existing hardcoded resume data:

1. **Extract to Markdown**: Convert your data to markdown files
2. **Configure Patterns**: Set up extraction patterns for your format
3. **Test Extraction**: Verify data is extracted correctly
4. **Update Components**: Switch components to use new data source
5. **Clean Up**: Remove old hardcoded data files

## Examples

See `src/data/examples/AlternativeResumes.ts` for complete examples of:
- Senior Software Engineer resume (Google/Microsoft format)
- Minimal UX Designer resume
- Academic researcher resume format
- Freelancer/consultant resume format

## Contributing

To add new extraction patterns or improve the system:

1. Add new pattern matchers to `ExtractorConfig`
2. Implement extraction logic in `ResumeDataLoader`
3. Add tests for new patterns
4. Update documentation with examples

This system makes resume management much more flexible and maintainable while preserving the benefits of markdown as a single source of truth.
