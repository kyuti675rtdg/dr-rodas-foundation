
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

// ---------------------------------------------------------------------------
// PUBLICATIONS — DEVELOPMENT SEED PLACEHOLDERS ONLY.
// No real book, paper or author is claimed here. Every entry is labelled as
// awaiting foundation approval; the foundation replaces these with verified
// publications (real titles, authors, dates, files) through the admin CMS /
// Laravel API (GET /api/v1/publications) before launch.
// ---------------------------------------------------------------------------
export type Publication = {
  slug: string; title: string; author: string; summary: string; body: string;
  category: string; topic: string; dateLabel: string; featured?: boolean;
  fileUrl?: string; // set ONLY when the foundation authorizes a download
  status: string;
};
const SEED_STATUS = "Development seed placeholder — awaiting foundation approval. Not a published foundation work.";
export const PUBLICATION_CATEGORIES = ["Ge'ez Language", "Manuscripts", "Ethiopian History", "Gematria & Numerical Traditions", "Astronomy & Calendars", "Philosophy", "Cultural Heritage"] as const;
export const PUBLICATIONS: Publication[] = [
  { slug: "seed-geez-language-studies", title: "Seed placeholder — Ge'ez language studies", author: "Author to be confirmed by the foundation", topic: "Ge'ez language",
    category: "Ge'ez Language", dateLabel: "Date to be confirmed", featured: true, status: SEED_STATUS,
    summary: "Placeholder entry for an approved work on the Ge'ez language. The foundation will supply the verified title, author and text before publication.",
    body: "This is a development seed placeholder. No publication is claimed here. Once the foundation approves a real work on Ge'ez language studies, its verified summary, author, date and — where authorized — its PDF will appear on this page." },
  { slug: "seed-manuscript-preservation", title: "Seed placeholder — manuscript preservation", author: "Author to be confirmed by the foundation", topic: "Manuscripts",
    category: "Manuscripts", dateLabel: "Date to be confirmed", featured: true, status: SEED_STATUS,
    summary: "Placeholder entry for an approved work on Ethiopian manuscript preservation and conservation practice.",
    body: "This is a development seed placeholder. No publication is claimed here. The foundation will replace it with a verified manuscript-preservation work, with its real author and date, before launch." },
  { slug: "seed-ethiopian-history", title: "Seed placeholder — Ethiopian history", author: "Author to be confirmed by the foundation", topic: "Ethiopian history",
    category: "Ethiopian History", dateLabel: "Date to be confirmed", status: SEED_STATUS,
    summary: "Placeholder entry for an approved work of Ethiopian historical research.",
    body: "This is a development seed placeholder. No historical claim is made here. Verified historical publications will be added by the foundation through the CMS." },
  { slug: "seed-gematria-traditions", title: "Seed placeholder — Gematria and numerical traditions", author: "Author to be confirmed by the foundation", topic: "Gematria",
    category: "Gematria & Numerical Traditions", dateLabel: "Date to be confirmed", featured: true, status: SEED_STATUS,
    summary: "Placeholder entry for an approved study of Gematria and historical numerical traditions, to be reviewed for accuracy before publication.",
    body: "This is a development seed placeholder. Interpretations of Gematria and numerical traditions must be reviewed for accuracy by the foundation before any real work is published here." },
  { slug: "seed-ethiopian-astronomy", title: "Seed placeholder — Ethiopian astronomy and calendars", author: "Author to be confirmed by the foundation", topic: "Astronomy",
    category: "Astronomy & Calendars", dateLabel: "Date to be confirmed", status: SEED_STATUS,
    summary: "Placeholder entry for an approved work on Ethiopian astronomy, cosmology, calendars and timekeeping.",
    body: "This is a development seed placeholder. No publication is claimed here. The foundation will supply verified work on Ethiopian astronomy and calendar traditions before launch." },
  { slug: "seed-philosophy-heritage", title: "Seed placeholder — philosophy and cultural heritage", author: "Author to be confirmed by the foundation", topic: "Philosophy & heritage",
    category: "Philosophy", dateLabel: "Date to be confirmed", status: SEED_STATUS,
    summary: "Placeholder entry for an approved work on philosophy and Ethiopian cultural heritage.",
    body: "This is a development seed placeholder. No publication is claimed here. Verified works on philosophy and cultural heritage will be published by the foundation through the CMS." },
];

// ---------------------------------------------------------------------------
// NEWS — DEVELOPMENT SEED ONLY. These entries explain the news system; they
// are NOT real foundation announcements, events, partnerships or milestones.
// Real news is published by authorized staff via the CMS / Laravel API
// (GET /api/v1/news, published articles only).
// ---------------------------------------------------------------------------
export type NewsArticle = {
  slug: string; title: string; subtitle: string; author: string; dateLabel: string;
  category: string; summary: string; body: string[]; featured?: boolean; status: string;
};
export const NEWS_CATEGORIES = ["Foundation Announcements", "Museum Project Updates", "Fundraising Campaigns", "Research and Publications", "Cultural Heritage and Events", "Educational Programs", "Community and Partnerships"] as const;
const NEWS_SEED_STATUS = "Development seed — not a real foundation announcement.";
export const NEWS: NewsArticle[] = [
  { slug: "seed-newsroom-explainer", title: "Seed article: how this newsroom will work", subtitle: "A development placeholder explaining the foundation's news workflow",
    author: "Foundation communications (to be confirmed)", dateLabel: "Development seed — no publication date", category: "Foundation Announcements", featured: true, status: NEWS_SEED_STATUS,
    summary: "This seed article explains how verified foundation news will be drafted, reviewed and published here. It is not an announcement.",
    body: [
      "This is a development seed article. It does not announce any event, partnership, milestone or result, and it must not be read as foundation news.",
      "When the foundation is ready, authorized staff will draft articles in the admin dashboard, assign a category and author, preview them, and publish or schedule them. Only approved, published articles appear on this page — the same published-only rule enforced by the Laravel API.",
      "Real articles will carry a verified publication date, an author, and links to related publications, campaigns and Museum Project updates where relevant.",
    ] },
  { slug: "seed-museum-project-updates-placeholder", title: "Seed article: Museum Project updates will appear here", subtitle: "A development placeholder for future verified project reporting",
    author: "Foundation communications (to be confirmed)", dateLabel: "Development seed — no publication date", category: "Museum Project Updates", status: NEWS_SEED_STATUS,
    summary: "A placeholder for future verified Museum Project reporting — confirmed plans, stages and milestones only, clearly separated from proposals.",
    body: [
      "This is a development seed article, not a project update. No milestone is claimed as completed here.",
      "Future Museum Project updates published in this section will distinguish confirmed, completed work from planned activities, and will link to the Museum Project page and its fundraising progress.",
    ] },
];

// ---------------------------------------------------------------------------
// MUSEUM FUNDING CATEGORIES — PROPOSED / SEED TABLE.
// Categories and targets are proposals for foundation approval, managed by
// foundation administrators. Raised is 0: totals count CONFIRMED donations
// only, and no payment gateway is active yet.
// ---------------------------------------------------------------------------
export type FundingCategory = { name: string; target: number; raised: number; currency: string; note: string };
export const FUNDING_CATEGORIES: FundingCategory[] = [
  { name: "Museum infrastructure", target: 600000, raised: 0, currency: "USD", note: "Proposed seed target — pending foundation approval" },
  { name: "Exhibition development", target: 250000, raised: 0, currency: "USD", note: "Proposed seed target — pending foundation approval" },
  { name: "Manuscript preservation", target: 180000, raised: 0, currency: "USD", note: "Proposed seed target — pending foundation approval" },
  { name: "Digital archives and technology", target: 150000, raised: 0, currency: "USD", note: "Proposed seed target — pending foundation approval" },
  { name: "Research and education", target: 120000, raised: 0, currency: "USD", note: "Proposed seed target — pending foundation approval" },
];
export const LAST_VERIFIED_UPDATE = "Development seed — no verified fundraising update has been published yet.";
