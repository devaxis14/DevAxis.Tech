import Link from "next/link";

const DEFAULT_FOOTER = {
  tagline: "Crafting exceptional digital experiences for businesses in Kochi, Kerala and beyond since 2019.",
  socialLinks: {
    facebook: "https://www.facebook.com/devaxis",
    instagram: "https://www.instagram.com/devaxis",
    linkedin: "https://www.linkedin.com/company/devaxis",
    twitter: "https://twitter.com/devaxis",
  },
};

const DEFAULT_CONTACT = {
  phone: "+91 98765 43210",
  email: "hello@devaxis.in",
  whatsappNumber: "919876543210",
  whatsappMessage: "Hi DevAxis, I'm interested in your web design services.",
  address: {
    line1: "2nd Floor, Skyline Tower,",
    line2: "Marine Drive, Kochi,",
    line3: "Kerala 682031, India",
  },
};

const QUICK_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "About Us", href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
];

const SERVICES = [
  "Web Design",
  "Web Development",
  "E-Commerce Solutions",
  "SEO Services",
];

// SVG Icons for social media
const SOCIAL_ICONS = {
  facebook: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  instagram: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  ),
  linkedin: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  twitter: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
};

interface FooterProps {
  data?: {
    tagline?: string;
    socialLinks?: {
      facebook?: string;
      instagram?: string;
      linkedin?: string;
      twitter?: string;
    };
  } | null;
  contactInfo?: {
    phone?: string;
    email?: string;
    whatsappNumber?: string;
    whatsappMessage?: string;
    address?: { line1?: string; line2?: string; line3?: string };
  } | null;
}

export default function Footer({ data, contactInfo }: FooterProps) {
  const footer = {
    tagline: data?.tagline || DEFAULT_FOOTER.tagline,
    socialLinks: {
      ...DEFAULT_FOOTER.socialLinks,
      ...data?.socialLinks,
    },
  };

  const contact = {
    phone: contactInfo?.phone || DEFAULT_CONTACT.phone,
    email: contactInfo?.email || DEFAULT_CONTACT.email,
    whatsappNumber: contactInfo?.whatsappNumber || DEFAULT_CONTACT.whatsappNumber,
    whatsappMessage: contactInfo?.whatsappMessage || DEFAULT_CONTACT.whatsappMessage,
    address: {
      line1: contactInfo?.address?.line1 || DEFAULT_CONTACT.address.line1,
      line2: contactInfo?.address?.line2 || DEFAULT_CONTACT.address.line2,
      line3: contactInfo?.address?.line3 || DEFAULT_CONTACT.address.line3,
    },
  };

  const phoneHref = `tel:${contact.phone.replace(/\s/g, "")}`;
  const whatsappUrl = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
    contact.whatsappMessage
  )}`;

  return (
    <footer className="bg-navy text-gray-400" role="contentinfo">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1 — Brand + NAP */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <span className="w-8 h-8 rounded-lg bg-coral flex items-center justify-center flex-shrink-0">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 32 32"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4 6h6c5.523 0 10 4.477 10 10s-4.477 10-10 10H4V6z"
                    stroke="white"
                    strokeWidth="2.5"
                    fill="none"
                  />
                  <path
                    d="M18 26l6-16 6 16M20.5 20h7"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </span>
              <span className="font-heading font-bold text-white text-lg tracking-tight">
                Dev<span className="text-coral">Axis</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-4">
              {footer.tagline}
            </p>

            {/* NAP — Name, Address, Phone (must match Google Business Profile) */}
            <address className="not-italic text-sm space-y-1">
              <p className="text-white font-medium">DevAxis</p>
              <p>{contact.address.line1}</p>
              <p>{contact.address.line2}</p>
              <p>{contact.address.line3}</p>
              <p className="mt-2">
                <a
                  href={phoneHref}
                  className="hover:text-white transition-colors"
                >
                  {contact.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${contact.email}`}
                  className="hover:text-white transition-colors"
                >
                  {contact.email}
                </a>
              </p>
            </address>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h3 className="text-white font-heading font-semibold text-base mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors duration-200 inline-flex items-center min-h-[32px]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Services */}
          <div>
            <h3 className="text-white font-heading font-semibold text-base mb-4">
              Our Services
            </h3>
            <ul className="space-y-2">
              {SERVICES.map((service) => (
                <li key={service}>
                  <Link
                    href="#services"
                    className="text-sm hover:text-white transition-colors duration-200 inline-flex items-center min-h-[32px]"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Social + WhatsApp */}
          <div>
            <h3 className="text-white font-heading font-semibold text-base mb-4">
              Connect With Us
            </h3>
            <div className="flex gap-3 mb-6">
              {Object.entries(footer.socialLinks).map(([platform, url]) => {
                if (!url) return null;
                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-white/5 hover:bg-coral flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 border border-white/10"
                    aria-label={`Visit our ${platform} page`}
                  >
                    {SOCIAL_ICONS[platform as keyof typeof SOCIAL_ICONS]}
                  </a>
                );
              })}
            </div>

            {/* WhatsApp CTA */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 min-h-[44px]"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500 text-center sm:text-left">
            © {new Date().getFullYear()} DevAxis. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-gray-500">
            <Link href="#" className="hover:text-gray-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
