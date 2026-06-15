import { cn } from "@/lib/utils";

interface MarketingWrapProps {
  children: React.ReactNode;
  className?: string;
}

export function MarketingWrap({ children, className }: MarketingWrapProps) {
  return <div className={cn("lp-wrap", className)}>{children}</div>;
}
