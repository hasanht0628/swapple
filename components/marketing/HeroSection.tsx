import Link from "next/link";

export function HeroSection() {
  return (
    <section className="text-center lg:text-left lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center space-y-8 lg:space-y-0">
      {/* Text content */}
      <div className="space-y-8 lg:order-2">
        <div className="space-y-4">
          <h1 className="text-4xl lg:text-6xl font-black tracking-tight">
            Swa<span className="text-primary">pp</span>le
          </h1>
          <p className="text-xl lg:text-3xl font-semibold text-foreground">
            Point. Scan. Swap up.
          </p>
        </div>
        
        <div className="space-y-6">
          <p className="text-lg lg:text-xl text-muted max-w-sm lg:max-w-none mx-auto lg:mx-0 leading-relaxed">
            Get personalized food guidance in seconds. Point your camera at any product, 
            shelf, or cart to discover better options for your health goals.
          </p>
          
          <Link
            href="/sign-in"
            className="inline-block rounded-2xl bg-primary px-8 py-4 lg:px-10 lg:py-5 text-lg lg:text-xl font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Get started
          </Link>
        </div>
      </div>

      {/* Illustration placeholder */}
      <div className="lg:order-1 flex justify-center">
        <div className="w-64 h-64 lg:w-80 lg:h-80 bg-gradient-to-br from-primary-soft to-primary/10 rounded-3xl flex items-center justify-center text-6xl lg:text-8xl">
          📱
        </div>
      </div>
    </section>
  );
}