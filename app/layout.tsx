import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://devaxis.in";
const COMPANY_NAME = "DevAxis";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `Web Design Company in Kochi, Kerala | ${COMPANY_NAME}`,
    template: `%s | ${COMPANY_NAME}`,
  },
  description:
    "DevAxis is a leading web design company in Kochi, Kerala. We craft stunning websites, e-commerce stores, and SEO strategies that grow your business.",
  keywords: [
    "web design Kochi",
    "web development Kerala",
    "web design company Kochi",
    "website design Kochi",
    "ecommerce development Kochi",
    "SEO services Kochi",
    "web agency Kerala",
  ],
  authors: [{ name: COMPANY_NAME }],
  creator: COMPANY_NAME,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: COMPANY_NAME,
    title: `Web Design Company in Kochi, Kerala | ${COMPANY_NAME}`,
    description:
      "DevAxis is a leading web design company in Kochi, Kerala. We craft stunning websites, e-commerce stores, and SEO strategies that grow your business.",
    images: [
      {
        url: `${SITE_URL}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: "DevAxis — Web Design Company in Kochi, Kerala",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Web Design Company in Kochi, Kerala | ${COMPANY_NAME}`,
    description:
      "DevAxis is a leading web design company in Kochi, Kerala. We craft stunning websites, e-commerce stores, and SEO strategies.",
    images: [`${SITE_URL}/images/og-image.png`],
  },
  alternates: {
    canonical: SITE_URL,
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

/* JSON-LD Structured Data — LocalBusiness + ProfessionalService */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  name: COMPANY_NAME,
  image: `${SITE_URL}/images/og-image.png`,
  "@id": SITE_URL,
  url: SITE_URL,
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
        {/* Tailwind CSS via CDN */}
        <script src="https://cdn.tailwindcss.com"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              tailwind.config = {
                theme: {
                  extend: {
                    colors: {
                      navy: { DEFAULT: '#0A1628', light: '#132038', mid: '#1A2A45' },
                      coral: { DEFAULT: '#E8553A', hover: '#D14A32' },
                      warm: { white: '#FAFAF8', gray50: '#F5F5F3', gray100: '#E8E8E5' },
                    },
                    fontFamily: {
                      sans: ['Inter', 'sans-serif'],
                      heading: ['Outfit', 'sans-serif'],
                    },
                  },
                },
              }
            `,
          }}
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
