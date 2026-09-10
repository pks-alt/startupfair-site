# StartupFair Developer Handoff

## Source of truth

Use this branch as the complete source package:

`handoff/startupfair-global-programs-approved`

Do **not** merge code from the earlier StartupFair review branches into this branch. The current beta baseline remains preserved separately on `site-template-database-review`.

## Baseline

This branch was created directly from the exact approved beta commit:

`304fdec205f4c625a70888243f598288c3b758d0`

Commit message: `Apply browser-verified public templates and recover approved About content`

## Approved website update included here

- Final approved compact homepage flow with the original StartupFair hero asset preserved.
- Global AI & Software Talent Challenge public page.
- Global Innovator Challenge public page.
- Talent qualification, full-application and confirmation routes.
- Innovator qualification, full-application and confirmation routes.
- Updated Challenges directory preserving the three existing specialized challenge concepts.
- Existing About/history assets, telecasts, policies, talent-profile, find-talent, launch-challenge and partner-inquiry route families remain in the repository.
- Search launch remains disabled during implementation/QA.

## New routes

- `/challenges/global-ai-software-talent`
- `/apply/global-ai-software-talent`
- `/apply/global-ai-software-talent/full-application`
- `/apply/global-ai-software-talent/confirmation`
- `/challenges/global-innovator`
- `/apply/global-innovator`
- `/apply/global-innovator/full-application`
- `/apply/global-innovator/confirmation`

## Important implementation boundary

The current forms demonstrate the approved website/application experience. Production still requires durable database persistence, email verification, secure file storage and scanning, application status/history, reviewer/scoring workflows, notifications, consent/audit records, abuse protection and reliable message delivery.

The existing route-to-email map identifies intended recipients but is not itself email transport.

## Do not change without approval

- StartupFair logo or original approved hero image.
- Historical photographs or two event telecasts.
- LinkedIn-only public social-channel strategy.
- Historical relationships must not be presented as current clients or partners without verification.
- Do not turn on search indexing before production launch review.

## Developer checkout

```bash
git clone https://github.com/pks-alt/startupfair-site.git
cd startupfair-site
git checkout handoff/startupfair-global-programs-approved
npm ci
npm run build
```

Treat this branch as the single handoff source. Do not reconstruct the update from HTML previews or older review branches.
