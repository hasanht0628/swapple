import { ScanButton } from "@/components/scan/ScanButton";
import { RecentScansStrip } from "@/components/scan/RecentScansStrip";
import { priorityLabel } from "@/lib/priorities";
import { requireUserWithProfile } from "@/lib/auth/requireUser";

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const { user, profile } = await requireUserWithProfile();

  // Format the current date
  const today = new Date();
  const dateString = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).toUpperCase();

  // Get user's priorities for display
  const priorities = profile.priorities || [];

  return (
    <main className="flex flex-col gap-8 lg:gap-12 p-6 lg:px-8">
      {/* Date header */}
      <div className="text-center lg:text-left">
        <p className="text-sm lg:text-base font-medium text-muted uppercase tracking-wide">
          {dateString}
        </p>
      </div>

      {/* Greeting and priorities */}
      <div className="space-y-4 lg:space-y-6">
        <h1 className="text-2xl lg:text-4xl font-black text-center lg:text-left">
          Hi, {profile.display_name || user.email?.split('@')[0] || 'there'} 👋
        </h1>
        
        {priorities.length > 0 && (
          <div className="flex flex-wrap gap-2 lg:gap-3 justify-center lg:justify-start">
            {priorities.map((priorityId) => (
              <span
                key={priorityId}
                className="inline-flex items-center gap-1 px-3 py-1 lg:px-4 lg:py-2 bg-surface rounded-full text-sm lg:text-base font-medium border border-border"
              >
                {priorityLabel(priorityId)}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Scan button and recent scans */}
      <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start space-y-8 lg:space-y-0">
        {/* Scan button */}
        <div className="flex flex-col items-center lg:items-start gap-4 lg:gap-6">
          <ScanButton className="lg:mx-0" />
          <p className="text-sm lg:text-base text-muted text-center lg:text-left">
            Point at any product, shelf, or your cart
          </p>
        </div>

        {/* Recent scans */}
        <div className="lg:pt-4">
          <RecentScansStrip />
        </div>
      </div>
    </main>
  );
}