import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://drrodas.org";
  return { rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/donor"] }, sitemap: `${base}/sitemap.xml` };
}
