// src/components/layout/client-header.tsx
"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { Skeleton } from '@/components/ui/skeleton';
// The generateAppLogo flow is no longer called directly in the header at runtime.
// It would be used once (e.g., in a script or manually) to generate the static logo image files.
// import { generateAppLogo, type GenerateAppLogoOutput } from '@/ai/flows/logo-generator';

export function ClientHeader() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // --- How to use pre-generated logos ---
  // 1. Run the `generateAppLogo` flow (from src/ai/flows/logo-generator.ts)
  //    once for the 'dark' theme and once for the 'light' theme.
  //    For example, in a separate script or development environment:
  //    `const darkLogoData = await generateAppLogo({ theme: 'dark' });`
  //    `const lightLogoData = await generateAppLogo({ theme: 'light' });`
  //
  // 2. The `imageDataUri` from the output (e.g., darkLogoData.imageDataUri) will be a
  //    base64 encoded string like 'data:image/png;base64,...'.
  //
  // 3. Convert this data URI into an actual image file (e.g., .webp or .png).
  //    You can do this using online converters, image editing software, or a script.
  //
  // 4. Save these generated image files into your `/public` directory.
  //    For instance:
  //    - /public/logo-dark-theme.webp (for dark theme)
  //    - /public/logo-light-theme.webp (for light theme)
  //
  // 5. Update the `darkThemeLogoSrc` and `lightThemeLogoSrc` variables below
  //    to point to these static paths.
  //
  // This approach avoids resource-intensive AI generation on every page load or theme change,
  // significantly improving performance and reducing costs.
  // The `logo-generator.ts` flow remains a useful utility for initially creating these assets.
  //
  // For this example, we are using placeholder paths. You will need to generate
  // and save your actual logo images to these paths (or update the paths accordingly).
  const darkThemeLogoSrc = "/logo-dark-theme.webp"; // Example path for dark theme logo
  const lightThemeLogoSrc = "/logo-light-theme.webp"; // Example path for light theme logo

  if (!mounted) {
    // Skeleton loader for when the component is not yet mounted or theme is resolving
    return (
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 md:p-6 h-[72px] md:h-[88px] bg-background/80 backdrop-blur-md">
        <div className="flex items-center gap-2 h-[30px] w-[120px]">
          <Skeleton className="h-full w-full" />
        </div>
        <ThemeToggle />
      </header>
    );
  }

  const currentDisplayTheme = (resolvedTheme || theme || 'light') as 'light' | 'dark';
  const logoSrcToDisplay = currentDisplayTheme === 'dark' ? darkThemeLogoSrc : lightThemeLogoSrc;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 md:p-6 h-[72px] md:h-[88px] bg-background/80 backdrop-blur-md">
      <div className="flex items-center gap-2 h-[30px] w-[120px]">
        {/* 
          The `next/image` component will attempt to load the image from the specified `src`.
          Ensure that `logo-dark-theme.webp` and `logo-light-theme.webp` (or your chosen filenames)
          exist in the `/public` directory of your project.
        */}
        <Image
          key={logoSrcToDisplay} // Using key helps Next.js differentiate if src changes
          src={logoSrcToDisplay}
          alt="NOT FOR HUMANS.ai Logo"
          width={120}
          height={30}
          data-ai-hint="company logo"
          priority // Preload the logo as it's important LCP content
          unoptimized // As per next.config.ts setting for images.
                       // If you remove unoptimized:true from next.config.ts,
                       // Next.js will try to optimize these static images.
        />
      </div>
      <ThemeToggle />
    </header>
  );
}
