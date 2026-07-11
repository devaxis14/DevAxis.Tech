import { MetadataRoute } from "next";
import { getSeoSettings } from "./lib/api";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const seo = await getSeoSettings();
  const baseUrl = seo?.canonicalUrl || "https://devaxistechnologies.in";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
