# StartupFair Full Platform — Backend-Ready Integrated Handoff

## Source of truth

Use this branch:

`handoff/startupfair-full-platform-integrated`

It is created directly from the verified public-site handoff commit:

`d9f0245969aacf33240691bc13b712ef36dd7643`

Do not rebuild the public website from static HTML previews. The prior public website remains intact in this branch, including the final homepage, original hero image, both global programs, specialized challenge/application flows, About/history/telecasts, Talent Profile, Find Talent, Launch Challenge, Partner Inquiry and policies.

## What was added

This branch adds the authenticated full-platform frontend layer so backend development can start against stable routes and UI states.

### Identity
- `/sign-in`
- `/onboarding`
- one identity with multiple roles
- placeholders for email verification, Google, GitHub, business SSO and MFA

### Talent
- dashboard
- challenge directory/detail
- qualification/full application/selection
- solo/create-team/AI team matching
- Team Room
- Build Studio
- StartupFair AI credits + own approved AI tools
- managed GitHub workflow
- Resource Vault
- technical validation
- final submission / exact commit freeze
- results / certificate
- verified portfolio
- opportunity marketplace
- messages, notifications and settings

### Innovator
- dashboard
- qualification/full application
- innovation workspace
- team/collaboration
- submission
- permanent innovation portfolio
- pilot/partnership/accelerator/investment-introduction opportunities

### Organization
- dashboard
- self-service challenge builder
- public/private/invite-only challenge operations
- verified Talent discovery
- Innovator discovery
- judging progress
- opportunity pipeline
- agreements/invoices
- reports

### Partner
- programs/sponsorships
- AI/cloud/API/tool credits
- mentors/judges
- opportunities
- impact analytics
- agreements

### Mentor / Judge
- mentor help queue, sessions, calendar and expert profile
- judge conflicts, assigned submission review, scorecard and final human review

### Admin
- Command Center
- users/roles
- application review
- programs/challenges
- teams
- workspace operations
- GitHub repositories
- AI providers/credits/cost controls
- Resource Vault
- mentors/judges
- submissions/validation
- judging/results publishing
- opportunities
- organizations/partners
- agreements/invoices
- communications
- analytics
- security/audit
- platform settings

## Important architecture boundary

StartupFair is the visible product, identity, business workflow and system of record.

- Source code: StartupFair-managed private GitHub repositories
- Large/private files: secure object storage
- Secrets/API keys: encrypted secrets vault
- Workspace/agent runtime: Vibe or equivalent reusable engine **only where exact source/version/capability is verified**
- AI: limited StartupFair-funded credits plus participant-owned approved tools
- Final judging: exact immutable commit snapshot
- Winner selection: human judges + human final approval; AI may assist but does not choose winners

## Backend implementation order

1. Authentication, sessions, verified email, OAuth/SSO, MFA and RBAC
2. Unified database schema and migrations for users/roles/profiles/programs/challenges/applications/teams
3. Organization/Partner verification and challenge approval workflow
4. Team membership, invitations and AI-assisted matching data
5. GitHub App integration and managed private repo provisioning
6. Workspace provisioning / Vibe integration and lifecycle
7. Secure Resource Vault, object storage and secrets injection
8. AI provider gateway, credits, sponsor pools and usage accounting
9. Messaging, notifications, announcements and mentor requests
10. Submission package, exact commit freeze and immutable snapshot
11. Automated validation runner and challenge-specific test harnesses
12. Mentor/Judge assignment, conflicts, scoring and score lock
13. StartupFair-controlled result approval/publishing and certificates
14. Verified Talent/Innovator portfolios and privacy controls
15. Opportunity marketplace / introductions / outcomes
16. Agreements, invoices, sponsorship commitments and reporting
17. Audit/security, backup/restore, monitoring and operational runbooks

## Backend data entities

The frontend assumes at minimum:

User, Role, Profile, Organization, Partner, Program, Challenge, Qualification, Application, Cohort, Team, TeamMember, Workspace, Repository, Resource, AIUsage, CreditPool, Message, MentorRequest, Submission, SubmissionSnapshot, ValidationRun, Judge, JudgeAssignment, Scorecard, Result, Certificate, Opportunity, Agreement, Invoice, Notification, Consent, AuditEvent.

Typed domain placeholders are in:

`lib/platform-types.ts`

Route inventory is in:

`lib/platform-routes.ts`

## Backend integration rule

Do not remove the frontend state or flow merely because the backend is not connected yet.

Replace mock/display values with real service data behind the same screens and route contracts. Sensitive authorization must always be enforced server-side; hiding a control in the browser is not authorization.

## Build

```bash
git clone https://github.com/pks-alt/startupfair-site.git
cd startupfair-site
git checkout handoff/startupfair-full-platform-integrated
npm ci
npm run build
node scripts/platform-qa.mjs
```

## Public website preservation

The existing 89-route public website registry remains unchanged. This makes it possible for backend development to proceed without losing or redesigning the approved public site.
