import "./marketing.css";
import "./article.css";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="marketing-page min-h-dvh">{children}</div>;
}
