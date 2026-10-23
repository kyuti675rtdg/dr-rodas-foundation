
import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
export const metadata: Metadata = {
  title: { default: "Dr. Rodas Foundation — Museum Fundraising", template: "%s · Dr. Rodas Foundation Museum" },
  description: "Support the Dr. Rodas Foundation museum: preserve cultural heritage, fund exhibitions and education, and follow every donation with published financial transparency.",
  openGraph: { title: "Dr. Rodas Foundation Museum", description: "Preserve heritage. Inspire learning. Give with transparency.", type: "website" },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:bg-white focus:px-4 focus:py-2">Skip to content</a>
        <Header /><main id="main" className="flex-1">{children}</main><Footer />
      </body>
    </html>
  );
}
