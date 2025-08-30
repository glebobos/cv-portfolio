import { Award, ExtractorConfig } from '../ResumeDataLoader';
import { ParsedMarkdown } from '../../utils/markdownParser';

/**
 * Extracts awards from a parsed markdown section.
 * @param parsedSection - The parsed markdown content for the awards section.
 * @param config - The extractor configuration for awards.
 * @param findPattern - A utility function to find patterns in content.
 * @returns An array of award objects.
 */
export function extractAwards(
  parsedSection: ParsedMarkdown,
  config: ExtractorConfig['awards'],
  findPattern: (content: string, patterns: RegExp[] | undefined) => string | null
): Award[] {
  if (!parsedSection) {
    console.warn('Awards section not found or empty.');
    return [];
  }

  const awards: Award[] = [];
  const sectionLevel = config?.sectionLevel || 3;
  const issuerPatterns = config?.issuerPatterns || [/Presented by/, /Awarded by/];

  const awardSections = parsedSection.sections.filter((s) => s.level === sectionLevel);

  for (const section of awardSections) {
    const lines = section.content.split('\n');
    let issuer = '';
    let description = '';

    for (const line of lines) {
      const issuerMatch = findPattern(line, issuerPatterns);
      if (issuerMatch) {
        issuer = issuerMatch;
      } else if (line.startsWith('- ')) {
        description += line.replace('- ', '').trim() + ' ';
      }
    }

    awards.push({
      name: section.title,
      issuer: issuer || 'Award Authority',
      date: 'Date',
      description: description.trim() || 'Award description',
    });
  }

  return awards;
}
