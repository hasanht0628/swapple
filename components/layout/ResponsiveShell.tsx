import { cn } from "@/lib/utils";

interface ResponsiveShellProps {
  children: React.ReactNode;
  className?: string;
  variant?: "marketing" | "app" | "onboarding";
}

/**
 * Responsive container that adapts layout for mobile, tablet, and desktop.
 * - Mobile (<640px): Full width within safe areas
 * - Tablet (640px+): Moderate expansion with centered content
 * - Desktop (1024px+): Wider layouts with more horizontal space
 */
export function ResponsiveShell({ children, className, variant = "app" }: ResponsiveShellProps) {
  const containerClass = variant === "marketing" ? "responsive-container" : "responsive-app-container";
  
  return (
    <div className={cn(containerClass, className)}>
      {children}
    </div>
  );
}