import { Certification, ExtractorConfig } from '../ResumeDataLoader';
import { ParsedMarkdown } from '../../utils/markdownParser';

/**
 * Extracts certifications from a parsed markdown section.
 * @param parsedSection - The parsed markdown content for the certifications section.
 * @param config - The extractor configuration for certifications.
 * @param findPattern - A utility function to find patterns in content.
 * @returns An array of certification objects.
 */
export function extractCertifications(
  parsedSection: ParsedMarkdown,
  config: ExtractorConfig['certifications'],
  findPattern: (content: string, patterns: RegExp[] | undefined) => string | null
): Certification[] {
  if (!parsedSection) {
    console.warn('Certifications section not found or empty.');
    return [];
  }

  const certifications: Certification[] = [];
  const sectionLevel = config?.sectionLevel || 3;
  const issuerPatterns = config?.issuerPatterns || [/Issued by/, /Issuer:/];

  const certSections = parsedSection.sections.filter((s) => s.level === sectionLevel);

  for (const section of certSections) {
    const lines = section.content.split('\n');
    let issuer = '';
    let date = '';

    for (const line of lines) {
      const issuerMatch = findPattern(line, issuerPatterns);
      if (issuerMatch) {
        const parts = line.split('|');
        issuer = parts[0].replace(/\*\*[^*]*\*\*/, '').trim();
        date = parts[1]?.trim() || '';
      }
    }

    certifications.push({
      name: section.title,
      issuer: issuer || 'Certification Authority',
      date: date || 'Date',
      link: '#',
    });
  }

  return certifications;
}
