import Link from "next/link";

// (app) route group: signed-in product shell with bottom nav.
// TODO(ui): Replace the placeholder nav below with components/layout/BottomNav.tsx
// (Home / Tracker / Profile) and components/layout/MobileShell.tsx styling.
export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mobile-shell flex min-h-dvh flex-col">
      <div className="flex-1 pb-20">{children}</div>
      <nav className="fixed inset-x-0 bottom-0 mx-auto flex max-w-shell justify-around border-t border-border bg-surface py-3 text-sm">
        <Link href="/home">Home</Link>
        <Link href="/tracker">Tracker</Link>
        <Link href="/profile">Profile</Link>
      </nav>
    </div>
  );
}
