import { PersonalInfo } from '../ResumeDataLoader';
import { getRawMarkdownSection } from '../../utils/markdownParser';

/**
 * Extracts personal information from the summary markdown content.
 * @param summaryContent - The raw markdown content of the summary section.
 * @param config - The extractor configuration for personal info.
 * @param findPattern - A utility function to find patterns in content.
 * @returns A personal info object.
 */
export function extractPersonalInfo(
  summaryContent: string,
  config: any,
  findPattern: (content: string, patterns: RegExp[] | undefined) => string | null
): PersonalInfo {
  const allHeaders = summaryContent.match(/# ([^\n]+)/g) || [];
  let name = config.fallbacks?.name || 'Professional Name';

  const nameHeader = allHeaders.find(header => {
    const headerText = header.replace('# ', '');
    return headerText.match(/^[A-Z\s]+$/) &&
           !headerText.includes('SUMMARY') &&
           !headerText.includes('PROFESSIONAL');
  });

  if (nameHeader) {
    name = nameHeader.replace('# ', '').trim();
  }

  const title = findPattern(summaryContent, config.titlePatterns) || config.fallbacks?.title || 'Professional Title';
  const email = findPattern(summaryContent, config.emailPatterns) || config.fallbacks?.email || 'contact@example.com';
  const phone = findPattern(summaryContent, config.phonePatterns) || config.fallbacks?.phone || '+1 (555) 123-4567';

  let linkedin = config.fallbacks?.linkedin || 'https://linkedin.com/in/profile';
  const linkedinMatch = findPattern(summaryContent, config.linkedinPatterns);
  if (linkedinMatch) {
    linkedin = linkedinMatch.includes('http') ? linkedinMatch : `https://www.linkedin.com/in/${linkedinMatch.replace(/[\[\]]/g, '')}`;
  }

  let github = config.fallbacks?.github || 'https://github.com/username';
  const githubMatch = findPattern(summaryContent, config.githubPatterns);
  if (githubMatch) {
    github = githubMatch.includes('http') ? githubMatch : `https://${githubMatch.replace(/[\[\]]/g, '')}`;
  }

  const location = findPattern(summaryContent, config.locationPatterns) || config.fallbacks?.location || 'Remote';
  const avatar = extractAvatar(summaryContent);

  return { name, title, email, phone, linkedin, github, location, avatar };
}

/**
 * Extracts the summary text from the parsed markdown section.
 * @param rawContent - The raw markdown content of the summary section.
 * @param config - The extractor configuration for summary.
 * @returns The summary string.
 */
export function extractSummary(
  rawContent: string,
  config: any,
): string {
  const sectionTitles = config.sectionTitles || ['EXECUTIVE SUMMARY', 'SUMMARY', 'ABOUT'];

  for (const title of sectionTitles) {
    const content = getRawMarkdownSection(rawContent, title);
    if (content) return content;
  }

  return '';
}

/**
 * Extracts the avatar image name from the summary markdown content.
 * @param summaryContent - The raw markdown content of the summary section.
 * @returns The avatar image filename or undefined.
 */
export function extractAvatar(summaryContent: string): string | undefined {
  if (!summaryContent) return undefined;

  const imageMatch = summaryContent.match(/!\[.*?\]\(\.\.\/images\/([^)]+)\)/i);
  if (imageMatch) {
    return imageMatch[1].trim();
  }

  const legacyPatterns = [
    /\*\*Avatar:\*\*\s*([^\s\n]+)/i,
    /Avatar:\s*([^\s\n]+)/i,
    /Image:\s*([^\s\n]+)/i,
    /Profile:\s*([^\s\n]+)/i,
  ];

  for (const pattern of legacyPatterns) {
    const match = summaryContent.match(pattern);
    if (match) {
      return match[1].trim();
    }
  }

  return undefined;
}
