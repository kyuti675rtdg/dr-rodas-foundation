import type { Metadata } from "next";
import PublicationsClient from "./PublicationsClient";
export const metadata: Metadata = {
  title: "Publications",
  description: "The Dr. Rodas Foundation digital library: approved works on Ge'ez language, manuscripts, Ethiopian history, Gematria, astronomy, philosophy and cultural heritage.",
  openGraph: { title: "Publications · Dr. Rodas Foundation", description: "A searchable digital library of approved foundation publications.", images: ["/logo.png"] },
};
export default function PublicationsPage() { return <PublicationsClient />; }
