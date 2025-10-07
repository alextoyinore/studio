import { cn } from '@/lib/utils';
import Image from 'next/image';
import LogoSrc from '@/assets/logo.svg';

export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src={LogoSrc}
      alt="Oceanic Agency Logo"
      className={cn('h-8 w-auto', className)}
      unoptimized
    />
  );
}
