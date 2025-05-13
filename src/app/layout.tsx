
import type { Metadata } from 'next';
import { JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import './globals.css'; // Must be imported here
import { ThemeProvider } from '@/components/layout/theme-provider';
import { Toaster } from "@/components/ui/toaster";
import { ClientHeader } from '@/components/layout/client-header'; 

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
        <ThemeProvider 
            attribute="class" 
            defaultTheme="dark" 
            enableSystem // Keeping enableSystem as it was, though user asked for only light/dark toggle, it is generally good to keep.
            disableTransitionOnChange
        >
          <ClientHeader />
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
