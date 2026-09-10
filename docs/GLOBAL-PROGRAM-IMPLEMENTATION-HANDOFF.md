# StartupFair Global Talent + Innovator Program — Implementation Handoff

## Branch isolation

This work is intentionally isolated on:

`review/global-talent-innovator-launch-20260909`

It was created from the approved beta-source branch:

`site-template-database-review` at commit `304fdec205f4c625a70888243f598288c3b758d0`.

Do not merge into the approved beta-source branch until StartupFair reviews the new program experience.

## Homepage placement

The existing homepage structure is preserved. The former single Featured Challenge area is replaced by the recurring Global Programs section immediately after **Choose Your Path** and before **How StartupFair Works**.

The new homepage cards link to:

- `/challenges/global-ai-software-talent`
- `/challenges/global-innovator`

## New public challenge pages

### Global AI & Software Talent Challenge

`/challenges/global-ai-software-talent`

- Global 7-day challenge
- First target kickoff: Monday, November 2, 2026
- 30–40 selected participants
- Experienced professionals, early-career builders, students and recent graduates
- AI/ML/LLM, Full Stack, Backend/Data, Frontend, DevOps/Cloud/Security tracks
- Qualification before résumé upload

### Global Innovator Challenge

`/challenges/global-innovator`

- Global 7-day challenge
- First target kickoff: Monday, November 23, 2026
- 15–20 selected ideas/teams
- Individuals, teams, researchers, founders and startups
- Idea, Prototype, MVP, Existing Product/Startup, and Early Revenue/Pilot stages
- AI-enabled and technology-driven innovation across broad themes
- Qualification before pitch/business-plan upload

## New Talent application routes

- `/apply/global-ai-software-talent` — initial qualification
- `/apply/global-ai-software-talent/full-application` — résumé/profile and privacy choices
- `/apply/global-ai-software-talent/confirmation` — confirmation state

The qualification includes career stage, technical track, recent technologies, project evidence, personal ownership, problem solving, track-specific technical thinking and 7-day commitment.

The full application includes résumé/CV upload, LinkedIn, GitHub, portfolio/work sample links, opportunity preferences and participant-controlled visibility.

## New Innovator application routes

- `/apply/global-innovator` — initial qualification
- `/apply/global-innovator/full-application` — pitch materials and full innovation application
- `/apply/global-innovator/confirmation` — confirmation state

The qualification includes applicant type, innovation stage, theme, problem, target user, why-now rationale, evidence, solution, meaningful technology/AI role, differentiation, alternatives/competitors, stage-specific progress and execution capability.

The full application includes pitch deck/executive-summary upload, optional business plan/supporting material, demo/product links, 7-day objectives, confidentiality flag and final confirmations.

## Production backend work still required

The new forms intentionally do not claim production persistence. Before public applications open, connect them to the approved StartupFair system of record and implement:

1. Verified email/account identity.
2. Server-side qualification/application persistence.
3. Server-side status transitions and review queue.
4. Secure upload storage with MIME/type/size validation and malware scanning.
5. Authorization so only permitted StartupFair reviewers/judges can view private files.
6. Application IDs and immutable submission receipts.
7. Duplicate/retry prevention and audit history.
8. Transactional confirmation/status email.
9. Retention/deletion policy and consent records.
10. Production analytics for application source and funnel conversion.

## Upload policy

### Talent

- Résumé/CV: PDF or DOCX, production maximum 5 MB.
- Source code should normally be shared by repository/demo link rather than ZIP upload.

### Innovator

- Primary pitch material: PDF, PPTX or DOCX, production maximum 10 MB.
- Business plan: optional PDF/DOCX.
- Supporting material: optional approved document type.
- Demo/video should normally be a URL rather than a large file upload.

## Privacy

- Talent defaults to Challenge Only visibility.
- Talent Network and Public Portfolio are participant-controlled choices.
- Pitch decks, business plans, unpublished product information and other restricted innovation materials remain private by default.
- No uploaded material should be published automatically.

## Existing work preserved

The specialized challenge pages remain available:

- `/challenges/ai-clinician-matching`
- `/challenges/enterprise-ai-agent`
- `/challenges/publisher-campaign-intelligence`

They can later operate as sponsored, industry-specific or problem-specific challenges under the broader recurring program model.
