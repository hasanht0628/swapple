"use client";

import { useState } from "react";
import { type Database } from "@/types/database";

type SubscriptionStatus = Database["public"]["Enums"]["subscription_status"];

interface SubscriptionPanelProps {
  subscriptionStatus: SubscriptionStatus;
  onUpgrade?: () => void;
  onManage?: () => void;
}

export function SubscriptionPanel({
  subscriptionStatus,
  onUpgrade,
  onManage,
}: SubscriptionPanelProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleUpgrade = async () => {
    if (!onUpgrade) return;
    setIsLoading(true);
    try {
      await onUpgrade();
    } finally {
      setIsLoading(false);
    }
  };

  const handleManage = async () => {
    if (!onManage) return;
    setIsLoading(true);
    try {
      await onManage();
    } finally {
      setIsLoading(false);
    }
  };

  if (subscriptionStatus === "paid") {
    return (
      <section className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 text-primary-foreground">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="font-semibold text-lg">Swapple Plus</h2>
              <p className="text-primary-foreground/80 text-sm">
                $9 / month
              </p>
            </div>
            <div className="text-2xl">✨</div>
          </div>

          <div className="space-y-2 text-sm">
            <p>✓ Unlimited brand recommendations</p>
            <p>✓ Detailed analysis on all items</p>
            <p>✓ Priority tradeoff insights</p>
          </div>

          <button
            onClick={handleManage}
            disabled={isLoading}
            className="w-full rounded-xl bg-white/20 backdrop-blur px-4 py-3 font-semibold transition-colors hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Loading..." : "Manage plan"}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-surface rounded-2xl p-6 border border-border shadow-card">
      <div className="space-y-4">
        <div>
          <h2 className="font-semibold">Upgrade to Swapple Plus</h2>
          <p className="text-muted text-sm">
            Get detailed analysis and brand recommendations for all items
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-primary">$9</span>
            <span className="text-muted text-sm">per month</span>
          </div>

          <div className="space-y-2 text-sm text-muted">
            <p>✓ Everything in Free</p>
            <p>✓ Detailed analysis on caution/avoid items</p>
            <p>✓ Ranked brand recommendations</p>
            <p>✓ Priority tradeoff insights</p>
          </div>
        </div>

        <button
          onClick={handleUpgrade}
          disabled={isLoading}
          className="w-full rounded-xl bg-primary px-4 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Loading..." : "Upgrade now"}
        </button>
      </div>
    </section>
  );
}