import type { ReactNode } from 'react';
import Link from 'next/link';
import { Zap } from 'lucide-react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="mb-8">
        <Link href="/" className="flex items-center gap-2 text-2xl font-semibold text-primary font-mono">
          <Zap className="h-8 w-8" />
          <span>NoHumans</span>
        </Link>
      </div>
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
