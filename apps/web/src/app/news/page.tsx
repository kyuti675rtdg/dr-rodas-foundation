import type { Metadata } from "next";
import NewsClient from "./NewsClient";
export const metadata: Metadata = {
  title: "News",
  description: "Dr. Rodas Foundation news: announcements, Museum Project updates, fundraising campaigns, research and publications, cultural heritage events, educational programs and partnerships.",
  openGraph: { title: "News · Dr. Rodas Foundation", description: "Verified foundation news and Museum Project updates.", images: ["/logo.png"] },
};
export default function NewsPage() { return <NewsClient />; }
