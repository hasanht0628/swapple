"use client";

import Link from "next/link";
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
  lg: "w-32 h-32 lg:w-28 lg:h-28 text-lg",
} as const;

export function ScanButton({ 
  href = "/capture", 
  onClick, 
  className,
  size = "lg" 
}: ScanButtonProps) {
  const buttonContent = (
    <div
      className={cn(
        "rounded-full bg-gradient-to-b from-primary to-primary/80 shadow-lg transition-all",
        "flex flex-col items-center justify-center text-primary-foreground font-semibold",
        "hover:scale-105 hover:shadow-xl active:scale-95",
        SIZE_CLASSES[size],
        className
      )}
    >
      <div className="text-2xl mb-1">⚡</div>
      <span>Scan</span>
    </div>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className="inline-block">
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