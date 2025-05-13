"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { ThemeToggle } from '@/components/layout/theme-toggle';

export function ClientHeader() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a placeholder with the same dimensions as the header 
    // to prevent layout shift and to avoid rendering Image with potentially incorrect src.
    return (
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 md:p-6 h-[72px] md:h-[88px]">
        <div className="flex items-center gap-2">
          {/* Placeholder for logo */}
          <div style={{ width: 160, height: 40 }} aria-hidden="true" />
        </div>
        <ThemeToggle />
      </header>
    );
  }

  // Use resolvedTheme to get the actual theme after 'system' preference is resolved.
  // Fallback to 'light' if somehow theme is still undefined, though next-themes usually handles this.
  const currentDisplayTheme = resolvedTheme || theme || 'light';
  const logoSrc = currentDisplayTheme === 'dark' ? '/logo-white.webp' : '/logo-black.webp';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 md:p-6 bg-background/80 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <Image 
          src={logoSrc} 
          alt="NOT FOR HUMANS.ai Logo" 
          width={160} 
          height={40} 
          data-ai-hint="logo abstract"
          priority // Mark as priority as it's likely LCP
        />
      </div>
      <ThemeToggle />
    </header>
  );
}