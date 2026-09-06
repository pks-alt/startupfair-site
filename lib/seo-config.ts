/** Public configuration only. No credentials, visitor data or tracking identifiers. */
export const SITE_ORIGIN = "https://www.startupfair.org";
export const SITE_NAME = "StartupFair";
// Keep false until forms, policies, challenge details and production hosting pass launch review.
export const SEARCH_LAUNCH_APPROVED: boolean = false;
// Company page supplied by StartupFair's owner; omit /home/ and member-view parameters.
export const LINKEDIN_COMPANY_URL: string | null = "https://www.linkedin.com/company/startupfair/";
export const SOCIAL_CHANNELS = ["linkedin"] as const;
export const SHARE_IMAGE = {
  path: "/startupfair-hero-global-ai.png",
  width: 1672,
  height: 941,
  alt: "StartupFair global team collaborating on practical AI and innovation challenges",
} as const;
export function linkedinShareUrl(path = "/"): string {
  const safePath = path.startsWith("/") && !path.startsWith("//") ? path.split(/[?#]/)[0] : "/";
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(SITE_ORIGIN + safePath)}`;
}
export function verifiedLinkedinUrl(): string | null {
  if (!LINKEDIN_COMPANY_URL) return null;
  try {
    const url = new URL(LINKEDIN_COMPANY_URL);
    return url.protocol === "https:" && url.hostname === "www.linkedin.com" && /^\/company\/[A-Za-z0-9_-]+\/?$/.test(url.pathname) && !url.search && !url.hash
      ? url.href : null;
  } catch { return null; }
}
