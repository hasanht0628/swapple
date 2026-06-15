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
      <section className="sw-card overflow-hidden bg-primary p-6 text-primary-foreground">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="sw-h2 text-white">Swapple Plus</h2>
              <p className="text-sm text-white/80">$9 / month</p>
            </div>
            <div className="text-2xl">✨</div>
          </div>

          <div className="space-y-2 text-sm">
            <p>✓ Unlimited brand recommendations</p>
            <p>✓ Detailed analysis on all items</p>
            <p>✓ Priority tradeoff insights</p>
          </div>

          <button
            type="button"
            onClick={handleManage}
            disabled={isLoading}
            className="sw-btn sw-btn-ghost !w-full border-white/30 text-white hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "Loading..." : "Manage plan"}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="sw-card p-6">
      <div className="space-y-4">
        <div>
          <h2 className="sw-h2">Upgrade to Swapple Plus</h2>
          <p className="text-sm text-ink-2">
            Get detailed analysis and brand recommendations for all items
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-3xl font-extrabold text-primary">$9</span>
            <span className="text-sm text-muted">per month</span>
          </div>

          <div className="space-y-2 text-sm text-ink-2">
            <p>✓ Everything in Free</p>
            <p>✓ Detailed analysis on caution/avoid items</p>
            <p>✓ Ranked brand recommendations</p>
            <p>✓ Priority tradeoff insights</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleUpgrade}
          disabled={isLoading}
          className="sw-btn sw-btn-primary disabled:cursor-not-allowed"
        >
          {isLoading ? "Loading..." : "Upgrade now"}
        </button>
      </div>
    </section>
  );
}
