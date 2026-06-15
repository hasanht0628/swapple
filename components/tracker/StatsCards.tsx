interface StatsCardsProps {
  scansThisMonth: number;
  swapsMade: number;
}

export function StatsCards({ scansThisMonth, swapsMade }: StatsCardsProps) {
  const cards = [
    { title: "Scans this month", value: scansThisMonth, icon: "📊" },
    { title: "Swaps made", value: swapsMade, icon: "🔄" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {cards.map((card) => (
        <div key={card.title} className="sw-card space-y-3 p-6 text-center">
          <div className="text-2xl">{card.icon}</div>
          <div className="font-display text-3xl font-extrabold text-primary">{card.value}</div>
          <div className="text-sm font-semibold text-ink-2">{card.title}</div>
        </div>
      ))}
    </div>
  );
}
