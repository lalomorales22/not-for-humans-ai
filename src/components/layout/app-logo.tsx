import Link from 'next/link';
import { Cpu } from 'lucide-react'; // Changed from Terminal to Cpu

interface AppLogoProps {
  isCollapsed?: boolean;
  className?: string;
}

export function AppLogo({ isCollapsed = false, className }: AppLogoProps) {
  return (
    <Link href="/dashboard" className={`flex items-center gap-2 text-lg font-semibold text-primary ${className}`}>
      <Cpu className="h-6 w-6" />
      {!isCollapsed && <span className="font-mono">NOT FOR HUMANS.ai</span>}
    </Link>
  );
}
