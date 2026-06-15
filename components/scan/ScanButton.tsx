"use client";

import Link from "next/link";
import { IcBolt } from "@/components/icons";
import { cn } from "@/lib/utils";

interface ScanButtonProps {
  href?: string;
  onClick?: () => void;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const SIZE_CLASSES = {
  sm: "w-16 h-16 text-sm",
  md: "w-20 h-20 text-base",
  lg: "w-32 h-32 text-lg",
} as const;

const ICON_SIZES = {
  sm: 22,
  md: 28,
  lg: 40,
} as const;

export function ScanButton({
  href = "/capture",
  onClick,
  className,
  size = "lg",
}: ScanButtonProps) {
  const buttonContent = (
    <div
      className={cn(
        "rounded-full bg-primary text-primary-foreground font-display font-bold",
        "flex flex-col items-center justify-center gap-1",
        "shadow-[0_8px_20px_oklch(0.48_0.165_312_/_0.28)]",
        "transition-all hover:brightness-105 active:scale-[0.985]",
        SIZE_CLASSES[size],
        className,
      )}
    >
      <IcBolt s={ICON_SIZES[size]} sw={1.6} />
      <span>Scan</span>
    </div>
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className="inline-block">
        {buttonContent}
      </button>
    );
  }

  return (
    <Link href={href} className="inline-block">
      {buttonContent}
    </Link>
  );
}
