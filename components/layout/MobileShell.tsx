import { cn } from "@/lib/utils";

interface MobileShellProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Mobile-first container shell that centers content on desktop
 * and provides full-width mobile layout.
 */
export function MobileShell({ children, className }: MobileShellProps) {
  return (
    <div className={cn("mobile-shell", className)}>
      {children}
    </div>
  );
}