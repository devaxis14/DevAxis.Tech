import Image from "next/image";
import Link from "next/link";

// Default values matching original hardcoded content
const DEFAULTS = {
  headline: "Define Your",
  highlightedText: "Digital Space",
  subheading:
    "We build immersive digital experiences that elevate your brand and drive real results.",
  ctaText: "Get a Quote",
  backgroundImage: null as string | null,
};

interface HeroProps {
  data?: {
    headline?: string;
    highlightedText?: string;
    subheading?: string;
    ctaText?: string;
    backgroundImage?: string | null;
  } | null;
}

export default function Hero({ data }: HeroProps) {
  const hero = { ...DEFAULTS, ...data };
  const bgImage = hero.backgroundImage || "/images/hero-bg.png";

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-navy"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={bgImage}
          alt="Modern web design workspace at DevAxis Kochi"
          fill
          priority
          className="object-cover object-center opacity-40"
          sizes="100vw"
          quality={85}
        />
        {/* Solid overlay for contrast — no gradient */}
        <div className="absolute inset-0 bg-navy/70" aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-44 sm:pt-36 sm:pb-44 lg:pt-40 lg:pb-44 w-full flex flex-col">
      

        {/* Main Heading */}
        <h1
          className="font-heading font-extrabold text-white leading-tight max-w-5xl"
          style={{
            fontSize: "clamp(2.5rem, 6vw + 1rem, 5rem)",
          }}
        >
          {hero.headline}<br />
          <span className="text-coral">{hero.highlightedText}</span>
        </h1>

        {/* Bottom Row: CTA (Left) & Subheading (Right) */}
        <div className="mt-12 sm:mt-16 lg:mt-20 w-full flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10">
          
          {/* Left Side: Get a Quote Link */}
          <div className="lg:w-1/3 flex items-start">
            <Link
              href="#contact"
              className="group inline-flex items-center text-white font-bold text-lg sm:text-xl hover:text-coral transition-colors duration-300"
            >
              {hero.ctaText}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-3 transition-transform duration-300 group-hover:translate-x-2"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>

          {/* Right Side: Subheading */}
          <div className="lg:w-1/2 flex lg:justify-end">
            <p
              className="text-gray-300 leading-relaxed max-w-lg lg:text-left"
              style={{
                fontSize: "clamp(1rem, 1.5vw + 0.25rem, 1.125rem)",
              }}
            >
              {hero.subheading}
            </p>
          </div>
          
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2">
        <span className="text-xs text-gray-500 tracking-widest uppercase">
          Scroll
        </span>
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2.5 bg-coral rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
