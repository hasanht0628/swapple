import { ResponsiveShell } from "@/components/layout/ResponsiveShell";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ResponsiveShell variant="auth">
      <div className="sw-screen">
        <div className="sw-body">
          <div className="sw-pad screen-anim flex min-h-full flex-col justify-center py-8">
            {children}
          </div>
        </div>
      </div>
    </ResponsiveShell>
  );
}
