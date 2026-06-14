import { priorityLabel } from "@/lib/priorities";

/**
 * Checks two things:
 *  1. Every item has a non-empty free_reason (the always-visible one-liner).
 *  2. When the user supplied priorities, the analysis personalizes to them —
 *     i.e. priority_tradeoffs reference the selected priorities (by id or label).
 */
export default function personalization(
  output: string,
  context: { vars?: { tc?: { priorities?: string[] } } },
) {
  let parsed: { items?: Array<Record<string, unknown>> };
  try {
    parsed = typeof output === "string" ? JSON.parse(output) : (output as never);
  } catch {
    return { pass: false, score: 0, reason: "Output is not valid JSON" };
  }

  const items = parsed.items ?? [];
  for (const item of items) {
    const fr = item.free_reason;
    if (typeof fr !== "string" || fr.trim().length === 0) {
      return {
        pass: false,
        score: 0,
        reason: `Item "${String(item.item_name)}" missing free_reason`,
      };
    }
  }

  const priorityIds = context.vars?.tc?.priorities ?? [];

  if (priorityIds.length === 0) {
    return {
      pass: true,
      score: 1,
      reason: "free_reason present (no priorities to personalize against)",
    };
  }

  const wanted = priorityIds.flatMap((id) => [id.toLowerCase(), priorityLabel(id).toLowerCase()]);
  const referenced = items.some((item) => {
    const tradeoffs = (item.priority_tradeoffs as Array<{ priority?: string }>) ?? [];
    return tradeoffs.some((t) =>
      wanted.some((w) => (t.priority ?? "").toLowerCase().includes(w)),
    );
  });

  if (!referenced) {
    return {
      pass: false,
      score: 0,
      reason: `No priority_tradeoffs referenced the user's priorities (${priorityIds.join(", ")})`,
    };
  }

  return {
    pass: true,
    score: 1,
    reason: "free_reason present and analysis references user priorities",
  };
}
