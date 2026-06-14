import { MobileShell } from "@/components/layout/MobileShell";
import { BottomNav } from "@/components/layout/BottomNav";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MobileShell className="flex min-h-dvh flex-col">
      <div className="flex-1 pb-20">{children}</div>
      <BottomNav />
    </MobileShell>
  );
}
