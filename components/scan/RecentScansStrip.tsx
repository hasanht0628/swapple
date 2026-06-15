"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
        <h2 className="sw-h2">Recent scans</h2>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-20 w-20 shrink-0 animate-pulse rounded-[16px] bg-background-deep"
            />
          ))}
        </div>
      </section>
    );
  }

  if (scans.length === 0) {
    return (
      <section className="space-y-4">
        <h2 className="sw-h2">Recent scans</h2>
        <p className="py-6 text-center text-sm text-muted">
          No scans yet. Tap the scan button to get started!
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="sw-h2">Recent scans</h2>
        <Link href="/tracker" className="text-sm font-semibold text-primary hover:underline">
          See all
        </Link>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2">
        {scans.map((scan) => (
          <Link key={scan.id} href={`/scans/${scan.id}`} className="block shrink-0">
            <div className="sw-ph h-20 w-20 overflow-hidden">
              {scan.image_url ? (
                <Image
                  src={scan.image_url}
                  alt="Scan"
                  width={80}
                  height={80}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span>{scan.item_count || 0} items</span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
