"use client";

import Link from "next/link";
import { useState, type FormEvent, type ReactNode } from "react";
import { LinkedInLink } from "@/components/linkedin-link";

const nav = [
  ["Challenges", "/challenges"],
  ["For Talent", "/for-talent"],
  ["For Organizations", "/for-organizations"],
  ["Partners", "/partners"],
  ["About", "/about"],
] as const;

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="site-header">
      <Link href="/" className="brand"><img src="/startupfair-logo.png" alt="StartupFair" /></Link>
      <nav>
        {nav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        <Link href="/contact">Contact</Link>
      </nav>
      <Link className="button primary header-cta" href="/challenges">Join a Challenge</Link>
      <button className="mobile-menu-button" type="button" aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} onClick={() => setMenuOpen((open) => !open)}>
        <span /><span /><span />
      </button>
      {menuOpen && (
        <nav className="mobile-navigation" id="mobile-navigation" aria-label="Mobile navigation">
          {nav.map(([label, href]) => <Link key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</Link>)}
          <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          <Link className="button primary" href="/challenges" onClick={() => setMenuOpen(false)}>Join a Challenge</Link>
        </nav>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer>
      <div className="footer-brand">
        <img className="footer-logo" src="/startupfair-logo.png" alt="StartupFair" />
        <p>StartupFair is a global AI talent, innovation challenge and venture discovery platform connecting capable people with real problems and meaningful opportunities.</p>
      </div>
      <div className="footer-column">
        <h3>Explore</h3>
        <Link href="/challenges">Challenges</Link><Link href="/for-talent">For Talent</Link><Link href="/for-organizations">For Organizations</Link><Link href="/partners">Partners</Link><Link href="/about">About</Link>
      </div>
      <div className="footer-column">
        <h3>Policies</h3>
        <Link href="/privacy">Privacy Policy</Link><Link href="/terms">Terms of Use</Link><Link href="/challenge-rules">Challenge Rules</Link><Link href="/cookies">Cookie Policy</Link>
      </div>
      <div className="footer-column footer-contact">
        <h3>Contact</h3>
        <address>2205 152nd Ave NE<br />Redmond, WA 98052</address>
        <a href="tel:+14258294463">(425) 829-4463</a><a href="mailto:hello@startupfair.org">hello@startupfair.org</a><LinkedInLink />
      </div>
      <div className="footer-bottom"><span>Established in 2015</span><span>© 2026 StartupFair. All rights reserved.</span></div>
    </footer>
  );
}

function Layout({ children }: { children: ReactNode }) {
  return <div className="site"><Header /><main>{children}</main><Footer /></div>;
}

function Section({ eyebrow, title, intro, children, soft = false }: { eyebrow: string; title: string; intro?: string; children: ReactNode; soft?: boolean }) {
  return (
    <section className={`section ${soft ? "soft" : ""}`}>
      <div className="section-head"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div>{intro && <p>{intro}</p>}</div>
      {children}
    </section>
  );
}

function ProgramHero({ kind, title, copy, kickoff, cohort, applyHref }: { kind: string; title: string; copy: string; kickoff: string; cohort: string; applyHref: string }) {
  return (
    <section className="program-hero">
      <div>
        <div className="tags"><span>Global</span><span>{kind}</span><span>7-Day Challenge</span></div>
        <span className="eyebrow">StartupFair Global Challenge Series</span>
        <h1>{title}</h1>
        <p>{copy}</p>
        <div className="program-hero-actions"><Link className="button primary" href={applyHref}>Start Qualification</Link><Link className="button" href="#timeline">View Timeline</Link></div>
      </div>
      <aside className="program-hero-card" aria-label="Program summary">
        <span>Applications Opening</span>
        <strong>{kickoff}</strong>
        <p>Kickoff</p>
        <hr />
        <strong>{cohort}</strong>
        <p>Selected cohort</p>
        <small>Applications may close earlier if capacity is reached.</small>
      </aside>
    </section>
  );
}

function Timeline({ rows }: { rows: [string, string][] }) {
  return <div className="program-timeline">{rows.map(([label, date]) => <div key={label}><span>{label}</span><strong>{date}</strong></div>)}</div>;
}

function OutcomeCards({ items }: { items: [string, string][] }) {
  return <div className="program-card-grid">{items.map(([title, copy]) => <article className="program-card" key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div>;
}

function PreviewNotice() {
  return <p className="program-preview-note"><strong>Beta implementation note:</strong> this branch demonstrates the approved application experience. Responses and files must be connected to the production database, secure upload storage, malware scanning and review workflow before public applications open.</p>;
}

function goTo(event: FormEvent<HTMLFormElement>, href: string) {
  event.preventDefault();
  window.location.assign(href);
}

const talentTracks = ["AI / ML / LLM & Agents", "Full-Stack Engineering", "Backend & Data Engineering", "Frontend Engineering", "DevOps / Cloud / Security"];
const technologies = ["Python", "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "PostgreSQL / SQL", "AWS", "Azure", "GCP", "Docker / Kubernetes", "LLMs", "RAG", "AI Agents", "Vector Databases", "Machine Learning", "CI/CD", "Application Security"];
const talentQuestions: Record<string, string> = {
  "AI / ML / LLM & Agents": "You built a RAG application. How would you determine whether its answers are accurate and reliable?",
  "Full-Stack Engineering": "You are building an AI application used by thousands of users. What would you separate between frontend, backend and AI services, and why?",
  "Backend & Data Engineering": "An API request is accidentally sent three times. How would you prevent three copies of the same transaction from being created?",
  "Frontend Engineering": "How would you design an AI interface that handles long-running requests, streaming responses, failures and retries without confusing the user?",
  "DevOps / Cloud / Security": "A production release fails after deployment. What should your deployment process do next, and what should have been in place beforehand?",
};

export function GlobalChallengesDirectoryPage() {
  return (
    <Layout>
      <section className="detail-hero"><span className="eyebrow">StartupFair Global Challenge Series</span><h1>Two Recurring Global Programs.</h1><p>StartupFair is launching a recurring Global AI & Software Talent Challenge and a Global Innovator Challenge. Both programs use selective qualification before the full application.</p></section>
      <Section eyebrow="Upcoming Programs" title="Choose Your Path" intro="Talent challenges discover capable AI and software builders. Innovator challenges discover original AI-enabled and technology-driven ideas, products and startups.">
        <div className="program-feature-grid">
          <article className="program-feature"><div className="tags"><span>Talent</span><span>Global</span><span>Nov 2</span></div><h3>Global AI & Software Talent Challenge</h3><p>For experienced professionals, early-career developers, students and recent graduates who can demonstrate practical AI or software capability.</p><strong>30–40 selected participants</strong><Link className="button primary" href="/challenges/global-ai-software-talent">View Talent Challenge</Link></article>
          <article className="program-feature"><div className="tags"><span>Innovator</span><span>Global</span><span>Nov 23</span></div><h3>Global Innovator Challenge</h3><p>For individuals, teams, researchers, founders and startups with original AI-enabled or technology-driven innovation across industries.</p><strong>15–20 selected ideas/teams</strong><Link className="button primary" href="/challenges/global-innovator">View Innovator Challenge</Link></article>
        </div>
      </Section>
      <Section eyebrow="Specialized Challenge Concepts" title="Existing StartupFair Challenges Remain Available" intro="The current specialized challenge work is preserved and can later be activated as sponsored, industry or problem-specific programs." soft>
        <div className="program-card-grid">
          <article className="program-card"><h3>AI Clinician Matching Challenge</h3><p>Healthcare + AI · Talent and Innovation</p><Link className="text-link" href="/challenges/ai-clinician-matching">View Challenge →</Link></article>
          <article className="program-card"><h3>Enterprise AI Agent Builder</h3><p>Enterprise AI · Talent and Innovation</p><Link className="text-link" href="/challenges/enterprise-ai-agent">View Challenge →</Link></article>
          <article className="program-card"><h3>Publisher-to-Campaign Intelligence</h3><p>AI + Performance Marketing · Innovation</p><Link className="text-link" href="/challenges/publisher-campaign-intelligence">View Challenge →</Link></article>
        </div>
      </Section>
    </Layout>
  );
}

export function GlobalTalentChallengePage() {
  const timeline: [string, string][] = [["Applications Open", "October 5, 2026"], ["Priority Deadline", "Monday, October 26"], ["Final Deadline", "Friday, October 30"], ["Challenge Kickoff", "Monday, November 2"], ["Build Week", "November 2–8"], ["Judging & Final Review", "November 9–11"], ["Winners & Finalists", "Thursday, November 12"]];
  return (
    <Layout>
      <ProgramHero kind="Talent Challenge" title="Global AI & Software Talent Challenge" copy="A selective global challenge for AI and software builders who want to prove what they can build through real work—not résumés alone." kickoff="Monday, November 2, 2026" cohort="30–40 participants" applyHref="/apply/global-ai-software-talent" />
      <Section eyebrow="Who Should Apply" title="Built for Strong Builders at Every Career Stage" intro="Experienced professionals, early-career developers, students and recent graduates may apply. Selection is based on demonstrated capability, technical thinking and potential contribution—not years of experience alone.">
        <OutcomeCards items={[["AI / ML / LLM", "Machine learning, GenAI, RAG, agents, evaluation and intelligent systems."], ["Full Stack", "Modern product development across frontend, backend, APIs and AI integrations."], ["Backend & Data", "Production APIs, PostgreSQL, data systems, reliability and scalable services."], ["Frontend", "High-quality responsive interfaces, application flows and AI user experiences."], ["DevOps / Cloud / Security", "Cloud infrastructure, CI/CD, observability, deployment and application security."]]} />
      </Section>
      <Section eyebrow="Selection Model" title="Qualification Before Résumé Upload" intro="StartupFair first looks for evidence that an applicant is relevant and serious. Qualified applicants are then invited to submit their résumé and complete professional profile." soft>
        <div className="program-process"><div><span>01</span><h3>Qualify</h3><p>Track, experience, project evidence, technical thinking and commitment.</p></div><div><span>02</span><h3>Complete Profile</h3><p>Résumé, LinkedIn, GitHub, portfolio and opportunity preferences.</p></div><div><span>03</span><h3>Get Selected</h3><p>StartupFair reviews the strongest qualified applicants for the final cohort.</p></div><div><span>04</span><h3>Build for 7 Days</h3><p>Selected participants complete the published practical challenge.</p></div></div>
        <div className="center"><Link className="button primary" href="/apply/global-ai-software-talent">Start Qualification</Link></div>
      </Section>
      <section id="timeline"><Section eyebrow="Program Timeline" title="Published Dates, With Quality-First Flexibility"><Timeline rows={timeline} /><p className="program-notice"><strong>Schedule notice:</strong> StartupFair may adjust program dates based on qualified application volume, partner requirements or program readiness. Selected applicants will be notified of any changes.</p></Section></section>
      <Section eyebrow="What Selected Participants Receive" title="Recognition Plus Real Opportunity Pathways" soft>
        <OutcomeCards items={[["Verified Recognition", "Completion, finalist, winner and verified-skill credentials based on actual achievement."], ["Hiring Pathways", "Selected participants may be considered for relevant employment opportunities where available."], ["Contract & Paid Projects", "Qualified builders may be introduced to appropriate project or contract opportunities."], ["Featured Talent", "Permission-based finalist and winner visibility through StartupFair."], ["Sponsor Benefits", "Cloud, software, API or technology benefits may be added when provided by sponsors."]]} />
        <p className="program-notice">Participation does not guarantee employment, paid work or any other outcome. Cash awards may be added when specifically funded by a sponsor.</p>
      </Section>
      <Section eyebrow="Privacy" title="Your Work Stays Under Your Control" intro="Résumés and private work samples are not automatically public. Challenge-only is the default visibility; Talent Network and public portfolio visibility require separate participant choices.">
        <div className="center"><Link className="button primary" href="/apply/global-ai-software-talent">Start Qualification</Link></div>
      </Section>
    </Layout>
  );
}

export function GlobalTalentQualificationPage() {
  const [track, setTrack] = useState(talentTracks[0]);
  return (
    <Layout>
      <section className="program-form-hero"><span className="eyebrow">Global Talent Challenge · Initial Qualification</span><h1>Show Us What You Can Build.</h1><p>This short qualification is designed to identify serious AI and software builders before requesting a résumé.</p></section>
      <section className="program-form-shell">
        <form className="program-form" onSubmit={(event) => goTo(event, "/apply/global-ai-software-talent/full-application")}>
          <fieldset><legend>1. Basic qualification</legend>
            <label>Email address<input required type="email" name="email" autoComplete="email" /></label>
            <label>Career stage<select required name="careerStage" defaultValue=""><option value="" disabled>Select one</option><option>Experienced Professional</option><option>Early Career</option><option>Student</option><option>Recent Graduate</option></select></label>
            <label>Primary technical track<select required name="track" value={track} onChange={(e) => setTrack(e.target.value)}>{talentTracks.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label>Country<input required name="country" /></label><label>City<input required name="city" /></label><label>Time zone<input required name="timezone" placeholder="Example: UTC+5:30" /></label>
            <label className="check wide"><input required type="checkbox" />I can commit to the full 7-day challenge if selected.</label>
            <label className="check wide"><input required type="checkbox" />I am willing to complete a practical build challenge and submit my work in English.</label>
            <label className="check wide"><input required type="checkbox" />I will disclose material AI tools and third-party technology used in my challenge submission.</label>
          </fieldset>
          <fieldset><legend>2. Technical profile</legend>
            <label>Hands-on development experience<select required name="experience" defaultValue=""><option value="" disabled>Select one</option><option>Student / Academic Projects</option><option>Less than 1 year</option><option>1–3 years</option><option>3–5 years</option><option>5–8 years</option><option>8+ years</option></select></label>
            <div className="wide"><strong>Technologies used recently</strong><div className="program-check-grid">{technologies.map((item) => <label className="check" key={item}><input type="checkbox" name="technologies" value={item} />{item}</label>)}</div></div>
          </fieldset>
          <fieldset><legend>3. Prove your work</legend>
            <label className="wide">Tell us about one AI or software product/project you personally helped build. <small>Maximum 100 words.</small><textarea required name="project" rows={5} maxLength={900} placeholder="What did you build, who was it for, and what did it accomplish?" /></label>
            <label className="wide">What part did you personally own or build? <small>Maximum 75 words.</small><textarea required name="ownership" rows={4} maxLength={700} /></label>
            <label className="wide">Evidence of work<input type="url" name="evidence" placeholder="GitHub, live product, portfolio, demo or project link" /></label>
            <label className="check wide"><input type="checkbox" name="confidentialWork" />My strongest work is confidential; I will explain my contribution without sharing restricted information.</label>
            <label className="wide">What was the most difficult technical problem you encountered, and how did you solve it? <small>Maximum 100 words.</small><textarea required name="problemSolving" rows={5} maxLength={900} /></label>
          </fieldset>
          <fieldset><legend>4. Role-specific technical thinking</legend><p className="program-question">{talentQuestions[track]}</p><label className="wide">Your answer <small>Maximum 100 words.</small><textarea required name="technicalAnswer" rows={5} maxLength={900} /></label></fieldset>
          <label className="check"><input required type="checkbox" />I confirm that the information above reflects my own experience and work.</label>
          <div className="program-form-actions"><button className="button primary" type="submit">Continue to Full Application</button><Link className="button" href="/challenges/global-ai-software-talent">Back to Challenge</Link></div>
          <PreviewNotice />
        </form>
      </section>
    </Layout>
  );
}

export function GlobalTalentFullApplicationPage() {
  return (
    <Layout>
      <section className="program-form-hero"><span className="eyebrow">Global Talent Challenge · Full Application</span><h1>Complete Your Talent Profile.</h1><p>Qualified applicants provide professional materials, opportunity preferences and privacy choices here.</p></section>
      <section className="program-form-shell"><form className="program-form" onSubmit={(event) => goTo(event, "/apply/global-ai-software-talent/confirmation")}>
        <fieldset><legend>Professional information</legend>
          <label>Full legal name<input required name="legalName" autoComplete="name" /></label><label>Preferred name<input name="preferredName" /></label><label>Email<input required type="email" name="email" /></label><label>Mobile number<input type="tel" name="phone" /></label><label>Country<input required name="country" /></label><label>City<input required name="city" /></label><label>Time zone<input required name="timezone" /></label>
          <label>Current status<select required name="status" defaultValue=""><option value="" disabled>Select one</option><option>Student</option><option>Employed</option><option>Independent / Freelance</option><option>Between Roles</option><option>Other</option></select></label>
        </fieldset>
        <fieldset><legend>Résumé and evidence</legend>
          <label className="wide program-upload">Résumé / CV <small>Required · PDF or DOCX · Production limit: 5 MB</small><input required type="file" name="resume" accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" /></label>
          <label>LinkedIn profile<input type="url" name="linkedin" placeholder="https://" /></label><label>GitHub<input type="url" name="github" placeholder="https://" /></label><label>Portfolio<input type="url" name="portfolio" placeholder="https://" /></label><label>Additional work sample<input type="url" name="workSample" placeholder="https://" /></label>
        </fieldset>
        <fieldset><legend>Opportunity preferences</legend><div className="program-check-grid wide">{["Full-time roles", "Contract work", "Internships", "Paid projects", "Startup opportunities", "Not currently looking"].map((item) => <label className="check" key={item}><input type="checkbox" name="opportunities" value={item} />{item}</label>)}</div></fieldset>
        <fieldset><legend>Privacy and visibility</legend>
          <label className="check wide"><input required type="radio" name="visibility" value="challenge-only" defaultChecked />Challenge Only — StartupFair and authorized challenge reviewers.</label>
          <label className="check wide"><input type="radio" name="visibility" value="talent-network" />Talent Network — approved organizations may discover selected professional information.</label>
          <label className="check wide"><input type="radio" name="visibility" value="public-portfolio" />Public Portfolio — only information and achievements I explicitly approve.</label>
          <label className="check wide"><input type="checkbox" name="introductions" />StartupFair may introduce me to relevant employers, projects or partners.</label>
        </fieldset>
        <fieldset><legend>Final confirmations</legend>
          <label>How did you hear about StartupFair?<select required name="source" defaultValue=""><option value="" disabled>Select one</option><option>LinkedIn</option><option>University</option><option>Partner</option><option>Friend or Colleague</option><option>Community</option><option>Search</option><option>Other</option></select></label>
          <label className="check wide"><input required type="checkbox" />The information and materials I provide are accurate and I have permission to share them.</label>
          <label className="check wide"><input required type="checkbox" />I understand that application does not guarantee selection, employment, paid work or any other outcome.</label>
          <label className="check wide"><input required type="checkbox" />I agree to the applicable StartupFair Privacy Policy, Terms of Use and Challenge Rules.</label>
        </fieldset>
        <div className="program-form-actions"><button className="button primary" type="submit">Submit Application</button><Link className="button" href="/apply/global-ai-software-talent">Back to Qualification</Link></div><PreviewNotice />
      </form></section>
    </Layout>
  );
}

const innovationThemes = ["Healthcare & Workforce Innovation", "Enterprise AI & Automation", "Fintech, Commerce & Digital Economy", "Education & Future of Work", "Climate & Sustainability", "Open Innovation"];
const innovationStages = ["Idea / Concept", "Prototype", "MVP", "Existing Product / Startup", "Early Revenue / Pilot Stage"];

export function GlobalInnovatorChallengePage() {
  const timeline: [string, string][] = [["Applications Open", "October 26, 2026"], ["Priority Deadline", "Monday, November 16"], ["Final Deadline", "Friday, November 20"], ["Challenge Kickoff", "Monday, November 23"], ["Build Week", "November 23–29"], ["Judging & Final Review", "November 30–December 2"], ["Winners & Finalists", "Thursday, December 3"]];
  return (
    <Layout>
      <ProgramHero kind="Innovator Challenge" title="Global Innovator Challenge" copy="A selective global program for original AI-enabled and technology-driven ideas, products and startups with meaningful real-world potential." kickoff="Monday, November 23, 2026" cohort="15–20 ideas / teams" applyHref="/apply/global-innovator" />
      <Section eyebrow="Who Can Apply" title="From Strong Ideas to Existing Startups" intro="Individuals, teams, students, researchers, professionals, founders and startups may apply across industries. Applications are evaluated by stage so an early idea is not unfairly compared with an operating startup.">
        <OutcomeCards items={[["Idea / Concept", "A well-defined problem and promising solution direction."], ["Prototype", "Early evidence that the proposed solution can work."], ["MVP", "A usable early product ready for stronger validation."], ["Existing Product / Startup", "A working product with users, pilots or market evidence."], ["Early Revenue / Pilot", "A product already showing early commercial or operational traction."]]} />
      </Section>
      <Section eyebrow="Innovation Themes" title="AI-Enabled and Technology-Driven Innovation Across Industries" soft><div className="program-chip-grid">{innovationThemes.map((item) => <span key={item}>{item}</span>)}</div></Section>
      <Section eyebrow="Selection Model" title="We Screen the Idea Before Asking for the Deck" intro="Applicants first explain the problem, proposed solution, meaningful use of AI or technology, differentiation, evidence and execution capability. Qualified applicants then submit full pitch materials.">
        <div className="program-process"><div><span>01</span><h3>Qualify</h3><p>Problem, originality, technology, evidence and team capability.</p></div><div><span>02</span><h3>Submit Materials</h3><p>Pitch deck or executive summary, demo and supporting evidence by stage.</p></div><div><span>03</span><h3>Get Selected</h3><p>StartupFair selects 15–20 of the strongest ideas or teams.</p></div><div><span>04</span><h3>Advance in 7 Days</h3><p>Each stage has an appropriate final deliverable and presentation.</p></div></div><div className="center"><Link className="button primary" href="/apply/global-innovator">Start Qualification</Link></div>
      </Section>
      <section id="timeline"><Section eyebrow="Program Timeline" title="Published Dates, With Quality-First Flexibility" soft><Timeline rows={timeline} /><p className="program-notice"><strong>Schedule notice:</strong> StartupFair may adjust program dates based on qualified application volume, partner requirements or program readiness. Selected applicants will be notified of any changes.</p></Section></section>
      <Section eyebrow="Final Deliverables" title="Submission Requirements Match the Innovation Stage">
        <OutcomeCards items={[["Idea Stage", "Refined problem, solution, validation, business model, pitch deck and 2–3 minute presentation video."], ["Prototype / MVP", "Idea-stage materials plus working prototype/demo, technical explanation and progress made during the challenge."], ["Existing Product / Startup", "Product demo, traction/evidence, challenge progress, growth plan, pitch deck and presentation video."]]} />
      </Section>
      <Section eyebrow="Recognition & Opportunity" title="Help Strong Innovations Move Forward" soft><OutcomeCards items={[["Global Innovator Winner", "Overall recognition for the strongest challenge result."], ["Category Recognition", "Innovation, AI application, real-world impact, business potential, emerging innovator and prototype/MVP awards."], ["Mentor & Industry Review", "Selected teams may receive relevant expert feedback."], ["Pilot & Partnership Pathways", "Appropriate solutions may be considered for pilot or partnership discussions."], ["Accelerator / Investor Introductions", "Curated, consent-based introductions may be made where appropriate."]]} /><p className="program-notice">No funding, investment, pilot or commercial outcome is guaranteed. Cash awards may be added when funded by a sponsor.</p></Section>
      <Section eyebrow="Privacy" title="Pitch Materials Are Private by Default" intro="Pitch decks, business plans, unpublished product information, customer information and source code are not automatically made public. Access must be limited to authorized StartupFair reviewers and approved challenge judges."><div className="center"><Link className="button primary" href="/apply/global-innovator">Start Qualification</Link></div></Section>
    </Layout>
  );
}

export function GlobalInnovatorQualificationPage() {
  const [stage, setStage] = useState(innovationStages[0]);
  return (
    <Layout>
      <section className="program-form-hero"><span className="eyebrow">Global Innovator Challenge · Initial Qualification</span><h1>Start With the Problem, Not the Pitch Deck.</h1><p>StartupFair first evaluates the strength of the problem, innovation, technology, evidence and execution potential.</p></section>
      <section className="program-form-shell"><form className="program-form" onSubmit={(event) => goTo(event, "/apply/global-innovator/full-application")}>
        <fieldset><legend>1. Applicant and stage</legend>
          <label>Email address<input required type="email" name="email" /></label><label>Who is applying?<select required name="applicantType" defaultValue=""><option value="" disabled>Select one</option><option>Individual</option><option>Team</option><option>Startup / Company</option><option>Student / Research Team</option></select></label>
          <label>Innovation stage<select required name="stage" value={stage} onChange={(e) => setStage(e.target.value)}>{innovationStages.map((item) => <option key={item}>{item}</option>)}</select></label><label>Primary theme<select required name="theme" defaultValue=""><option value="" disabled>Select one</option>{innovationThemes.map((item) => <option key={item}>{item}</option>)}</select></label><label>Country<input required name="country" /></label><label>Time zone<input required name="timezone" /></label>
          <label className="check wide"><input required type="checkbox" />I can commit to the 7-day challenge if selected and can submit the final work in English.</label><label className="check wide"><input required type="checkbox" />I will disclose material AI tools, third-party technology and existing IP used in the solution.</label>
        </fieldset>
        <fieldset><legend>2. The problem</legend>
          <label className="wide">What problem are you solving? <small>Maximum 75 words.</small><textarea required name="problem" rows={4} maxLength={700} placeholder="Describe the problem, not your product." /></label><label className="wide">Who experiences this problem? <small>Maximum 50 words.</small><textarea required name="user" rows={3} maxLength={500} /></label><label className="wide">Why is this problem important now? <small>Maximum 75 words.</small><textarea required name="whyNow" rows={4} maxLength={700} /></label>
          <label>What evidence do you have?<select required name="evidenceType" defaultValue=""><option value="" disabled>Select one</option><option>Customer / user interviews</option><option>Personal industry experience</option><option>Research / data</option><option>Existing customers</option><option>Pilot</option><option>Revenue</option><option>Waitlist</option><option>Prototype usage</option><option>Market research</option><option>No formal evidence yet</option></select></label><label>Evidence link <small>(optional)</small><input type="url" name="evidenceLink" placeholder="https://" /></label><label className="wide">Briefly explain the evidence or what you still need to validate.<textarea required name="evidenceExplanation" rows={4} maxLength={900} /></label>
        </fieldset>
        <fieldset><legend>3. The innovation</legend>
          <label className="wide">Describe your proposed solution. <small>Maximum 100 words.</small><textarea required name="solution" rows={5} maxLength={900} /></label><label className="wide">How does AI or technology materially enable the solution? <small>Maximum 75 words.</small><textarea required name="technologyRole" rows={4} maxLength={700} /></label><label className="wide">What makes your solution meaningfully different? <small>Maximum 75 words.</small><textarea required name="difference" rows={4} maxLength={700} /></label><label className="wide">What alternatives or competitors already exist? <small>Maximum 75 words.</small><textarea required name="alternatives" rows={4} maxLength={700} /></label>
        </fieldset>
        <fieldset><legend>4. Evidence and execution</legend>
          <p className="program-question">Current stage: <strong>{stage}</strong></p>
          {stage === "Idea / Concept" ? <label className="wide">What can you realistically build or validate during the 7-day challenge?<textarea required name="stagePlan" rows={5} maxLength={1000} /></label> : <><label className="wide">Product / prototype / demo link<input type="url" name="demo" placeholder="https://" /></label><label className="wide">What works today, what remains incomplete, and what will you improve during the challenge?<textarea required name="stagePlan" rows={5} maxLength={1000} /></label></>}
          <label className="wide">Who is building this, and why are you or your team capable of solving the problem? <small>Maximum 100 words.</small><textarea required name="teamCapability" rows={5} maxLength={900} /></label>
        </fieldset>
        <div className="program-form-actions"><button className="button primary" type="submit">Continue to Full Application</button><Link className="button" href="/challenges/global-innovator">Back to Challenge</Link></div><PreviewNotice />
      </form></section>
    </Layout>
  );
}

export function GlobalInnovatorFullApplicationPage() {
  const [stage, setStage] = useState(innovationStages[0]);
  return (
    <Layout>
      <section className="program-form-hero"><span className="eyebrow">Global Innovator Challenge · Full Application</span><h1>Complete Your Innovation Application.</h1><p>Qualified innovators provide their full team/product information and private supporting materials here.</p></section>
      <section className="program-form-shell"><form className="program-form" onSubmit={(event) => goTo(event, "/apply/global-innovator/confirmation")}>
        <fieldset><legend>Applicant / organization</legend>
          <label>Applicant name<input required name="applicantName" /></label><label>Startup / team name<input name="organizationName" /></label><label>Email<input required type="email" name="email" /></label><label>Country<input required name="country" /></label><label>Innovation stage<select required name="stage" value={stage} onChange={(e) => setStage(e.target.value)}>{innovationStages.map((item) => <option key={item}>{item}</option>)}</select></label><label>Primary theme<select required name="theme" defaultValue=""><option value="" disabled>Select one</option>{innovationThemes.map((item) => <option key={item}>{item}</option>)}</select></label><label className="wide">Founder / team members and roles<textarea required name="team" rows={5} maxLength={1600} placeholder="Name · Role · Relevant expertise · LinkedIn/profile link where available" /></label>
        </fieldset>
        <fieldset><legend>Private pitch materials</legend>
          <label className="wide program-upload">Primary pitch material <small>Required · Pitch deck or executive summary · PDF, PPTX or DOCX · Production limit: 10 MB</small><input required type="file" name="pitchMaterial" accept=".pdf,.pptx,.docx,application/pdf,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.openxmlformats-officedocument.wordprocessingml.document" /></label>
          <label className="wide program-upload">Business plan <small>Optional · PDF or DOCX</small><input type="file" name="businessPlan" accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" /></label>
          <label className="wide program-upload">Supporting document <small>Optional · Research, architecture, traction summary or other permitted material</small><input type="file" name="supportingDocument" accept=".pdf,.pptx,.docx" /></label>
          <label>Product / company website<input type="url" name="website" placeholder="https://" /></label><label>Demo / prototype link<input required={stage !== "Idea / Concept"} type="url" name="demo" placeholder={stage === "Idea / Concept" ? "Optional for idea stage" : "Required for this stage"} /></label>
          <label className="check wide"><input type="checkbox" name="confidential" />Some submitted materials contain confidential or restricted business information and require controlled reviewer access.</label>
        </fieldset>
        <fieldset><legend>7-day objective</legend>
          <div className="program-check-grid wide">{["Validate the problem", "Refine the business model", "Build a prototype", "Improve an MVP", "Develop an AI capability", "Test with users", "Improve product-market fit", "Prepare for pilots", "Prepare for partnerships", "Prepare for investment"].map((item) => <label className="check" key={item}><input type="checkbox" name="objectives" value={item} />{item}</label>)}</div>
          <label className="wide">What specific result would make the 7-day challenge successful for you? <small>Maximum 100 words.</small><textarea required name="success" rows={5} maxLength={900} /></label>
        </fieldset>
        <fieldset><legend>Final confirmations</legend>
          <label>How did you hear about StartupFair?<select required name="source" defaultValue=""><option value="" disabled>Select one</option><option>LinkedIn</option><option>University</option><option>Partner</option><option>Friend or Colleague</option><option>Community</option><option>Search</option><option>Other</option></select></label>
          <label className="check wide"><input required type="checkbox" />I have the authority and permission to submit these ideas, links and materials.</label><label className="check wide"><input required type="checkbox" />I understand that submitted materials are reviewed under challenge permissions and are not automatically made public.</label><label className="check wide"><input required type="checkbox" />I understand that selection does not guarantee funding, investment, a pilot, partnership or any commercial outcome.</label><label className="check wide"><input required type="checkbox" />I agree to the applicable StartupFair Privacy Policy, Terms of Use and Challenge Rules.</label>
        </fieldset>
        <div className="program-form-actions"><button className="button primary" type="submit">Submit Innovation Application</button><Link className="button" href="/apply/global-innovator">Back to Qualification</Link></div><PreviewNotice />
      </form></section>
    </Layout>
  );
}

export function GlobalProgramConfirmationPage({ program }: { program: "talent" | "innovator" }) {
  const talent = program === "talent";
  return (
    <Layout><section className="system-page"><div className="status">✓</div><span className="eyebrow">Application Flow Complete</span><h1>{talent ? "Talent Application Submitted" : "Innovation Application Submitted"}</h1><p>This beta branch demonstrates the final confirmation state. Production submission must generate a unique application ID, persist the application securely, store permitted files, send confirmation and place the record into the StartupFair review queue.</p><div className="actions"><Link className="button primary" href={talent ? "/challenges/global-ai-software-talent" : "/challenges/global-innovator"}>Back to Challenge</Link><Link className="button" href="/challenges">Explore Challenges</Link></div></section></Layout>
  );
}
