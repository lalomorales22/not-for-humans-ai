"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { generateAppLogo, type GenerateAppLogoOutput } from '@/ai/flows/logo-generator';
import { Skeleton } from '@/components/ui/skeleton'; // For loading state
import { AlertTriangle } from 'lucide-react'; // For error state

export function ClientHeader() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [logoSrc, setLogoSrc] = useState<string | null>(null);
  const [isLoadingLogo, setIsLoadingLogo] = useState(true);
  const [logoError, setLogoError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      // Use resolvedTheme to get the actual theme after 'system' preference is resolved.
      // Fallback to 'light' if somehow theme is still undefined.
      const currentDisplayTheme = (resolvedTheme || theme || 'light') as 'light' | 'dark';
      
      setIsLoadingLogo(true);
      setLogoError(null);
      setLogoSrc(null); // Clear previous logo while new one is generating

      generateAppLogo({ theme: currentDisplayTheme })
        .then((output: GenerateAppLogoOutput) => {
          setLogoSrc(output.imageDataUri);
        })
        .catch((error) => {
          console.error("Failed to generate logo:", error);
          setLogoError("Logo Error"); 
        })
        .finally(() => {
          setIsLoadingLogo(false);
        });
    }
  }, [mounted, theme, resolvedTheme]);

  if (!mounted) {
    // Return a placeholder with the same dimensions as the header 
    // to prevent layout shift and to avoid rendering Image with potentially incorrect src.
    return (
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 md:p-6 h-[72px] md:h-[88px] bg-background/80 backdrop-blur-md">
        <div className="flex items-center gap-2 h-[40px] w-[160px]">
          <Skeleton className="h-full w-full" />
        </div>
        <ThemeToggle />
      </header>
    );
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 md:p-6 bg-background/80 backdrop-blur-md">
      <div className="flex items-center gap-2 h-[40px] w-[160px]">
        {isLoadingLogo ? (
          <Skeleton className="h-full w-full" />
        ) : logoError ? (
          <div className="text-destructive text-xs flex flex-col items-center justify-center h-full w-full border border-dashed border-destructive rounded-md p-1" title={logoError}>
            <AlertTriangle className="h-4 w-4 mb-0.5" />
            <span>Logo Fail</span>
          </div>
        ) : logoSrc ? (
          <Image 
            src={logoSrc} 
            alt="NOT FOR HUMANS.ai Logo" 
            width={160} 
            height={40}
            data-ai-hint="company logo" // More specific hint for AI
            priority // Important for LCP if this logo is above the fold
          />
        ) : (
           // Fallback if src is null but not loading and no error (should ideally not happen with current logic)
          <Skeleton className="h-full w-full" />
        )}
      </div>
      <ThemeToggle />
    </header>
  );
}