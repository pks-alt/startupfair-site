"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { LinkedInLink } from "@/components/linkedin-link";
import { EmailRoutingForm } from "@/components/email-routing-form";
import { INQUIRY_OPTIONS } from "@/lib/email-routing";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
      <button
        className="mobile-menu-button"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation"
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setMenuOpen((open) => !open)}
      ><span /><span /><span /></button>
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
        <Link href="/challenges">Challenges</Link>
        <Link href="/for-talent">For Talent</Link>
        <Link href="/for-organizations">For Organizations</Link>
        <Link href="/partners">Partners</Link>
        <Link href="/about">About</Link>
      </div>
      <div className="footer-column">
        <h3>Policies</h3>
        <Link href="/privacy">Privacy Policy</Link>
        <Link href="/terms">Terms of Use</Link>
        <Link href="/challenge-rules">Challenge Rules</Link>
        <Link href="/cookies">Cookie Policy</Link>
      </div>
      <div className="footer-column footer-contact">
        <h3>Contact</h3>
        <address>2205 152nd Ave NE<br />Redmond, WA 98052</address>
        <a href="tel:+14258294463">(425) 829-4463</a>
        <a href="mailto:hello@startupfair.org">hello@startupfair.org</a>
        <LinkedInLink />
      </div>
      <div className="footer-bottom"><span>Established in 2015</span><span>© 2026 StartupFair. All rights reserved.</span></div>
    </footer>
  );
}

function Section({ eyebrow, title, intro, children, soft = false, id }: { eyebrow: string; title: string; intro?: string; children: ReactNode; soft?: boolean; id?: string }) {
  return (
    <section id={id} className={`section ${soft ? "soft" : ""}`}>
      <div className="section-head">
        <div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div>
        {intro && <p>{intro}</p>}
      </div>
      {children}
    </section>
  );
}

function InquiryDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="button dark-outline" type="button">Start a Conversation</button>
      </DialogTrigger>
      <DialogContent className="inquiry-dialog">
        <DialogHeader>
          <span className="eyebrow">StartupFair inquiry</span>
          <DialogTitle className="inquiry-dialog-title">How can we help?</DialogTitle>
          <DialogDescription className="inquiry-dialog-description">Share a few details and we’ll direct your inquiry to the right team.</DialogDescription>
        </DialogHeader>
        <EmailRoutingForm category="general" routeByInterest showEmailContact className="inquiry-form" onSubmit={(event) => { event.preventDefault(); window.location.assign("/contact/confirmation"); }}>
          <label>Full name<input required name="name" autoComplete="name" /></label>
          <label>Work email<input required type="email" name="email" autoComplete="email" /></label>
          <label>Organization <small>(optional)</small><input name="organization" autoComplete="organization" /></label>
          <label>I’m interested in<select required name="interest" defaultValue=""><option value="" disabled>Select one</option>{INQUIRY_OPTIONS.map(({ label }) => <option key={label} value={label}>{label}</option>)}</select></label>
          <label className="wide">Short message<textarea required name="message" rows={4} maxLength={1000} /></label>
          <label className="wide inquiry-consent"><input required type="checkbox" name="contactPermission" />I authorize StartupFair to use this information to review and respond to my inquiry.</label>
          <div className="wide inquiry-submit"><button className="button primary" type="submit">Submit Inquiry</button><small>During this website preview, information is not transmitted or stored.</small></div>
        </EmailRoutingForm>
      </DialogContent>
    </Dialog>
  );
}

export function StartupFairApprovedHome() {
  return (
    <div className="site approved-home-shell">
      <Header />
      <main className="home-page approved-home">
        <section className="hero">
          <div>
            <span className="eyebrow">Where AI Talent Solves Real-World Problems</span>
            <h1>Build. Solve.<br /><span>Get Discovered.</span></h1>
            <p>StartupFair connects global AI talent with organizations through real-world challenges and hackathons—creating pathways to hiring, solution development, strategic partnerships and new ventures.</p>
            <div className="actions">
              <Link className="button primary" href="/challenges">Explore Challenges</Link>
              <Link className="button" href="/launch-challenge">Launch a Challenge</Link>
            </div>
          </div>
          <div className="hero-art hero-art-image">
            <img src="/startupfair-hero-global-ai.png" alt="A diverse global team collaborating on a practical AI innovation challenge" />
            <div className="hero-proof"><span>REAL PROBLEMS</span><b>→</b><span>PROVEN TALENT</span><b>→</b><span>MEANINGFUL OUTCOMES</span></div>
          </div>
        </section>

        <Section eyebrow="Choose your path" title="One Platform. Three Ways to Participate." intro="Whether you want to demonstrate your skills, solve an important business problem or support innovation, StartupFair gives you a clear pathway to participate.">
          <div className="path-grid">
            <Link href="/for-talent"><span>01</span><h3>For Talent</h3><p>Build solutions to real-world problems, demonstrate your capabilities and create pathways to employment, paid projects and venture opportunities.</p><b>Explore Talent Opportunities →</b></Link>
            <Link href="/for-organizations"><span>02</span><h3>For Organizations</h3><p>Launch structured challenges to discover proven AI talent, develop practical solutions and identify ideas with commercial potential.</p><b>Launch a Challenge →</b></Link>
            <Link href="/partners"><span>03</span><h3>For Partners</h3><p>Support innovation by contributing industry expertise, technology, data, mentorship, networks, resources or funding.</p><b>Become a Partner →</b></Link>
          </div>
        </Section>

        <Section id="global-programs" eyebrow="Upcoming Global Challenges" title="Two Global Programs. Built for Real Outcomes." intro="StartupFair is introducing two recurring global challenge formats—one focused on proving technical capability and one focused on advancing promising innovations." soft>
          <div className="approved-program-grid">
            <article className="approved-program-card talent">
              <div className="approved-program-top"><div className="tags"><span>Global Talent</span><span>Selective Application</span></div><div className="approved-date"><small>NOV</small><strong>02</strong></div></div>
              <h3>Global AI &amp; Software Talent Challenge</h3>
              <p>For AI and software developers worldwide—from experienced professionals to students and recent graduates. Selection is based on demonstrated work, technical thinking and practical ability, not résumé history alone.</p>
              <div className="approved-program-meta"><div><small>Applications</small><strong>Open Oct. 5</strong></div><div><small>Format</small><strong>Global · 7 Days</strong></div><div><small>Cohort</small><strong>30–40 Selected</strong></div></div>
              <div className="approved-program-path">Build → Prove → Get Recognized → Get Connected</div>
              <div className="approved-program-footer"><Link href="/challenges/global-ai-software-talent">View Talent Challenge →</Link><span>Kickoff: Monday, Nov. 2, 2026</span></div>
            </article>
            <article className="approved-program-card innovator">
              <div className="approved-program-top"><div className="tags"><span>Global Innovator</span><span>Idea to Existing Product</span></div><div className="approved-date"><small>NOV</small><strong>23</strong></div></div>
              <h3>Global Innovator Challenge</h3>
              <p>For individuals, teams, researchers, founders and startups with original AI-enabled or technology-driven solutions. Selection focuses on the problem, originality, practical potential, validation and ability to execute.</p>
              <div className="approved-program-meta"><div><small>Applications</small><strong>Open Oct. 26</strong></div><div><small>Format</small><strong>Global · 7 Days</strong></div><div><small>Cohort</small><strong>15–20 Selected</strong></div></div>
              <div className="approved-program-path">Validate → Build → Get Recognized → Explore Opportunities</div>
              <div className="approved-program-footer"><Link href="/challenges/global-innovator">View Innovator Challenge →</Link><span>Kickoff: Monday, Nov. 23, 2026</span></div>
            </article>
          </div>
          <p className="approved-schedule-note"><strong>Schedule notice:</strong> Dates may be adjusted based on qualified application volume or program readiness. Selected applicants will be notified of material changes.</p>
        </Section>

        <Section eyebrow="How StartupFair works" title="From Real Problems to Meaningful Opportunities" intro="A simple, repeatable journey designed to turn participation into credible evidence and possible next steps.">
          <div className="process">
            <div><span>01</span><h3>Discover</h3><p>Explore challenges aligned with your skills, interests or organizational goals.</p></div>
            <div><span>02</span><h3>Build</h3><p>Work independently or collaborate with a team to develop a practical solution.</p></div>
            <div><span>03</span><h3>Validate</h3><p>Submit your work for structured evaluation based on clearly published criteria.</p></div>
            <div><span>04</span><h3>Advance</h3><p>Create pathways to hiring, projects, pilots, partnerships or venture discussions.</p></div>
          </div>
        </Section>

        <Section eyebrow="Why StartupFair" title="Built Around Demonstrated Ability and Real Outcomes" intro="StartupFair is designed to be more selective and more useful than a generic open-entry hackathon or résumé directory." soft>
          <div className="approved-why-grid">
            <article><span>01</span><h3>Skills Before Labels</h3><p>Practical ability and demonstrated work matter more than titles alone.</p></article>
            <article><span>02</span><h3>Selective Participation</h3><p>Applicants are screened for relevance, evidence, commitment and quality.</p></article>
            <article><span>03</span><h3>Transparent Evaluation</h3><p>Participants understand challenge requirements and judging criteria before they begin.</p></article>
            <article><span>04</span><h3>Opportunity Beyond the Challenge</h3><p>Strong work may lead to recognition, hiring, projects, pilots, partnerships or venture introductions where appropriate.</p></article>
          </div>
        </Section>

        <section className="approved-theme-section">
          <div className="approved-theme-heading"><div><span className="eyebrow">Innovation Themes</span><h2>Ideas Across Industries</h2></div><p>Focused challenge areas, with room for strong technology-driven ideas that do not fit a single category.</p></div>
          <div className="approved-theme-grid">
            <Link href="/challenges?theme=healthcare-workforce">Healthcare &amp; Workforce</Link><Link href="/challenges?theme=enterprise-ai">Enterprise AI &amp; Automation</Link><Link href="/challenges?theme=fintech-commerce">Fintech, Commerce &amp; Digital Economy</Link><Link href="/challenges?theme=education">Education &amp; Future of Work</Link><Link href="/challenges?theme=climate">Climate &amp; Sustainability</Link><Link href="/challenges?theme=open-innovation">Open Innovation</Link>
          </div>
        </section>

        <Section id="history" eyebrow="Established in 2015" title="Built on Entrepreneurial Roots. Evolving for What Comes Next." intro="StartupFair began as a startup pitch-and-win event that brought entrepreneurial communities together. Today, it is evolving into a global platform for AI talent discovery, practical innovation and credible business opportunities." soft>
          <div className="history-band"><div className="history-point history-point-past"><strong>2015</strong><span><b>StartupFair Founded</b>Startup events, entrepreneurial participation and pitch competitions.</span></div><i aria-hidden="true">→</i><div className="history-point history-point-present"><strong>Today</strong><span><b>A New Platform</b>AI talent challenges, innovation programs and venture discovery.</span></div></div>
          <div className="center"><Link className="button primary" href="/about">Our Story</Link></div>
        </Section>

        <Section id="partners" eyebrow="Partner With StartupFair" title="Build Meaningful Opportunities Together" intro="StartupFair works with organizations that can strengthen challenge quality, participant development and credible follow-through.">
          <div className="partner-strip"><span>Industry &amp; Corporate</span><span>Universities &amp; Education</span><span>Technology &amp; Data</span><span>Mentors, Judges &amp; Experts</span><span>Investors &amp; Accelerators</span></div>
          <div className="center"><Link className="button primary" href="/partners">Explore Partnerships</Link></div>
        </Section>

        <section className="cta approved-final-cta">
          <h2>Ready to Build, Solve or Discover?</h2>
          <p>Choose the pathway that fits you and take the next step with StartupFair.</p>
          <div className="actions"><Link className="button light" href="/challenges">Explore Challenges</Link><Link className="button dark-outline" href="/launch-challenge">Launch a Challenge</Link><InquiryDialog /></div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
