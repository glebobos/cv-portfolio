import { ResumeData } from '../types/resume';

export const resumeData: ResumeData = {
  personalInfo: {
    name: "Hleb Yarmolchyk",
    title: "Chief Systems Engineer I | AWS Cloud Architecture & DevOps Expert",
    email: "contact@example.com", // Replace with actual email
    phone: "+1 (555) 123-4567", // Replace with actual phone
    linkedin: "https://www.linkedin.com/in/hleb-yarmolchyk-573142153",
    github: "https://github.com/glebobos",
    location: "Location" // Replace with actual location
  },
  
  summary: `Highly accomplished Chief Systems Engineer (I) with ~5 years of accelerated impact in enterprise cloud architecture, advanced DevOps automation, and pioneering serverless computing initiatives. A proven technical leader and architect, guiding, mentoring, and influencing 70+ developers in designing and deploying solutions across 24+ complex AWS, Azure, and multi-cloud production environments. 

Architect of innovative serverless transformation initiatives that delivered 10x performance improvements and 30%+ cost reductions for Fortune 500 clients. Leveraging expert-level proficiency in AWS Solutions Architecture, Infrastructure as Code (Terraform), Kubernetes orchestration, and CI/CD pipeline automation, successfully led zero-downtime migrations of monolithic applications to scalable microservices architectures, enabling 20+ daily releases through advanced GitOps methodologies.`,

  experience: [
    {
      company: "EPAM Systems",
      position: "Chief Systems Engineer I",
      period: "December 2024 – Present",
      description: "Technical leadership for enterprise cloud transformation initiatives across multiple business domains including healthcare, legal research, and AI-powered real estate platforms.",
      achievements: [
        "Spearheaded architectural strategy for 10+ concurrent mission-critical projects, increasing platform adoption by 35%",
        "Engineered serverless-first architectures delivering 10x performance improvements and 40% lower latency",
        "Pioneered scalable multi-tenant systems supporting 15+ B2B partner integrations, achieving 99.99% availability",
        "Orchestrated 24+ production AWS accounts with comprehensive unified security frameworks, reducing security incidents by 75%",
        "Designed resilient cross-cloud disaster recovery strategies achieving industry-leading RPO of 5-15 minutes",
        "Executed strategic resource optimization resulting in 30%+ cost reduction ($1.2M+ annual savings)",
        "Transformed development practices for 70+ developers, increasing deployment frequency to 20+ daily releases",
        "Established technical mentorship program accelerating onboarding by 40% for new system engineers",
        "Revolutionized development lifecycle through GitOps methodology implementation, reducing time-to-market by 85%"
      ],
      technologies: ["AWS", "Azure", "Terraform", "Kubernetes", "Lambda", "GitHub Actions", "GitOps"]
    }
  ],

  education: [
    {
      institution: "University Name", // Replace with actual education
      degree: "Bachelor's Degree",
      field: "Computer Science / Engineering",
      period: "Year - Year",
      details: ["Relevant coursework or achievements"]
    }
  ],

  projects: [
    {
      name: "HUB2 Orchestration Framework",
      description: "Proprietary orchestration framework designed to power critical production applications with enhanced operational efficiency.",
      technologies: ["Python", "AWS Lambda", "Terraform", "Docker", "Kubernetes"],
      highlights: [
        "Scaled to power 15+ critical production applications",
        "Significantly enhanced operational efficiency",
        "Accelerated time-to-market for enterprise solutions"
      ]
    },
    {
      name: "Multi-Cloud Infrastructure Management",
      description: "Comprehensive unified security, monitoring, and deployment frameworks across 24+ production AWS accounts and matching Azure environments.",
      technologies: ["AWS", "Azure", "Terraform", "CloudFormation", "Monitoring"],
      highlights: [
        "Reduced security incidents by 75%",
        "Achieved 99.99% availability across all environments",
        "Implemented automated disaster recovery with 5-15 minutes RPO"
      ]
    },
    {
      name: "Serverless Transformation Initiative",
      description: "Large-scale migration of monolithic applications to serverless architectures for Fortune 500 clients.",
      technologies: ["AWS Lambda", "API Gateway", "DynamoDB", "CloudFormation", "CI/CD"],
      highlights: [
        "Delivered 10x performance improvements",
        "Achieved 30%+ cost reductions",
        "Zero-downtime migration approach"
      ]
    }
  ],

  skillCategories: [
    {
      name: "Cloud Platforms & Services",
      skills: [
        { name: "Amazon Web Services (AWS)", level: 5, category: "Cloud" },
        { name: "Microsoft Azure", level: 4, category: "Cloud" },
        { name: "Multi-Cloud Management", level: 5, category: "Cloud" }
      ]
    },
    {
      name: "Infrastructure as Code (IaC)",
      skills: [
        { name: "Terraform", level: 5, category: "IaC" },
        { name: "AWS CloudFormation", level: 5, category: "IaC" },
        { name: "AWS CDK", level: 4, category: "IaC" },
        { name: "Pulumi", level: 3, category: "IaC" }
      ]
    },
    {
      name: "Container Technologies & Orchestration",
      skills: [
        { name: "Kubernetes", level: 5, category: "Containers" },
        { name: "Docker", level: 5, category: "Containers" },
        { name: "Amazon ECS", level: 4, category: "Containers" },
        { name: "Helm", level: 4, category: "Containers" }
      ]
    },
    {
      name: "CI/CD & DevOps Automation",
      skills: [
        { name: "GitHub Actions", level: 5, category: "CI/CD" },
        { name: "GitLab CI/CD", level: 4, category: "CI/CD" },
        { name: "Jenkins", level: 4, category: "CI/CD" },
        { name: "Bamboo", level: 3, category: "CI/CD" }
      ]
    },
    {
      name: "Programming & Scripting",
      skills: [
        { name: "Python", level: 5, category: "Programming" },
        { name: "Bash/Shell", level: 5, category: "Programming" },
        { name: "JavaScript/Node.js", level: 4, category: "Programming" },
        { name: "TypeScript", level: 4, category: "Programming" }
      ]
    }
  ],

  certifications: [
    {
      name: "Certified Kubernetes Administrator (CKA)",
      issuer: "Cloud Native Computing Foundation",
      date: "2024",
      link: "#"
    },
    {
      name: "AWS Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2023",
      link: "#"
    }
  ],

  awards: [
    {
      name: "Innovation Leader",
      issuer: "EPAM Systems",
      date: "2024",
      description: "Recognized for conceptualizing and deploying proprietary orchestration frameworks"
    }
  ],

  publications: [
    {
      title: "Advanced Serverless Architectures in Enterprise Environments",
      publisher: "Tech Blog",
      date: "2024",
      description: "Deep dive into serverless transformation strategies and best practices",
      link: "#"
    }
  ]
};
