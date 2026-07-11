"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const DEFAULT_PROJECTS = [
  {
    _id: "default-1",
    title: "StyleVault E-Commerce",
    category: "E-Commerce",
    description: "A premium fashion e-commerce platform with seamless checkout, inventory management, and mobile-first design.",
    image: null as string | null,
    alt: "E-commerce web design portfolio Kochi — StyleVault online fashion store",
  },
  {
    _id: "default-2",
    title: "Kerala Pearl Restaurant",
    category: "Web Design",
    description: "A luxurious restaurant website with online reservations, menu showcase, and Kerala cuisine storytelling.",
    image: null,
    alt: "Restaurant website design Kochi — Kerala Pearl dining experience",
  },
  {
    _id: "default-3",
    title: "HomesKerala Realty",
    category: "Web Development",
    description: "A full-featured real estate platform with property listings, map integration, and lead capture for Kerala properties.",
    image: null,
    alt: "Real estate web development Kochi — HomesKerala property listings",
  },
  {
    _id: "default-4",
    title: "EliteFit Gym",
    category: "Web Design",
    description: "A bold, high-energy fitness website with membership management, workout plans, and trainer profiles.",
    image: null,
    alt: "Fitness website design portfolio Kochi — EliteFit gym platform",
  },
  {
    _id: "default-5",
    title: "CareFirst Clinic",
    category: "Web Development",
    description: "A professional healthcare portal with appointment booking, doctor profiles, and patient resources.",
    image: null,
    alt: "Healthcare web design Kochi — CareFirst clinic appointment system",
  },
  {
    _id: "default-6",
    title: "Explore Kerala Travel",
    category: "SEO & Web Design",
    description: "A travel agency website with tour packages, booking engine, and SEO-optimized content driving organic traffic.",
    image: null,
    alt: "Travel agency website design Kerala — Explore Kerala tour packages",
  },
];

// Default images map (used when image field is null)
const DEFAULT_IMAGES: Record<string, string> = {
  "StyleVault E-Commerce": "/images/portfolio-ecommerce.png",
  "Kerala Pearl Restaurant": "/images/portfolio-restaurant.png",
  "HomesKerala Realty": "/images/portfolio-realestate.png",
  "EliteFit Gym": "/images/portfolio-fitness.png",
  "CareFirst Clinic": "/images/portfolio-healthcare.png",
  "Explore Kerala Travel": "/images/portfolio-travel.png",
};

interface PortfolioProject {
  _id: string;
  title: string;
  category: string;
  description: string;
  image: string | null;
  alt?: string;
  order?: number;
}

interface PortfolioProps {
  data?: PortfolioProject[] | null;
}

export default function Portfolio({ data }: PortfolioProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const projects = data?.length ? data : DEFAULT_PROJECTS;

  // If expanded, show all projects.
  // If not expanded, we render up to 6 projects so desktop shows 6.
  const visibleProjects = isExpanded ? projects : projects.slice(0, 6);

  return (
    <section id="portfolio" className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="inline-block px-3 py-1 bg-coral/10 text-coral text-xs sm:text-sm font-semibold rounded-full tracking-wide uppercase mb-3">
            Our Work
          </span>
          <h2
            className="font-heading font-bold text-navy"
            style={{
              fontSize: "clamp(1.5rem, 3vw + 0.5rem, 2.5rem)",
            }}
          >
            Projects We&apos;re Proud Of
          </h2>
          <p className="mt-3 text-gray-500 text-sm sm:text-base max-w-lg mx-auto">
            A selection of websites and digital products we&apos;ve built for
            businesses across Kochi and Kerala.
          </p>
        </div>

        {/* Portfolio grid — 1 col mobile → 2 col tablet → 3 col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {visibleProjects.map((project, index) => {
            const imgSrc =
              project.image ||
              DEFAULT_IMAGES[project.title] ||
              "/images/portfolio-ecommerce.png";

            // Hide the 4th, 5th, and 6th items on mobile if not expanded
            const isHiddenOnMobile = !isExpanded && index >= 3;

            return (
              <div
                key={project._id}
                className={`group bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 ${
                  isHiddenOnMobile ? "hidden md:block" : ""
                }`}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <Image
                    src={imgSrc}
                    alt={project.alt || project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                  />
                  {/* Category badge */}
                  <span className="absolute top-3 left-3 px-3 py-1 bg-navy text-white text-xs font-medium rounded-full">
                    {project.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex flex-col h-[calc(100%-75%)] min-h-[220px]">
                  <h3 className="font-heading font-bold text-navy text-base sm:text-lg mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-grow">
                    {project.description}
                  </p>
                  <Link
                    href="#contact"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-coral hover:text-coral-hover transition-colors duration-200 mt-auto min-h-[44px]"
                  >
                    View Case Study
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA & View More */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 sm:mt-14">
          {projects.length > 3 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center justify-center px-7 py-3.5 border-2 border-navy text-navy hover:bg-navy hover:text-white font-semibold rounded-lg transition-colors duration-200 text-sm sm:text-base min-h-[48px] w-full sm:w-auto"
            >
              {isExpanded ? "Show Less Projects" : "View More Projects"}
            </button>
          )}
          <Link
            href="#contact"
            className="inline-flex items-center justify-center px-7 py-3.5 bg-navy hover:bg-navy-light text-white font-semibold rounded-lg transition-colors duration-200 text-sm sm:text-base min-h-[48px] shadow-md w-full sm:w-auto"
          >
            Start Your Project With Us
          </Link>
        </div>
      </div>
    </section>
  );
}
