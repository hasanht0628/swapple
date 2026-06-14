import { ScanButton } from "@/components/scan/ScanButton";
import { RecentScansStrip } from "@/components/scan/RecentScansStrip";
import { priorityLabel } from "@/lib/priorities";
import { requireUserWithProfile } from "@/lib/auth/requireUser";

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
    <main className="flex flex-col gap-8 p-6">
      {/* Date header */}
      <div className="text-center">
        <p className="text-sm font-medium text-muted uppercase tracking-wide">
          {dateString}
        </p>
      </div>

      {/* Greeting and priorities */}
      <div className="space-y-4">
        <h1 className="text-2xl font-black">
          Hi, {profile.display_name || user.email?.split('@')[0] || 'there'} 👋
        </h1>
        
        {priorities.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {priorities.map((priorityId) => (
              <span
                key={priorityId}
                className="inline-flex items-center gap-1 px-3 py-1 bg-surface rounded-full text-sm font-medium border border-border"
              >
                {priorityLabel(priorityId)}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Scan button */}
      <div className="flex flex-col items-center gap-4">
        <ScanButton />
        <p className="text-sm text-muted text-center">
          Point at any product, shelf, or your cart
        </p>
      </div>

      {/* Recent scans */}
      <RecentScansStrip />
    </main>
  );
}