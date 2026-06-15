import { cn } from "@/lib/utils";

interface MobileShellProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Phone-optimized shell for auth and standalone screens.
 */
export function MobileShell({ children, className }: MobileShellProps) {
  return (
    <div className="app-shell">
      <div className={cn("app-frame", className)}>{children}</div>
    </div>
  );
}
