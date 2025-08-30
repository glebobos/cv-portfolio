import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
  if (typeof content !== 'string' || content.trim() === '') {
    return null;
  }

  return (
    <div className={`markdown-content ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({...props}) => <h1 className="text-3xl font-bold text-secondary-900 mt-8 mb-4" {...props} />,
          h2: ({...props}) => <h2 className="text-2xl font-bold text-secondary-900 mt-6 mb-3" {...props} />,
          h3: ({...props}) => <h3 className="text-xl font-semibold text-secondary-900 mt-4 mb-2" {...props} />,
          h4: ({...props}) => <h4 className="text-lg font-semibold text-secondary-900 mt-3 mb-2" {...props} />,
          h5: ({...props}) => <h5 className="text-base font-semibold text-secondary-900 mt-2 mb-1" {...props} />,
          h6: ({...props}) => <h6 className="text-sm font-semibold text-secondary-900 mt-2 mb-1" {...props} />,
          p: ({...props}) => <p className="text-secondary-700 leading-relaxed mb-4" {...props} />,
          ul: ({...props}) => <ul className="list-disc list-inside space-y-1 my-4" {...props} />,
          li: ({...props}) => <li className="text-secondary-700" {...props} />,
          a: ({...props}) => <a className="text-primary-600 hover:text-primary-800 underline" target="_blank" rel="noopener noreferrer" {...props} />,
          code: ({ inline, ...props}) => {
            if (inline) {
              return <code className="bg-secondary-100 px-1 py-0.5 rounded text-sm" {...props} />;
            }
            return <code className="text-sm" {...props} />;
          },
          pre: ({...props}) => <pre className="bg-secondary-100 p-4 rounded-lg overflow-x-auto my-4" {...props} />,
          hr: ({...props}) => <hr className="border-secondary-200 my-6" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
