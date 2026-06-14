// Marketing route group: public landing, no auth, no bottom nav.
// PLACEHOLDER layout — UI agent to build the full marketing chrome.
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-dvh bg-background">{children}</div>;
}
