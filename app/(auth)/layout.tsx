// Auth route group: centered mobile shell, no bottom nav.
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mobile-shell flex flex-col justify-center p-6">
      {children}
    </div>
  );
}
