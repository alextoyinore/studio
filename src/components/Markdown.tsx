import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';

type MarkdownProps = {
  content: string;
  className?: string;
};

export function Markdown({ content, className }: MarkdownProps) {
  return (
    <ReactMarkdown
      className={cn(
        'prose dark:prose-invert max-w-none',
        'prose-headings:font-headline',
        'prose-p:text-foreground/90',
        'prose-a:text-primary hover:prose-a:text-primary/80',
        'prose-strong:text-foreground',
        'prose-blockquote:border-l-primary',
        className
      )}
    >
      {content}
    </ReactMarkdown>
  );
}
