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

type Item = { title: string; copy: string; meta?: string };

const nav = [
  ["Challenges", "/challenges"],
  ["For Talent", "/for-talent"],
  ["For Organizations", "/for-organizations"],
  ["Partners", "/partners"],
  ["About", "/about"],
] as const;

function ActionLink({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  if (href === "/talent-profile" || href === "/talent-profile/contact") {
    return <a href="/talent-profile/contact" className={className}>{children}</a>;
  }
  return <Link href={href} className={className}>{children}</Link>;
}

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

function Layout({ children }: { children: ReactNode }) {
  return <div className="site"><Header /><main>{children}</main><Footer /></div>;
}

function Hero() {
  return (
    <section className="hero">
      <div>
        <span className="eyebrow">Where AI Talent Solves Real-World Problems</span>
        <h1>Build. Solve.<br /><span>Get Discovered.</span></h1>
        <p>StartupFair connects global AI talent with organizations through real-world challenges and hackathons—creating pathways to hiring, solution development, strategic partnerships and new ventures.</p>
        <div className="actions">
          <ActionLink className="button primary" href="/challenges">Explore Challenges</ActionLink>
          <ActionLink className="button" href="/launch-challenge">Launch a Challenge</ActionLink>
        </div>
      </div>
      <div className="hero-art hero-art-image">
        <img src="/startupfair-hero-global-ai.png" alt="A diverse global team collaborating on a practical AI innovation challenge" />
        <div className="hero-proof"><span>REAL PROBLEMS</span><b>→</b><span>PROVEN TALENT</span><b>→</b><span>MEANINGFUL OUTCOMES</span></div>
      </div>
    </section>
  );
}

function Section({ eyebrow, title, intro, children, soft = false }: { eyebrow: string; title: string; intro?: string; children: ReactNode; soft?: boolean }) {
  return (
    <section className={`section ${soft ? "soft" : ""}`}>
      <div className="section-head">
        <div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div>
        {intro && <p>{intro}</p>}
      </div>
      {children}
    </section>
  );
}

function Cards({ items }: { items: Item[] }) {
  return (
    <div className="cards cols-3">
      {items.map((item, index) => (
        <article className="card" key={item.title}>
          <span className="card-number">{String(index + 1).padStart(2, "0")}</span>
          <h3>{item.title}</h3>
          <p>{item.copy}</p>
          {item.meta && <small>{item.meta}</small>}
        </article>
      ))}
    </div>
  );
}

function GlobalProgramsSection() {
  return (
    <Section
      eyebrow="Upcoming Global Challenges"
      title="Two Global Programs. Two Ways to Prove What’s Possible."
      intro="StartupFair will run recurring global Talent and Innovator challenges. Applications are selective, and each program is designed around demonstrated capability, practical innovation and meaningful follow-through."
      soft
    >
      <div className="split">
        <div>
          <div className="tags"><span>Applications Opening</span><span>Global Talent</span><span>7 Days</span></div>
          <h3>Global AI & Software Talent Challenge</h3>
          <p>For AI and software developers worldwide—including experienced professionals, early-career builders, students and recent graduates. Applicants qualify through evidence of real work and technical thinking before submitting a full profile and résumé.</p>
          <p><strong>Priority deadline:</strong> October 26, 2026<br /><strong>Final deadline:</strong> Friday, October 30, 2026<br /><strong>Kickoff:</strong> Monday, November 2, 2026<br /><strong>Selected cohort:</strong> 30–40 participants</p>
          <p><strong>Potential pathways:</strong> verified skills, finalist/winner recognition, hiring, contract and paid-project introductions where available.</p>
          <Link className="text-link" href="/challenges/global-ai-software-talent">View Talent Challenge →</Link>
        </div>
        <div>
          <div className="tags"><span>Applications Opening</span><span>Global Innovator</span><span>7 Days</span></div>
          <h3>Global Innovator Challenge</h3>
          <p>For individuals, teams, researchers, founders and startups with original AI-enabled or technology-driven ideas across industries. Applications are screened for problem quality, originality, practical potential and ability to execute before full pitch materials are requested.</p>
          <p><strong>Priority deadline:</strong> November 16, 2026<br /><strong>Final deadline:</strong> Friday, November 20, 2026<br /><strong>Kickoff:</strong> Monday, November 23, 2026<br /><strong>Selected cohort:</strong> 15–20 ideas/teams</p>
          <p><strong>Potential pathways:</strong> StartupFair recognition, mentor/industry review, pilot or partnership discussions, and curated accelerator/investor introductions where appropriate.</p>
          <Link className="text-link" href="/challenges/global-innovator">View Innovator Challenge →</Link>
        </div>
      </div>
      <p className="prose process-note"><strong>Schedule notice:</strong> StartupFair may adjust program dates based on qualified application volume, partner requirements or program readiness. Applications may close earlier if capacity is reached.</p>
    </Section>
  );
}

function HomeInquiryPanel() {
  return (
    <section className="home-inquiry" aria-labelledby="home-inquiry-title">
      <div>
        <span className="eyebrow">Start a conversation</span>
        <h2 id="home-inquiry-title">Let’s build something meaningful.</h2>
        <p>Tell us whether you want to launch a challenge, contribute talent, explore a partnership or discuss an opportunity.</p>
      </div>
      <Dialog>
        <DialogTrigger asChild><button className="button primary home-inquiry-button" type="button">Start a Conversation</button></DialogTrigger>
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
    </section>
  );
}

export function StartupFairHomeGlobalPrograms() {
  return (
    <Layout>
      <div className="home-page">
        <Hero />

        <Section
          eyebrow="Choose your path"
          title="One Platform. Three Ways to Participate."
          intro="Whether you want to demonstrate your skills, solve an important business problem or support innovation, StartupFair gives you a clear pathway to participate."
        >
          <div className="path-grid">
            <Link href="/for-talent"><span>01</span><h3>For Talent</h3><p>Build solutions to real-world problems, demonstrate your capabilities and create pathways to employment, paid projects and venture opportunities.</p><b>Explore Talent Opportunities →</b></Link>
            <Link href="/for-organizations"><span>02</span><h3>For Organizations</h3><p>Launch structured challenges to discover proven AI talent, develop practical solutions and identify ideas with commercial potential.</p><b>Launch a Challenge →</b></Link>
            <Link href="/partners"><span>03</span><h3>For Partners</h3><p>Support innovation by contributing industry expertise, technology, data, mentorship, networks, resources or funding.</p><b>Become a Partner →</b></Link>
          </div>
        </Section>

        <GlobalProgramsSection />

        <Section eyebrow="How StartupFair works" title="From Real Problems to Meaningful Opportunities">
          <div className="process">
            <div><span>01</span><h3>Discover</h3><p>Explore challenges aligned with your skills, interests or organizational goals.</p></div>
            <div><span>02</span><h3>Build</h3><p>Work independently or collaborate with a team to develop a practical solution.</p></div>
            <div><span>03</span><h3>Validate</h3><p>Submit your work for structured evaluation based on clearly published criteria.</p></div>
            <div><span>04</span><h3>Advance</h3><p>Create pathways to hiring, paid projects, pilots, partnerships or venture opportunities.</p></div>
          </div>
        </Section>

        <Section eyebrow="Innovation focus" title="Where Technology Can Create Practical Impact" soft>
          <Cards items={[
            { title: "Healthcare Innovation", copy: "Develop AI-enabled solutions for healthcare workforce management, care delivery, clinician engagement and operational efficiency." },
            { title: "Enterprise AI & Technology", copy: "Build secure and practical AI solutions that improve business processes, productivity and decision-making." },
            { title: "Performance Marketing", copy: "Create smarter advertising, publisher and commerce solutions using data, automation and AI-powered intelligence." },
          ]} />
        </Section>

        <Section
          eyebrow="Established in 2015"
          title="Built on Entrepreneurial Roots. Evolving for What Comes Next."
          intro="StartupFair began as a startup pitch-and-win event that brought entrepreneurial communities together. Today, it is evolving into a global platform for AI talent discovery, practical innovation and credible business opportunities."
        >
          <div className="history-band">
            <div className="history-point history-point-past"><strong>2015</strong><span><b>StartupFair Founded</b>Startup events, entrepreneurial participation and pitch competitions.</span></div>
            <i aria-hidden="true">→</i>
            <div className="history-point history-point-present"><strong>Today</strong><span><b>A New Platform</b>AI talent challenges, innovation programs and venture discovery.</span></div>
          </div>
          <div className="center"><Link className="button primary" href="/about">Our Story</Link></div>
        </Section>

        <Section
          eyebrow="Partner With StartupFair"
          title="Build Meaningful Opportunities Together"
          intro="StartupFair collaborates with organizations that want to support talent development, practical innovation and measurable business outcomes."
          soft
        >
          <div className="partner-strip">
            <span>Industry and Corporate Partners</span>
            <span>Universities and Educational Institutions</span>
            <span>Technology and Data Partners</span>
            <span>Mentors, Judges and Industry Experts</span>
            <span>Investors, Accelerators and Ecosystem Partners</span>
          </div>
          <div className="center"><Link className="button primary" href="/partners">Explore Partnerships</Link></div>
        </Section>

        <section className="cta">
          <h2>Ready to Build, Solve or Discover?</h2>
          <p>Whether you want to demonstrate your talent, solve a business problem or support practical innovation, StartupFair gives you a clear place to begin.</p>
          <div className="actions">
            <ActionLink className="button light" href="/challenges">Explore Challenges</ActionLink>
            <ActionLink className="button dark-outline" href="/launch-challenge">Launch a Challenge</ActionLink>
          </div>
        </section>

        <HomeInquiryPanel />
      </div>
    </Layout>
  );
}
