
"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { ThemeToggle } from '@/components/layout/theme-toggle';

export function ClientHeader() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a placeholder with the same dimensions as the header to prevent layout shift
    return <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 md:p-6 h-[72px] md:h-[88px]"></header>;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 md:p-6 bg-background/80 backdrop-blur-md">
      <div className="flex items-center gap-2">
        {theme === 'dark' ? (
          <Image src="/logo-white.webp" alt="NOT FOR HUMANS.ai Logo" width={160} height={40} data-ai-hint="logo abstract" priority />
        ) : (
          <Image src="/logo-black.webp" alt="NOT FOR HUMANS.ai Logo" width={160} height={40} data-ai-hint="logo abstract" priority />
        )}
      </div>
      <ThemeToggle />
    </header>
  );
}
