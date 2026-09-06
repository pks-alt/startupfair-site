# StartupFair pre-launch findings — 6 September 2026

Verdict: not ready to accept real profiles, challenge applications or inquiries. The public presentation and backend readiness are separate.

## Evidence
Audited application commit: `1fe5fc936c0c51bb602a8809eb4a7aac83eaa72c` (`site-template-database-review`). The initial read-only browser audit is GitHub Actions run `34046746172`. It used only synthetic data. The successful workflow means evidence collection completed; it does NOT mean every readiness check passed.

- Home headline at 1440, 1280 and 1024px was three lines: `Build. Solve.` / `Get` / `Discovered.`. A narrow stylesheet now targets two lines without replacing the image or Home content; tests cover 320, 390, 768, 1024, 1280 and 1440px.
- Event Telecasts was absent from this recovered About page. Two user-supplied links are added below Historical Gallery: `https://www.youtube.com/watch?v=fYOiJnL4Ars&t=7s` and `https://www.youtube.com/watch?v=OLXfRG4oYok`. The first embed uses `start=7`. Both offer a persistent direct link. YouTube iframes load only after the visitor selects Load video; no autoplay is requested. Video ownership, availability and actual stream playback are outside the site tests; direct links remain available if YouTube blocks embedding.
- Production `npm run build` succeeded. `npx tsc --noEmit` failed with missing Cloudflare worker type declarations and a Vite configuration overload error. A compiled bundle alone is not a complete release check.
- Submitting the Home inquiry navigated to a thank-you page with hard-coded reference `SF-GEN-2026-00001`. No POST request occurred. Success text is misleading until server-side submission and reference generation exist.
- Entered Talent contact data became empty after Continue and then Back. The flow still shows Step 2 of 8 rather than the approved four-step flow. There is no authenticated draft-save or resume service.
- The database directory is a tested SQL foundation. It is not connected to the empty Drizzle runtime schema or provisioned live storage. Authentication, authorization, uploads, email transport and an administration workflow remain to be implemented.
- Challenge cards mark two challenges Open Now while their details promise dates before applications open. Publish approved dates, time zones, eligibility, evaluation, submission requirements and rules, or use Coming Soon/Register Interest.
- Privacy, Terms, Challenge Rules and Cookie pages are legal wireframes: effective date and responsible entity remain To be confirmed, with placeholder counsel-reviewed sections. Final policies must reflect the actual operator, data processing and retention, not invented company details.
- All sampled public pages share a prototype meta description. No canonical URL or social-share image was found. `/robots.txt` and `/sitemap.xml` return the generic HTML page rather than valid files.
- Unknown URLs return HTTP 200. An unknown `/challenges/...` address incorrectly renders the clinician challenge. Use genuine 404 behavior and validate challenge slugs.
- Historical links still use `www.startupfair.org/lunchbox-*.html`. These paths must be retained or redirected before replacing the current production domain, or the archive links will fail after cutover.
- Automated accessibility checks on Home, Challenges, For Talent and Contact found insufficient text contrast, including small blue text and active filters. Adjust only affected text/background colors; retain the visual design.
- Current branch metadata reports main and recovered-baseline as unprotected. Backup branches exist but are not enforced branch protection. Establish a release branch/tag, review requirements and rollback procedure before production.

## Go-live acceptance order
1. Finalize the four-step profile and real server-side save/submit flow with approved permissions, private files and backups. Do not accept personal data until this works.
2. Connect the four departmental mailboxes to notification delivery, verify receipts and failure handling, and show confirmation only after a stored submission exists. Do not email full private profiles.
3. Finalize challenge status/dates and operator-approved policy text.
4. Resolve type checking, error routes, metadata, archive redirects and contrast findings; test the production build on the chosen hosting environment.
5. Rehearse one complete submission for every form type plus draft recovery, unauthorized access denial, notification retry, deletion and backup restoration.

A limited informational launch is a separate option: use working direct email links, remove/disable unconnected submission and account promises, clearly label upcoming challenges, and publish accurate policy/contact information. It is not a launch of the functioning talent/challenge platform.

The current work fixes only Event Telecasts and headline wrapping. It does not activate backend services, change legal terms, modify challenge status or alter the working popup.
