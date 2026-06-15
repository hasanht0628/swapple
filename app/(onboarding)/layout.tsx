import { ResponsiveShell } from "@/components/layout/ResponsiveShell";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ResponsiveShell variant="onboarding">
      <div className="sw-screen">
        <div className="sw-body">
          <div className="sw-pad screen-anim">{children}</div>
        </div>
      </div>
    </ResponsiveShell>
  );
}
