# StartupFair SEO and LinkedIn implementation

## What changed
Unique titles and descriptions for seven main public pages, three existing challenge pages and four policy pages. Server-rendered Open Graph title, description, canonical URL and approved Home image for LinkedIn previews. Brand-only Organization/WebSite data on Home and WebPage/Breadcrumb data on appropriate main pages. No fabricated Event, JobPosting, Review, FAQ or rating markup.

A real text /robots.txt endpoint and XML /sitemap.xml endpoint replace HTML fallthrough. Unknown paths, including invalid challenge names, return a genuine not-found response instead of a different challenge. Canonicals exclude campaign parameters. Private form steps and confirmation pages have no public canonical and remain noindex.

LinkedIn is the only marketing social channel. The current working source had no Facebook, Instagram, X/Twitter, TikTok or Pinterest footer links to remove. Four referral selectors saying LinkedIn or social media now say LinkedIn. The footer contains one LinkedIn link. Because the exact company page is not verified, it currently opens a Share on LinkedIn composer for the StartupFair domain; it does not pretend to be a Follow link. Set LINKEDIN_COMPANY_URL only after the owner supplies the exact verified company URL. It then becomes Follow on LinkedIn and is used for Organization sameAs. No account is created and nothing is posted automatically.

The two historical YouTube recordings are archived event content, not a promoted social channel. Their URLs, click-to-load behavior and seven-second start remain unchanged. GitHub/portfolio fields for applicants are evidence of capability, not StartupFair marketing social channels; they remain.

## Indexing release gate
SEARCH_LAUNCH_APPROVED remains false in lib/seo-config.ts. All preview pages return page-level noindex; the sitemap is intentionally empty until release approval. robots.txt allows crawlers to see that noindex, rather than blocking the very instruction meant to prevent indexing. Access control for private data is a separate backend requirement; noindex is not security.

After production readiness is approved, set SEARCH_LAUNCH_APPROVED true and redeploy on the canonical host www.startupfair.org. Other hosts still remain noindex. Seven main public pages enter the sitemap. Challenge details and unfinished policy pages remain excluded until individually approved through SEO_PAGES. The three challenge descriptions do not claim registration is open; no dates, sponsorship, awards or event status were changed in the visible website.

Canonical origin is the existing production domain https://www.startupfair.org. LinkedIn previews of that domain will still show the old live site until the new version is deployed. Preview URLs are not campaign landing links. Preserve historical legacy URLs before domain cutover.

## Release checks still needed
Deploy to production after application/data and policy completion; verify the canonical domain and redirects; use Google Search Console to verify ownership and submit the live sitemap; inspect URLs and structured data; refresh new shares with LinkedIn Post Inspector. No Search Console submission, LinkedIn publication, analytics installation or advertising spend occurred in this task. Search engines decide whether/how to index or display metadata; rankings are not guaranteed.

The primary image is the unchanged original Home image (1672 x 941 PNG). No logo or image was replaced. No tracking pixel or cookie was installed. UTM-tagged campaign URLs in the marketing playbook are a naming plan, not active conversion tracking.

## Reference documentation
- Google titles: https://developers.google.com/search/docs/appearance/title-link
- Google noindex: https://developers.google.com/search/docs/crawling-indexing/block-indexing
- Google sitemap: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- Google Organization: https://developers.google.com/search/docs/appearance/structured-data/organization
- LinkedIn Post Inspector: https://www.linkedin.com/help/linkedin/answer/a6233775
- LinkedIn Pages: https://business.linkedin.com/advertise/linkedin-pages/best-practices

Scope: current review source only. Main and recovered-baseline are not modified. No three-event campaign is activated before the next discussion.
