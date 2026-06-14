import { ResponsiveShell } from "@/components/layout/ResponsiveShell";

// Auth route group: responsive container, no bottom nav.
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ResponsiveShell className="flex flex-col justify-center p-6 lg:px-8">
      {children}
    </ResponsiveShell>
  );
}
