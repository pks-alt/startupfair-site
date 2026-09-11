# StartupFair Final Site + Full Platform Backend Handoff

## Source of truth
Use branch:

`handoff/startupfair-final-site-backend-ready`

This branch intentionally starts from the previously finalized public website baseline:

`304fdec205f4c625a70888243f598288c3b758d0`

The public website must remain visually and structurally consistent with that approved version. In particular, the root homepage continues to render `StartupFairPage page="home"` from `components/startupfair-page.tsx`.

## Public homepage that must be preserved
The approved homepage includes:
- Original StartupFair logo and original hero image `/startupfair-hero-global-ai.png`.
- `Build. Solve. Get Discovered.` hero.
- Talent / Organizations / Partners audience paths.
- Featured `AI Clinician Matching Challenge` section.
- `How StartupFair Works` process.
- `Where Technology Can Create Practical Impact` / Innovation Focus section.
- 2015-to-Today history section.
- Partner section.
- Final CTA.
- Separate `Start a Conversation` section and inquiry dialog.
- Existing footer, Redmond address, phone, email, policies and LinkedIn.

Do not replace this homepage with the later experimental `Two Global Programs` homepage layout.

## Approved new public-program integration
The new Global AI & Software Talent and Global Innovator programs are added as pages and flows without replacing the approved homepage.

Added / integrated public routes include:
- `/challenges`
- `/challenges/global-ai-software-talent`
- `/apply/global-ai-software-talent`
- `/apply/global-ai-software-talent/full-application`
- `/apply/global-ai-software-talent/confirmation`
- `/challenges/global-innovator`
- `/apply/global-innovator`
- `/apply/global-innovator/full-application`
- `/apply/global-innovator/confirmation`

The existing specialized challenge routes and all existing public workflows remain in place.

## Full authenticated platform frontend
The authenticated product is integrated under separate routes so backend work can begin without redesigning the public website.

Primary route families:
- `/sign-in`
- `/onboarding`
- `/app/...` for Talent, Innovator, Organization, Partner, Mentor and Judge experiences
- `/admin/...` for StartupFair administration

The frontend includes the approved end-to-end UX for account/role setup, qualifications/applications, selection, team formation, AI matching, Team Room, Build Studio, managed GitHub, Resource Vault, AI credits/external tools, submission/commit freeze, technical validation, results/certificates, verified portfolios, opportunity marketplace, organization challenge builder, partner support, mentor/judge workflows, judging, admin operations, billing records, analytics, security/audit and platform settings.

## Backend implementation boundary
The authenticated screens currently use display/mock data and frontend states. The developer should connect them to production services without redesigning the approved UX.

Recommended implementation order:
1. Authentication, identity verification, MFA and server-side RBAC.
2. Production relational database and migrations.
3. Talent/Innovator applications and status history.
4. Organizations, Partners and memberships.
5. Teams, invitations, roles and lock states.
6. StartupFair-managed GitHub repo provisioning and permissions.
7. Cloud/Vibe workspace provisioning and lifecycle (after exact Vibe source/version/license is verified).
8. Resource Vault, object storage and encrypted secrets.
9. AI provider orchestration, StartupFair credit pools, sponsor credits and usage accounting.
10. Team chat, announcements, notifications and mentor help.
11. Structured final submission with exact Git commit freeze.
12. Automated build/test/security/demo validation.
13. Judge assignment, conflict declarations, scorecards and score locking.
14. Human finalist/winner approval and StartupFair-controlled result publishing.
15. Verified Talent/Innovator portfolios and privacy controls.
16. Opportunity/introduction pipeline.
17. Agreements, invoices, payment records and sponsor commitments.
18. Audit events, observability, backups, restore and incident handling.

## System-of-record boundaries
- StartupFair DB: users, roles, profiles, applications, challenges, teams, permissions, scores, activity, opportunities, AI usage, submissions, consent and audit records.
- GitHub: authoritative source code for selected teams.
- Secure object/file storage: documents, pitch decks, screenshots and large datasets.
- Encrypted secret vault: API keys and credentials.
- Vibe: invisible execution/workspace engine only where exact reusable capabilities are verified.

## Development rules
- Do not redesign the public website while implementing backend services.
- Do not replace the original hero image, logo, About history assets or telecasts.
- Keep public, private-enterprise and invite-only challenge access distinct.
- Do not expose private resumes, contact information, judge notes, private repos or restricted resources.
- AI may assist judging but cannot independently choose winners.
- StartupFair retains final result publication control.
- Participant pre-existing IP remains theirs by default unless challenge-specific terms explicitly state otherwise.
- Every sensitive action must be enforced server-side and audited.

## Verification
Run:

```bash
npm ci
npm run build
node scripts/platform-qa.mjs
```

The QA script explicitly checks that the previously finalized homepage is still the root homepage while the new global programs and authenticated platform exist alongside it.
