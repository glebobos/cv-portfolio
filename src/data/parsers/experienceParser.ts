import { Experience } from '../ResumeDataLoader';

/**
 * Extracts experience from a parsed markdown section.
 * @param parsedSection - The parsed markdown content for the experience section.
 * @param config - The extractor configuration for experience.
 * @returns An array of experience objects.
 */
export function extractExperience(
  parsedSection: any,
  config: any
): Experience[] {
  if (!parsedSection) {
    console.warn('Experience section not found or empty.');
    return [];
  }

  const experiences: Experience[] = [];
  // Each H2 is a new role
  const roleSections = parsedSection.sections.filter((s: any) => s.level === 2);

  for (const section of roleSections) {
    const lines = section.content.split('\n').filter(line => line.trim() !== '');
    let position = '';
    let period = '';
    let description = '';
    const achievements: string[] = [];
    const technologies: string[] = [];

    // The first line should be the position and period
    const firstLine = lines.shift() || '';
    if (firstLine.includes('|') && firstLine.startsWith('**')) {
      const parts = firstLine.split('|');
      position = parts[0].replace(/\*\*/g, '').trim();
      period = parts[1]?.trim() || '';
    }

    // The next lines are the role description until we hit the achievements list
    let achievementsStarted = false;
    for (const line of lines) {
      if (line.startsWith('**') && line.includes('Achievements')) {
        achievementsStarted = true;
        continue; // Skip the "Key Responsibilities & Achievements:" line itself
      }

      if (achievementsStarted) {
        if (line.startsWith('- ')) {
          achievements.push(line);
        }
      } else {
        description += `\n${line}`;
      }
    }

    if (position) {
      experiences.push({
        company: section.title,
        position,
        period,
        description: description.trim(),
        achievements,
        technologies,
      });
    } else {
      console.warn(`Could not parse a position for role in section: "${section.title}"`);
    }
  }

  return experiences;
}
