# StartupFair Global Talent + Innovator Launch Plan

## Purpose

This review branch is based on the approved `site-template-database-review` branch at commit `304fdec205f4c625a70888243f598288c3b758d0`.

The approved baseline branch is intentionally left unchanged. This branch tests how recurring Global Talent and Global Innovator programs should appear on the public website before the development team connects the production application workflow.

## Recommended Homepage Placement

Keep the current homepage structure and replace the single `Featured challenge` block with a new `Upcoming Global Challenges` section.

Recommended order:

1. Hero
2. Choose Your Path — Talent / Organizations / Partners
3. **Upcoming Global Challenges — new recurring-program section**
4. How StartupFair Works
5. Innovation Focus
6. StartupFair History
7. Partners
8. Final CTA
9. Inquiry

Why this placement: visitors understand StartupFair first, then immediately see the two live participation opportunities. The events do not compete with the hero and do not get buried below history or partner content.

## Recurring Program 1 — Global AI & Software Talent Challenge

Audience: AI and software developers globally, including experienced professionals, early-career developers, students and recent graduates.

Target first cycle:

- Priority application deadline: Monday, October 26, 2026
- Final application deadline: Friday, October 30, 2026
- Challenge kickoff: Monday, November 2, 2026
- Build period: 7 days
- Selected cohort: 30–40 participants

The published schedule should include a notice that StartupFair may adjust dates based on qualified application volume, partner requirements or program readiness. Applications may close early when capacity is reached.

### Talent application funnel

Do not start with resume upload.

Recommended flow:

1. Start Qualification
2. Email verification
3. Short eligibility and commitment screen
4. Technical track selection
5. Evidence of real work
6. One role-specific technical thinking question
7. Initial qualification review
8. Qualified applicant unlocks full application
9. Resume/CV and professional evidence upload
10. StartupFair review and selection

### Talent pre-resume screening

Collect before resume upload:

- Professional / Early Career / Student / Recent Graduate
- Primary technical track
- Country, city and time zone
- Commitment to 7-day challenge
- English-language participation confirmation
- Recent technologies used
- Description of one real AI/software project
- What the applicant personally owned or built
- GitHub / portfolio / live application / demo / work-sample link, or confidential-work explanation
- Most difficult technical problem solved
- One track-specific technical question

### Talent uploads after qualification

- Resume/CV — required, PDF or DOCX, maximum 5 MB
- LinkedIn — recommended
- GitHub — if applicable
- Portfolio / work sample — if applicable
- Additional professional evidence — optional

Do not accept executable files or source-code ZIP archives. Prefer repository/demo links for technical work.

## Recurring Program 2 — Global Innovator Challenge

Audience: individuals, teams, researchers, founders and startups worldwide with original AI-enabled or technology-driven ideas.

Eligible stages:

- Idea / Concept
- Prototype
- MVP
- Existing Product / Startup
- Early Revenue / Pilot Stage

Broad themes:

- Healthcare & Workforce Innovation
- Enterprise AI & Automation
- Fintech, Commerce & Digital Economy
- Education & Future of Work
- Climate & Sustainability
- Open Innovation

Target first cycle:

- Priority application deadline: Monday, November 16, 2026
- Final application deadline: Friday, November 20, 2026
- Challenge kickoff: Monday, November 23, 2026
- Build period: 7 days
- Selected cohort: 15–20 ideas/teams

### Innovator application funnel

Do not start with pitch-deck/business-plan upload.

Recommended flow:

1. Start Qualification
2. Email verification
3. Applicant type + stage + theme
4. Problem quality
5. Target user/customer
6. Why the problem matters now
7. Proposed solution
8. Meaningful role of AI/technology
9. Differentiation / alternatives
10. Evidence and execution capability
11. Initial qualification review
12. Qualified applicant unlocks full application and stage-based materials

### Innovator uploads after qualification

Idea stage:
- Pitch deck OR executive summary / concept document
- Business plan optional
- Research/mockups/customer interviews optional

Prototype/MVP:
- Pitch deck or executive summary
- Product/demo link
- Architecture/GitHub/customer evidence optional

Existing product/startup:
- Pitch deck
- Product/demo
- Founder/team profile
- Business plan, traction summary, pilot/customer evidence and investor material optional

Business documents may use PDF, DOCX, PPT or PPTX with a reasonable file-size limit. Prefer links for large video/demo material.

## Privacy and Access

Resume, pitch deck, business plan, source code, unpublished work samples, customer information and confidential product material must be private by default.

Access should be limited to StartupFair staff and specifically authorized reviewers/judges for the applicable program. Nothing should automatically become public portfolio content.

## Homepage CTA Guidance

Homepage cards should not say `Upload Resume` or `Upload Pitch Deck`.

Use:

- Talent: `View Talent Challenge` / later `Start Qualification`
- Innovator: `View Innovator Challenge` / later `Start Qualification`

On the full event page, the primary CTA should become `Start Qualification`.

Talent helper text: `5–7 minutes · Resume not required at this stage.`

Innovator helper text: `7–10 minutes · Pitch deck not required at this stage.`

## Existing Challenge Content

Do not delete the existing AI Clinician Matching, Enterprise AI Agent or Publisher-to-Campaign challenge work. Those concepts can remain in the challenge directory and can later become sponsored, themed or problem-specific challenges.

The homepage should lead with the recurring Global Talent and Global Innovator programs because they are the first public operating programs.

## Production Implementation Notes

The review homepage component is intentionally isolated from the existing `components/startupfair-page.tsx`. Once the new placement/content is approved, the development team can merge the section into the primary component cleanly rather than maintaining duplicate homepage components long term.

The production application workflow should write to the final StartupFair data model from day one so Phase 1 registrations do not require migration when dashboards, collaboration, judging and opportunity workflows are activated.
