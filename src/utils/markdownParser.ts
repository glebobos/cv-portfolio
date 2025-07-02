// Utility functions for parsing markdown content
export interface ParsedMarkdown {
  title: string;
  content: string;
  sections: Array<{
    title: string;
    content: string;
    level: number;
  }>;
  metadata: Record<string, any>;
}

export function parseMarkdown(markdownContent: string): ParsedMarkdown {
  const lines = markdownContent.split('\n');
  const sections: Array<{ title: string; content: string; level: number }> = [];
  let currentSection: { title: string; content: string; level: number } | null = null;
  let title = '';
  const metadata: Record<string, any> = {};

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check for headers
    const headerMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headerMatch) {
      // Save previous section
      if (currentSection) {
        sections.push({
          ...currentSection,
          content: currentSection.content.trim()
        });
      }
      
      const level = headerMatch[1].length;
      const sectionTitle = headerMatch[2];
      
      // First H1 becomes the main title
      if (level === 1 && !title) {
        title = sectionTitle;
      }
      
      currentSection = {
        title: sectionTitle,
        content: '',
        level
      };
    } else if (currentSection) {
      // Add content to current section
      currentSection.content += line + '\n';
    }
  }
  
  // Save last section
  if (currentSection) {
    sections.push({
      ...currentSection,
      content: currentSection.content.trim()
    });
  }

  return {
    title,
    content: markdownContent,
    sections,
    metadata
  };
}

export function extractListItems(content: string): string[] {
  const listItemRegex = /^[\s]*[-*+]\s+(.+)$/gm;
  const items: string[] = [];
  let match;
  
  while ((match = listItemRegex.exec(content)) !== null) {
    items.push(match[1].trim());
  }
  
  return items;
}

export function extractMetadata(content: string): Record<string, string> {
  const metadata: Record<string, string> = {};
  const metadataRegex = /\*([^*]+)\*/g;
  let match;
  
  while ((match = metadataRegex.exec(content)) !== null) {
    const metaContent = match[1];
    if (metaContent.includes(':')) {
      const [key, ...valueParts] = metaContent.split(':');
      metadata[key.trim()] = valueParts.join(':').trim();
    }
  }
  
  return metadata;
}

export function cleanMarkdownForDisplay(content: string): string {
  return content
    .replace(/#{1,6}\s+/g, '') // Remove header markers
    .replace(/\*([^*]+)\*/g, '$1') // Remove italic markers
    .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold markers
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Convert links to plain text
    .replace(/---+/g, '') // Remove horizontal rules
    .replace(/^\s*[-*+]\s+/gm, '• ') // Convert list markers to bullets
    .trim();
}
