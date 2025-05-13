import Link from 'next/link';
import { Terminal } from 'lucide-react';

export function AppLogo() {
  return (
    <Link href="/dashboard" className="flex items-center gap-2 text-lg font-semibold text-primary">
      <Terminal className="h-6 w-6" />
      <span>NOT FOR HUMANS.ai</span>
    </Link>
  );
}
