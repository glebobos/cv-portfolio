import { Project } from '../ResumeDataLoader';

/**
 * Extracts projects from a parsed markdown section.
 * @param parsedSection - The parsed markdown content for the projects section.
 * @param config - The extractor configuration for projects.
 * @returns An array of project objects.
 */
export function extractProjects(
  parsedSection: any,
  config: any
): Project[] {
  if (!parsedSection) {
    console.warn('Projects section not found or empty.');
    return [];
  }

  const projects: Project[] = [];
  const sectionLevel = config.sectionLevel || 2;
  const descriptionKeywords = config.descriptionKeywords || ['Description', 'Overview'];

  const projectSections = parsedSection.sections.filter((s: any) => s.level === sectionLevel);

  for (const section of projectSections) {
    const lines = section.content.split('\n');
    let description = '';
    const technologies: string[] = [];
    const highlights: string[] = [];
    let inDescription = false;
    let inHighlights = false;

    for (const line of lines) {
        if (descriptionKeywords.some((keyword: string) => line.includes(keyword))) {
            inDescription = true;
            inHighlights = false;
            continue;
        }

        if (line.toLowerCase().includes('technical architecture') || line.toLowerCase().includes('technical implementation') || line.toLowerCase().includes('results & impact')) {
            inDescription = false;
            inHighlights = true;
            highlights.push(line); // Keep the subheading
            continue;
        }

        if (inDescription) {
            description += `\n${line}`;
        } else if (inHighlights) {
            if(line.startsWith('- ')) {
                highlights.push(line);
            }
        } else {
            if (line.startsWith('- ')) {
                const item = line.replace('- ', '').trim();
                if (item.length < 50) technologies.push(item);
            }
        }
    }

    if (section.title) {
      projects.push({
        name: section.title,
        description: description.trim() || 'Project description',
        technologies: technologies.length > 0 ? technologies : ['Technology Stack'],
        highlights,
      });
    }
  }

  return projects;
}
