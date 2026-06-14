import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { requireUser, UnauthorizedError } from "@/lib/auth/requireUser";
import { isValidPrioritySelection } from "@/lib/priorities";
import type { ProfileRow } from "@/types/database";

export const runtime = "nodejs";

/** GET /api/profile — returns the current user's profile. */
export async function GET() {
  try {
    const { user, supabase } = await requireUser();
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();
    if (error || !profile) {
      return NextResponse.json({ error: "Profile not found." }, { status: 404 });
    }
    return NextResponse.json({ profile });
  } catch (err) {
    if (err instanceof UnauthorizedError) {
      return NextResponse.json({ error: err.message }, { status: 401 });
    }
    return NextResponse.json({ error: "Unexpected error." }, { status: 500 });
  }
}

const patchSchema = z.object({
  display_name: z.string().trim().min(1).max(80).optional(),
  priorities: z.array(z.string()).optional(),
  notifications_enabled: z.boolean().optional(),
  onboarding_complete: z.boolean().optional(),
  disclaimer_accepted: z.boolean().optional(),
});

/**
 * PATCH /api/profile — updates priorities, display_name, notifications, and the
 * onboarding/disclaimer flags. Validates the priority selection (1-3 valid ids).
 */
export async function PATCH(request: NextRequest) {
  try {
    const { user, supabase } = await requireUser();

    const body = await request.json().catch(() => null);
    const parsed = patchSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid body", issues: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const update: Partial<ProfileRow> = {};
    const data = parsed.data;

    if (data.priorities !== undefined) {
      if (!isValidPrioritySelection(data.priorities)) {
        return NextResponse.json(
          { error: "Pick 1-3 valid priorities." },
          { status: 400 },
        );
      }
      update.priorities = data.priorities;
    }
    if (data.display_name !== undefined) update.display_name = data.display_name;
    if (data.notifications_enabled !== undefined)
      update.notifications_enabled = data.notifications_enabled;
    if (data.onboarding_complete !== undefined)
      update.onboarding_complete = data.onboarding_complete;
    if (data.disclaimer_accepted) {
      update.disclaimer_accepted_at = new Date().toISOString();
    }

    if (Object.keys(update).length === 0) {
      return NextResponse.json({ error: "Nothing to update." }, { status: 400 });
    }

    const { data: profile, error } = await supabase
      .from("profiles")
      .update(update)
      .eq("id", user.id)
      .select("*")
      .single();
    if (error || !profile) {
      return NextResponse.json({ error: "Failed to update." }, { status: 500 });
    }

    return NextResponse.json({ profile });
  } catch (err) {
    if (err instanceof UnauthorizedError) {
      return NextResponse.json({ error: err.message }, { status: 401 });
    }
    return NextResponse.json({ error: "Unexpected error." }, { status: 500 });
  }
}
