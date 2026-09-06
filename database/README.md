# StartupFair database foundation — NOT a live service

The current repository has an empty `db/schema.ts` and no D1/R2 binding. This SQL migration creates a tested relational foundation, not a production connection. It is compatible with SQLite/D1, matching the existing Cloudflare/Drizzle scaffold. A production provider was not established by the retrieved earlier documents; this is an implementation proposal, not a claim that a hosting decision was already approved.

## Coverage
Accounts linked to an external identity provider (no passwords here); private contact details separate from professional profiles; organizations, members, verification status and scoped access grants; profiles, approved fields, skills, interests and work samples; challenges with public/private/hybrid modes and separate private details; six submission types with versioned step answers; consent records, private file metadata, audit events and a deduplicated four-mailbox email outbox.

`docs/form-field-inventory.json` enumerates actual field names in all 49 current form screens. Repeated checkbox fields must be saved as arrays. All answers require server-side validation against a versioned field allowlist before saving.

## Four-step plan and version discrepancy
The approved profile structure is Basic Profile; Skills & Background; Challenge & Opportunity Interests; Proof of Capability + Privacy. The current GitHub snapshot still contains an older eight-screen profile journey. This review does not silently remove fields or change consent choices to force it into four screens. The four-step snapshot also uses different visibility labels from the earlier wireframe and current code. Reconcile these deliberately when connecting the profile service. Profiles default to private, and direct email, phone and precise location are never public.

## Local tests
Run `python3 database/test_database.py`. The SQL migration should run once through a migration runner; it is not a live bootstrap API. Do not publish database files, private attachments, backups, credentials or submissions in Git. The existing Drizzle runtime has NOT been connected to this migration.

## Before collecting real data
Select and provision a production database and private object storage; add server-side authentication/authorization (the SQL schema alone is NOT an access-control system); enforce verified-organization access; implement validated save/resume and submit APIs, transactions/idempotency, attachment validation and scanning, rate limits, backups and retention/deletion. Public queries need an explicit approved-field allowlist. Never trust recipient or visibility grants supplied by a browser. Commit submission and outbox rows atomically; an email worker sends and retries using secure review links, not full private records.

Forms keep preview-only notices. This migration does NOT enable storage, delivery, accounts or file uploads. Notification addresses remain hello@startupfair.org, challenges@startupfair.org, talent@startupfair.org and partners@startupfair.org.
