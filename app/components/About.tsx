const DEFAULT_ABOUT = {
  eyebrow: "About Us",
  headline: "Born in Kochi, Built for the Web",
  paragraphs: [
    'DevAxis was founded in 2019 by Arjun Menon and Priya Nair — two designers and developers who believed that businesses in Kerala deserved world-class digital experiences.',
    "What started as a two-person studio overlooking the Kochi backwaters has grown into a team of passionate creatives, engineers, and strategists. We\u2019ve since helped 50+ businesses — from Marine Drive startups to established brands across Kerala — build websites that don\u2019t just look beautiful, but drive real results.",
    "Our philosophy is simple: great design is invisible. When a website works so well that users don\u2019t even think about the interface — that\u2019s when we know we\u2019ve done our job.",
  ],
  founders: [
    { name: "Arjun Menon", title: "Co-Founder & Creative Director", initials: "AM" },
    { name: "Priya Nair", title: "Co-Founder & Tech Lead", initials: "PN" },
  ],
  stats: [
    { value: "50+", label: "Projects Completed" },
    { value: "40+", label: "Happy Clients" },
    { value: "5+", label: "Years in Business" },
    { value: "4.9★", label: "Google Rating" },
  ],
};

// SVG icons for stat cards
const STAT_ICONS = [
  <svg key="check" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E8553A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>,
  <svg key="users" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E8553A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>,
  <svg key="clock" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E8553A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
  <svg key="star" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E8553A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
];

interface AboutProps {
  data?: {
    eyebrow?: string;
    headline?: string;
    paragraphs?: string[];
    founders?: { name: string; title: string; initials: string }[];
    stats?: { value: string; label: string }[];
  } | null;
}

export default function About({ data }: AboutProps) {
  const about = {
    eyebrow: data?.eyebrow || DEFAULT_ABOUT.eyebrow,
    headline: data?.headline || DEFAULT_ABOUT.headline,
    paragraphs: data?.paragraphs?.length ? data.paragraphs : DEFAULT_ABOUT.paragraphs,
    founders: data?.founders?.length ? data.founders : DEFAULT_ABOUT.founders,
    stats: data?.stats?.length ? data.stats : DEFAULT_ABOUT.stats,
  };

  const founderColors = ["bg-navy", "bg-coral"];

  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 bg-warm-gray50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left — Story */}
          <div>
            <span className="inline-block px-3 py-1 bg-coral/10 text-coral text-xs sm:text-sm font-semibold rounded-full tracking-wide uppercase mb-3">
              {about.eyebrow}
            </span>
            <h2
              className="font-heading font-bold text-navy"
              style={{
                fontSize: "clamp(1.5rem, 3vw + 0.5rem, 2.5rem)",
              }}
            >
              {about.headline}
            </h2>
            <div className="mt-5 space-y-4 text-gray-600 text-sm sm:text-base leading-relaxed">
              {about.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Founders */}
            <div className="mt-8 flex flex-col sm:flex-row gap-6">
              {about.founders.map((founder, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-full ${founderColors[i % founderColors.length]} flex items-center justify-center text-white font-heading font-bold text-lg flex-shrink-0`}>
                    {founder.initials}
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-navy text-sm">
                      {founder.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {founder.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Stats / Values */}
          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            {about.stats.map((stat, i) => (
              <div key={i} className="bg-white rounded-xl p-5 sm:p-6 border border-gray-100 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-navy/5 flex items-center justify-center mb-3">
                  {STAT_ICONS[i % STAT_ICONS.length]}
                </div>
                <p className="font-heading font-bold text-navy text-2xl sm:text-3xl">
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
