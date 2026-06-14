interface StatsCardsProps {
  scansThisMonth: number;
  swapsMade: number;
}

export function StatsCards({ scansThisMonth, swapsMade }: StatsCardsProps) {
  const cards = [
    {
      title: "Scans this month",
      value: scansThisMonth,
      icon: "📊",
    },
    {
      title: "Swaps made",
      value: swapsMade,
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
