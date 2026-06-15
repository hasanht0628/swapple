"use client";

import { useState, useEffect } from "react";

export const dynamic = "force-dynamic";
import { useRouter } from "next/navigation";
import { EditablePriorities } from "@/components/profile/EditablePriorities";
import { SubscriptionPanel } from "@/components/profile/SubscriptionPanel";
import { TrustStatement } from "@/components/profile/TrustStatement";
import { NotificationsToggle } from "@/components/profile/NotificationsToggle";
import { createClient } from "@/lib/supabase/client";
import { type Database } from "@/types/database";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const { data, error } = await supabase.from("profiles").select("*").single();

        if (error) throw error;
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProfile();
  }, [supabase]);

  const handlePrioritiesChange = async (priorities: string[]) => {
    const response = await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priorities }),
    });

    if (!response.ok) {
      throw new Error("Failed to update priorities");
    }

    if (profile) {
      setProfile({ ...profile, priorities });
    }
  };

  const handleNotificationsToggle = async (enabled: boolean) => {
    const response = await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notifications_enabled: enabled }),
    });

    if (!response.ok) {
      throw new Error("Failed to update notifications");
    }

    if (profile) {
      setProfile({ ...profile, notifications_enabled: enabled });
    }
  };

  const handleUpgrade = async () => {
    const response = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    if (data.url) {
      window.location.href = data.url;
    }
  };

  const handleManageSubscription = async () => {
    const response = await fetch("/api/stripe/portal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    if (data.url) {
      window.location.href = data.url;
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (isLoading || !profile) {
    return (
      <main className="flex flex-col gap-8 pb-4">
        <div className="animate-pulse space-y-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-24 rounded-[22px] bg-background-deep" />
          ))}
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col gap-8 pb-4">
      <div className="flex items-center justify-center gap-4 lg:justify-start">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary font-display text-xl font-bold text-primary-foreground lg:h-20 lg:w-20 lg:text-2xl">
          {profile.display_name?.[0] || profile.email?.[0]?.toUpperCase() || "U"}
        </div>
        <div className="text-center lg:text-left">
          <h1 className="sw-h2">{profile.display_name || "User"}</h1>
          <p className="text-sm text-ink-2">{profile.email}</p>
        </div>
      </div>

      <div className="space-y-8 lg:grid lg:grid-cols-2 lg:gap-12 lg:space-y-0">
        <div className="space-y-8">
          <EditablePriorities
            initialPriorities={profile.priorities || []}
            onSave={handlePrioritiesChange}
          />

          <SubscriptionPanel
            subscriptionStatus={profile.subscription_status}
            onUpgrade={handleUpgrade}
            onManage={handleManageSubscription}
          />
        </div>

        <div className="space-y-8">
          <TrustStatement />

          <NotificationsToggle
            initialEnabled={profile.notifications_enabled}
            onToggle={handleNotificationsToggle}
          />

          <button
            type="button"
            onClick={handleSignOut}
            className="sw-btn sw-btn-ghost"
          >
            Sign out
          </button>
        </div>
      </div>
    </main>
  );
}
