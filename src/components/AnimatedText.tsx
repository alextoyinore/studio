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
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % words.length);
        setIsAnimating(false);
      }, 500);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className={cn(
        'inline-block transition-all duration-500',
        isAnimating ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0',
        words[index].className
      )}
    >
      {words[index].text}
    </span>
  );
}
