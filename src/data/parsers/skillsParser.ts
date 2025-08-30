import { SkillCategory, Skill } from '../ResumeDataLoader';
import { extractListItems } from '../../utils/markdownParser';

/**
 * Extracts skill categories from a parsed markdown section.
 * @param parsedSection - The parsed markdown content for the skills section.
 * @param config - The extractor configuration for skills.
 * @returns An array of skill category objects.
 */
export function extractSkills(
  parsedSection: any,
  config: any
): SkillCategory[] {
  if (!parsedSection) {
    console.warn('Skills section not found or empty.');
    return [];
  }

  const skillCategories: SkillCategory[] = [];
  const levelKeywords = config.levelKeywords || {
    5: ['Expert', 'Advanced', 'Senior'],
    4: ['Proficient', 'Experienced'],
    3: ['Intermediate', 'Working'],
    2: ['Familiar', 'Basic'],
    1: ['Beginner', 'Learning'],
  };

  const skillSections = parsedSection.sections.filter((s: any) => s.level === 2);

  for (const section of skillSections) {
    const skills: Skill[] = extractListItems(section.content).map((item: string) => {
      const parts = item.split(':');
      const name = parts[0].replace(/\*\*/g, '').trim();
      const levelString = (parts[1] || '').trim();

      let level = 3; // Default to intermediate
      for (const [levelNum, keywords] of Object.entries(levelKeywords)) {
        if ((keywords as string[]).some(keyword => levelString.includes(keyword))) {
          level = parseInt(levelNum);
          break;
        }
      }

      return {
        name,
        level,
        category: section.title,
      };
    });

    skillCategories.push({
      name: section.title,
      skills,
    });
  }

  return skillCategories;
}
