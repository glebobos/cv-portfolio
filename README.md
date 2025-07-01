# CV Portfolio - Modern Resume Website

A state-of-the-art resume portfolio website built with **Vite**, **React**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. Deployed automatically to GitHub Pages using Docker-based CI/CD workflows.

## 🚀 Features

- **Modern Tech Stack**: Vite + React 18 + TypeScript + Tailwind CSS
- **Stunning Animations**: Framer Motion for smooth, professional animations
- **Responsive Design**: Mobile-first approach with beautiful layouts
- **Docker Support**: Complete containerization for development and production
- **GitHub Actions**: Automated CI/CD pipeline with Docker builds
- **Performance Optimized**: Fast loading with modern build tools
- **SEO Ready**: Meta tags and optimized for search engines
- **Interactive Elements**: Particle background and scroll animations

## 🛠️ Tech Stack

### Frontend
- **React 18** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Ultra-fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Production-ready motion library
- **Lucide React** - Beautiful, customizable icons

### DevOps & Deployment
- **Docker** - Containerization for consistent environments
- **GitHub Actions** - CI/CD automation
- **GitHub Pages** - Free static site hosting
- **Nginx** - Production web server

## 🏗️ Project Structure

```
cv-portfolio/
├── src/
│   ├── components/          # React components
│   ├── data/               # Resume data and configuration
│   ├── types/              # TypeScript type definitions
│   └── index.css           # Global styles and Tailwind
├── .github/
│   └── workflows/          # GitHub Actions CI/CD
├── docker-compose.yml      # Docker services configuration
├── Dockerfile              # Production Docker image
├── Dockerfile.dev          # Development Docker image
├── Dockerfile.build        # Build-only Docker image
├── nginx.conf             # Nginx configuration
├── dev.sh                 # Development utility script
└── package.json           # Project dependencies
```

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Git

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
   This will start the development server at `http://localhost:3000`

### Available Commands

The `dev.sh` script provides several utilities:

```bash
# Start development server
./dev.sh dev

# Build production version
./dev.sh build

# Run production server
./dev.sh prod

# Clean up Docker resources
./dev.sh clean

# View application logs
./dev.sh logs

# Enter development container shell
./dev.sh shell
```

## 📝 Customization

### 1. Update Resume Data

Edit `src/data/resumeData.ts` to customize your personal information, experience, skills, and projects:

```typescript
export const resumeData: ResumeData = {
  personalInfo: {
    name: "Your Name",
    title: "Your Title",
    email: "your.email@example.com",
    // ... other fields
  },
  // ... other sections
};
```

### 2. Customize Colors

Modify the color scheme in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your primary color palette
      },
      secondary: {
        // Your secondary color palette
      }
    }
  }
}
```

### 3. Add New Sections

1. Create a new component in `src/components/`
2. Add it to `src/App.tsx`
3. Update the navigation in `src/components/Header.tsx`

## 🐳 Docker Usage

### Development
```bash
# Start development environment
docker-compose up dev

# With custom port
docker-compose -f docker-compose.yml -p 3001:3000 up dev
```

### Production
```bash
# Build and run production version
docker-compose up prod

# Build only
docker-compose run --rm build
```

### Custom Docker Commands
```bash
# Build production image
docker build -t cv-portfolio .

# Run production container
docker run -p 80:80 cv-portfolio

# Development with volume mounting
docker run -p 3000:3000 -v $(pwd):/app cv-portfolio-dev
```

## 🚀 Deployment

### GitHub Pages (Automated)

The project includes a GitHub Actions workflow that automatically:

1. **Builds** the application using Docker
2. **Tests** the build process
3. **Deploys** to GitHub Pages
4. **Publishes** Docker images to GitHub Container Registry

**Setup Steps:**

1. **Fork/Clone** this repository
2. **Enable GitHub Pages** in repository settings
3. **Push to main branch** - deployment happens automatically
4. **Access your site** at `https://yourusername.github.io/cv-portfolio`

### Manual Deployment

```bash
# Build the application
./dev.sh build

# Deploy the dist/ folder to your hosting provider
# Files will be in ./dist/
```

### Custom Domain

To use a custom domain with GitHub Pages:

1. Add a `CNAME` file to the `public/` directory
2. Configure your domain's DNS settings
3. Update the `base` URL in `vite.config.ts`

## 🔧 Development Workflow

### Local Development
```bash
# Start development server
./dev.sh dev

# The app will be available at http://localhost:3000
# Hot reload is enabled for instant feedback
```

### Code Quality
```bash
# Run TypeScript type checking
npm run type-check

# Run ESLint
npm run lint

# Format code with Prettier
npm run format
```

### Building for Production
```bash
# Build using Docker (recommended)
./dev.sh build

# Or build using npm
npm run build
```

## 📱 Responsive Design

The portfolio is built with a mobile-first approach:

- **Mobile**: Optimized for phones (320px+)
- **Tablet**: Enhanced layouts for tablets (768px+)
- **Desktop**: Full-featured desktop experience (1024px+)
- **Large Desktop**: Optimized for large screens (1280px+)

## 🎨 Design Features

- **Modern Glassmorphism**: Subtle transparency effects
- **Smooth Animations**: Page transitions and scroll effects
- **Interactive Elements**: Hover states and micro-interactions
- **Dark Mode Ready**: Easy to implement dark theme
- **Accessibility**: WCAG compliant design patterns

## 🔒 Security

- **Content Security Policy**: Implemented in nginx.conf
- **Security Headers**: X-Frame-Options, X-XSS-Protection, etc.
- **HTTPS Ready**: SSL/TLS configuration for production
- **Dependency Security**: Regular updates and vulnerability scanning

## 📊 Performance

- **Lighthouse Score**: 95+ in all categories
- **Bundle Size**: Optimized with code splitting
- **Image Optimization**: Responsive images and lazy loading
- **Caching Strategy**: Static asset caching with nginx

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/glebobos/cv-portfolio/issues) page
2. Create a new issue with detailed information
3. Reach out via [LinkedIn](https://www.linkedin.com/in/hleb-yarmolchyk-573142153)

## ⭐ Acknowledgments

- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first approach
- **Framer Motion** for beautiful animations
- **Vite** for the lightning-fast build tool
- **Docker** for containerization excellence

---

**Built with ❤️ by [Hleb Yarmolchyk](https://github.com/glebobos)**
