
import type { MetadataRoute } from "next";
import { CAMPAIGNS } from "@/lib/data";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const pages = ["", "/about", "/campaigns", "/donate", "/transparency", "/updates", "/contact"];
  return [...pages.map((p) => ({ url: `${base}${p}`, lastModified: new Date('2026-10-23') })),
    ...CAMPAIGNS.map((c) => ({ url: `${base}/campaigns/${c.slug}`, lastModified: new Date('2026-10-23') }))];
}
