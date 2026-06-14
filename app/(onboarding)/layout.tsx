// Onboarding route group: centered mobile shell, no bottom nav.
export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mobile-shell flex flex-col p-6">{children}</div>;
}
