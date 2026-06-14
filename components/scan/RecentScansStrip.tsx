"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { type ScanDTO } from "@/types/scan";

interface RecentScansStripProps {
  limit?: number;
}

export function RecentScansStrip({ limit = 3 }: RecentScansStripProps) {
  const [scans, setScans] = useState<ScanDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRecentScans() {
      try {
        const response = await fetch(`/api/scans?limit=${limit}`);
        if (response.ok) {
          const data = await response.json();
          setScans(data.scans || []);
        }
      } catch (error) {
        console.error("Failed to fetch recent scans:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRecentScans();
  }, [limit]);

  if (isLoading) {
    return (
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Recent scans</h2>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-20 h-20 bg-surface rounded-xl animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  if (scans.length === 0) {
    return (
      <section className="space-y-4">
        <h2 className="font-semibold">Recent scans</h2>
        <div className="text-center py-8 text-muted text-sm">
          No scans yet. Tap the scan button to get started!
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">Recent scans</h2>
        <Link
          href="/tracker"
          className="text-sm text-primary hover:underline"
        >
          See all
        </Link>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2">
        {scans.map((scan) => (
          <Link
            key={scan.id}
            href={`/scans/${scan.id}`}
            className="flex-shrink-0 block"
          >
            <div className="w-20 h-20 bg-surface rounded-xl border border-border flex items-center justify-center text-muted text-xs text-center p-2 hover:shadow-md transition-shadow">
              {scan.image_url ? (
                <img
                  src={scan.image_url}
                  alt="Scan"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="space-y-1">
                  <div>📦</div>
                  <div className="text-2xs">
                    {scan.item_count || 0} items
                  </div>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}