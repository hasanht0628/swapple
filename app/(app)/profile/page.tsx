import { TRUST_STATEMENT, NON_MEDICAL_DISCLAIMER } from "@/lib/disclaimer";

// TODO(ui): Profile — avatar + email, always-editable priorities (+ Add / Edit),
// Subscription card (Swapple Plus $9/mo, Manage plan -> Stripe portal, or upgrade
// CTA -> Stripe checkout), About/trust section, notifications toggle, sign out.
// See components/profile/*.
export default function ProfilePage() {
  return (
    <main className="flex flex-col gap-4 p-6">
      <h1 className="text-2xl font-black">Profile</h1>
      <section className="rounded-2xl bg-surface p-4 shadow-card">
        <p className="text-sm font-semibold">About</p>
        <p className="mt-1 text-sm text-muted">{TRUST_STATEMENT}</p>
        <p className="mt-2 text-xs text-muted">{NON_MEDICAL_DISCLAIMER}</p>
      </section>
      {/* PLACEHOLDER */}
    </main>
  );
}
