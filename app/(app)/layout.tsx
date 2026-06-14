import { ResponsiveShell } from "@/components/layout/ResponsiveShell";
import { BottomNav } from "@/components/layout/BottomNav";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ResponsiveShell className="min-h-dvh" variant="app">
      {/* Top spacing for desktop nav, bottom spacing for mobile nav */}
      <div className="pb-20 lg:pt-20 lg:pb-6">{children}</div>
      <BottomNav />
    </ResponsiveShell>
  );
}
