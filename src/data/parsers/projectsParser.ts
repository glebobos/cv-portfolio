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

    for (const line of lines) {
      if (descriptionKeywords.some((keyword: string) => line.includes(keyword))) {
        description = lines[lines.indexOf(line) + 1]?.trim() || '';
      } else if (line.includes('- **') && line.includes('%')) {
        highlights.push(line.replace(/^- \*\*[^*]+\*\*/, '').trim());
      } else if (line.startsWith('- ')) {
        const item = line.replace('- ', '').trim();
        if (item.length < 50) technologies.push(item);
      }
    }

    if (section.title) {
      projects.push({
        name: section.title,
        description: description || 'Project description',
        technologies: technologies.length > 0 ? technologies : ['Technology Stack'],
        highlights,
      });
    }
  }

  return projects;
}
