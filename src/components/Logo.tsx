import Image from 'next/image';
import { cn } from '@/lib/utils';
import LogoSvg from '@/assets/logo.svg';

export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src={LogoSvg}
      alt="Oceanic Agency Logo"
      className={cn("h-8 w-auto", className)}
      priority
    />
  );
}
