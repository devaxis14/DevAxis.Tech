"use client";

import Image from "next/image";
import Link from "next/link";

const SERVICES = [
  {
    title: "Web Design",
    href: "#contact",
    image: "/images/service-webdesign.png",
    alt: "Web design service — laptop showing modern website mockup designed by DevAxis Kochi",
  },
  {
    title: "Web Development",
    href: "#contact",
    image: "/images/service-webdev.png",
    alt: "Web development service — code editor showing React components by DevAxis",
  },
  {
    title: "E-commerce Builds",
    href: "#contact",
    image: "/images/service-ecommerce.png",
    alt: "E-commerce development — mobile shopping app designed by DevAxis Kochi",
  },
  {
    title: "SEO & Growth",
    href: "#contact",
    image: "/images/service-seo.png",
    alt: "SEO and growth services — analytics dashboard showing website traffic growth",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="relative pt-16 pb-16 px-5 sm:pt-20 sm:pb-20 lg:pt-28 lg:pb-28 lg:px-10 overflow-hidden"
      style={{ backgroundColor: "#101828" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* ─── Left column: text content ─── */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 flex flex-col items-start pr-8">
            {/* Eyebrow */}
            <span
              className="text-xs sm:text-sm font-medium uppercase tracking-[0.2em]"
              style={{ color: "#98A2B3" }}
            >
              What We Offer
            </span>

            {/* Headline and Decorative dot container */}
            <div className="mt-4 relative w-full flex items-center justify-between">
              <h2
                className="font-serif font-bold text-white leading-[1.1] max-w-[280px] sm:max-w-sm"
                style={{
                  fontSize: "clamp(2rem, 3.5vw + 0.5rem, 3.25rem)",
                }}
              >
                Services we help you launch&nbsp;with
              </h2>

              {/* Decorative coral dot accent (positioned to the right of headline) */}
              <div
                className="hidden sm:flex flex-shrink-0 ml-4 w-12 h-12 rounded-full border border-[#E85D4C]/30 items-center justify-center"
                aria-hidden="true"
              >
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: "#E85D4C" }}
                />
              </div>
            </div>

            {/* See All Services link */}
            <Link
              href="#contact"
              className="group mt-8 sm:mt-12 inline-flex items-center gap-2 text-white font-medium text-base sm:text-lg hover:underline decoration-2 underline-offset-4 transition-all duration-200 min-h-[44px]"
              style={
                {
                  textDecorationColor: "transparent",
                  "--hover-decoration": "#E85D4C",
                } as React.CSSProperties
              }
              onMouseEnter={(e) => {
                (e.currentTarget.style.textDecorationColor as string) =
                  "#E85D4C";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget.style.textDecorationColor as string) =
                  "transparent";
              }}
            >
              See All Services
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>

          {/* ─── Right column: asymmetric masonry cards (4 columns) ─── */}
          {/* Mobile: 2-col staggered. Desktop: 4-col staggered. */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 items-start mt-10 lg:mt-0">
            {SERVICES.map((service, index) => {
              // Alternating stagger: down, top, down, top
              const isDown = index % 2 === 0;
              return (
                <div
                  key={service.title}
                  className={`${isDown ? "mt-0 md:mt-24" : "mt-0"}`}
                >
                  <Link
                    href={service.href}
                    aria-label={`View ${service.title} services`}
                    className="group relative block rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.05] focus-visible:ring-2 focus-visible:ring-offset-2"
                    style={
                      {
                        "--tw-ring-color": "#E85D4C",
                        "--tw-ring-offset-color": "#101828",
                      } as React.CSSProperties
                    }
                  >
                    {/* Taller aspect ratio on mobile so images are larger, square on desktop */}
                    <div className="relative w-full aspect-[3/4] sm:aspect-square">
                      <Image
                        src={service.image}
                        alt={service.alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 50vw, 25vw"
                        loading="lazy"
                      />
                      {/* Dark scrim overlay for text legibility */}
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)",
                        }}
                        aria-hidden="true"
                      />
                      {/* Coral dot marker — top-left */}
                      <span
                        className="absolute top-4 left-4 w-2 h-2 rounded-full"
                        style={{ backgroundColor: "#E85D4C" }}
                        aria-hidden="true"
                      />
                      {/* Coral border on hover */}
                      <div
                        className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#E85D4C] transition-colors duration-300 pointer-events-none"
                        aria-hidden="true"
                      />
                      {/* Title — bottom-left */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                        <h3 className="font-bold text-white text-base sm:text-lg leading-tight group-hover:text-[#E85D4C] transition-colors duration-200">
                          {service.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
