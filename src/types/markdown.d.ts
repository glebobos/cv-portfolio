// Type declarations for markdown imports
declare module '*.md' {
  const content: string;
  export default content;
}

// Type declarations for markdown files imported as raw text
declare module '*.md?raw' {
  const content: string;
  export default content;
}
