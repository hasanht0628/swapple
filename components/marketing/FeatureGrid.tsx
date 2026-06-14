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
    <section className="space-y-8 lg:space-y-12">
      <h2 className="text-2xl lg:text-4xl font-bold text-center">
        Nutrition guidance that fits your life
      </h2>
      
      <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
        {FEATURES.map((feature) => (
          <div
            key={feature.title}
            className="bg-surface rounded-2xl p-6 lg:p-8 shadow-card text-center space-y-4 w-full sm:w-80 lg:w-80 flex-shrink-0"
          >
            <div className="text-3xl lg:text-4xl">{feature.icon}</div>
            <h3 className="font-semibold text-lg lg:text-xl">{feature.title}</h3>
            <p className="text-muted text-sm lg:text-base leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}