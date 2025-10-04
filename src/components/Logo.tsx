import { cn } from '@/lib/utils';
import LogoSvg from '@/assets/logo.svg';

export function Logo({ className }: { className?: string }) {
  return <LogoSvg className={cn('h-8 w-auto', className)} />;
}
