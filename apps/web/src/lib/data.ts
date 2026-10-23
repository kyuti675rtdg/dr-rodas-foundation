
// DEVELOPMENT SEED DATA — mirrors apps/api/database/seeders/DatabaseSeeder.php.
// Used for local preview when the Laravel API is not configured. It is NOT production
// financial data. Live figures always come from the API (confirmed donations only).
export type Campaign = {
  slug: string; title: string; summary: string; description: string; purpose: string;
  category: string; categoryName: string; target: number; raised: number; donors: number;
  currency: string; deadline: string; featured?: boolean; hue: string;
};
export const CAMPAIGNS: Campaign[] = [
  { slug: "preserve-the-collection", title: "Preserve the Permanent Collection",
    summary: "Conservation treatment, climate-safe storage and restoration for at-risk objects in the permanent collection.",
    description: "Many of the museum's most significant objects need specialist conservation: stabilising fragile textiles, treating corroded metalwork, and re-housing manuscripts in climate-safe storage. This campaign funds conservators, archival materials and monitoring equipment, itemised in the campaign budget published on the transparency page.",
    purpose: "Preservation & Restoration", category: "preservation", categoryName: "Preservation & Restoration",
    target: 250000, raised: 0, donors: 0, currency: "USD", deadline: "2027-06-30", featured: true, hue: "from-navy via-[#1B2452] to-navy" },
  { slug: "learning-lab-for-schools", title: "Learning Lab for Schools",
    summary: "A hands-on learning lab giving school groups free access to history, art and science programs.",
    description: "The Learning Lab will host free curriculum-linked sessions for school groups: object handling, storytelling, art workshops and science demonstrations, with transport support for under-resourced schools.",
    purpose: "Education & Learning", category: "education", categoryName: "Education & Learning",
    target: 85000, raised: 0, donors: 0, currency: "USD", deadline: "2027-03-31", featured: true, hue: "from-emerald-950 via-[#1B2452] to-navy" },
  { slug: "digitize-the-archives", title: "Digitize the Archives",
    summary: "Digitizing photographs, manuscripts and recordings so the archive can be explored from anywhere.",
    description: "Thousands of photographs, manuscripts and audio recordings exist only on fragile physical media. This campaign funds scanners, cataloguing staff and a public online archive so researchers and families worldwide can explore the collection.",
    purpose: "Collections & Archives", category: "collections", categoryName: "Collections & Archives",
    target: 120000, raised: 0, donors: 0, currency: "USD", deadline: "2027-09-30", hue: "from-indigo-950 via-[#1B2452] to-navy" },
];
export const CATEGORIES = [
  { slug: "preservation", name: "Preservation & Restoration" }, { slug: "exhibitions", name: "Exhibitions & Galleries" },
  { slug: "education", name: "Education & Learning" }, { slug: "collections", name: "Collections & Archives" },
  { slug: "community", name: "Community & Outreach" }, { slug: "research", name: "Research" }, { slug: "capital", name: "Capital Development" },
];
export const DESIGNATIONS = ["general","preservation","exhibitions","education","collections","community","research","capital"] as const;
// Payment methods are listed for architecture completeness. NONE is active until its
// gateway is verified (see docs/PAYMENT-SETUP-CHECKLIST.md). The UI must never show
// an unverified method as available.
export const PAYMENT_METHODS = [
  { id: "visa", label: "Visa", group: "Card", status: "not_activated" },
  { id: "mastercard", label: "Mastercard", group: "Card", status: "not_activated" },
  { id: "apple_pay", label: "Apple Pay", group: "Wallet", status: "not_activated" },
  { id: "google_pay", label: "Google Pay", group: "Wallet", status: "not_activated" },
  { id: "wechat_pay", label: "WeChat Pay", group: "Wallet", status: "not_activated" },
  { id: "telebirr", label: "Telebirr", group: "Ethiopia", status: "not_activated" },
  { id: "cbe_birr", label: "CBE Birr", group: "Ethiopia", status: "not_activated" },
  { id: "arifpay", label: "ArifPay", group: "Ethiopia", status: "not_activated" },
] as const;
export const UPDATES = [
  { id: 1, campaign: "Preserve the Permanent Collection", date: "Seed update", title: "Campaign pages prepared for foundation review",
    body: "This is a development seed update. The foundation will publish verified progress reports, conservation notes and photo documentation here once campaigns are approved for launch." },
];
export const money = (n: number, c = "USD") => new Intl.NumberFormat("en-US", { style: "currency", currency: c, maximumFractionDigits: 0 }).format(n);
export const progress = (c: Campaign) => (c.target > 0 ? Math.min(100, Math.round((c.raised / c.target) * 1000) / 10) : 0);
