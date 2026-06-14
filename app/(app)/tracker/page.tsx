import { StatsCards } from "@/components/tracker/StatsCards";
import {
  SavedSwapsList,
  type SavedSwapItem,
} from "@/components/tracker/SavedSwapsList";
import { requireUser } from "@/lib/auth/requireUser";
import { type BrandRecommendation } from "@/types/scan";

export const dynamic = "force-dynamic";

export default async function TrackerPage() {
  const { user, supabase } = await requireUser();

  const now = new Date();
  const startOfMonth = new Date(
    now.getFullYear(),
    now.getMonth(),
    1,
  ).toISOString();

  const [scansResult, swapsCountResult, savedSwapsResult] = await Promise.all([
    supabase
      .from("scans")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .gte("created_at", startOfMonth),
    supabase
      .from("scan_items")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .eq("saved", true),
    supabase
      .from("scan_items")
      .select("id, item_name, saved_recommendation, swapped")
      .eq("user_id", user.id)
      .eq("saved", true)
      .order("created_at", { ascending: false }),
  ]);

  const scansThisMonth = scansResult.count ?? 0;
  const swapsMade = swapsCountResult.count ?? 0;

  const savedSwaps: SavedSwapItem[] = (savedSwapsResult.data ?? []).map(
    (item) => ({
      id: item.id,
      item_name: item.item_name,
      saved_recommendation: item.saved_recommendation as BrandRecommendation | null,
      swapped: item.swapped,
    }),
  );

  return (
    <main className="flex flex-col gap-8 lg:gap-12 p-6 lg:px-8">
      <div>
        <h1 className="text-2xl lg:text-4xl font-black mb-2 lg:mb-4 text-center lg:text-left">
          Your progress
        </h1>
        <p className="text-muted text-sm lg:text-base text-center lg:text-left">
          Track your scans and see how you&apos;re improving your choices
        </p>
      </div>

      <StatsCards scansThisMonth={scansThisMonth} swapsMade={swapsMade} />
      <SavedSwapsList savedSwaps={savedSwaps} />
    </main>
  );
}
