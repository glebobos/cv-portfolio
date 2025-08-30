import { Experience } from '../ResumeDataLoader';
import { extractListItems } from '../../utils/markdownParser';

/**
 * Extracts experience from a parsed markdown section.
 * @param parsedSection - The parsed markdown content for the experience section.
 * @returns An array of experience objects.
 */
export function extractExperience(
  parsedSection: any
): Experience[] {
  if (!parsedSection) {
    console.warn('Experience section not found or empty.');
    return [];
  }

  const experiences: Experience[] = [];
  // Each H2 is a new role
  const roleSections = parsedSection.sections.filter((s: any) => s.level === 2);

  for (const section of roleSections) {
    const lines = section.content.split('\n').filter((line: string) => line.trim() !== '');
    let position = '';
    let period = '';
    let description = '';

    // The first line should be the position and period
    const firstLine = lines.shift() || '';
    if (firstLine.includes('|') && firstLine.startsWith('**')) {
      const parts = firstLine.split('|');
      position = parts[0].replace(/\*\*/g, '').trim();
      period = parts[1]?.trim() || '';
    }

    // The rest of the content before any H3 is the description
    let contentBeforeSubsections = '';
    for(const line of lines) {
        if (line.startsWith('### ')) {
            break;
        }
        contentBeforeSubsections += line + '\n';
    }
    description = contentBeforeSubsections.trim();

    // Find accomplishments and technologies in subsections
    const accomplishmentsSection = section.sections.find((s: any) => s.title.toLowerCase().includes('accomplishments'));
    const achievements = accomplishmentsSection ? extractListItems(accomplishmentsSection.content) : [];

    const technologiesSection = section.sections.find((s: any) => s.title.toLowerCase().includes('technologies used'));
    const technologies = technologiesSection ? extractListItems(technologiesSection.content) : [];


    if (position) {
      experiences.push({
        company: section.title,
        position,
        period,
        description,
        achievements,
        technologies,
      });
    } else {
      console.warn(`Could not parse a position for role in section: "${section.title}"`);
    }
  }

  return experiences;
}
