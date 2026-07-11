import type { Metadata } from "next";
import { getSeoSettings } from "./lib/api";
import "./globals.css";

const DEFAULT_COMPANY_NAME = "DevAxis";
const DEFAULT_SITE_URL = "https://devaxistechnologies.in";

export async function generateMetadata(): Promise<Metadata> {
  // Fetch SEO settings from the Express API
  const seo = await getSeoSettings();

  const siteUrl = seo?.canonicalUrl || DEFAULT_SITE_URL;
  const companyName = seo?.siteName || DEFAULT_COMPANY_NAME;
  const pageTitle = seo?.defaultTitle || `DevAxis Technology`;
  const titleTemplate = seo?.titleTemplate || `%s | ${companyName}`;
  const metaDescription =
    seo?.defaultDescription ||
    "DevAxis is a leading web design company in Kochi, Kerala. We craft stunning websites, e-commerce stores, and SEO strategies that grow your business.";
  
  // Convert comma-separated string back to array if needed, Next.js accepts both
  const keywords = seo?.defaultKeywords || [
    "web design Kochi",
    "web development Kerala",
    "web design company Kochi",
    "website design Kochi",
    "ecommerce development Kochi",
    "SEO services Kochi",
    "web agency Kerala",
  ];
  const rawOgImage = seo?.ogImage || `/images/devaxis-logo.png`;
  const ogImage = rawOgImage.startsWith("http")
    ? rawOgImage
    : `${siteUrl}${rawOgImage.startsWith("/") ? "" : "/"}${rawOgImage}`;
  const googleSiteVerification = seo?.googleSiteVerification || undefined;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: pageTitle,
      template: titleTemplate,
    },
    description: metaDescription,
    keywords: keywords,
    authors: [{ name: companyName }],
    creator: companyName,
    verification: {
      google: googleSiteVerification,
    },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: siteUrl,
      siteName: companyName,
      title: pageTitle,
      description: metaDescription,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${companyName} — Web Design Company`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: metaDescription,
      images: [ogImage],
    },
    alternates: {
      canonical: siteUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

/* JSON-LD Structured Data — LocalBusiness + ProfessionalService */
// To make this fully dynamic we can also pass props, but for now we'll keep the core schema static 
// since it relies on specific local business details that aren't fully CMS managed yet.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  name: DEFAULT_COMPANY_NAME,
  image: `${DEFAULT_SITE_URL}/images/og-image.png`,
  "@id": DEFAULT_SITE_URL,
  url: DEFAULT_SITE_URL,
  telephone: "+91-9876543210",
  email: "hello@devaxis.in",
  address: {
    "@type": "PostalAddress",
    streetAddress: "2nd Floor, Skyline Tower, Marine Drive",
    addressLocality: "Kochi",
    addressRegion: "Kerala",
    postalCode: "682031",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 9.9312,
    longitude: 76.2673,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "10:00",
      closes: "14:00",
    },
  ],
  priceRange: "₹₹",
  sameAs: [
    "https://www.facebook.com/devaxis",
    "https://www.instagram.com/devaxis",
    "https://www.linkedin.com/company/devaxis",
    "https://twitter.com/devaxis",
  ],
  description:
    "DevAxis is a premier web design and development company based in Kochi, Kerala. We specialize in custom website design, e-commerce solutions, and search engine optimization.",
  areaServed: {
    "@type": "City",
    name: "Kochi",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Web Design Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Web Design",
          description: "Custom website design for businesses in Kochi and Kerala",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Web Development",
          description: "Full-stack web application development",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "E-Commerce Development",
          description: "Online store design and development",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "SEO Services",
          description: "Search engine optimization for local and national rankings",
        },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts via CDN */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans text-gray-800 bg-warm-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
