"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/home", label: "Home" },
  { href: "/tracker", label: "Tracker" },
  { href: "/profile", label: "Profile" },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile bottom nav (< lg) */}
      <nav className="lg:hidden fixed inset-x-0 bottom-0 mx-auto flex max-w-shell justify-around border-t border-border bg-surface py-3 text-sm font-medium">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex-1 text-center transition-colors",
                isActive 
                  ? "text-primary font-semibold" 
                  : "text-muted hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      
      {/* Desktop top nav (lg+) */}
      <nav className="hidden lg:flex fixed top-0 inset-x-0 z-10 bg-surface border-b border-border">
        <div className="responsive-app-container flex items-center justify-between px-6 py-4">
          <Link href="/home" className="text-xl font-black">
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
                    "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-primary-soft text-primary font-semibold" 
                      : "text-muted hover:text-foreground hover:bg-border"
                  )}
                >
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