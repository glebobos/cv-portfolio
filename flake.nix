{
  description = "CV Portfolio with Markdown";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { 
          inherit system; 
          config = {
            permittedInsecurePackages = [ "openssl-1.1.1w" ];
          };
        };
        
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
        
        buildInputs = with pkgs; [
          pandoc
          wkhtmltopdf-bin
          bashInteractive
        ];

        # Build phase for the resume
        buildPhase = ''
          # Create build directory
          mkdir -p build
          
          # Combine markdown files
          ${combineScript}/bin/combine-resume build
          
          # Generate HTML resume
          pandoc -s \
            --template="$PWD/templates/resume-template.html" \
            --css=resume.css \
            -f markdown -t html \
            "build/resume.md" -o "build/resume.html"
          
          # Generate PDF resume
          wkhtmltopdf \
            --enable-local-file-access \
            "build/resume.html" "build/resume.pdf"
          
          # Generate one-page PDF resume
          pandoc -s \
            --template="$PWD/templates/resume-template.html" \
            --css=one_page.css \
            -f markdown -t html \
            "build/resume.md" -o "build/one_page.html"
          
          wkhtmltopdf \
            --enable-local-file-access \
            "build/one_page.html" "build/one_page_resume.pdf"
          
          # Copy PDFs to assets folder
          mkdir -p assets/pdfs
          cp "build/resume.pdf" "assets/pdfs/full_resume.pdf"
          cp "build/one_page_resume.pdf" "assets/pdfs/one_page_resume.pdf"
        '';
      in
      with pkgs; {
        packages = {
          combine = combineScript;
          
          default = stdenvNoCC.mkDerivation {
            name = "cv-portfolio";
            src = ./.;
            inherit buildInputs buildPhase;
            installPhase = ''
              mkdir -p $out/build
              cp -r build/* $out/build/
              mkdir -p $out/assets/pdfs
              cp assets/pdfs/* $out/assets/pdfs/
            '';
          };
        };
        
        checks = {
          default = stdenvNoCC.mkDerivation {
            name = "cv-portfolio-checks";
            src = ./.;
            inherit buildInputs buildPhase;
            installPhase = ''
              mkdir -p $out
            '';
          };
        };
        
        devShell = mkShell {
          inherit buildInputs;
        };
      }
    );
}
