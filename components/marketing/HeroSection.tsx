import Link from "next/link";

export function HeroSection() {
  return (
    <section className="text-center space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-black tracking-tight">
          Swa<span className="text-primary">pp</span>le
        </h1>
        <p className="text-xl font-semibold text-foreground">
          Point. Scan. Swap up.
        </p>
      </div>
      
      <div className="space-y-4">
        <p className="text-lg text-muted max-w-sm mx-auto leading-relaxed">
          Get personalized food guidance in seconds. Point your camera at any product, 
          shelf, or cart to discover better options for your health goals.
        </p>
        
        <Link
          href="/sign-in"
          className="inline-block rounded-2xl bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Get started
        </Link>
      </div>
    </section>
  );
}