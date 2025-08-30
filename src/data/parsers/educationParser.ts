import { Education } from '../ResumeDataLoader';

/**
 * Extracts education from a parsed markdown section.
 * @param parsedSection - The parsed markdown content for the education section.
 * @returns An array of education objects.
 */
export function extractEducation(
  parsedSection: any
): Education[] {
  if (!parsedSection) {
    console.warn('Education section not found or empty.');
    return [];
  }

  const education: Education[] = [];
  // Each H2 is a new institution
  const institutionSections = parsedSection.sections.filter((s: any) => s.level === 2);

  for (const section of institutionSections) {
    const lines = section.content.split('\n').filter((line: string) => line.trim() !== '');
    let degree = '';
    let period = '';
    const details: string[] = [];

    // The first line is the degree and location
    const firstLine = lines.shift() || '';
    if (firstLine.includes('|')) {
      const parts = firstLine.split('|');
      degree = parts[0].replace(/\*\*/g, '').trim();
      period = parts[1]?.trim() || '';
    } else {
      degree = firstLine.replace(/\*\*/g, '').trim();
    }

    // The rest are details
    for (const line of lines) {
      if (line.startsWith('- ')) {
        details.push(line.replace(/^- /, '').trim());
      }
    }

    education.push({
      institution: section.title,
      degree,
      field: '', // Field is not specified in the new format
      period,
      details,
    });
  }

  return education;
}
