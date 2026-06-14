import { StatsCards } from "@/components/tracker/StatsCards";
import { SavedSwapsList } from "@/components/tracker/SavedSwapsList";

export default function TrackerPage() {
  return (
    <main className="flex flex-col gap-8 p-6">
      <div>
        <h1 className="text-2xl font-black mb-2">Your progress</h1>
        <p className="text-muted text-sm">
          Track your scans and see how you&apos;re improving your choices
        </p>
      </div>

      <StatsCards />
      <SavedSwapsList />
    </main>
  );
}