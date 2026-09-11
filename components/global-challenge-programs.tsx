"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
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
      <button className="mobile-menu-button" type="button" aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} onClick={() => setMenuOpen(open => !open)}>
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

function Section({ eyebrow, title, intro, children, soft = false, id }: { eyebrow: string; title: string; intro?: string; children: ReactNode; soft?: boolean; id?: string }) {
  return (
    <section id={id} className={`section ${soft ? "soft" : ""}`}>
      <div className="section-head"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div>{intro && <p>{intro}</p>}</div>
      {children}
    </section>
  );
}

function ProgramHero({ kind, title, copy, kickoff, applications, cohort, applyHref, note }: { kind: string; title: string; copy: string; kickoff: string; applications: string; cohort: string; applyHref: string; note: string }) {
  return (
    <section className="program-hero">
      <div>
        <div className="tags"><span>Global</span><span>{kind}</span><span>7-Day Challenge</span></div>
        <span className="eyebrow">StartupFair Global Challenge Series</span>
        <h1>{title}</h1>
        <p>{copy}</p>
        <div className="program-hero-actions"><Link className="button primary" href={applyHref}>Start Qualification</Link><a className="button" href="#timeline">View Schedule</a></div>
        <p className="program-micro-note">{note}</p>
      </div>
      <aside className="program-hero-card" aria-label="Program summary">
        <span>At a Glance</span>
        <div className="program-summary-grid">
          <div><small>Applications Open</small><strong>{applications}</strong></div>
          <div><small>Kickoff</small><strong>{kickoff}</strong></div>
          <div><small>Selected Cohort</small><strong>{cohort}</strong></div>
          <div><small>Format</small><strong>Global · 7 Days</strong></div>
        </div>
        <p className="program-summary-note">Applications may close earlier if capacity is reached. Selection and participation do not guarantee employment, funding, investment, a pilot or any commercial outcome.</p>
      </aside>
    </section>
  );
}

function Timeline({ rows }: { rows: [string, string, string?][] }) {
  return <div className="program-timeline">{rows.map(([label, date, copy]) => <div key={label}><span>{label}</span><strong>{date}</strong>{copy && <p>{copy}</p>}</div>)}</div>;
}

function CardGrid({ items, className = "program-card-grid" }: { items: [string, string][]; className?: string }) {
  return <div className={className}>{items.map(([title, copy]) => <article className="program-card" key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div>;
}

function PreviewNotice() {
  return <p className="program-preview-note"><strong>Website preview:</strong> information entered here is not transmitted or stored. Production requires secure persistence, validation, email verification, file scanning, reviewer workflow and notifications before public applications open.</p>;
}

const innovationThemes = ["Healthcare & Workforce Innovation", "Enterprise AI & Automation", "Fintech, Commerce & Digital Economy", "Education & Future of Work", "Climate & Sustainability", "Open Innovation"] as const;
const innovationStages = ["Idea / Concept", "Prototype", "MVP", "Existing Product / Startup", "Early Revenue / Pilot Stage"] as const;
const talentTracks = ["AI / ML / LLM & Agents", "Full-Stack Engineering", "Backend & Data Engineering", "Frontend Engineering", "DevOps / Cloud / Security"] as const;
const talentQuestions: Record<(typeof talentTracks)[number], string> = {
  "AI / ML / LLM & Agents": "A RAG system returns confident answers using the wrong source context. What would you inspect first, and how would you improve reliability?",
  "Full-Stack Engineering": "You are adding an AI feature to an existing web product. How would you decide what belongs in the frontend, backend and AI service boundaries?",
  "Backend & Data Engineering": "An API request is retried after a timeout and starts creating duplicate records. How would you make the workflow safe and idempotent?",
  "Frontend Engineering": "An AI feature can stream slowly, fail mid-response or return partial output. How would you design loading, streaming, failure and retry states?",
  "DevOps / Cloud / Security": "A production release causes errors immediately after deployment. What checks, rollback controls and preconditions should a safe release process include?",
};

const specializedChallenges = [
  { title: "AI Clinician Matching Challenge", type: "talent", status: "open", theme: "healthcare-workforce", category: "Healthcare · AI", copy: "Build an explainable matching engine connecting qualified clinicians with the right opportunities.", href: "/challenges/ai-clinician-matching" },
  { title: "Enterprise AI Agent Builder", type: "talent", status: "open", theme: "enterprise-ai", category: "Enterprise AI", copy: "Create a secure AI agent that improves a measurable workflow while preserving human review.", href: "/challenges/enterprise-ai-agent" },
  { title: "Publisher-to-Campaign Intelligence", type: "innovation", status: "soon", theme: "fintech-commerce", category: "Digital Commerce", copy: "Predict publisher and campaign fit using audience, content and conversion signals.", href: "/challenges/publisher-campaign-intelligence" },
] as const;

export function GlobalChallengesDirectoryPage() {
  const [filter, setFilter] = useState("all");
  const [theme, setTheme] = useState("");

  useEffect(() => {
    const queryTheme = new URLSearchParams(window.location.search).get("theme") ?? "";
    if (queryTheme) setTheme(queryTheme);
  }, []);

  const visible = specializedChallenges.filter(item => {
    if (theme) return item.theme === theme;
    if (filter === "all") return true;
    if (filter === "open" || filter === "soon") return item.status === filter;
    return item.type === filter;
  });

  const selectTheme = (value: string) => {
    setTheme(value);
    setFilter("all");
    const url = value ? `/challenges?theme=${encodeURIComponent(value)}` : "/challenges";
    window.history.replaceState({}, "", url);
    document.getElementById("specialized-challenges")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Layout>
      <section className="directory-hero">
        <span className="eyebrow">StartupFair Challenges</span>
        <h1>Real Problems. Proven Capability. Meaningful Outcomes.</h1>
        <p>Explore recurring global programs and specialized challenges designed to surface strong talent, advance practical innovation and create credible next-step opportunities.</p>
        <div className="program-hero-actions"><a className="button primary" href="#global-programs">Explore Global Programs</a><a className="button" href="#specialized-challenges">View Specialized Challenges</a></div>
      </section>

      <Section id="global-programs" eyebrow="Recurring Global Programs" title="Two Clear Ways to Participate." intro="One program focuses on demonstrated AI and software capability. The other focuses on advancing promising technology-driven innovations." soft>
        <div className="program-feature-grid">
          <article className="program-feature talent"><div className="tags"><span>Global Talent</span><span>Selective Application</span><span>Nov 2</span></div><h3>Global AI & Software Talent Challenge</h3><p>For experienced professionals, early-career builders, students and recent graduates. Qualification focuses on demonstrated work, technical thinking and practical ability.</p><strong>30–40 selected participants</strong><Link className="button primary" href="/challenges/global-ai-software-talent">View Talent Challenge</Link></article>
          <article className="program-feature innovator"><div className="tags"><span>Global Innovator</span><span>Idea to Existing Product</span><span>Nov 23</span></div><h3>Global Innovator Challenge</h3><p>For individuals, teams, researchers, founders and startups with original AI-enabled or technology-driven solutions.</p><strong>15–20 selected ideas / teams</strong><Link className="button primary" href="/challenges/global-innovator">View Innovator Challenge</Link></article>
        </div>
      </Section>

      <Section id="specialized-challenges" eyebrow="Specialized & Sponsored Challenges" title="Focused Problems With Specific Outcomes." intro="The existing StartupFair challenge work remains available for focused talent, innovation and sponsored programs.">
        <div className="program-filter-bar" aria-label="Challenge filters">
          {["all", "talent", "innovation", "open", "soon"].map(value => <button key={value} type="button" className={`program-filter ${filter === value && !theme ? "active" : ""}`} onClick={() => { setFilter(value); setTheme(""); window.history.replaceState({}, "", "/challenges"); }}>{value === "all" ? "All Challenges" : value === "soon" ? "Coming Soon" : value[0].toUpperCase() + value.slice(1)}</button>)}
          <span>{theme ? `Theme filter: ${theme.replaceAll("-", " ")}` : `${visible.length} specialized challenge${visible.length === 1 ? "" : "s"}`}</span>
        </div>
        <div className="program-special-grid">
          {visible.map(item => <article className="program-special-card" key={item.href}><div className="program-card-topline"><small>{item.category}</small><span>{item.status === "open" ? "Open" : "Coming Soon"}</span></div><h3>{item.title}</h3><p>{item.copy}</p><Link href={item.href}>View Challenge →</Link></article>)}
          {visible.length === 0 && <div className="program-empty-state"><strong>No specialized challenge is published in this theme yet.</strong><p>The recurring Global Innovator Challenge remains open across all six innovation themes.</p><Link href="/challenges/global-innovator">View Global Innovator Challenge →</Link></div>}
        </div>
      </Section>

      <Section eyebrow="Explore by Innovation Theme" title="Find Challenges Around the Problems You Care About." intro="Homepage theme links arrive here with the matching filter already selected." soft>
        <div className="program-theme-grid">
          {[
            ["healthcare-workforce", "Healthcare & Workforce"],
            ["enterprise-ai", "Enterprise AI & Automation"],
            ["fintech-commerce", "Fintech, Commerce & Digital Economy"],
            ["education", "Education & Future of Work"],
            ["climate", "Climate & Sustainability"],
            ["open-innovation", "Open Innovation"],
          ].map(([value, label]) => <button type="button" className={theme === value ? "active" : ""} key={value} onClick={() => selectTheme(value)}>{label}</button>)}
        </div>
      </Section>

      <section className="program-directory-cta"><h2>Have a Real Problem Worth Solving?</h2><p>Work with StartupFair to design a talent, innovation or venture challenge around your organization’s goals.</p><div className="program-hero-actions"><Link className="button light" href="/launch-challenge">Launch a Challenge</Link><Link className="button dark-outline" href="/for-organizations">Learn How It Works</Link></div></section>
    </Layout>
  );
}

export function GlobalTalentChallengePage() {
  const timeline: [string, string, string?][] = [
    ["Applications Open", "October 5, 2026", "Qualification becomes available."],
    ["Priority Deadline", "October 26", "Early review and capacity planning."],
    ["Final Deadline", "October 30", "Friday before kickoff."],
    ["Kickoff", "November 2", "Selected participants receive final instructions."],
    ["Build Period", "November 2–8", "Seven days to build, test and document."],
    ["Review", "November 9–11", "Structured evaluation and follow-up."],
    ["Results", "November 12", "Finalists and winners announced."],
    ["After Results", "Opportunity Follow-Through", "Relevant conversations where appropriate."],
  ];
  return (
    <Layout>
      <ProgramHero kind="Talent Challenge" title="Global AI & Software Talent Challenge" copy="A global skills-first program for experienced professionals, early-career builders, students and recent graduates who want to prove what they can build through real technical work." applications="Oct. 5, 2026" kickoff="Nov. 2, 2026" cohort="30–40" applyHref="/apply/global-ai-software-talent" note="5–7 minutes · Resume not required at this stage" />

      <Section eyebrow="Who Can Apply" title="Opportunity Based on Capability — Not Career Labels Alone." intro="Selection considers demonstrated work, technical thinking, ownership and potential contribution.">
        <CardGrid className="program-four-grid" items={[["Experienced Professionals", "Engineers and technical specialists with meaningful hands-on delivery experience."], ["Early-Career Builders", "Developers building real capability who want credible evidence beyond a résumé."], ["Students", "College or university students with strong technical foundations, projects or practical work."], ["Recent Graduates", "New graduates ready to demonstrate skills through practical, time-bound work."]]} />
      </Section>

      <Section eyebrow="Technical Tracks" title="Choose the Track That Best Represents Your Work." intro="Applicants select one primary track during qualification. StartupFair may rotate track-specific questions over time." soft>
        <div className="program-track-grid">{talentTracks.map((track, i) => <div key={track}><small>Track {String(i + 1).padStart(2, "0")}</small><strong>{track}</strong></div>)}</div>
      </Section>

      <Section eyebrow="Qualification First" title="Prove Enough to Earn the Full Application." intro="Applicants do not begin by uploading a résumé. The first step is a short skills-focused qualification.">
        <div className="program-six-flow">{[["Start Qualification", "Choose your level and primary track."], ["Verify Email", "Confirm a valid email in production."], ["Show Evidence", "Describe a project and your contribution."], ["Technical Thinking", "Answer a real-world and track-specific question."], ["Review", "StartupFair evaluates the qualification."], ["Full Application", "Only qualified applicants are invited forward."]].map(([title, copy], i) => <div key={title}><span>{String(i + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{copy}</p></div>)}</div>
      </Section>

      <Section eyebrow="Before a Résumé" title="Evidence, Ownership and Technical Thinking." intro="The qualification is short enough to complete, but substantive enough to separate real capability from generic registration." soft>
        <div className="program-split"><article><h3>Quick Qualification</h3><ul><li>Career level and technical track</li><li>Country, city and time zone</li><li>7-day commitment</li><li>Technologies used recently</li><li>Short project example and personal ownership</li><li>Evidence link or confidential-work explanation</li></ul></article><article><h3>Technical Thinking</h3><ul><li>Difficult technical problem and approach</li><li>One track-specific technical question</li><li>Short, focused responses</li><li>Material AI-tool usage disclosed</li><li>Human review for borderline cases</li></ul></article></div>
      </Section>

      <Section id="timeline" eyebrow="First Challenge Schedule" title="A Clear 7-Day Build Cycle." intro="The program includes qualification, selection, a focused build week, structured review and results."><Timeline rows={timeline} /><p className="program-notice"><strong>Schedule notice:</strong> Dates may be adjusted based on qualified application volume or program readiness. Selected applicants will be notified of material changes.</p></Section>

      <Section eyebrow="What We Look For" title="Structured Review — Not One Automatic Score." intro="StartupFair uses a structured framework to support consistency, but qualification and final selection include human review." soft>
        <CardGrid items={[["Evidence of Capability", "Meaningful work, code, product, academic or other credible proof."], ["Technical Thinking", "Reasoning, tradeoffs, reliability and clarity."], ["Problem Solving", "How the applicant approaches difficult situations."], ["Ownership & Growth", "Actual contribution, learning ability and potential."], ["Communication", "Focused explanations that make technical judgment understandable."]]} />
      </Section>

      <Section eyebrow="Recognition" title="More Than One Way to Stand Out." intro="Recognition reflects the kind of capability demonstrated rather than forcing every strong participant into one definition of winner.">
        <div className="program-award-grid">{["Best AI / ML Builder", "Best Full-Stack Solution", "Best Backend / Data Engineering", "Best Emerging Talent", "Best Production-Ready Solution", "Overall Talent Challenge Winner"].map(item => <span key={item}>{item}</span>)}</div>
      </Section>

      <Section eyebrow="Possible Pathways" title="Build → Prove → Get Recognized → Get Connected." intro="Strong work can create credible next-step conversations while avoiding promises that cannot be guaranteed." soft>
        <CardGrid className="program-four-grid" items={[["Verified Skills", "Challenge results and supporting evidence can strengthen a participant’s StartupFair profile."], ["Recognition", "Finalists and winners may receive challenge-specific recognition and verified achievement records."], ["Hiring Consideration", "Qualified participants may be considered for relevant hiring introductions where opportunities exist."], ["Projects & Contracts", "Relevant participants may be considered for project or contract discussions where available."]]} />
      </Section>

      <Section eyebrow="Privacy & Visibility" title="Your Qualification Is Not Automatically Public." intro="Qualification responses, résumés, work samples and contact information remain private by default. Talent Network and public portfolio visibility require separate choices.">
        <div className="center"><Link className="button primary" href="/apply/global-ai-software-talent">Start Qualification</Link></div>
      </Section>

      <Section eyebrow="Frequently Asked Questions" title="What Applicants Should Know." soft>
        <div className="program-faq">
          <details><summary>Do I need to upload a résumé to start?</summary><p>No. Qualification focuses first on your track, real work, evidence and technical thinking.</p></details>
          <details><summary>Can students and recent graduates apply?</summary><p>Yes. The program is designed for experienced professionals, early-career builders, students and recent graduates.</p></details>
          <details><summary>Can I use AI tools?</summary><p>Yes when permitted by the challenge rules. Material use should be disclosed and participants remain responsible for the work.</p></details>
          <details><summary>Does selection guarantee a job or paid project?</summary><p>No. StartupFair creates pathways and relevant introductions; no employment or paid-work outcome is guaranteed.</p></details>
        </div>
      </Section>
    </Layout>
  );
}

function ProgressTabs({ steps, current, setCurrent }: { steps: string[]; current: number; setCurrent: (step: number) => void }) {
  return <div className="program-progress-wrap"><div className="program-progress-tabs">{steps.map((step, i) => <button type="button" key={step} className={`${i === current ? "active" : ""} ${i < current ? "done" : ""}`} onClick={() => setCurrent(i)}><small>Step {i + 1}</small><strong>{step}</strong></button>)}</div><div className="program-progress-bar"><span style={{ width: `${((current + 1) / steps.length) * 100}%` }} /></div></div>;
}

function QualificationSubmitted({ program }: { program: "talent" | "innovator" }) {
  const talent = program === "talent";
  return <section className="program-submitted"><div className="status">✓</div><span className="eyebrow">Qualification Submitted</span><h1>{talent ? "Your Qualification Is Under Review." : "Your Innovation Qualification Is Under Review."}</h1><p>StartupFair will review the information you submitted. If you advance, you will receive a separate invitation to complete the full application.</p><div className="program-next-grid"><div><span>01</span><strong>Review</strong><p>Structured screening of your evidence and responses.</p></div><div><span>02</span><strong>Decision</strong><p>Advance, manual review or not selected for this cohort.</p></div><div><span>03</span><strong>Full Application</strong><p>Qualified applicants receive the next-stage application.</p></div></div><p className="program-preview-note">Preview only — this state does not store or send the qualification.</p></section>;
}

export function GlobalTalentQualificationPage() {
  const steps = ["Email & Eligibility", "Level & Track", "Evidence", "Technical Thinking", "Review & Submit"];
  const [step, setStep] = useState(0);
  const [track, setTrack] = useState<(typeof talentTracks)[number]>(talentTracks[0]);
  const [submitted, setSubmitted] = useState(false);
  if (submitted) return <Layout><QualificationSubmitted program="talent" /></Layout>;
  return (
    <Layout>
      <section className="program-form-hero"><span className="eyebrow">Global AI & Software Talent Challenge</span><h1>Qualification</h1><p>Show enough real evidence and technical thinking for StartupFair to determine whether you should advance. A résumé is not required at this stage.</p><small>Estimated time · 5–7 minutes</small></section>
      <section className="program-form-shell">
        <ProgressTabs steps={steps} current={step} setCurrent={setStep} />
        <form className="program-form program-wizard" noValidate onSubmit={event => event.preventDefault()}>
          <fieldset className={step === 0 ? "program-step active" : "program-step"}><legend>Verify your email and basic eligibility</legend><label>First name<input name="firstName" autoComplete="given-name" /></label><label>Last name<input name="lastName" autoComplete="family-name" /></label><label className="wide">Email address<input type="email" name="email" autoComplete="email" /></label><label>Country<input name="country" /></label><label>City<input name="city" /></label><label>Time zone<input name="timezone" placeholder="Example: Pacific Time / UTC−7" /></label><label className="check wide"><input type="checkbox" />I can commit to the full 7-day challenge if selected.</label><label className="check wide"><input type="checkbox" />I agree to receive qualification and challenge-related communications from StartupFair.</label></fieldset>

          <fieldset className={step === 1 ? "program-step active" : "program-step"}><legend>Choose your level and technical track</legend><label>Applicant level<select name="careerStage" defaultValue=""><option value="" disabled>Select one</option><option>Experienced Professional</option><option>Early Career</option><option>Student</option><option>Recent Graduate</option></select></label><label>Hands-on experience<select name="experience" defaultValue=""><option value="" disabled>Select one</option><option>Less than 1 year</option><option>1–2 years</option><option>3–5 years</option><option>6–10 years</option><option>10+ years</option></select></label><label className="wide">Primary technical track<select name="track" value={track} onChange={e => setTrack(e.target.value as (typeof talentTracks)[number])}>{talentTracks.map(item => <option key={item}>{item}</option>)}</select></label><label className="wide">Technologies used recently<textarea name="technologies" rows={4} placeholder="Example: Python, TypeScript, React, PostgreSQL, AWS, RAG" /></label><label className="check wide"><input type="checkbox" />I will disclose material use of AI tools where required.</label></fieldset>

          <fieldset className={step === 2 ? "program-step active" : "program-step"}><legend>Show evidence of real work</legend><label className="wide">Describe one recent project <small>Maximum 100 words</small><textarea name="project" rows={5} maxLength={900} /></label><label className="wide">What did you personally own? <small>Maximum 75 words</small><textarea name="ownership" rows={4} maxLength={700} /></label><label className="wide">Evidence link <small>GitHub, portfolio, live demo, academic project or similar</small><input type="url" name="evidence" placeholder="https://" /></label><label className="wide">If your strongest work is confidential, explain what can be verified safely <small>Optional</small><textarea name="confidential" rows={4} /></label></fieldset>

          <fieldset className={step === 3 ? "program-step active" : "program-step"}><legend>Show how you think</legend><label className="wide">Describe a difficult technical problem you faced and how you solved it <small>Maximum 100 words</small><textarea name="problemSolving" rows={5} maxLength={900} /></label><div className="program-question"><small>{track}</small><strong>{talentQuestions[track]}</strong><p>Focus on your diagnostic approach, tradeoffs and practical judgment.</p></div><label className="wide">Your response <small>Maximum 100 words</small><textarea name="technicalAnswer" rows={5} maxLength={900} /></label></fieldset>

          <fieldset className={step === 4 ? "program-step active" : "program-step"}><legend>Review and submit qualification</legend><div className="program-review-grid wide"><div><small>Applicant Level</small><strong>Career stage selected above</strong></div><div><small>Technical Track</small><strong>{track}</strong></div><div><small>Evidence</small><strong>Project + ownership + supporting evidence</strong></div><div><small>Technical Thinking</small><strong>Problem solving + track response</strong></div></div><p className="program-review-note wide"><strong>What happens next?</strong> StartupFair reviews the qualification. Strong submissions may advance; borderline cases may receive manual review. The full application is not unlocked automatically by this preview.</p><label className="check wide"><input type="checkbox" />I confirm that the information provided reflects my own experience and contribution.</label><label className="check wide"><input type="checkbox" />I understand that qualification does not guarantee advancement, selection, employment or paid work.</label></fieldset>

          <div className="program-wizard-actions"><button className="button" type="button" disabled={step === 0} onClick={() => setStep(Math.max(0, step - 1))}>Back</button>{step < steps.length - 1 ? <button className="button primary" type="button" onClick={() => setStep(Math.min(steps.length - 1, step + 1))}>Continue</button> : <button className="button primary" type="button" onClick={() => setSubmitted(true)}>Submit Qualification</button>}</div>
          <PreviewNotice />
        </form>
      </section>
    </Layout>
  );
}

export function GlobalTalentFullApplicationPage() {
  const steps = ["Contact & Identity", "Resume & Links", "Background", "Availability & Preferences", "Visibility & Consent", "Review & Submit"];
  const [step, setStep] = useState(0);
  return (
    <Layout>
      <section className="program-form-hero"><div className="program-invite-banner">Qualification approval required · Full application invited</div><span className="eyebrow">Global AI & Software Talent Challenge</span><h1>Full Application</h1><p>Qualified applicants complete résumé, background, availability and optional opportunity preferences here.</p><small>Estimated time · 8–12 minutes</small></section>
      <section className="program-form-shell"><ProgressTabs steps={steps} current={step} setCurrent={setStep} /><form className="program-form program-wizard" noValidate onSubmit={event => event.preventDefault()}>
        <fieldset className={step === 0 ? "program-step active" : "program-step"}><legend>Confirm identity and contact details</legend><label>Legal first name<input name="firstName" /></label><label>Legal last name<input name="lastName" /></label><label>Preferred name <small>Optional</small><input name="preferredName" /></label><label>Email<input type="email" name="email" /></label><label>Mobile number <small>Recommended</small><input type="tel" name="phone" /></label><label>Country<input name="country" /></label><label>City<input name="city" /></label><label>Time zone<input name="timezone" /></label></fieldset>
        <fieldset className={step === 1 ? "program-step active" : "program-step"}><legend>Resume and professional links</legend><label className="wide program-upload">Résumé / CV <small>PDF or DOCX · Production limit: 5 MB</small><input type="file" name="resume" accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" /></label><label>LinkedIn profile<input type="url" name="linkedin" placeholder="https://" /></label><label>GitHub profile<input type="url" name="github" placeholder="https://" /></label><label>Portfolio / website<input type="url" name="portfolio" placeholder="https://" /></label><label>Live product / demo <small>Optional</small><input type="url" name="demo" placeholder="https://" /></label><label className="wide">Additional work sample <small>Optional link; no ZIP or executable upload</small><input type="url" name="workSample" placeholder="https://" /></label></fieldset>
        <fieldset className={step === 2 ? "program-step active" : "program-step"}><legend>Professional or academic background</legend><label>Current status<select name="status" defaultValue=""><option value="" disabled>Select one</option><option>Employed</option><option>Independent / Consultant</option><option>Student</option><option>Recent Graduate</option><option>Between Opportunities</option><option>Founder / Business Owner</option></select></label><label>Current / recent title<input name="title" /></label><label>Employer / institution <small>Optional</small><input name="organization" /></label><label>Highest education<select name="education" defaultValue=""><option value="" disabled>Select one</option><option>High School / Secondary</option><option>Associate / Diploma</option><option>Bachelor&apos;s</option><option>Master&apos;s</option><option>Doctorate</option><option>Other / Self-Taught</option></select></label><label>Field of study <small>Optional</small><input name="field" /></label><label>Graduation year <small>Optional</small><input type="number" name="gradYear" /></label><label className="wide">Short professional summary <small>Maximum 150 words</small><textarea name="summary" rows={5} /></label></fieldset>
        <fieldset className={step === 3 ? "program-step active" : "program-step"}><legend>Availability and opportunity preferences</legend><label>Challenge availability<select name="challengeAvailability" defaultValue=""><option value="" disabled>Select one</option><option>Fully available for the 7-day challenge</option><option>Available outside standard work hours</option><option>Available with scheduling constraints</option></select></label><label>Weekly availability after challenge<select name="weeklyAvailability" defaultValue=""><option value="" disabled>Select one</option><option>Full-time</option><option>20–40 hours</option><option>10–19 hours</option><option>Under 10 hours</option><option>Depends on opportunity</option></select></label><div className="program-check-grid wide">{["Full-Time Roles", "Contract / Consulting", "Paid Projects", "Startup / Venture Teams", "Research Collaboration", "Challenge Only"].map(item => <label className="check" key={item}><input type="checkbox" name="opportunities" value={item} />{item}</label>)}</div><label>Preferred work arrangement<select name="arrangement" defaultValue=""><option value="" disabled>Select one</option><option>Remote</option><option>Hybrid</option><option>Onsite</option><option>Open to multiple</option></select></label><label>Work authorization / geographic notes <small>Optional</small><input name="authorization" /></label></fieldset>
        <fieldset className={step === 4 ? "program-step active" : "program-step"}><legend>Visibility and consent</legend><label className="check wide"><input type="radio" name="visibility" value="challenge-only" defaultChecked />Challenge Only — default; use information for this challenge and administration.</label><label className="check wide"><input type="radio" name="visibility" value="talent-network" />Talent Network — approved organizations may discover selected professional information after opt-in.</label><label className="check wide"><input type="radio" name="visibility" value="public-portfolio" />Public Portfolio — only information and achievements I explicitly approve.</label><label className="check wide"><input type="checkbox" />StartupFair may contact me about other relevant challenges.</label><label className="check wide"><input type="checkbox" />StartupFair may contact me about relevant hiring, contract or project opportunities.</label><label className="check wide"><input type="checkbox" />StartupFair must request permission before a protected introduction to an external organization.</label></fieldset>
        <fieldset className={step === 5 ? "program-step active" : "program-step"}><legend>Review and submit full application</legend><div className="program-review-grid wide"><div><small>Qualification</small><strong>Approved / invited</strong></div><div><small>Résumé</small><strong>Required at production submission</strong></div><div><small>Opportunity Preferences</small><strong>Separate from challenge judging</strong></div><div><small>Visibility</small><strong>Challenge Only / Talent Network / Public Portfolio</strong></div></div><p className="program-review-note wide">Completing the full application does not mean automatic cohort selection. StartupFair reviews qualification results, application completeness, track capacity and program requirements.</p><label className="check wide"><input type="checkbox" />I confirm this application is accurate and the submitted materials are mine or shared with permission.</label><label className="check wide"><input type="checkbox" />I agree to the applicable Privacy Policy, Terms of Use and challenge-specific rules.</label></fieldset>
        <div className="program-wizard-actions"><button className="button" type="button" disabled={step === 0} onClick={() => setStep(Math.max(0, step - 1))}>Back</button>{step < steps.length - 1 ? <button className="button primary" type="button" onClick={() => setStep(step + 1)}>Continue</button> : <button className="button primary" type="button" onClick={() => window.location.assign("/apply/global-ai-software-talent/confirmation")}>Submit Full Application</button>}</div><PreviewNotice />
      </form></section>
    </Layout>
  );
}

export function GlobalInnovatorChallengePage() {
  const timeline: [string, string, string?][] = [["Applications Open", "October 26, 2026", "Qualification becomes available."], ["Priority Deadline", "November 16", "Early review and capacity planning."], ["Final Deadline", "November 20", "Friday before kickoff."], ["Kickoff", "November 23", "Selected innovators receive program instructions."], ["Build / Validate", "November 23–29", "Seven days to advance the work."], ["Review", "Nov. 30–Dec. 2", "Structured evaluation and follow-up."], ["Results", "December 3", "Finalists and winners announced."], ["After Results", "Opportunity Follow-Through", "Relevant mentor, pilot or venture discussions."]];
  return (
    <Layout>
      <ProgramHero kind="Innovator Challenge" title="Global Innovator Challenge" copy="A global challenge for individuals, teams, researchers, founders and startups with original AI-enabled or technology-driven ideas that can solve meaningful real-world problems." applications="Oct. 26, 2026" kickoff="Nov. 23, 2026" cohort="15–20 ideas / teams" applyHref="/apply/global-innovator" note="7–10 minutes · Pitch deck not required at this stage" />
      <Section eyebrow="Who Can Participate" title="Strong Ideas Can Come From Different Kinds of Builders." intro="The program welcomes individuals, teams, researchers, students, founders and startups when the problem and solution are credible enough to evaluate."><CardGrid className="program-four-grid" items={[["Individuals", "Independent innovators with a well-defined problem and original solution concept."], ["Teams", "Multidisciplinary teams combining technical, product, research or industry capability."], ["Researchers & Students", "Academic or applied teams developing practical solutions with real-world potential."], ["Founders & Startups", "Existing ventures that want to improve, validate or advance a meaningful solution."]]} /></Section>
      <Section eyebrow="Stage of Innovation" title="From Idea to Existing Product." intro="Stage determines the evidence expected and the materials requested later." soft><div className="program-stage-grid">{innovationStages.map((item, i) => <div key={item}><small>Stage {String(i + 1).padStart(2, "0")}</small><strong>{item}</strong></div>)}</div></Section>
      <Section eyebrow="Innovation Themes" title="Open Across Industries." intro="Theme and stage are separate. Strong early ideas and operating startups can participate in the same theme while being judged in the right context."><div className="program-theme-static">{innovationThemes.map(item => <span key={item}>{item}</span>)}</div></Section>
      <Section eyebrow="Qualification First" title="Show the Problem and Potential Before Uploading a Deck." intro="Applicants first demonstrate why the problem matters, why the solution is different and why they are capable of advancing it." soft><div className="program-six-flow">{[["Start Qualification", "Choose applicant type, stage and theme."], ["Verify Email", "Confirm a valid email in production."], ["Define the Problem", "Explain the user, evidence and why now."], ["Explain the Solution", "Describe technology, differentiation and value."], ["Review", "StartupFair evaluates credibility and fit."], ["Full Application", "Qualified innovators submit stage-appropriate materials."]].map(([title, copy], i) => <div key={title}><span>{String(i + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{copy}</p></div>)}</div></Section>
      <Section id="timeline" eyebrow="First Challenge Schedule" title="A Focused Week to Advance the Innovation." intro="The program is designed to create meaningful progress, not just another pitch presentation."><Timeline rows={timeline} /><p className="program-notice"><strong>Schedule notice:</strong> Dates may be adjusted based on qualified application volume or program readiness. Selected applicants will be notified of material changes.</p></Section>
      <Section eyebrow="Challenge Objectives" title="What Should Change in 7 Days?" intro="Each selected innovator enters with a measurable objective appropriate to the current stage." soft><div className="program-objective-grid">{["Validate the Problem", "Refine the Business Model", "Build a Prototype", "Improve an MVP", "Develop or Improve the AI", "Test With Users", "Advance Product-Market Fit", "Prepare for a Pilot or Partnership", "Prepare for Accelerator / Investor Review"].map(item => <span key={item}>{item}</span>)}</div></Section>
      <Section eyebrow="Final Deliverables by Stage" title="Different Stages. Different Proof." intro="An existing startup should not win simply because it arrived with a polished product. Evaluation considers meaningful progress during the challenge."><CardGrid items={[["Idea Stage", "Refined problem, validation evidence, solution, business model, market view, deck or executive summary and presentation video."], ["Prototype / MVP", "Core validation plus a working demonstration, technical explanation, user evidence and what materially changed during the challenge."], ["Existing Product / Startup", "Product demonstration, traction where available, challenge progress, growth or pilot plan, deck and presentation video."]]} /></Section>
      <Section eyebrow="Recognition & Opportunity" title="Validate → Build → Get Recognized → Explore Opportunities." intro="Relevant mentor, pilot, partnership, accelerator or investor discussions may follow where there is a credible fit and appropriate consent." soft><div className="program-award-grid">{["Most Innovative Solution / Idea", "Best AI Application", "Best Real-World Impact", "Best Business Potential", "Best Emerging Innovator", "Best Prototype / MVP", "Overall Global Innovator Winner"].map(item => <span key={item}>{item}</span>)}</div><p className="program-notice">No funding, investment, pilot, partnership or commercial outcome is guaranteed.</p></Section>
      <Section eyebrow="Privacy, IP & Confidentiality" title="Your Unpublished Work Is Not Automatically Public." intro="Pitch decks, business plans, source code, unpublished research and customer information remain private by default. Public showcase use requires appropriate permission."><div className="center"><Link className="button primary" href="/apply/global-innovator">Start Qualification</Link></div></Section>
      <Section eyebrow="Frequently Asked Questions" title="What Innovators Should Know." soft><div className="program-faq"><details><summary>Do I need a startup or company to apply?</summary><p>No. Individuals, teams, researchers, students, founders and startups may apply.</p></details><details><summary>Do I need a prototype?</summary><p>No. Idea-stage applicants may qualify without a prototype if the problem, reasoning and execution potential are strong.</p></details><details><summary>Do I need a pitch deck immediately?</summary><p>No. The first step is a short innovation qualification. Stage-appropriate materials come later for qualified applicants.</p></details><details><summary>Does selection guarantee funding or an investor meeting?</summary><p>No. Relevant introductions may occur where appropriate, but no funding, investment or commercial outcome is guaranteed.</p></details></div></Section>
    </Layout>
  );
}

export function GlobalInnovatorQualificationPage() {
  const steps = ["Email & Eligibility", "Applicant, Stage & Theme", "Problem & Evidence", "Solution & Execution", "Review & Submit"];
  const [step, setStep] = useState(0);
  const [stage, setStage] = useState<(typeof innovationStages)[number]>(innovationStages[0]);
  const [submitted, setSubmitted] = useState(false);
  if (submitted) return <Layout><QualificationSubmitted program="innovator" /></Layout>;
  const stagePrompt = stage === "Idea / Concept" ? "What have you done so far to understand whether this is a real problem?" : stage === "Prototype" ? "What did the prototype help you learn that you did not know before you built it?" : stage === "MVP" ? "What real usage, feedback or behavior shows that the MVP is solving something valuable?" : "What traction, customer, pilot or revenue evidence exists today, and what important problem still needs to be solved?";
  return (
    <Layout>
      <section className="program-form-hero"><span className="eyebrow">Global Innovator Challenge</span><h1>Qualification</h1><p>Show us the problem, why it matters, how your solution is different and why you or your team can move it forward. A pitch deck is not required at this stage.</p><small>Estimated time · 7–10 minutes</small></section>
      <section className="program-form-shell"><ProgressTabs steps={steps} current={step} setCurrent={setStep} /><form className="program-form program-wizard" noValidate onSubmit={event => event.preventDefault()}>
        <fieldset className={step === 0 ? "program-step active" : "program-step"}><legend>Verify email and basic eligibility</legend><label>First name<input name="firstName" /></label><label>Last name<input name="lastName" /></label><label className="wide">Email address<input type="email" name="email" /></label><label>Country<input name="country" /></label><label>City<input name="city" /></label><label>Time zone<input name="timezone" /></label><label className="check wide"><input type="checkbox" />I can commit to the full 7-day challenge if selected.</label><label className="check wide"><input type="checkbox" />I will disclose material use of existing IP, AI tools, third-party technology and outside datasets where required.</label></fieldset>
        <fieldset className={step === 1 ? "program-step active" : "program-step"}><legend>Applicant, stage and theme</legend><label>Applicant type<select name="applicantType" defaultValue=""><option value="" disabled>Select one</option><option>Individual</option><option>Team</option><option>Startup / Company</option><option>Student / Research Team</option></select></label><label>Current stage<select name="stage" value={stage} onChange={e => setStage(e.target.value as (typeof innovationStages)[number])}>{innovationStages.map(item => <option key={item}>{item}</option>)}</select></label><label className="wide">Primary theme<select name="theme" defaultValue=""><option value="" disabled>Select one</option>{innovationThemes.map(item => <option key={item}>{item}</option>)}</select></label></fieldset>
        <fieldset className={step === 2 ? "program-step active" : "program-step"}><legend>Define the problem and evidence</legend><label className="wide">What problem are you solving? <small>Maximum 75 words</small><textarea name="problem" rows={4} maxLength={700} /></label><label className="wide">Who experiences this problem? <small>Maximum 50 words</small><textarea name="user" rows={3} maxLength={500} /></label><label className="wide">Why does this problem matter now? <small>Maximum 75 words</small><textarea name="whyNow" rows={4} maxLength={700} /></label><label>Evidence type<select name="evidenceType" defaultValue=""><option value="" disabled>Select one</option><option>Customer / user interviews</option><option>Industry experience</option><option>Research / academic evidence</option><option>Current customers / pilot</option><option>Revenue / paid usage</option><option>Waitlist / usage signals</option><option>Market research</option><option>No formal evidence yet</option></select></label><label>Supporting link <small>Optional</small><input type="url" name="evidenceLink" placeholder="https://" /></label><div className="program-question"><small>{stage}</small><strong>{stagePrompt}</strong></div><label className="wide">Stage-specific evidence or learning <small>Maximum 100 words</small><textarea name="stageEvidence" rows={5} maxLength={900} /></label></fieldset>
        <fieldset className={step === 3 ? "program-step active" : "program-step"}><legend>Explain solution and execution</legend><label className="wide">Describe your solution <small>Maximum 100 words</small><textarea name="solution" rows={5} maxLength={900} /></label><label className="wide">How does AI or technology materially enable it? <small>Maximum 75 words</small><textarea name="technologyRole" rows={4} maxLength={700} /></label><label className="wide">What makes it different from current alternatives? <small>Maximum 75 words</small><textarea name="difference" rows={4} maxLength={700} /></label><label className="wide">What do users do today instead? <small>Maximum 75 words</small><textarea name="alternatives" rows={4} maxLength={700} /></label><label className="wide">Why is your team equipped to move this forward? <small>Maximum 100 words</small><textarea name="team" rows={5} maxLength={900} /></label><label>Primary 7-day objective<select name="objective" defaultValue=""><option value="" disabled>Select one</option>{["Validate the problem", "Refine the business model", "Build a prototype", "Improve the MVP", "Develop or improve the AI", "Test with users", "Advance product-market fit", "Prepare for a pilot or partnership", "Prepare for accelerator or investor review"].map(item => <option key={item}>{item}</option>)}</select></label><label>Measurable result<input name="result" /></label></fieldset>
        <fieldset className={step === 4 ? "program-step active" : "program-step"}><legend>Review and submit qualification</legend><div className="program-review-grid wide"><div><small>Current Stage</small><strong>{stage}</strong></div><div><small>Problem</small><strong>Problem + user + why now</strong></div><div><small>Evidence</small><strong>Stage-appropriate validation</strong></div><div><small>Execution</small><strong>Team + 7-day objective</strong></div></div><p className="program-review-note wide">StartupFair reviews the qualification using a structured framework. Strong applications may advance; borderline cases may receive manual review. The full application is not unlocked automatically by this preview.</p><label className="check wide"><input type="checkbox" />I confirm the information is accurate and I have the right to submit the ideas described.</label><label className="check wide"><input type="checkbox" />I understand qualification does not guarantee selection, funding, investment, a pilot or partnership.</label></fieldset>
        <div className="program-wizard-actions"><button className="button" type="button" disabled={step === 0} onClick={() => setStep(Math.max(0, step - 1))}>Back</button>{step < steps.length - 1 ? <button className="button primary" type="button" onClick={() => setStep(step + 1)}>Continue</button> : <button className="button primary" type="button" onClick={() => setSubmitted(true)}>Submit Qualification</button>}</div><PreviewNotice />
      </form></section>
    </Layout>
  );
}

export function GlobalInnovatorFullApplicationPage() {
  const steps = ["Contact & Applicant", "Team & Stage", "Materials & Evidence", "Market & Challenge Goal", "Privacy, IP & Consent", "Review & Submit"];
  const [step, setStep] = useState(0);
  const [stage, setStage] = useState<(typeof innovationStages)[number]>(innovationStages[0]);
  return (
    <Layout>
      <section className="program-form-hero"><div className="program-invite-banner">Qualification approval required · Full application invited</div><span className="eyebrow">Global Innovator Challenge</span><h1>Full Application</h1><p>Qualified innovators provide stage-appropriate information, evidence and private supporting materials here.</p><small>Estimated time · 12–18 minutes</small></section>
      <section className="program-form-shell"><ProgressTabs steps={steps} current={step} setCurrent={setStep} /><form className="program-form program-wizard" noValidate onSubmit={event => event.preventDefault()}>
        <fieldset className={step === 0 ? "program-step active" : "program-step"}><legend>Confirm primary applicant and contact</legend><label>First name<input name="firstName" /></label><label>Last name<input name="lastName" /></label><label>Email<input type="email" name="email" /></label><label>Mobile number <small>Recommended</small><input type="tel" name="phone" /></label><label>Country<input name="country" /></label><label>City<input name="city" /></label><label>Applicant type<select name="applicantType" defaultValue=""><option value="" disabled>Select one</option><option>Individual</option><option>Team</option><option>Startup / Company</option><option>Student / Research Team</option></select></label><label>Primary theme<select name="theme" defaultValue=""><option value="" disabled>Select one</option>{innovationThemes.map(item => <option key={item}>{item}</option>)}</select></label><label className="wide">Working title of the innovation<input name="title" /></label></fieldset>
        <fieldset className={step === 1 ? "program-step active" : "program-step"}><legend>Team and current stage</legend><label className="wide">Current stage<select name="stage" value={stage} onChange={e => setStage(e.target.value as (typeof innovationStages)[number])}>{innovationStages.map(item => <option key={item}>{item}</option>)}</select></label><label>Team size<input type="number" min="1" name="teamSize" /></label><label>Year started <small>Optional for idea stage</small><input type="number" name="yearStarted" /></label><label>Startup / organization name <small>If applicable</small><input name="organization" /></label><label>Website <small>Optional</small><input type="url" name="website" placeholder="https://" /></label><label className="wide">Team members and roles <small>Maximum 200 words</small><textarea name="members" rows={5} /></label><label className="wide">Why is this team equipped to advance the innovation? <small>Maximum 150 words</small><textarea name="teamCapability" rows={5} /></label></fieldset>
        <fieldset className={step === 2 ? "program-step active" : "program-step"}><legend>Stage-appropriate materials and evidence</legend><div className="program-material-summary wide"><small>{stage}</small><strong>{stage === "Idea / Concept" ? "Pitch deck OR executive summary; prototype is optional." : stage === "Prototype" ? "Pitch deck or executive summary plus prototype / demo." : stage === "MVP" ? "Pitch material plus working product / demo and user evidence where available." : "Pitch deck plus product / demo and stronger team or traction context."}</strong></div><label className="wide program-upload">Primary pitch material <small>PDF, DOCX, PPT or PPTX · Production limit: 10 MB</small><input type="file" name="pitch" accept=".pdf,.docx,.ppt,.pptx" /></label><label>Product / demo link <small>{stage === "Idea / Concept" ? "Optional" : "Expected"}</small><input type="url" name="demo" placeholder="https://" /></label><label>Research / customer evidence <small>Optional</small><input type="url" name="evidence" placeholder="https://" /></label><label>Technical / architecture link <small>Optional</small><input type="url" name="architecture" placeholder="https://" /></label><label>GitHub / repository link <small>Optional</small><input type="url" name="github" placeholder="https://" /></label><label className="wide">Presentation / product video <small>Optional at application stage · URL preferred</small><input type="url" name="video" placeholder="https://" /></label></fieldset>
        <fieldset className={step === 3 ? "program-step active" : "program-step"}><legend>Market and 7-day challenge goal</legend><label className="wide">Who is the primary customer, user or beneficiary? <small>Maximum 100 words</small><textarea name="customer" rows={4} /></label><label className="wide">How large or important is the opportunity? <small>Maximum 120 words</small><textarea name="market" rows={4} /></label><label className="wide">What traction or validation exists today? <small>Maximum 120 words</small><textarea name="traction" rows={4} /></label><label>Primary challenge objective<select name="objective" defaultValue=""><option value="" disabled>Select one</option>{["Validate the problem", "Refine the business model", "Build a prototype", "Improve the MVP", "Develop or improve the AI", "Test with users", "Advance product-market fit", "Prepare for a pilot or partnership", "Prepare for accelerator or investor review"].map(item => <option key={item}>{item}</option>)}</select></label><label>Challenge availability<select name="availability" defaultValue=""><option value="" disabled>Select one</option><option>Fully available</option><option>Available with scheduling constraints</option><option>Team coverage available throughout</option></select></label><label className="wide">What measurable result would make the seven days successful? <small>Maximum 100 words</small><textarea name="success" rows={4} /></label></fieldset>
        <fieldset className={step === 4 ? "program-step active" : "program-step"}><legend>Privacy, IP and consent</legend><label className="check wide"><input type="checkbox" />I have the right to submit the ideas, documents, links and materials included in this application.</label><label className="check wide"><input type="checkbox" />I understand that submitting pre-existing intellectual property does not automatically transfer ownership to StartupFair.</label><label className="check wide"><input type="checkbox" />I understand challenge-specific IP, licensing, disclosure or commercialization terms may be presented separately before participation or final submission.</label><label className="check wide"><input type="checkbox" />StartupFair may contact me about relevant mentor, pilot, partnership, accelerator or investor opportunities.</label><label className="check wide"><input type="checkbox" />StartupFair must request permission before sharing protected contact details or non-public materials externally.</label><label className="wide">Public showcase preference<select name="showcase" defaultValue="private"><option value="private">Private by Default</option><option value="summary">Public Summary Only</option><option value="eligible">Showcase Eligible</option><option value="later">Ask Me Later</option></select></label></fieldset>
        <fieldset className={step === 5 ? "program-step active" : "program-step"}><legend>Review and submit full application</legend><div className="program-review-grid wide"><div><small>Qualification</small><strong>Approved / invited</strong></div><div><small>Current Stage</small><strong>{stage}</strong></div><div><small>Materials</small><strong>Stage-appropriate application package</strong></div><div><small>Privacy</small><strong>Private by default unless separately approved</strong></div></div><p className="program-review-note wide">Completing the full application does not automatically mean selection. StartupFair may consider qualification results, stage, evidence, originality, team capability, cohort balance and program capacity.</p><label className="check wide"><input type="checkbox" />I confirm this application is accurate and materials are mine or shared with permission.</label><label className="check wide"><input type="checkbox" />I understand selection, funding, investment, pilots, partnerships and commercial outcomes are not guaranteed.</label><label className="check wide"><input type="checkbox" />I agree to the applicable Privacy Policy, Terms of Use and challenge-specific rules.</label></fieldset>
        <div className="program-wizard-actions"><button className="button" type="button" disabled={step === 0} onClick={() => setStep(Math.max(0, step - 1))}>Back</button>{step < steps.length - 1 ? <button className="button primary" type="button" onClick={() => setStep(step + 1)}>Continue</button> : <button className="button primary" type="button" onClick={() => window.location.assign("/apply/global-innovator/confirmation")}>Submit Full Application</button>}</div><PreviewNotice />
      </form></section>
    </Layout>
  );
}

export function GlobalProgramConfirmationPage({ program }: { program: "talent" | "innovator" }) {
  const talent = program === "talent";
  return (
    <Layout><section className="system-page"><div className="status">✓</div><span className="eyebrow">Application Submitted</span><h1>{talent ? "Your Talent Application Has Been Submitted." : "Your Innovator Application Has Been Submitted."}</h1><p>StartupFair will review the full application for final challenge selection. This confirms the application-stage experience only; it does not mean the applicant or team has been selected.</p><div className="program-next-grid"><div><span>01</span><strong>Application Review</strong><p>Completeness, qualification results and cohort fit.</p></div><div><span>02</span><strong>Decision</strong><p>Selected, waitlisted or not selected.</p></div><div><span>03</span><strong>Challenge Onboarding</strong><p>Selected participants receive final rules, schedule and instructions.</p></div></div><PreviewNotice /><div className="actions"><Link className="button primary" href={talent ? "/challenges/global-ai-software-talent" : "/challenges/global-innovator"}>Back to Challenge</Link><Link className="button" href="/challenges">Explore Challenges</Link></div></section></Layout>
  );
}
