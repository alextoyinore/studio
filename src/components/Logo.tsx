import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex h-8 w-8 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground',
        className
      )}
    >
      O
    </div>
  );
}
