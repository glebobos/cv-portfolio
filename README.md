# CV Portfolio - Modern Resume Website

A state-of-the-art resume portfolio website built with **Vite**, **React 18**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. Features dual data management systems (TypeScript and Markdown), complete Docker containerization, and automated deployment to GitHub Pages.

## ✨ Key Features

### 🎨 Modern Design & UX
- **Stunning Animations**: Framer Motion for smooth, professional transitions
- **Interactive Particle Background**: Dynamic visual effects with optimized performance
- **Responsive Design**: Mobile-first approach with beautiful layouts across all devices
- **Glassmorphism Effects**: Modern transparent design elements
- **Smooth Scrolling**: Enhanced user experience with intersection observer

### 🚀 Technical Excellence
- **Markdown-Powered Content**: Easily manage resume content with simple Markdown files.
- **Type-Safe Development**: Full TypeScript implementation with custom type definitions.
- **Modern Build Tools**: Vite for lightning-fast development and optimized production builds.
- **Component Architecture**: Modular React components for maintainability.
- **Performance Optimized**: Code splitting, lazy loading, and optimized bundle size.

### 🐳 DevOps & Deployment
- **Complete Docker Support**: Development, build, and production containerization
- **GitHub Actions CI/CD**: Automated build, test, and deployment pipeline
- **Multi-Environment Setup**: Seamless development to production workflow
- **Production Ready**: Nginx-served static files with security headers

## 🛠️ Tech Stack

### Frontend Core
- **React 18** - Latest React with concurrent features and hooks
- **TypeScript** - Type-safe development with comprehensive type definitions
- **Vite** - Ultra-fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework with custom design system

### UI & Animation
- **Framer Motion** - Production-ready motion library for animations
- **Lucide React** - Beautiful, customizable SVG icons
- **React Intersection Observer** - Optimized scroll-based animations
- **clsx** - Conditional CSS class utility

### Development Tools
- **ESLint** - Code linting with React and TypeScript rules
- **Prettier** - Code formatting for consistent style
- **PostCSS** - CSS processing with Autoprefixer
- **TypeScript Compiler** - Type checking and compilation

### DevOps & Infrastructure
- **Docker & Docker Compose** - Complete containerization strategy
- **GitHub Actions** - Automated CI/CD workflows
- **GitHub Pages** - Static site hosting with custom domain support
- **Nginx** - Production web server with security configurations

## 🏗️ Project Architecture

```
cv-portfolio/
├── 📁 src/
│   ├── 📁 components/           # React UI components
│   │   ├── Certifications.tsx  # Certifications display
│   │   ├── Contact.tsx         # Contact form and information
│   │   ├── Education.tsx       # Education timeline
│   │   ├── Experience.tsx      # Professional experience
│   │   ├── Footer.tsx          # Site footer
│   │   ├── Header.tsx          # Navigation header
│   │   ├── Hero.tsx            # Landing hero section
│   │   ├── MarkdownRenderer.tsx # Markdown content processor
│   │   ├── ParticleBackground.tsx # Interactive particle system
│   │   ├── Projects.tsx        # Project showcase
│   │   └── Skills.tsx          # Skills visualization
│   ├── 📁 data/                # Data management layer
│   │   ├── markdownResumeData.ts # Markdown data loader
│   │   ├── ResumeDataLoader.ts # Data extraction utilities
│   │   └── 📁 parsers/          # Parsers for each resume section
│   ├── 📁 types/               # TypeScript definitions
│   │   ├── resume.ts           # Resume data types
│   │   └── markdown.d.ts       # Markdown module declarations
│   ├── 📁 utils/               # Utility functions
│   │   └── markdownParser.ts   # Markdown processing utilities
│   ├── App.tsx                 # Main application component
│   ├── main.tsx               # Application entry point
│   └── index.css              # Global styles and Tailwind imports
├── 📁 resume/                  # Markdown content system
│   ├── 📁 images/             # Resume images and assets
│   │   └── avatar.svg         # Profile avatar (referenced in summary.md)
│   └── 📁 sections/           # Markdown resume sections
│       ├── awards.md          # Awards and recognition
│       ├── certifications.md  # Professional certifications
│       ├── education.md       # Educational background
│       ├── experience.md      # Work experience
│       ├── projects.md        # Project portfolio
│       ├── publications.md    # Publications and articles
│       ├── skills.md          # Technical skills
│       └── summary.md         # Professional summary
├── 📁 .github/workflows/      # CI/CD automation
│   └── build.yml             # GitHub Pages deployment
├── 📁 Docker Files            # Containerization
│   ├── Dockerfile            # Production image
│   ├── Dockerfile.dev        # Development image
│   ├── Dockerfile.build      # Build-only image
│   └── docker-compose.yml    # Multi-service orchestration
├── ⚙️ Configuration Files
│   ├── vite.config.ts        # Vite build configuration
│   ├── tailwind.config.js    # Tailwind design system
│   ├── tsconfig.json         # TypeScript configuration
│   ├── postcss.config.js     # PostCSS processing
│   └── nginx.conf            # Production server config
└── 🔧 Development Tools
    ├── dev.sh                # Development utility script
    ├── package.json          # Project dependencies
    └── index.html            # HTML template
```

## 🚀 Quick Start

### Prerequisites
- **Docker & Docker Compose** - Required for containerized development
- **Git** - For version control
- **Node.js 18+** - (Optional) For local development without Docker

### Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/glebobos/cv-portfolio.git
   cd cv-portfolio
   ```

2. **Start development environment**
   ```bash
   ./dev.sh dev
   ```
   This will start the development server at `http://localhost:3000` with hot reload enabled.

### Available Commands

The `dev.sh` script provides comprehensive development utilities:

```bash
# Development
./dev.sh dev         # Start development server with hot reload
./dev.sh shell       # Enter development container shell for debugging

# Building & Production
./dev.sh build       # Build production version (outputs to ./dist)
./dev.sh prod        # Run production server on port 80

# Maintenance
./dev.sh clean       # Clean up all Docker images and containers
./dev.sh logs        # View application logs

# Alternative: Direct Docker Compose
docker-compose up dev       # Development server
docker-compose up prod      # Production server
docker-compose run build   # Build only
```

## 📝 Content Management

This portfolio uses a Markdown-based system for content management. All resume data is sourced from the `.md` files located in the `resume/sections/` directory.

### How to Edit Content

1.  **Navigate to the `resume/sections/` directory.**
2.  **Edit the Markdown files** to update your resume information. Each file corresponds to a section on the website.
3.  **Follow the instructions** in `resume/sections/INSTRUCTIONS.md` for a detailed guide on how to fill out each section.

### Example: Editing Experience

To edit your work experience, open `resume/sections/experience.md`:

```markdown
# Professional Experience

## Senior Software Engineer | TechCorp
**March 2022 - Present**

Led development of cloud-native applications serving 100K+ users.

### Key Achievements:
- Reduced deployment time by 70% through CI/CD automation
- Architected microservices handling 10M+ requests daily
- Mentored team of 5 junior developers

**Technologies:** AWS, Docker, React, TypeScript
```

### Avatar Image Management

The portfolio automatically extracts and displays your profile avatar.

1.  **Add your avatar image** to the `resume/images/` directory (e.g., `avatar.jpg`, `profile.png`).
2.  **Reference it in `resume/sections/summary.md`**:
    ```markdown
    ![Profile Avatar](../images/your-image-name.jpg)
    ```
The system will automatically display the image in the Hero section.

## 🎨 Customization Guide

### Design System & Colors

Modify the color palette in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#eff6ff',   // Light blue
        500: '#3b82f6',  // Primary blue
        900: '#1e3a8a',  // Dark blue
      },
      secondary: {
        50: '#f8fafc',   // Light gray
        500: '#64748b',  // Medium gray
        900: '#0f172a',  // Dark gray
      }
    },
    animation: {
      'fade-in': 'fadeIn 0.5s ease-in-out',
      'slide-up': 'slideUp 0.6s ease-out',
    }
  }
}
```

### Component Customization

The portfolio uses a modular component architecture. Key components:

- **`Hero.tsx`** - Landing section with name, title, and call-to-action
- **`About.tsx`** - Professional summary with markdown support
- **`Experience.tsx`** - Work history with timeline layout
- **`Skills.tsx`** - Technical skills with progress indicators
- **`Projects.tsx`** - Project showcase with links and technologies
- **`Contact.tsx`** - Contact form and social links

### Adding New Sections

1. **Create the component:**
   ```typescript
   // src/components/NewSection.tsx
   export default function NewSection() {
     return (
       <section id="new-section" className="py-20">
         {/* Your content */}
       </section>
     );
   }
   ```

2. **Add to main app:**
   ```typescript
   // src/App.tsx
   import NewSection from './components/NewSection';
   
   function App() {
     return (
       <main>
         {/* ...existing sections... */}
         <NewSection />
       </main>
     );
   }
   ```

3. **Update navigation:**
   ```typescript
   // src/components/Header.tsx
   const navItems = [
     // ...existing items...
     { label: 'New Section', href: '#new-section' }
   ];
   ```

### Animation Customization

Framer Motion animations are configured throughout the components:

```typescript
// Example animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

// Usage in components
<motion.div variants={fadeInUp} initial="initial" animate="animate">
  Your content
</motion.div>
```

## 🐳 Docker Development

### Container Architecture

The project uses a multi-container Docker setup optimized for different environments:

```yaml
# docker-compose.yml services
services:
  dev:        # Development with hot reload
  prod:       # Production Nginx server  
  build:      # Build-only for CI/CD
```

### Development Workflow

```bash
# Start development environment
docker-compose up dev
# ✅ Starts on http://localhost:3000
# ✅ Volume mounting for hot reload
# ✅ Node modules optimization

# Production testing
docker-compose up prod  
# ✅ Nginx server on http://localhost:80
# ✅ Optimized static files
# ✅ Production security headers

# Build artifacts
docker-compose run --rm build
# ✅ Outputs to ./dist directory
# ✅ Optimized for deployment
```

### Custom Docker Commands

```bash
# Build production image
docker build -t cv-portfolio .

# Run with custom port
docker run -p 8080:80 cv-portfolio

# Development with volume mounting
docker run -p 3000:3000 -v $(pwd):/app cv-portfolio-dev

# Debug container
docker run -it cv-portfolio-dev sh
```

## 🚀 Deployment Options

### GitHub Pages (Automated - Recommended)

The project includes a complete GitHub Actions workflow that automatically:

1. **Builds** the application using Docker containers
2. **Tests** the build process with multiple validations  
3. **Deploys** to GitHub Pages with optimized assets
4. **Manages** build artifacts and caching

**Setup Steps:**

1. **Fork/Clone** this repository to your GitHub account
2. **Enable GitHub Pages** in repository settings:
   - Go to Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: `gh-pages` (created automatically)
3. **Configure base URL** in `vite.config.ts`:
   ```typescript
   export default defineConfig({
     base: '/your-repo-name/',  // Update this
     // ... other config
   });
   ```
4. **Push to main branch** - deployment happens automatically
5. **Access your site** at `https://yourusername.github.io/your-repo-name`

### Custom Domain Setup

To use a custom domain with GitHub Pages:

1. **Add CNAME file** to `public/` directory:
   ```bash
   echo "yourdomain.com" > public/CNAME
   ```

2. **Update Vite config** for custom domain:
   ```typescript
   export default defineConfig({
     base: '/',  // Root path for custom domain
     // ... other config
   });
   ```

3. **Configure DNS** with your domain provider:
   ```
   Type: CNAME
   Name: www (or @)
   Value: yourusername.github.io
   ```

### Manual Deployment

For other hosting providers:

```bash
# Build the application
./dev.sh build

# Upload ./dist/ contents to your hosting provider
# Examples:
# - Netlify: Drag & drop ./dist folder
# - Vercel: Connect GitHub repo  
# - AWS S3: Upload to S3 bucket
# - Traditional hosting: Upload via FTP/SFTP
```

### Docker Production Deployment

```bash
# Build production image
docker build -t cv-portfolio .

# Run with environment variables
docker run -d \
  -p 80:80 \
  --name cv-portfolio \
  --restart unless-stopped \
  cv-portfolio

# With custom nginx config
docker run -d \
  -p 80:80 \
  -v $(pwd)/custom-nginx.conf:/etc/nginx/nginx.conf \
  cv-portfolio
```

## ⚡ Performance & Optimization

### Build Optimization

The project includes several performance optimizations:

```typescript
// vite.config.ts optimizations
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animations: ['framer-motion'],
          icons: ['lucide-react']
        }
      }
    },
    // Source maps for debugging
    sourcemap: true,
    // Asset optimization
    assetsDir: 'assets',
  },
  // Path aliases for cleaner imports
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
```

### Performance Metrics

- **Lighthouse Score**: 95+ across all categories
- **Bundle Size**: < 500KB gzipped
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

### Optimization Features

- **Code Splitting**: Automatic chunk splitting for optimal loading
- **Tree Shaking**: Eliminates unused code from bundles
- **Asset Optimization**: Image compression and lazy loading
- **Caching Strategy**: Long-term caching with versioned assets
- **Critical CSS**: Inline critical styles for faster rendering

## 🔧 Development Tools

### Code Quality

```bash
# Type checking
npm run type-check

# Linting with ESLint
npm run lint

# Code formatting with Prettier  
npm run format

# All checks (recommended before commits)
npm run type-check && npm run lint
```

### Development Scripts

```bash
# Standard development
npm run dev          # Start dev server
npm run build        # Production build
npm run preview      # Preview production build

# Quality assurance
npm run lint         # ESLint checking
npm run format       # Prettier formatting
npm run type-check   # TypeScript validation
```

### IDE Setup

**VS Code Extensions (Recommended):**
- TypeScript and JavaScript Language Features
- Tailwind CSS IntelliSense  
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint

**Settings for VS Code:**
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative"
}
```

## 📱 Responsive Design

The portfolio implements a comprehensive responsive design system:

### Breakpoint Strategy
- **Mobile First**: Base styles for mobile (320px+)
- **Tablet**: Enhanced layouts (768px+) 
- **Desktop**: Full-featured experience (1024px+)
- **Large Desktop**: Optimized for large screens (1280px+)
- **Ultra-wide**: Support for ultra-wide displays (1536px+)

### Responsive Components
```typescript
// Example responsive component structure
<div className="
  grid 
  grid-cols-1          // Mobile: 1 column
  md:grid-cols-2       // Tablet: 2 columns  
  lg:grid-cols-3       // Desktop: 3 columns
  xl:grid-cols-4       // Large: 4 columns
  gap-4 md:gap-6 lg:gap-8
">
```

### Mobile Optimization
- **Touch-friendly**: 44px minimum touch targets
- **Readable Text**: 16px base font size on mobile
- **Optimized Images**: Responsive images with multiple sizes
- **Reduced Motion**: Respect user's motion preferences

## 🔒 Security & Best Practices

### Security Headers

The Nginx configuration includes comprehensive security headers:

```nginx
# nginx.conf security features
add_header X-Frame-Options DENY;
add_header X-Content-Type-Options nosniff;
add_header X-XSS-Protection "1; mode=block";
add_header Referrer-Policy strict-origin-when-cross-origin;
add_header Content-Security-Policy "default-src 'self'...";
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";
```

### Content Security Policy

```javascript
// Implemented CSP for XSS protection
"default-src 'self'; 
 script-src 'self' 'unsafe-inline'; 
 style-src 'self' 'unsafe-inline';
 img-src 'self' data: https:;
 font-src 'self' data:;
 connect-src 'self';"
```

### Development Security
- **Dependency Scanning**: Regular security audits with `npm audit`
- **Type Safety**: TypeScript for runtime error prevention
- **Environment Variables**: Secure configuration management
- **Input Validation**: Form input sanitization and validation

## 🤝 Contributing

We welcome contributions to improve this portfolio template!

### Development Setup

1. **Fork and clone** the repository
2. **Create a feature branch**:
   ```bash
   git checkout -b feature/amazing-improvement
   ```
3. **Start development environment**:
   ```bash
   ./dev.sh dev
   ```
4. **Make your changes** with proper testing
5. **Commit with conventional commits**:
   ```bash
   git commit -m "feat: add new animation component"
   ```
6. **Push and create Pull Request**

### Contribution Guidelines

- **Code Style**: Follow ESLint and Prettier configurations
- **TypeScript**: Maintain type safety throughout
- **Testing**: Test changes across different screen sizes
- **Documentation**: Update README for new features
- **Performance**: Ensure changes don't impact load times

### Issue Reporting

When reporting issues, please include:
- **Environment**: OS, Browser, Node.js version
- **Steps to Reproduce**: Clear step-by-step instructions
- **Expected vs Actual**: What should happen vs what happens
- **Screenshots**: Visual issues benefit from screenshots

## 📊 Analytics & Monitoring

### Performance Monitoring

```bash
# Lighthouse CI for performance tracking
npx lighthouse-ci --collect.url=http://localhost:3000

# Bundle analysis
npm run build
npx vite-bundle-analyzer dist
```

### SEO Optimization

The portfolio includes comprehensive SEO setup:

```html
<!-- Optimized meta tags -->
<meta name="description" content="Professional portfolio of [Your Name]">
<meta name="keywords" content="developer, portfolio, react, typescript">
<meta property="og:title" content="[Your Name] - Portfolio">
<meta property="og:description" content="Professional portfolio...">
<meta property="og:image" content="/images/og-image.jpg">
<meta name="twitter:card" content="summary_large_image">
```

## 📄 License & Attribution

This project is open source and available under the [MIT License](LICENSE).

### Attribution
- **React Team** - React framework
- **Tailwind Labs** - Tailwind CSS utility framework  
- **Framer** - Framer Motion animation library
- **Evan You** - Vite build tool
- **Lucide** - Beautiful icon library

## 🆘 Support & Community

### Getting Help

1. **Documentation**: Check this README and inline code comments
2. **Issues**: Search [existing issues](https://github.com/glebobos/cv-portfolio/issues) 
3. **Discussions**: Join [GitHub Discussions](https://github.com/glebobos/cv-portfolio/discussions)
4. **Contact**: Reach out via [LinkedIn](https://www.linkedin.com/in/hleb-yarmolchyk-573142153)

### Community Resources

- **Portfolio Showcase**: Share your customized versions
- **Feature Requests**: Suggest new features via GitHub Issues
- **Templates**: Alternative layouts and designs
- **Tutorials**: Step-by-step customization guides

---

**Built with ❤️ by [Hleb Yarmolchyk](https://github.com/glebobos)**

*Last updated: July 2025*
