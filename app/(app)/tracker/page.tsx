import { StatsCards } from "@/components/tracker/StatsCards";
import { SavedSwapsList } from "@/components/tracker/SavedSwapsList";

export default function TrackerPage() {
  return (
    <main className="flex flex-col gap-8 lg:gap-12 p-6 lg:px-8">
      <div>
        <h1 className="text-2xl lg:text-4xl font-black mb-2 lg:mb-4 text-center lg:text-left">Your progress</h1>
        <p className="text-muted text-sm lg:text-base text-center lg:text-left">
          Track your scans and see how you&apos;re improving your choices
        </p>
      </div>

      <StatsCards />
      <SavedSwapsList />
    </main>
  );
}