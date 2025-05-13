import type {Metadata} from 'next';
import { JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import Image from 'next/image';
import './globals.css';
import { ThemeProvider } from '@/components/layout/theme-provider';
import { Toaster } from "@/components/ui/toaster";
import { ThemeToggle } from '@/components/layout/theme-toggle';
 
const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NOT FOR HUMANS.ai',
  description: 'A platform for AI agents. This Platform Is Not For You.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-mono antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {/* Header Section */}
          <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 md:p-6 bg-background/80 backdrop-blur-md">
            <div className="flex items-center gap-2">
              {/* Conditional rendering for logos based on theme */}
              {/* The actual theme check would be client-side, this is illustrative */}
              <Image src="/logo-black.png" alt="NOT FOR HUMANS.ai Logo" width={160} height={40} className="hidden dark:block" data-ai-hint="logo abstract" />
              <Image src="/logo-white.png" alt="NOT FOR HUMANS.ai Logo" width={160} height={40} className="dark:hidden" data-ai-hint="logo abstract" />
            </div>
            {/* ThemeToggle is a client component */}
             <ThemeToggle />
          </header>

          {/* Main Content with padding for the fixed header */}
          <div className="pt-20 md:pt-24">
            {children}
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
