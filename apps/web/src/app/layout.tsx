import type { Metadata } from "next";
import { Fraunces, Inter, Noto_Sans_Ethiopic } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], style: ["normal", "italic"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const notoEthiopic = Noto_Sans_Ethiopic({ variable: "--font-noto-ethiopic", subsets: ["ethiopic"], weight: ["400", "700"], display: "swap" });
export const metadata: Metadata = {
  metadataBase: new URL("https://drrodas.org"),
  title: { default: "Dr. Rodas Foundation — Museum Fundraising", template: "%s · Dr. Rodas Foundation" },
  description: "Dr. Rodas Foundation: preserving Ethiopian cultural heritage, Ge'ez manuscripts and learning — home of the Dr. Rodas Museum Project. Give with published financial transparency.",
  openGraph: {
    title: "Dr. Rodas Foundation",
    description: "Preserve heritage. Inspire learning. Give with transparency.",
    type: "website",
    url: "https://drrodas.org",
    siteName: "Dr. Rodas Foundation",
    images: [{ url: "/logo.png", width: 1425, height: 1445, alt: "Dr. Rodas Foundation — official logo" }],
  },
  twitter: { card: "summary", title: "Dr. Rodas Foundation", description: "Preserve heritage. Inspire learning. Give with transparency.", images: ["/logo.png"] },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${notoEthiopic.variable}`}>
      <body className="flex min-h-screen flex-col antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:bg-white focus:px-4 focus:py-2">Skip to content</a>
        <Header /><main id="main" className="flex-1">{children}</main><Footer />
      </body>
    </html>
  );
}
