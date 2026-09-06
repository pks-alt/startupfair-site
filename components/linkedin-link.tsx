import { linkedinShareUrl, verifiedLinkedinUrl } from "@/lib/seo-config";
/** LinkedIn is the only marketing social channel. This does not post automatically. */
export function LinkedInLink() {
  const company = verifiedLinkedinUrl();
  return (
    <a className="startupfair-linkedin" data-social-channel="linkedin" href={company ?? linkedinShareUrl()} target="_blank" rel="noopener noreferrer" aria-label={company ? "Follow StartupFair on LinkedIn (new tab)" : "Share StartupFair on LinkedIn (new tab)"}>
      {company ? "Follow on LinkedIn" : "Share on LinkedIn"} <span aria-hidden="true">↗</span>
    </a>
  );
}
