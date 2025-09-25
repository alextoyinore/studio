"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const words = [
  { text: 'Trip', className: 'text-cyan-500' },
  { text: 'Home', className: 'text-green-500' },
  { text: 'School', className: 'text-purple-500' },
  { text: 'Journey', className: 'text-orange-500' },
];

export function AnimatedText() {
  const [index, setIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % words.length);
        setIsFading(false);
      }, 500);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className={cn(
        'inline-block transition-opacity duration-500',
        isFading ? 'opacity-0' : 'opacity-100',
        words[index].className
      )}
    >
      {words[index].text}
    </span>
  );
}
