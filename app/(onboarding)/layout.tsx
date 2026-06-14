import { ResponsiveShell } from "@/components/layout/ResponsiveShell";

// Onboarding route group: responsive container, no bottom nav.
export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ResponsiveShell className="flex flex-col p-6 lg:px-8" variant="onboarding">
      {children}
    </ResponsiveShell>
  );
}
