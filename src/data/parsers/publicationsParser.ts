import { Publication } from '../ResumeDataLoader';

/**
 * Extracts publications from a parsed markdown section.
 * @param parsedSection - The parsed markdown content for the publications section.
 * @param config - The extractor configuration for publications.
 * @param findPattern - A utility function to find patterns in content.
 * @returns An array of publication objects.
 */
export function extractPublications(
  parsedSection: any,
  config: any,
  findPattern: (content: string, patterns: RegExp[] | undefined) => string | null
): Publication[] {
  if (!parsedSection) {
    console.warn('Publications section not found or empty.');
    return [];
  }

  const publications: Publication[] = [];
  const sectionLevel = config.sectionLevel || 3;
  const publisherPatterns = config.publisherPatterns || [/Published on/, /Issued by/];

  const pubSections = parsedSection.sections.filter((s: any) => s.level === sectionLevel);

  for (const section of pubSections) {
    const lines = section.content.split('\n');
    let publisher = '';
    let date = '';
    let description = '';

    for (const line of lines) {
      const publisherMatch = findPattern(line, publisherPatterns);
      if (publisherMatch) {
        const parts = line.split('|');
        publisher = parts[0].replace(/\*\*[^*]*\*\*/, '').trim();
        date = parts[1]?.trim() || '';
      } else if (line.startsWith('- ')) {
        description += line.replace('- ', '').trim() + ' ';
      }
    }

    publications.push({
      title: section.title,
      publisher: publisher || 'Publication Platform',
      date: date || 'Date',
      description: description.trim() || 'Publication description',
      link: '#',
    });
  }

  return publications;
}
