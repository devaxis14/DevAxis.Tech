const TESTIMONIALS = [
  {
    name: "Rahul Krishnan",
    role: "CEO, HomesKerala Realty",
    quote:
      "DevAxis completely transformed our online presence. Our lead generation has increased by 300% since the new website launched. Their understanding of what Kochi businesses need is unmatched.",
    rating: 5,
    initials: "RK",
    bgColor: "bg-navy",
  },
  {
    name: "Sneha George",
    role: "Founder, StyleVault",
    quote:
      "From the first call to launch day, the DevAxis team was incredible. Our e-commerce store is beautiful, fast, and our customers love the shopping experience. Revenue is up 150%.",
    rating: 5,
    initials: "SG",
    bgColor: "bg-coral",
  },
  {
    name: "Dr. Anil Kumar",
    role: "Director, CareFirst Clinic",
    quote:
      "We needed a professional healthcare website with online booking, and DevAxis delivered beyond expectations. Patient appointments through the website have doubled in just 3 months.",
    rating: 5,
    initials: "AK",
    bgColor: "bg-navy-mid",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={i < rating ? "#E8553A" : "#E8E8E5"}
          aria-hidden="true"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="inline-block px-3 py-1 bg-coral/10 text-coral text-xs sm:text-sm font-semibold rounded-full tracking-wide uppercase mb-3">
            Testimonials
          </span>
          <h2
            className="font-heading font-bold text-navy"
            style={{
              fontSize: "clamp(1.5rem, 3vw + 0.5rem, 2.5rem)",
            }}
          >
            What Our Clients Say
          </h2>
          <p className="mt-3 text-gray-500 text-sm sm:text-base max-w-lg mx-auto">
            Don&apos;t just take our word for it — hear from businesses in Kochi
            and Kerala who trust DevAxis.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-warm-gray50 rounded-xl p-6 sm:p-7 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
            >
              {/* Quote icon */}
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="#E8553A"
                className="opacity-20 mb-4"
                aria-hidden="true"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11h4v10H0z" />
              </svg>

              {/* Stars */}
              <StarRating rating={testimonial.rating} />

              {/* Quote */}
              <blockquote className="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed flex-1">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="mt-6 flex items-center gap-3 pt-5 border-t border-gray-200">
                <div
                  className={`w-11 h-11 rounded-full ${testimonial.bgColor} flex items-center justify-center text-white font-heading font-bold text-sm flex-shrink-0`}
                >
                  {testimonial.initials}
                </div>
                <div>
                  <p className="font-heading font-semibold text-navy text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google review badge */}
        <div className="mt-10 sm:mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="#E8553A"
                  aria-hidden="true"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
            <span className="font-heading font-bold text-navy text-lg">
              4.9/5
            </span>
          </div>
          <p className="text-sm text-gray-500">
            Rated on Google Reviews • 25+ Reviews
          </p>
        </div>
      </div>
    </section>
  );
}
