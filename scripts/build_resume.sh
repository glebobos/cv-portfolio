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

# Create frontmatter
echo "---" > "$OUTPUT_DIR/resume.md"
TITLE=$(grep "^#" ./resume/sections/summary.md | head -n 1 | sed 's/# //')
echo "title: $TITLE" >> "$OUTPUT_DIR/resume.md"
echo "---" >> "$OUTPUT_DIR/resume.md"

# Extract contact info from summary (name and contact details)
NAME=$(grep -A 3 "^# " ./resume/sections/summary.md | tail -n 1)
CONTACTS=$(grep -A 1 "📧" ./resume/sections/summary.md)
echo "$NAME" >> "$OUTPUT_DIR/resume.md"
echo "$CONTACTS" >> "$OUTPUT_DIR/resume.md"
echo "" >> "$OUTPUT_DIR/resume.md"

# Add executive summary
SUMMARY=$(grep -A 10 "## EXECUTIVE SUMMARY" ./resume/sections/summary.md)
echo "$SUMMARY" >> "$OUTPUT_DIR/resume.md"
echo "" >> "$OUTPUT_DIR/resume.md"

# Add skills section
echo "## Skills" >> "$OUTPUT_DIR/resume.md"
SKILLS=$(extract_content ./resume/sections/skills.md 5)
echo "$SKILLS" >> "$OUTPUT_DIR/resume.md"
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
    
    echo "PDFs generated successfully in ./assets/pdfs/"
  else
    echo "Warning: wkhtmltopdf not found, skipping PDF generation"
  fi
else
  echo "Warning: pandoc not found, skipping HTML and PDF generation"
fi

echo "Resume build complete!"
