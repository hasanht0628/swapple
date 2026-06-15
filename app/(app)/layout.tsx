import { ResponsiveShell } from "@/components/layout/ResponsiveShell";
import { BottomNav } from "@/components/layout/BottomNav";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ResponsiveShell variant="app">
      <div className="sw-screen">
        <div className="sw-body">
          <div className="sw-pad screen-anim pb-24 lg:pt-20 lg:pb-8">{children}</div>
        </div>
        <BottomNav />
      </div>
    </ResponsiveShell>
  );
}
