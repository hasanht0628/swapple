import { ResponsiveShell } from "@/components/layout/ResponsiveShell";
import { BottomNav } from "@/components/layout/BottomNav";

export default function TestLayoutPage() {
  return (
    <ResponsiveShell className="min-h-dvh" variant="app">
      {/* Top spacing for desktop nav, bottom spacing for mobile nav */}
      <div className="pb-20 lg:pt-20 lg:pb-6">
        <main className="flex flex-col gap-8 lg:gap-12 p-6 lg:px-8">
          {/* Date header */}
          <div className="text-center lg:text-left">
            <p className="text-sm lg:text-base font-medium text-muted uppercase tracking-wide">
              SUNDAY, JUNE 14
            </p>
          </div>

          {/* Greeting and priorities */}
          <div className="space-y-4 lg:space-y-6">
            <h1 className="text-2xl lg:text-4xl font-black text-center lg:text-left">
              Hi, Test User 👋
            </h1>
            
            <div className="flex flex-wrap gap-2 lg:gap-3 justify-center lg:justify-start">
              <span className="inline-flex items-center gap-1 px-3 py-1 lg:px-4 lg:py-2 bg-surface rounded-full text-sm lg:text-base font-medium border border-border">
                Test Priority
              </span>
            </div>
          </div>

          {/* Scan button and recent scans */}
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start space-y-8 lg:space-y-0">
            {/* Scan button */}
            <div className="flex flex-col items-center lg:items-start gap-4 lg:gap-6">
              <button className="w-32 h-32 lg:w-40 lg:h-40 bg-primary rounded-full flex flex-col items-center justify-center text-primary-foreground font-semibold">
                <span className="text-2xl lg:text-3xl">📱</span>
                <span className="text-sm lg:text-base">Scan</span>
              </button>
              <p className="text-sm lg:text-base text-muted text-center lg:text-left">
                Point at any product, shelf, or your cart
              </p>
            </div>

            {/* Recent scans */}
            <div className="lg:pt-4">
              <h2 className="text-lg lg:text-xl font-semibold mb-4">Recent Scans</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-4 p-4 bg-surface rounded-2xl border border-border">
                  <div className="w-12 h-12 bg-muted/20 rounded-lg flex items-center justify-center text-muted text-xs">
                    📦
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Test Product</h3>
                    <p className="text-sm text-muted">5 minutes ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <BottomNav />
    </ResponsiveShell>
  );
}