import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog — Web Design Tips & Digital Marketing Insights",
  description:
    "Expert web design tips, SEO strategies, and digital marketing insights from DevAxis, Kochi. Stay updated with the latest web trends in Kerala.",
  alternates: {
    canonical: "https://devaxis.in/blog",
  },
};

export default function BlogPage() {
  return (
    <>
      <main className="min-h-screen bg-warm-white pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16 sm:py-24">
            <span className="inline-block px-3 py-1 bg-coral/10 text-coral text-xs sm:text-sm font-semibold rounded-full tracking-wide uppercase mb-4">
              Coming Soon
            </span>
            <h1
              className="font-heading font-bold text-navy"
              style={{
                fontSize: "clamp(1.75rem, 4vw + 0.5rem, 3rem)",
              }}
            >
              Our Blog
            </h1>
            <p className="mt-4 text-gray-500 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
              We&apos;re working on insightful articles about web design, SEO,
              and digital marketing for businesses in Kochi and Kerala. Check
              back soon!
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center mt-8 px-6 py-3 bg-navy hover:bg-navy-light text-white font-semibold rounded-lg transition-colors duration-200 text-sm min-h-[44px]"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
