# SIPH Resume Portfolio

A Simple, Indexed, Professional, and Hierarchical (SIPH) resume portfolio created in Markdown format. This repository contains a structured, version-controlled professional resume that can be easily maintained and exported to various formats.

## Overview

This portfolio uses a modular approach where resume content is split into individual Markdown files for easier maintenance, then combined during build time to create a single resume document that can be exported to HTML and PDF formats.

## Repository Structure

```
cv-portfolio/
├── assets/
│   ├── images/          # Images for the portfolio and projects
│   └── pdfs/            # Generated PDF versions of resumes
├── build/               # Generated combined Markdown, HTML, and PDFs
├── resume/
│   ├── index.md         # Main entry point for the resume
│   └── sections/        # Individual resume sections
│       ├── summary.md
│       ├── experience.md
│       ├── education.md
│       ├── skills.md
│       ├── projects.md
│       ├── certifications.md
├── resume-md/           # Example resume implementation
├── scripts/             # Build scripts
│   └── build_resume.sh  # Script to combine MD files and generate outputs
├── styles/              # CSS stylesheets
│   ├── resume.css       # Styles for the full resume
│   └── one_page.css     # Styles for the one-page resume
├── flake.nix            # Nix configuration for reproducible builds
├── flake.lock           # Lock file for Nix dependencies
│       ├── awards.md
│       ├── publications.md
│       └── references.md
├── scripts/
│   └── generate_pdfs.sh # Script to generate PDF versions of resume
├── styles/
│   ├── resume.css       # Styling for full resume
│   └── one_page.css     # Styling for one-page resume
├── LICENSE
└── README.md
```

## Features

- **Modular Structure**: Each section of the resume is stored in its own file for easy maintenance
- **Version Control**: Track changes to your resume over time
- **Multiple Formats**: Generate both full and one-page PDF versions
- **Customizable**: Easily modify each section or add new ones as needed
- **Portable**: Markdown format is widely supported and can be converted to many formats
- **Professional**: Structured in a hierarchical manner for readability

## Getting Started

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/cv-portfolio.git
   cd cv-portfolio
   ```

2. Edit the resume sections in the `resume/sections/` directory to add your personal information.

3. Generate PDF versions (requires [Pandoc](https://pandoc.org/) and [wkhtmltopdf](https://wkhtmltopdf.org/)):
   ```
   chmod +x scripts/generate_pdfs.sh
   ./scripts/generate_pdfs.sh
   ```

## Build Instructions

### Using Nix (Recommended)

If you have Nix installed with flakes enabled:

```bash
# Build the resume (generates HTML and PDF)
nix build

# Alternatively, enter a development shell with all dependencies
nix develop
```

### Using the Bash Script

If you don't have Nix or prefer a more traditional approach:

```bash
# Make sure you have pandoc and wkhtmltopdf installed
# For Ubuntu/Debian:
# sudo apt-get install pandoc wkhtmltopdf
# For macOS with Homebrew:
# brew install pandoc wkhtmltopdf

# Run the build script
./scripts/build_resume.sh
```

### GitHub Actions

This repository is configured to automatically build the resume on every push to the main branch using GitHub Actions. The generated PDFs are available as artifacts and can also be published to GitHub Pages.

## Customization

1. Edit the individual markdown files in `resume/sections/` to update your resume content
2. Modify the CSS styles in `styles/` to change the appearance
3. Update the build script if you need to add or change sections

## Dependencies

- [Pandoc](https://pandoc.org/) - Used to convert Markdown to HTML
- [wkhtmltopdf](https://wkhtmltopdf.org/) - Used to convert HTML to PDF
- [Nix](https://nixos.org/) (optional) - For reproducible builds

## License

This project is licensed under the terms of the license included in this repository.

---

Last Updated: July 1, 2025
