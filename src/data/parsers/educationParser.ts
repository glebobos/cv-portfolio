import { Education } from '../ResumeDataLoader';

/**
 * Extracts education from a parsed markdown section.
 * @param parsedSection - The parsed markdown content for the education section.
 * @returns An array of education objects.
 */
export function extractEducation(
  parsedSection: any
): Education[] {
  if (!parsedSection || !parsedSection.sections) {
    console.warn('Education section not found or empty.');
    return [];
  }

  const education: Education[] = [];
  // Each H2 is a new institution or section
  const institutionSections = parsedSection.sections.filter((s: any) => s.level === 2);

  for (const section of institutionSections) {
    const lines = section.content.split('\n').filter((line: string) => line.trim() !== '');
    let degree = '';
    let period = '';
    const details: string[] = [];

    // Check if the first line looks like a degree/period entry or not.
    if (lines.length > 0 && lines[0].includes('|')) {
      const firstLine = lines.shift() || '';
      const parts = firstLine.split('|');
      degree = parts[0].replace(/\*\*/g, '').trim();
      period = parts[1]?.trim() || '';
    }

    // The rest of the lines are details/bullet points.
    for (const line of lines) {
      if (line.startsWith('- ')) {
        details.push(line.replace(/^- /, '').trim());
      } else if (line) { // Handle non-bullet point lines as details too
        details.push(line);
      }
    }

    education.push({
      institution: section.title,
      degree,
      field: '', // Field is not specified in this format, can be added if needed.
      period,
      details,
    });
  }

  return education;
}
