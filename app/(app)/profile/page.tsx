"use client";

import { useState, useEffect } from "react";
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
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .single();

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

    // Update local state
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

    // Update local state
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
      <main className="flex flex-col gap-6 p-6">
        <div className="animate-pulse space-y-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-24 bg-surface rounded-2xl" />
          ))}
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col gap-6 p-6">
      {/* User info */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold text-lg">
          {profile.display_name?.[0] || profile.email?.[0]?.toUpperCase() || "U"}
        </div>
        <div>
          <h1 className="font-semibold">
            {profile.display_name || "User"}
          </h1>
          <p className="text-sm text-muted">{profile.email}</p>
        </div>
      </div>

      {/* Priorities */}
      <EditablePriorities
        initialPriorities={profile.priorities || []}
        onSave={handlePrioritiesChange}
      />

      {/* Subscription */}
      <SubscriptionPanel
        subscriptionStatus={profile.subscription_status}
        onUpgrade={handleUpgrade}
        onManage={handleManageSubscription}
      />

      {/* About/Trust */}
      <TrustStatement />

      {/* Notifications */}
      <NotificationsToggle
        initialEnabled={profile.notifications_enabled}
        onToggle={handleNotificationsToggle}
      />

      {/* Sign out */}
      <div className="pt-4">
        <button
          onClick={handleSignOut}
          className="w-full rounded-2xl border border-border bg-surface px-4 py-3 font-medium text-muted hover:bg-muted/20 transition-colors"
        >
          Sign out
        </button>
      </div>
    </main>
  );
}