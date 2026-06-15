"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IcChart, IcHome, IcUser } from "@/components/icons";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/home", label: "Home", Icon: IcHome },
  { href: "/tracker", label: "Tracker", Icon: IcChart },
  { href: "/profile", label: "Profile", Icon: IcUser },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile bottom nav (< lg) */}
      <nav className="lg:hidden fixed inset-x-0 bottom-0 mx-auto flex max-w-shell justify-around border-t border-border bg-surface py-2 text-xs font-medium">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 py-1 transition-colors",
                isActive
                  ? "text-primary font-semibold"
                  : "text-muted hover:text-foreground"
              )}
            >
              <item.Icon s={20} sw={isActive ? 2 : 1.8} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Desktop top nav (lg+) */}
      <nav className="hidden lg:flex fixed top-0 inset-x-0 z-10 bg-surface border-b border-border">
        <div className="responsive-app-container flex items-center justify-between px-6 py-4">
          <Link href="/home" className="font-display text-xl font-black">
            Swa<span className="text-primary">pp</span>le
          </Link>

          <div className="flex gap-8">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary-soft text-primary font-semibold"
                      : "text-muted hover:text-foreground hover:bg-border"
                  )}
                >
                  <item.Icon s={18} sw={isActive ? 2 : 1.8} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}
