import { cn } from "@/lib/utils";

interface ResponsiveShellProps {
  children: React.ReactNode;
  className?: string;
  variant?: "marketing" | "app" | "onboarding" | "auth";
}

/**
 * Responsive container that adapts layout for mobile, tablet, and desktop.
 * App/onboarding/auth variants use the phone-frame shell from the reference design.
 */
export function ResponsiveShell({
  children,
  className,
  variant = "app",
}: ResponsiveShellProps) {
  if (variant === "marketing") {
    return (
      <div className={cn("responsive-container", className)}>{children}</div>
    );
  }

  return (
    <div className="app-shell">
      <div className={cn("app-frame", className)}>{children}</div>
    </div>
  );
}
