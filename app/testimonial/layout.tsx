import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Submit a Testimonial | DevAxis",
  description: "Share your experience working with DevAxis.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function TestimonialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
