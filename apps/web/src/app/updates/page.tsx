import { redirect } from "next/navigation";
// Campaign updates now live in the News section (master prompt, 2026-10-23).
export default function Updates() { redirect("/news"); }
