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

        # List of resume sections in order as a string of relative paths
        resumeFilesStr = ''
          resume/sections/summary.md \
          resume/sections/skills.md \
          resume/sections/experience.md \
          resume/sections/education.md \
          resume/sections/projects.md \
          resume/sections/certifications.md \
          resume/sections/awards.md \
          resume/sections/publications.md \
          resume/sections/references.md
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

          # Generate HTML resume
          pandoc -s \
            --metadata-file="resume/metadata.yaml" \
            --template="templates/resume-template.html" \
            --css="styles/resume.css" \
            -f markdown -t html \
            ${resumeFilesStr} -o "build/resume.html"

          # Generate PDF resume
          wkhtmltopdf \
            --enable-local-file-access \
            --print-media-type \
            --disable-smart-shrinking \
            --zoom 1 \
            "build/resume.html" "build/resume.pdf"

          # Generate one-page PDF resume
          pandoc -s \
            --metadata-file="resume/metadata.yaml" \
            --template="templates/resume-template.html" \
            --css="styles/one_page.css" \
            -f markdown -t html \
            ${resumeFilesStr} -o "build/one_page.html"

          wkhtmltopdf \
            --enable-local-file-access \
            --print-media-type \
            --disable-smart-shrinking \
            --zoom 1 \
            "build/one_page.html" "build/one_page_resume.pdf"

          # Copy PDFs to assets folder
          mkdir -p assets/pdfs
          cp "build/resume.pdf" "assets/pdfs/full_resume.pdf"
          cp "build/one_page_resume.pdf" "assets/pdfs/one_page_resume.pdf"
        '';
      in
      with pkgs; {
        packages = {
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
