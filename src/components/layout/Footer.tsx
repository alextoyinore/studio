import Link from 'next/link';
import React from 'react';

const footerLinks = [
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/faq', label: 'FAQ' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
    { href: '/cookies', label: 'Cookie Policy' },
    { href: '/login', label: 'Admin' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 border-t">
      <div className="w-full lg:w-3/4 mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4">
            <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Oceanic Agency. All rights reserved.
            </p>
            <nav className="flex flex-wrap justify-center gap-4 md:gap-6">
                {footerLinks.map(link => (
                    <Link key={link.href} href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {link.label}
                    </Link>
                ))}
            </nav>
        </div>
      </div>
    </footer>
  );
}
