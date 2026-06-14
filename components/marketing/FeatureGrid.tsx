const FEATURES = [
  {
    icon: "⚡",
    title: "Instant Analysis",
    description: "Point your camera and get personalized nutrition guidance in seconds"
  },
  {
    icon: "🎯",
    title: "Your Goals",
    description: "Tailored verdicts based on your health priorities and dietary needs"
  },
  {
    icon: "🔄",
    title: "Better Swaps",
    description: "Discover healthier alternatives ranked specifically for you"
  },
] as const;

export function FeatureGrid() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-center">
        Nutrition guidance that fits your life
      </h2>
      
      <div className="grid gap-6">
        {FEATURES.map((feature) => (
          <div
            key={feature.title}
            className="bg-surface rounded-2xl p-6 shadow-card text-center space-y-3"
          >
            <div className="text-2xl">{feature.icon}</div>
            <h3 className="font-semibold text-lg">{feature.title}</h3>
            <p className="text-muted text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}