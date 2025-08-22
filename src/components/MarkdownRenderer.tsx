import React from 'react';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
  if (typeof content !== 'string' || content.trim() === '') {
    return null;
  }

  // Simple markdown parsing - for production, consider using a library like 'marked' or 'remark'
  const parseMarkdown = (text: string): React.ReactNode[] => {
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let currentListItems: string[] = [];
    let inCodeBlock = false;
    let codeBlockContent: string[] = [];

    const flushList = () => {
      if (currentListItems.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`} className="list-disc list-inside space-y-1 my-4">
            {currentListItems.map((item, index) => {
              const processedItem = item
                .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
                .replace(/\*([^*]+)\*/g, '<em>$1</em>')
                .replace(/`([^`]+)`/g, '<code class="bg-secondary-100 px-1 py-0.5 rounded text-sm">$1</code>')
                .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary-600 hover:text-primary-800 underline" target="_blank" rel="noopener noreferrer">$1</a>');

              return <li key={index} className="text-secondary-700" dangerouslySetInnerHTML={{ __html: processedItem }} />;
            })}
          </ul>
        );
        currentListItems = [];
      }
    };

    const flushCodeBlock = () => {
      if (codeBlockContent.length > 0) {
        elements.push(
          <pre key={`code-${elements.length}`} className="bg-secondary-100 p-4 rounded-lg overflow-x-auto my-4">
            <code className="text-sm">{codeBlockContent.join('\n')}</code>
          </pre>
        );
        codeBlockContent = [];
        inCodeBlock = false;
      }
    };

    lines.forEach((line, index) => {
      // Handle code blocks
      if (line.trim().startsWith('```')) {
        if (inCodeBlock) {
          flushCodeBlock();
        } else {
          flushList();
          inCodeBlock = true;
        }
        return;
      }

      if (inCodeBlock) {
        codeBlockContent.push(line);
        return;
      }

      // Handle headers
      if (line.startsWith('#')) {
        flushList();
        const level = line.match(/^#+/)?.[0].length || 1;
        const text = line.replace(/^#+\s*/, '');
        const HeaderTag = `h${Math.min(level, 6)}` as keyof JSX.IntrinsicElements;
        const headerClass = {
          1: 'text-3xl font-bold text-secondary-900 mt-8 mb-4',
          2: 'text-2xl font-bold text-secondary-900 mt-6 mb-3',
          3: 'text-xl font-semibold text-secondary-900 mt-4 mb-2',
          4: 'text-lg font-semibold text-secondary-900 mt-3 mb-2',
          5: 'text-base font-semibold text-secondary-900 mt-2 mb-1',
          6: 'text-sm font-semibold text-secondary-900 mt-2 mb-1'
        }[level] || 'text-base font-semibold text-secondary-900 mt-2 mb-1';

        elements.push(
          <HeaderTag key={`header-${index}`} className={headerClass}>
            {text}
          </HeaderTag>
        );
        return;
      }

      // Handle list items
      if (line.match(/^\s*[-*+]\s+/)) {
        const item = line.replace(/^\s*[-*+]\s+/, '');
        currentListItems.push(item);
        return;
      }

      // Handle horizontal rules
      if (line.match(/^---+$/)) {
        flushList();
        elements.push(<hr key={`hr-${index}`} className="border-secondary-200 my-6" />);
        return;
      }

      // Handle empty lines
      if (line.trim() === '') {
        flushList();
        return;
      }

      // Handle regular paragraphs
      flushList();
      if (line.trim()) {
        // Parse inline formatting
        let processedLine = line
          .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>') // Bold
          .replace(/\*([^*]+)\*/g, '<em>$1</em>') // Italic
          .replace(/`([^`]+)`/g, '<code class="bg-secondary-100 px-1 py-0.5 rounded text-sm">$1</code>') // Inline code
          .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary-600 hover:text-primary-800 underline" target="_blank" rel="noopener noreferrer">$1</a>'); // Links

        elements.push(
          <p 
            key={`p-${index}`} 
            className="text-secondary-700 leading-relaxed mb-4"
            dangerouslySetInnerHTML={{ __html: processedLine }}
          />
        );
      }
    });

    // Flush any remaining items
    flushList();
    flushCodeBlock();

    return elements;
  };

  return (
    <div className={`markdown-content ${className}`}>
      {parseMarkdown(content)}
    </div>
  );
};

// Simple hook to use markdown content directly
export const useMarkdownSection = (sectionName: keyof typeof import('../data/markdownResumeData').markdownResumeData.raw) => {
  const { markdownResumeData } = require('../data/markdownResumeData');
  return markdownResumeData.raw[sectionName];
};
