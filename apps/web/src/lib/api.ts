
// Typed client for the Laravel API (apps/api, /api/v1). When NEXT_PUBLIC_API_URL is
// not set, callers fall back to the labelled seed data in ./data.
export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";
export type ApiCampaign = { id: number; slug: string; title: string; summary: string | null; target_amount: string; raised_amount: string; progress_percent: number; donor_count: number; currency: string | null; status: string; deadline: string | null; category_name: string | null };
async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, { headers: { Accept: "application/json" }, next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`API ${res.status}`);
  return res.json() as Promise<T>;
}
export const api = {
  campaigns: () => get<{ data: { data: ApiCampaign[] } }>("/api/v1/campaigns"),
  paymentMethods: () => get<{ data: { method: string; provider: string; mode: string }[] }>("/api/v1/payment-methods"),
  transparency: () => get<{ data: unknown }>("/api/v1/transparency"),
};
export async function initiateDonation(payload: Record<string, unknown>) {
  if (!API_URL) return { state: "preview_mode", message: "Preview mode: the API is not configured, so no donation was recorded and no payment was attempted." };
  const res = await fetch(`${API_URL}/api/v1/donations`, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(payload) });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json?.message ?? `Donation failed (${res.status})`);
  return json.data as { reference: string; status: string; payment: { state: string; message?: string; checkout_url?: string } };
}
