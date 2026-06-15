import { ScanButton } from "@/components/scan/ScanButton";
import { RecentScansStrip } from "@/components/scan/RecentScansStrip";
import { priorityLabel } from "@/lib/priorities";
import { requireUserWithProfile } from "@/lib/auth/requireUser";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { user, profile } = await requireUserWithProfile();

  const today = new Date();
  const dateString = today
    .toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    })
    .toUpperCase();

  const priorities = profile.priorities || [];

  return (
    <main className="flex flex-col gap-8 pb-4">
      <p className="sw-kicker text-center lg:text-left">{dateString}</p>

      <div className="space-y-4">
        <h1 className="sw-h1 text-center lg:text-left">
          Hi, {profile.display_name || user.email?.split("@")[0] || "there"} 👋
        </h1>

        {priorities.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
            {priorities.map((priorityId) => (
              <span key={priorityId} className="sw-chip">
                {priorityLabel(priorityId)}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-8 lg:grid lg:grid-cols-2 lg:items-start lg:gap-12 lg:space-y-0">
        <div className="flex flex-col items-center gap-4 lg:items-start">
          <ScanButton className="lg:mx-0" />
          <p className="sw-sub text-center text-sm lg:text-left">
            Point at any product, shelf, or your cart
          </p>
        </div>

        <RecentScansStrip />
      </div>
    </main>
  );
}
