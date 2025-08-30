import { Experience } from '../ResumeDataLoader';
import { extractListItems, ParsedMarkdown } from '../../utils/markdownParser';

/**
 * Extracts experience from a parsed markdown section object.
 * @param parsedSection - The parsed markdown object for the entire experience.md file.
 * @returns An array of experience objects.
 */
export function extractExperience(
  parsedSection: ParsedMarkdown
): Experience[] {
  if (!parsedSection || !parsedSection.sections) {
    console.warn('Experience section not found or empty.');
    return [];
  }

  const experiences: Experience[] = [];
  const allSections = parsedSection.sections;

  for (let i = 0; i < allSections.length; i++) {
    const currentSection = allSections[i];

    // A level 2 heading denotes a new company/role.
    if (currentSection.level === 2) {
      const company = currentSection.title;
      const lines = currentSection.content.split('\n').filter((line: string) => line.trim() !== '');

      let position = '';
      let period = '';
      let description = '';

      // The first line under the H2 should be the position and period.
      const firstLine = lines.shift() || '';
      if (firstLine.includes('|') && firstLine.startsWith('**')) {
        const parts = firstLine.split('|');
        position = parts[0].replace(/\*\*/g, '').trim();
        period = parts[1]?.trim() || '';
      }

      // The rest of the content under the H2 is the role description.
      description = lines.join('\n').trim();

      const achievements: string[] = [];
      const technologies: string[] = [];

      // Look ahead for H3 sections (Accomplishments, Technologies) that belong to this role.
      let j = i + 1;
      while (j < allSections.length && allSections[j].level > currentSection.level) {
        const subSection = allSections[j];
        if (subSection.level === 3) {
          if (subSection.title.toLowerCase().includes('accomplishments')) {
            achievements.push(...extractListItems(subSection.content));
          } else if (subSection.title.toLowerCase().includes('technologies used')) {
            technologies.push(...extractListItems(subSection.content));
          }
        }
        j++;
      }

      if (position) {
        experiences.push({
          company,
          position,
          period,
          description,
          achievements,
          technologies,
        });
      } else {
        console.warn(`Could not parse a position for role in section: "${company}"`);
      }
    }
  }

  return experiences;
}
