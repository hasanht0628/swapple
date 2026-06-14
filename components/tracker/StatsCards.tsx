"use client";

import { useState, useEffect } from "react";

interface TrackerStats {
  scansThisMonth: number;
  swapsMade: number;
}

export function StatsCards() {
  const [stats, setStats] = useState<TrackerStats>({ scansThisMonth: 0, swapsMade: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        // This would typically be a dedicated stats endpoint
        // For now, we'll use placeholder logic
        const response = await fetch("/api/profile");
        if (response.ok) {
          // Placeholder stats - in real app, calculate from tracker_events
          setStats({
            scansThisMonth: 24,
            swapsMade: 9,
          });
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className="bg-surface rounded-2xl p-6 lg:p-8 shadow-card animate-pulse"
          >
            <div className="h-8 bg-muted/20 rounded mb-2" />
            <div className="h-6 bg-muted/20 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: "Scans this month",
      value: stats.scansThisMonth,
      icon: "📊",
    },
    {
      title: "Swaps made",
      value: stats.swapsMade,
      icon: "🔄",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-surface rounded-2xl p-6 lg:p-8 shadow-card text-center space-y-3 lg:space-y-4"
        >
          <div className="text-2xl lg:text-3xl">{card.icon}</div>
          <div className="text-2xl lg:text-3xl font-bold text-primary">
            {card.value}
          </div>
          <div className="text-sm lg:text-base text-muted font-medium">
            {card.title}
          </div>
        </div>
      ))}
    </div>
  );
}