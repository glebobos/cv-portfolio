#!/usr/bin/env bash
# build_resume.sh - Script to build resume from markdown files

set -e

# Create output directory
OUTPUT_DIR="./build"
mkdir -p "$OUTPUT_DIR"

# Function to extract content from markdown files, skipping headers and metadata
extract_content() {
  local file=$1
  local skip_lines=$2
  
  if [[ -z "$skip_lines" ]]; then
    skip_lines=3
  fi
  
  tail -n +$skip_lines "$file" | grep -v "^---" | grep -v "^\*"
}

echo "Combining markdown files..."

# Create temp file
TEMP_FILE=$(mktemp)

# Create frontmatter
echo "---" > "$TEMP_FILE"
echo "title: HLEB YARMOLCHYK - Professional Resume" >> "$TEMP_FILE"
echo "author: Hleb Yarmolchyk" >> "$TEMP_FILE"
echo "date: $(date +'%B %d, %Y')" >> "$TEMP_FILE"
echo "---" >> "$TEMP_FILE"

# Extract name and contact info from summary
NAME=$(grep "^# HLEB YARMOLCHYK" ./resume/sections/summary.md)
TITLE_LINE=$(grep "^\*\*Chief Systems Engineer" ./resume/sections/summary.md)
CONTACTS=$(grep "^📧" ./resume/sections/summary.md)

# Add name and contact info
echo "$NAME" >> "$TEMP_FILE"
echo "$TITLE_LINE" >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"
echo "$CONTACTS" >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"

# Add executive summary 
echo "## EXECUTIVE SUMMARY" >> "$TEMP_FILE"
SUMMARY=$(grep -A 12 "^## EXECUTIVE SUMMARY" ./resume/sections/summary.md | tail -n +2)
echo "$SUMMARY" >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"

# Add core technical competencies
echo "## CORE TECHNICAL COMPETENCIES" >> "$TEMP_FILE"
SECTIONS=$(sed -n '/^### \*\*Cloud Platforms/,/^## /p' ./resume/sections/summary.md | sed '$d')
echo "$SECTIONS" >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"

# Add professional experience
echo "## PROFESSIONAL EXPERIENCE" >> "$TEMP_FILE"
EXPERIENCE=$(tail -n +5 ./resume/sections/experience.md)
echo "$EXPERIENCE" >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"

# Add project portfolio
echo "## MAJOR PROJECT PORTFOLIO" >> "$TEMP_FILE"
PROJECTS=$(tail -n +5 ./resume/sections/projects.md)
echo "$PROJECTS" >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"

# Add technical expertise matrix
echo "## TECHNICAL EXPERTISE MATRIX" >> "$TEMP_FILE"
TECH_MATRIX=$(sed -n '/^## Technical Expertise Matrix/,/^##/p' ./resume/sections/skills.md | sed '$d' | tail -n +2)
echo "$TECH_MATRIX" >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"

# Add certifications
echo "## PROFESSIONAL CERTIFICATIONS" >> "$TEMP_FILE"
CERTS=$(tail -n +5 ./resume/sections/certifications.md)
echo "$CERTS" >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"

# Add publications and patents
echo "## PUBLICATIONS & TECHNICAL CONTRIBUTIONS" >> "$TEMP_FILE"
PUBS=$(tail -n +5 ./resume/sections/publications.md)
echo "$PUBS" >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"

# Add education
echo "## EDUCATION & BACKGROUND" >> "$TEMP_FILE"
EDU=$(tail -n +5 ./resume/sections/education.md)
echo "$EDU" >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"

# Add footer
echo "---" >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"
echo "*Last updated: $(date +'%B %d, %Y')*" >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"

# Copy the temp file to the output file
cp "$TEMP_FILE" "$OUTPUT_DIR/resume.md"

# Clean up
rm "$TEMP_FILE"

# Generate HTML and PDF files
echo "Generating HTML and PDF files..."

# Convert to HTML using template
pandoc -s "$OUTPUT_DIR/resume.md" \
  --template=./templates/resume-template.html \
  -c resume.css \
  -o "$OUTPUT_DIR/resume.html"

# Convert to PDF
wkhtmltopdf \
  --page-size A4 \
  --enable-local-file-access \
  --margin-top 15 \
  --margin-bottom 15 \
  --margin-left 15 \
  --margin-right 15 \
  "$OUTPUT_DIR/resume.html" \
  "$OUTPUT_DIR/resume.pdf"

# Generate one-page resume
pandoc -s "$OUTPUT_DIR/resume.md" \
  --template=./templates/resume-template.html \
  -c one_page.css \
  -o "$OUTPUT_DIR/one_page.html"

# Convert to PDF
wkhtmltopdf \
  --page-size A4 \
  --enable-local-file-access \
  --margin-top 15 \
  --margin-bottom 15 \
  --margin-left 15 \
  --margin-right 15 \
  "$OUTPUT_DIR/one_page.html" \
  "$OUTPUT_DIR/one_page_resume.pdf"

# Create PDFs directory in assets if it doesn't exist
mkdir -p ./assets/pdfs

# Copy PDFs to assets directory
cp "$OUTPUT_DIR/resume.pdf" ./assets/pdfs/full_resume.pdf
cp "$OUTPUT_DIR/one_page_resume.pdf" ./assets/pdfs/one_page_resume.pdf

# GitHub Pages deployment is handled by the GitHub Actions workflow

echo "PDFs generated successfully in ./assets/pdfs/"
echo "Index page generated as index.html"
echo "Resume build complete!"

# Add technical expertise from skills
echo "## TECHNICAL EXPERTISE MATRIX" >> "$OUTPUT_DIR/resume.md"
EXPERTISE=$(grep -A 20 "^## Technical Expertise Matrix" ./resume/sections/skills.md | tail -n +2)
echo "$EXPERTISE" >> "$OUTPUT_DIR/resume.md"
echo "" >> "$OUTPUT_DIR/resume.md"

# Add experience section
echo "## Experience" >> "$OUTPUT_DIR/resume.md"
EXPERIENCE=$(extract_content ./resume/sections/experience.md 5)
echo "$EXPERIENCE" >> "$OUTPUT_DIR/resume.md"
echo "" >> "$OUTPUT_DIR/resume.md"

# Add projects section
echo "## Projects" >> "$OUTPUT_DIR/resume.md"
PROJECTS=$(extract_content ./resume/sections/projects.md 5)
echo "$PROJECTS" >> "$OUTPUT_DIR/resume.md"
echo "" >> "$OUTPUT_DIR/resume.md"

# Add education section
echo "## Education" >> "$OUTPUT_DIR/resume.md"
EDUCATION=$(extract_content ./resume/sections/education.md 5)
echo "$EDUCATION" >> "$OUTPUT_DIR/resume.md"
echo "" >> "$OUTPUT_DIR/resume.md"

# Add certifications section
echo "## Certifications" >> "$OUTPUT_DIR/resume.md"
CERTIFICATIONS=$(extract_content ./resume/sections/certifications.md 5)
echo "$CERTIFICATIONS" >> "$OUTPUT_DIR/resume.md"
echo "" >> "$OUTPUT_DIR/resume.md"

# Add awards section
echo "## Awards & Recognition" >> "$OUTPUT_DIR/resume.md"
AWARDS=$(extract_content ./resume/sections/awards.md 5)
echo "$AWARDS" >> "$OUTPUT_DIR/resume.md"
echo "" >> "$OUTPUT_DIR/resume.md"

# Add publications section if it exists and has content
if [[ -f "./resume/sections/publications.md" ]]; then
  PUBLICATIONS=$(extract_content ./resume/sections/publications.md 5)
  if [[ ! -z "$PUBLICATIONS" ]]; then
    echo "## Publications" >> "$OUTPUT_DIR/resume.md"
    echo "$PUBLICATIONS" >> "$OUTPUT_DIR/resume.md"
    echo "" >> "$OUTPUT_DIR/resume.md"
  fi
fi

# Copy CSS files to output directory
cp ./styles/resume.css "$OUTPUT_DIR/"
cp ./styles/one_page.css "$OUTPUT_DIR/"

echo "Generating HTML and PDF files..."

# Check if pandoc is installed
if command -v pandoc &> /dev/null; then
  # Generate HTML resume
  pandoc -s \
    --template="$PWD/templates/resume-template.html" \
    -f markdown -t html \
    "$OUTPUT_DIR/resume.md" -o "$OUTPUT_DIR/resume.html" \
    --css=resume.css
    
  # Check if wkhtmltopdf is installed
  if command -v wkhtmltopdf &> /dev/null; then
    # Generate PDF resume
    wkhtmltopdf \
      --enable-local-file-access \
      "$OUTPUT_DIR/resume.html" "$OUTPUT_DIR/resume.pdf"
      
    # Generate one-page PDF resume
    pandoc -s \
      --template="$PWD/templates/resume-template.html" \
      -f markdown -t html \
      "$OUTPUT_DIR/resume.md" -o "$OUTPUT_DIR/one_page.html" \
      --css=one_page.css
      
    wkhtmltopdf \
      --enable-local-file-access \
      "$OUTPUT_DIR/one_page.html" "$OUTPUT_DIR/one_page_resume.pdf"
      
    # Copy PDFs to assets folder
    mkdir -p ./assets/pdfs
    cp "$OUTPUT_DIR/resume.pdf" ./assets/pdfs/full_resume.pdf
    cp "$OUTPUT_DIR/one_page_resume.pdf" ./assets/pdfs/one_page_resume.pdf
    
    # PDFs will be copied to the correct location by the GitHub Actions workflow
    
    echo "PDFs generated successfully in ./assets/pdfs/"
  else
    echo "Warning: wkhtmltopdf not found, skipping PDF generation"
  fi
else
  echo "Warning: pandoc not found, skipping HTML and PDF generation"
fi

echo "Resume build complete!"
