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
    },
    {
      company: "EPAM Systems",
      position: "Lead Systems Engineer",
      period: "April 2023 – December 2024",
      description: "Senior technical contributor specializing in serverless transformations and advanced cloud architecture implementations.",
      achievements: [
        "Architected complete serverless migration from VM-based monolithic application to scalable Lambda-based microservices, reducing infrastructure costs by 65% ($320K annually)",
        "Engineered proprietary atomic orchestration system for Lambda functions via CloudFront, creating the most synchronous Lambda orchestration possible with 35ms average response time",
        "Modernized database infrastructure from standalone MySQL to Aurora Serverless v2, eliminating performance bottlenecks and reducing database-related incidents by 95%",
        "Executed flawless zero-downtime migration across 8 environments including production with 99.99% uptime maintained",
        "Designed enterprise-grade system architecture for Foundation Console workspace management processing 50M+ document vectors daily",
        "Pioneered asynchronous vectorization system (Foundation Index) for tax and medical content, increasing search relevance by 87%",
        "Architected secure one-click access solutions eliminating password requirements while maintaining SOC2 compliance"
      ],
      technologies: ["AWS Lambda", "CloudFront", "Aurora Serverless", "Terraform", "DynamoDB", "API Gateway", "SAM"]
    }
  ],

  education: [
    {
      institution: "Technical Education Background",
      degree: "Mechanical Engineering Expertise",
      field: "Off-road Vehicle Design & Serial Production",
      period: "10+ Years Experience",
      details: [
        "Decade+ experience in mechanical engineering with specialization in off-road vehicle design",
        "Serial production expertise from individual components to complete vehicle systems", 
        "Engineering methodology foundation applied to cloud architecture and system design"
      ]
    },
    {
      institution: "Professional Development",
      degree: "Continuous Learning Program",
      field: "Cloud Technologies & Software Engineering",
      period: "2019 - Present",
      details: [
        "Daily technology exploration with rapid adoption of emerging tools and platforms",
        "Cross-platform expertise development including AWS, Azure, and GCP",
        "Language agility: Bash, Python, JavaScript mastery with Go and other languages as needed"
      ]
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
      name: "AWS Certified Solutions Architect – Professional",
      issuer: "Amazon Web Services (AWS)",
      date: "2022",
      expiryDate: "2025",
      link: "#"
    },
    {
      name: "AWS Certified Solutions Architect – Associate", 
      issuer: "Amazon Web Services (AWS)",
      date: "2021",
      expiryDate: "2024",
      link: "#"
    },
    {
      name: "AWS Certified Security – Specialty",
      issuer: "Amazon Web Services (AWS)", 
      date: "2023",
      expiryDate: "2026",
      link: "#"
    },
    {
      name: "AWS Cloud Quest: Solutions Architect",
      issuer: "Amazon Web Services (AWS)",
      date: "2022",
      link: "#"
    },
    {
      name: "AWS Cloud Quest: Cloud Practitioner", 
      issuer: "Amazon Web Services (AWS)",
      date: "2022",
      link: "#"
    },
    {
      name: "CKA: Certified Kubernetes Administrator",
      issuer: "Cloud Native Computing Foundation",
      date: "2022",
      expiryDate: "2025",
      link: "#"
    },
    {
      name: "HashiCorp Certified: Terraform Associate",
      issuer: "HashiCorp",
      date: "2022",
      expiryDate: "2024",
      link: "#"
    },
    {
      name: "HashiCorp Certified: Vault Associate",
      issuer: "HashiCorp", 
      date: "2023",
      expiryDate: "2025",
      link: "#"
    },
    {
      name: "Microsoft Azure Administrator Associate (AZ-104)",
      issuer: "Microsoft",
      date: "2023", 
      expiryDate: "2025",
      link: "#"
    },
    {
      name: "Microsoft Azure Fundamentals (AZ-900)",
      issuer: "Microsoft",
      date: "2023",
      link: "#"
    },
    {
      name: "Docker Certified Associate (DCA)",
      issuer: "Docker",
      date: "2022",
      expiryDate: "2024", 
      link: "#"
    },
    {
      name: "GitHub Actions Certified",
      issuer: "GitHub",
      date: "2023",
      link: "#"
    },
    {
      name: "GitLab Certified Associate",
      issuer: "GitLab",
      date: "2022",
      link: "#"
    },
    {
      name: "CompTIA Security+ ce Certification",
      issuer: "CompTIA",
      date: "2023",
      expiryDate: "2026",
      link: "#"
    },
    {
      name: "Certified ScrumMaster (CSM)",
      issuer: "Scrum Alliance", 
      date: "2023",
      expiryDate: "2025",
      link: "#"
    },
    {
      name: "PMI Agile Certified Practitioner (PMI-ACP)",
      issuer: "Project Management Institute",
      date: "2024",
      expiryDate: "2027",
      link: "#"
    },
    {
      name: "AI Literacy Program",
      issuer: "EPAM Systems",
      date: "2024",
      link: "#"
    }
  ],

  awards: [
    {
      name: "We Are Community: Top Contributor",
      issuer: "EPAM Systems", 
      date: "2024",
      description: "Recognition for exceptional community involvement and knowledge sharing"
    },
    {
      name: "We Are Community: Top Speaker",
      issuer: "EPAM Systems",
      date: "2024", 
      description: "Recognition for excellence in technical presentations and knowledge sharing"
    },
    {
      name: "Driving Change and Innovations from Delivery Central",
      issuer: "EPAM Systems",
      date: "2024",
      description: "Recognition for leadership in implementing innovative technical solutions"
    },
    {
      name: "BLIS BU Recognition Star Team",
      issuer: "EPAM Systems",
      date: "2023",
      description: "Team recognition for outstanding project delivery and technical excellence"
    },
    {
      name: "Innovation Leader",
      issuer: "EPAM Systems",
      date: "2024",
      description: "Recognized for conceptualizing and deploying proprietary orchestration frameworks"
    }
  ],

  publications: [
    {
      title: "Advanced Cloud Architecture Patterns",
      publisher: "wearecommunity.io",
      date: "2023",
      description: "Comprehensive guide to implementing serverless and microservices architectures in enterprise environments",
      link: "#"
    },
    {
      title: "Internal Technical Documentation", 
      publisher: "EPAM Systems & Wolters Kluwer",
      date: "2021-Present",
      description: "50+ comprehensive guides on serverless architecture implementation and best practices",
      link: "#"
    },
    {
      title: "Engineering Systems Patents",
      publisher: "Patent Office",
      date: "Various",
      description: "Multiple registered patents including dynamic properties of self-propelled all-purpose power units and grain harvesters",
      link: "#"
    },
    {
      title: "Advanced Serverless Architectures in Enterprise Environments",
      publisher: "Tech Blog",
      date: "2024",
      description: "Deep dive into serverless transformation strategies and best practices",
      link: "#"
    }
  ]
};
