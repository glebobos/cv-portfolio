{
  description = "CV Portfolio with Markdown";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
        
        # Script to combine markdown files into a single resume
        combineScript = pkgs.writeShellScriptBin "combine-resume" ''
          #!/usr/bin/env bash
          set -e
          
          OUTPUT_DIR="$1"
          mkdir -p "$OUTPUT_DIR"
          
          # Get the title from summary.md
          TITLE=$(grep -A 1 "# " ./resume/sections/summary.md | head -n 2 | tail -n 1)
          
          # Create frontmatter
          echo "---" > "$OUTPUT_DIR/resume.md"
          echo "title: $TITLE" >> "$OUTPUT_DIR/resume.md"
          echo "---" >> "$OUTPUT_DIR/resume.md"
          
          # Add contact information from summary
          grep -A 5 "📧" ./resume/sections/summary.md >> "$OUTPUT_DIR/resume.md"
          echo "" >> "$OUTPUT_DIR/resume.md"
          
          # Add summary
          grep -A 10 "## EXECUTIVE SUMMARY" ./resume/sections/summary.md >> "$OUTPUT_DIR/resume.md"
          echo "" >> "$OUTPUT_DIR/resume.md"
          
          # Add skills section
          echo "## Skills" >> "$OUTPUT_DIR/resume.md"
          grep -v "^#" ./resume/sections/skills.md | grep -v "^---" | grep -v "^\*" >> "$OUTPUT_DIR/resume.md"
          echo "" >> "$OUTPUT_DIR/resume.md"
          
          # Add experience section
          echo "## Experience" >> "$OUTPUT_DIR/resume.md"
          grep -v "^# Work Experience" ./resume/sections/experience.md | grep -v "^---" | grep -v "^\*" >> "$OUTPUT_DIR/resume.md"
          echo "" >> "$OUTPUT_DIR/resume.md"
          
          # Add education section
          echo "## Education" >> "$OUTPUT_DIR/resume.md"
          grep -v "^#" ./resume/sections/education.md | grep -v "^---" | grep -v "^\*" >> "$OUTPUT_DIR/resume.md"
          echo "" >> "$OUTPUT_DIR/resume.md"
          
          # Add projects section
          echo "## Projects" >> "$OUTPUT_DIR/resume.md"
          grep -v "^#" ./resume/sections/projects.md | grep -v "^---" | grep -v "^\*" >> "$OUTPUT_DIR/resume.md"
          echo "" >> "$OUTPUT_DIR/resume.md"
          
          # Add certifications section
          echo "## Certifications" >> "$OUTPUT_DIR/resume.md"
          grep -v "^#" ./resume/sections/certifications.md | grep -v "^---" | grep -v "^\*" >> "$OUTPUT_DIR/resume.md"
          
          # Copy CSS files
          cp ./styles/resume.css "$OUTPUT_DIR/"
          cp ./styles/one_page.css "$OUTPUT_DIR/"
        '';
        
        # Build the resume
        buildResume = pkgs.writeShellScriptBin "build-resume" ''
          #!/usr/bin/env bash
          set -e
          
          OUTPUT_DIR="./build"
          mkdir -p "$OUTPUT_DIR"
          
          # Combine markdown files
          ${combineScript}/bin/combine-resume "$OUTPUT_DIR"
          
          # Generate HTML resume
          ${pkgs.pandoc}/bin/pandoc -s \
            --template=./templates/resume-template.html \
            --css=resume.css \
            -f markdown -t html \
            "$OUTPUT_DIR/resume.md" -o "$OUTPUT_DIR/resume.html"
          
          # Generate PDF resume
          ${pkgs.wkhtmltopdf}/bin/wkhtmltopdf \
            --enable-local-file-access \
            "$OUTPUT_DIR/resume.html" "$OUTPUT_DIR/resume.pdf"
          
          # Generate one-page PDF resume
          ${pkgs.pandoc}/bin/pandoc -s \
            --template=./templates/resume-template.html \
            --css=one_page.css \
            -f markdown -t html \
            "$OUTPUT_DIR/resume.md" -o "$OUTPUT_DIR/one_page.html"
          
          ${pkgs.wkhtmltopdf}/bin/wkhtmltopdf \
            --enable-local-file-access \
            "$OUTPUT_DIR/one_page.html" "$OUTPUT_DIR/one_page_resume.pdf"
            
          # Copy PDFs to assets folder
          mkdir -p ./assets/pdfs
          cp "$OUTPUT_DIR/resume.pdf" ./assets/pdfs/full_resume.pdf
          cp "$OUTPUT_DIR/one_page_resume.pdf" ./assets/pdfs/one_page_resume.pdf
        '';
      in
      {
        packages = {
          combine = combineScript;
          build = buildResume;
          default = buildResume;
        };
        
        devShell = pkgs.mkShell {
          buildInputs = with pkgs; [
            pandoc
            wkhtmltopdf
            bashInteractive
          ];
        };
      }
    );
}
