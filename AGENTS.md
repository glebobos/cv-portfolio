# AI Agent Instructions for Populating the Resume

This document provides instructions for an AI agent to populate the resume content in this project.

## Overview

The resume data is managed through a set of Markdown files located in the `resume/sections/` directory. Each file corresponds to a specific section of the resume. Your task is to populate these files with the user's information.

## Instructions

1.  **Identify the User's Information:** You will be provided with the user's resume information. This may be in a structured format (like JSON) or an unstructured format (like a PDF or a block of text).

2.  **Map Information to Sections:** Map the user's information to the appropriate resume section. The available sections are listed below.

3.  **Populate the Markdown Files:** For each section, open the corresponding Markdown file in `resume/sections/` and replace the placeholder content with the user's information. Maintain the existing Markdown formatting (headings, lists, etc.).

## Available Resume Sections

Here is a list of the available resume sections and the content expected in each:

*   **`summary.md`**: The user's professional summary, name, title, and contact information.
*   **`experience.md`**: The user's work experience, including company name, position, dates of employment, and key achievements.
*   **`skills.md`**: The user's technical skills, categorized by area of expertise.
*   **`projects.md`**: A list of projects the user has worked on, including project name, description, and technologies used.
*   **`education.md`**: The user's educational background, including institution, degree, and dates of attendance.
*   **`certifications.md`**: Any professional certifications the user holds.
*   **`awards.md`**: Any awards or honors the user has received.
*   **`publications.md`**: A list of any publications the user has authored or co-authored.

## Important Notes

*   **Image Avatar:** The user's profile picture should be placed in the `resume/images/` directory and referenced in `summary.md`. The default image is `avatar.svg`.
*   **File Naming:** Do not change the names of the existing Markdown files.
*   **Formatting:** Preserve the Markdown formatting within each file to ensure the resume renders correctly.
*   **New Sections:** If the user's information includes a section that does not have a corresponding Markdown file, you can create a new file in the `resume/sections/` directory. However, you will also need to create a new React component and a new parser to display the data from the new section. This is an advanced task that may require human intervention.
