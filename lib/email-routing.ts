/** Approved StartupFair recipients. This map does NOT enable email delivery. */
export const EMAIL_ROUTES = Object.freeze({
  general: "hello@startupfair.org",
  challenges: "challenges@startupfair.org",
  talent: "talent@startupfair.org",
  partners: "partners@startupfair.org",
} as const);

export type EmailCategory = keyof typeof EMAIL_ROUTES;

export const INQUIRY_OPTIONS = [
  { label: "Launching a Challenge", category: "challenges" },
  { label: "Applying to a Challenge", category: "challenges" },
  { label: "Joining as Talent", category: "talent" },
  { label: "Hiring or Requesting Talent", category: "talent" },
  { label: "Partnership", category: "partners" },
  { label: "Investment or Venture Opportunity", category: "general" },
  { label: "General Inquiry", category: "general" },
] as const satisfies readonly { label: string; category: EmailCategory }[];

/** Unknown/general inquiries stay with hello@, never an arbitrary recipient. */
export function categoryForInterest(interest: string): EmailCategory {
  return INQUIRY_OPTIONS.find(option => option.label === interest)?.category ?? "general";
}

/** Explicit path families, including every multi-step form, share one recipient. */
export function categoryForPath(pathname: string): EmailCategory {
  const path = pathname.split(/[?#]/, 1)[0].replace(/^\/+|\/+$/g, "");
  const family = path.split("/", 1)[0];
  if (family === "apply" || family === "challenges" || family === "launch-challenge") return "challenges";
  if (family === "talent-profile" || family === "find-talent" || family === "for-talent") return "talent";
  if (family === "partner-inquiry" || family === "partners") return "partners";
  return "general";
}
