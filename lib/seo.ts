import type { Metadata } from "next";
import { SITE_ORIGIN, SITE_NAME, SEARCH_LAUNCH_APPROVED, SHARE_IMAGE, verifiedLinkedinUrl } from "./seo-config";

type SeoPage = { title: string; description: string; label: string; eligible: boolean };
export const SEO_PAGES: Record<string, SeoPage> = {
  "/": { title: "StartupFair | AI Talent & Innovation Challenges", description: "Explore AI talent and innovation challenges connecting builders and organizations around real-world problems, practical work and venture discovery.", label: "Home", eligible: true },
  "/challenges": { title: "AI & Innovation Challenges | StartupFair", description: "Explore StartupFair challenges in healthcare AI, enterprise technology and marketing intelligence, with pathways for talent, innovation and venture discovery.", label: "Challenges", eligible: true },
  "/for-talent": { title: "AI Challenges for Talent & Builders | StartupFair", description: "Discover how to demonstrate your skills through practical AI challenges. Explore participation, work samples, recognition and talent opportunities.", label: "For Talent", eligible: true },
  "/for-organizations": { title: "AI Talent Discovery & Open Innovation | StartupFair", description: "Explore skills-based talent discovery and practical innovation challenges. Bring a business problem, discover capable builders and evaluate potential solutions.", label: "For Organizations", eligible: true },
  "/partners": { title: "Innovation & University Partnerships | StartupFair", description: "Explore StartupFair partnerships for companies, universities, mentors, technology providers and innovation communities supporting practical AI challenges.", label: "Partners", eligible: true },
  "/about": { title: "About StartupFair | Entrepreneurial Roots Since 2015", description: "Discover StartupFair's story, from entrepreneurial events in 2015 to AI talent and innovation challenges. Explore our purpose and historical event archive.", label: "About", eligible: true },
  "/contact": { title: "Contact StartupFair | Talent, Challenges & Partnerships", description: "Contact StartupFair about general inquiries, challenge proposals, talent and hiring requests, or partnerships. Find the right team for your conversation.", label: "Contact", eligible: true },
  "/challenges/ai-clinician-matching": { title: "AI Clinician Matching Challenge | StartupFair", description: "Explore the AI Clinician Matching Challenge concept, focused on explainable matching of healthcare professionals with suitable workforce opportunities.", label: "AI Clinician Matching", eligible: false },
  "/challenges/enterprise-ai-agent": { title: "Enterprise AI Agent Challenge | StartupFair", description: "Explore StartupFair's Enterprise AI Agent Challenge concept: practical business workflows, measurable outcomes, security and human oversight.", label: "Enterprise AI Agent", eligible: false },
  "/challenges/publisher-campaign-intelligence": { title: "Publisher Campaign Intelligence Challenge | StartupFair", description: "Explore the Publisher-to-Campaign Intelligence Challenge concept, connecting AI, publisher environments and practical marketing intelligence.", label: "Publisher Campaign Intelligence", eligible: false },
  "/privacy": { title: "Privacy Policy | StartupFair", description: "Review StartupFair's privacy-policy information covering personal information, profile visibility, sharing, retention and privacy inquiries.", label: "Privacy Policy", eligible: false },
  "/terms": { title: "Terms of Use | StartupFair", description: "Review StartupFair's website and participation terms, including platform use, responsibilities, intellectual property and relevant contact information.", label: "Terms of Use", eligible: false },
  "/challenge-rules": { title: "Challenge Rules | StartupFair", description: "Review StartupFair's challenge-rules information, including eligibility, submissions, evaluation, intellectual property and recognition.", label: "Challenge Rules", eligible: false },
  "/cookies": { title: "Cookie Policy | StartupFair", description: "Review StartupFair's cookie-policy information and contact the team with questions about website technologies and privacy.", label: "Cookie Policy", eligible: false },
};

export function cleanPath(path: string): string {
  const value = path.split(/[?#]/)[0];
  return value === "/" ? "/" : "/" + value.replace(/^\/+|\/+$/g, "");
}
export function canonicalFor(path: string): string | null {
  const key = cleanPath(path);
  return SEO_PAGES[key] ? SITE_ORIGIN + key : null;
}
export function indexingAllowed(path: string, requestHost: string, approved = SEARCH_LAUNCH_APPROVED): boolean {
  // A launch approval alone must never make localhost, Codespaces or a preview hostname indexable.
  return approved && requestHost.toLowerCase() === new URL(SITE_ORIGIN).hostname && Boolean(SEO_PAGES[cleanPath(path)]?.eligible);
}
function titleWords(value: string): string {
  return value.split("-").filter(Boolean).map(word => word[0].toUpperCase() + word.slice(1)).join(" ");
}
export function metadataFor(path: string, requestHost: string): Metadata {
  const key = cleanPath(path);
  const entry = SEO_PAGES[key];
  const parts = key.split("/").filter(Boolean);
  const title = entry?.title ?? `${parts.map(titleWords).join(" — ") || "Page"} | StartupFair`;
  const description = entry?.description ?? "StartupFair form and application workflow. This page is excluded from search indexing and is not a public talent profile.";
  const index = indexingAllowed(key, requestHost);
  const canonical = canonicalFor(key);
  return {
    title: { absolute: title }, description,
    alternates: { canonical },
    robots: { index, follow: Boolean(entry), googleBot: { index, follow: Boolean(entry), "max-image-preview": "large" } },
    ...(entry ? { openGraph: {
      type: "website", locale: "en_US", siteName: SITE_NAME, title, description,
      url: canonical!, images: [{ url: SITE_ORIGIN + SHARE_IMAGE.path, width: SHARE_IMAGE.width, height: SHARE_IMAGE.height, alt: SHARE_IMAGE.alt, type: "image/png" }],
    } } : {}),
  };
}
export function structuredDataFor(path: string) {
  const key = cleanPath(path); const entry = SEO_PAGES[key];
  if (!entry?.eligible) return null;
  const url = SITE_ORIGIN + key;
  const graph: Record<string, unknown>[] = [];
  if (key === "/") {
    const linkedin = verifiedLinkedinUrl();
    graph.push({ "@type": "Organization", "@id": SITE_ORIGIN + "/#organization", name: SITE_NAME, url: SITE_ORIGIN + "/", logo: SITE_ORIGIN + "/startupfair-logo.png", email: "hello@startupfair.org", description: entry.description, ...(linkedin ? { sameAs: [linkedin] } : {}) });
    graph.push({ "@type": "WebSite", "@id": SITE_ORIGIN + "/#website", name: SITE_NAME, url: SITE_ORIGIN + "/", publisher: { "@id": SITE_ORIGIN + "/#organization" } });
  }
  graph.push({ "@type": key === "/about" ? "AboutPage" : key === "/contact" ? "ContactPage" : "WebPage", "@id": url + "#webpage", url, name: entry.title, description: entry.description, isPartOf: { "@id": SITE_ORIGIN + "/#website" } });
  if (key !== "/") graph.push({ "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_ORIGIN + "/" }, { "@type": "ListItem", position: 2, name: entry.label, item: url }] });
  return { "@context": "https://schema.org", "@graph": graph };
}
export function sitemapXml(requestHost: string, approved = SEARCH_LAUNCH_APPROVED): string {
  const urls = Object.keys(SEO_PAGES).filter(path => indexingAllowed(path, requestHost, approved));
  return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + urls.map(path => `  <url><loc>${SITE_ORIGIN + path}</loc></url>`).join("\n") + '\n</urlset>\n';
}
export function robotsText(requestHost: string, approved = SEARCH_LAUNCH_APPROVED): string {
  // Allow crawlers to read noindex tags. robots.txt itself is NOT access control or a noindex mechanism.
  return 'User-agent: *\nAllow: /\n' + (indexingAllowed("/", requestHost, approved) ? `Sitemap: ${SITE_ORIGIN}/sitemap.xml\n` : '# Preview: page-level noindex is active; search launch is not approved.\n');
}
