import type { MetadataRoute } from "next";
import { CAMPAIGNS, NEWS, PUBLICATIONS } from "@/lib/data";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://drrodas.org";
  const pages = ["", "/about", "/publications", "/news", "/museum-project", "/campaigns", "/donate", "/transparency", "/contact"];
  return [
    ...pages.map((p) => ({ url: `${base}${p}`, lastModified: new Date("2026-10-23") })),
    ...CAMPAIGNS.map((c) => ({ url: `${base}/campaigns/${c.slug}`, lastModified: new Date("2026-10-23") })),
    ...PUBLICATIONS.map((p) => ({ url: `${base}/publications/${p.slug}`, lastModified: new Date("2026-10-23") })),
    ...NEWS.map((a) => ({ url: `${base}/news/${a.slug}`, lastModified: new Date("2026-10-23") })),
  ];
}
