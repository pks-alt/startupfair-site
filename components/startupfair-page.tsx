"use client";

import Link from "next/link";
import { EmailRoutingForm, EmailRecipientNotice } from "@/components/email-routing-form";
import { INQUIRY_OPTIONS } from "@/lib/email-routing";
import { useState, type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Item = { title: string; copy: string; meta?: string; href?: string };
function ActionLink({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  // Profile creation must always perform a fresh document navigation. This avoids
  // a stale client-side router state preventing the form from opening.
  if (href === "/talent-profile" || href === "/talent-profile/contact") {
    return <a href="/talent-profile/contact" className={className}>{children}</a>;
  }
  return <Link href={href} className={className}>{children}</Link>;
}
const nav = [
  ["Challenges", "/challenges"],
  ["For Talent", "/for-talent"],
  ["For Organizations", "/for-organizations"],
  ["Partners", "/partners"],
  ["About", "/about"],
] as const;
const challenges = [
  {
    title: "AI Clinician Matching Challenge",
    tag: "Healthcare + AI",
    status: "Open Now",
    outcome: "Hiring and Pilot Opportunities",
    types: ["Talent", "Innovation"],
    industry: "Healthcare",
    participation: "Both",
    slug: "ai-clinician-matching",
    copy: "Build an explainable AI solution that matches qualified healthcare professionals with suitable opportunities based on skills, experience, credentials, availability, location, preferences, and organizational requirements.",
  },
  {
    title: "Enterprise AI Agent Builder",
    tag: "Enterprise AI",
    status: "Open Now",
    outcome: "Hiring and Paid-Project Opportunities",
    types: ["Talent", "Innovation"],
    industry: "Technology",
    participation: "Both",
    slug: "enterprise-ai-agent",
    copy: "Create a secure AI agent that improves a measurable business workflow while preserving human review.",
  },
  {
    title: "Publisher-to-Campaign Intelligence Challenge",
    tag: "AI + Performance Marketing",
    status: "Coming Soon",
    outcome: "Pilot, Partnership, and Product-Development Opportunities",
    types: ["Innovation", "Venture"],
    industry: "Marketing",
    participation: "Both",
    slug: "publisher-campaign-intelligence",
    copy: "Predict the strongest publisher and campaign fit using audience, content and conversion signals.",
  },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="site-header">
      <Link href="/" className="brand">
        <img src="/startupfair-logo.png" alt="StartupFair" />
      </Link>
      <nav>
        {nav.map(([l, h]) => (
          <Link key={h} href={h}>
            {l}
          </Link>
        ))}
        <Link href="/contact">Contact</Link>
      </nav>
      <Link className="button primary header-cta" href="/challenges">
        Join a Challenge
      </Link>
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
        <img
          className="footer-logo"
          src="/startupfair-logo.png"
          alt="StartupFair"
        />
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
      </div>
      <div className="footer-bottom"><span>Established in 2015</span><span>© 2026 StartupFair. All rights reserved.</span></div>
    </footer>
  );
}
function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="site">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
function Hero({
  eyebrow,
  title,
  copy,
  primary,
  secondary,
  image,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  primary?: [string, string];
  secondary?: [string, string];
  image?: string;
}) {
  return (
    <section className="hero">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title === "Build. Solve. Get Discovered." ? <>Build. Solve.<br /><span>Get Discovered.</span></> : title}</h1>
        <p>{copy}</p>
        {primary && (
          <div className="actions">
            <ActionLink className="button primary" href={primary[1]}>
              {primary[0]}
            </ActionLink>
            {secondary && (
              <ActionLink className="button" href={secondary[1]}>
                {secondary[0]}
              </ActionLink>
            )}
          </div>
        )}
      </div>
      <div className={`hero-art ${image ? "hero-art-image" : ""}`}>
        {image && <img src={image} alt="A diverse global team collaborating on a practical AI innovation challenge" />}
        <div className="hero-proof">
          <span>REAL PROBLEMS</span>
          <b>→</b>
          <span>PROVEN TALENT</span>
          <b>→</b>
          <span>MEANINGFUL OUTCOMES</span>
        </div>
      </div>
    </section>
  );
}
function Section({
  eyebrow,
  title,
  intro,
  children,
  soft = false,
  id,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
  soft?: boolean;
  id?: string;
}) {
  return (
    <section id={id} className={`section ${soft ? "soft" : ""}`}>
      <div className="section-head">
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h2>{title}</h2>
        </div>
        {intro && <p>{intro}</p>}
      </div>
      {children}
    </section>
  );
}
function Cards({ items, cols = 3 }: { items: Item[]; cols?: number }) {
  return (
    <div className={`cards cols-${cols}`}>
      {items.map((x, i) => (
        x.href ? (
          <ActionLink className="card card-link" href={x.href} key={x.title}>
            <span className="card-number">{String(i + 1).padStart(2, "0")}</span>
            <h3>{x.title}</h3>
            <p>{x.copy}</p>
            {x.meta && <small>{x.meta}</small>}
            <strong className="card-action">Open form →</strong>
          </ActionLink>
        ) : (
          <article className="card" key={x.title}>
            <span className="card-number">{String(i + 1).padStart(2, "0")}</span>
            <h3>{x.title}</h3>
            <p>{x.copy}</p>
            {x.meta && <small>{x.meta}</small>}
          </article>
        )
      ))}
    </div>
  );
}
function ChallengeCards({ items = challenges }: { items?: typeof challenges }) {
  return (
    <div className="cards cols-3">
      {items.map((c) => (
        <article className="challenge-card" key={c.slug}>
          <div className="challenge-visual">{c.tag}</div>
          <div className="challenge-body">
            <div className="tags">
              <span>{c.status}</span>
              <span>{c.tag}</span>
            </div>
            <h3>{c.title}</h3>
            <p>{c.copy}</p>
            <small>Global · Individual or Team · {c.outcome}</small>
            <Link href={`/challenges/${c.slug}`}>View Challenge →</Link>
          </div>
        </article>
      ))}
    </div>
  );
}
function CTA({
  title,
  copy,
  buttons,
  note,
}: {
  title: string;
  copy: string;
  buttons: [string, string][];
  note?: string;
}) {
  return (
    <section className="cta">
      <h2>{title}</h2>
      <p>{copy}</p>
      <div className="actions">
        {buttons.map(([l, h], i) => (
          <ActionLink
            key={l}
            className={`button ${i === 0 ? "light" : "dark-outline"}`}
            href={h}
          >
            {l}
          </ActionLink>
        ))}
      </div>
      {note && <small className="cta-note">{note}</small>}
    </section>
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
        <DialogTrigger asChild>
          <button className="button primary home-inquiry-button" type="button">Start a Conversation</button>
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
            <label>
              I’m interested in
              <select required name="interest" defaultValue="">
                <option value="" disabled>Select one</option>
                {INQUIRY_OPTIONS.map(({ label }) => <option key={label} value={label}>{label}</option>)}
              </select>
            </label>
            <label className="wide">Short message<textarea required name="message" rows={4} maxLength={1000} /></label>
            <label className="wide inquiry-consent"><input required type="checkbox" name="contactPermission" />I authorize StartupFair to use this information to review and respond to my inquiry.</label>
            <div className="wide inquiry-submit"><button className="button primary" type="submit">Submit Inquiry</button><small>During this website preview, information is not transmitted or stored.</small></div>
          </EmailRoutingForm>
        </DialogContent>
      </Dialog>
    </section>
  );
}

function HomePage() {
  const featured = challenges[0];
  return (
    <Layout>
      <div className="home-page">
      <Hero
        eyebrow="Where AI Talent Solves Real-World Problems"
        title="Build. Solve. Get Discovered."
        copy="StartupFair connects global AI talent with organizations through real-world challenges and hackathons—creating pathways to hiring, solution development, strategic partnerships and new ventures."
        primary={["Explore Challenges", "/challenges"]}
        secondary={["Launch a Challenge", "/launch-challenge"]}
        image="/startupfair-hero-global-ai.png"
      />
      <Section
        eyebrow="Choose your path"
        title="One Platform. Three Ways to Participate."
        intro="Whether you want to demonstrate your skills, solve an important business problem or support innovation, StartupFair gives you a clear pathway to participate."
      >
        <div className="path-grid">
          <Link href="/for-talent">
            <span>01</span>
            <h3>For Talent</h3>
            <p>
              Build solutions to real-world problems, demonstrate your capabilities and create pathways to employment, paid projects and venture opportunities.
            </p>
            <b>Explore Talent Opportunities →</b>
          </Link>
          <Link href="/for-organizations">
            <span>02</span>
            <h3>For Organizations</h3>
            <p>
              Launch structured challenges to discover proven AI talent, develop practical solutions and identify ideas with commercial potential.
            </p>
            <b>Launch a Challenge →</b>
          </Link>
          <Link href="/partners">
            <span>03</span>
            <h3>For Partners</h3>
            <p>
              Support innovation by contributing industry expertise, technology, data, mentorship, networks, resources or funding.
            </p>
            <b>Become a Partner →</b>
          </Link>
        </div>
      </Section>
      <Section
        eyebrow="Featured challenge"
        title="A Real Problem. A Meaningful Opportunity."
        soft
      >
        <article className="featured-challenge">
          <div className="featured-index">01</div>
          <div>
            <div className="tags">
              <span>{featured.status}</span>
              <span>{featured.tag}</span>
              <span>Global</span>
            </div>
            <h3>{featured.title}</h3>
            <p>{featured.copy}</p>
            <small>Global · Individual or Team · {featured.outcome}</small>
          </div>
          <Link
            className="button primary"
            href={`/challenges/${featured.slug}`}
          >
            View Challenge
          </Link>
        </article>
        <div className="center">
          <Link className="text-link" href="/challenges">
            Explore all challenges →
          </Link>
        </div>
      </Section>
      <Section
        eyebrow="How StartupFair works"
        title="From Real Problems to Meaningful Opportunities"
      >
        <div className="process">
          <div>
            <span>01</span>
            <h3>Discover</h3>
            <p>Explore challenges aligned with your skills, interests or organizational goals.</p>
          </div>
          <div>
            <span>02</span>
            <h3>Build</h3>
            <p>Work independently or collaborate with a team to develop a practical solution.</p>
          </div>
          <div>
            <span>03</span>
            <h3>Validate</h3>
            <p>Submit your work for structured evaluation based on clearly published criteria.</p>
          </div>
          <div>
            <span>04</span>
            <h3>Advance</h3>
            <p>Create pathways to hiring, paid projects, pilots, partnerships or venture opportunities.</p>
          </div>
        </div>
      </Section>
      <Section
        eyebrow="Innovation focus"
        title="Where Technology Can Create Practical Impact"
        soft
      >
        <Cards
          items={[
            {
              title: "Healthcare Innovation",
              copy: "Develop AI-enabled solutions for healthcare workforce management, care delivery, clinician engagement and operational efficiency.",
            },
            {
              title: "Enterprise AI & Technology",
              copy: "Build secure and practical AI solutions that improve business processes, productivity and decision-making.",
            },
            {
              title: "Performance Marketing",
              copy: "Create smarter advertising, publisher and commerce solutions using data, automation and AI-powered intelligence.",
            },
          ]}
        />
      </Section>
      <Section
        eyebrow="Established in 2015"
        title="Built on Entrepreneurial Roots. Evolving for What Comes Next."
        intro="StartupFair began as a startup pitch-and-win event that brought entrepreneurial communities together. Today, it is evolving into a global platform for AI talent discovery, practical innovation and credible business opportunities."
      >
        <div className="history-band">
          <div className="history-point history-point-past">
            <strong>2015</strong>
            <span><b>StartupFair Founded</b>Startup events, entrepreneurial participation and pitch competitions.</span>
          </div>
          <i aria-hidden="true">→</i>
          <div className="history-point history-point-present">
            <strong>Today</strong>
            <span><b>A New Platform</b>AI talent challenges, innovation programs and venture discovery.</span>
          </div>
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
      <CTA
        title="Ready to Build, Solve or Discover?"
        copy="Whether you want to demonstrate your talent, solve a business problem or support practical innovation, StartupFair gives you a clear place to begin."
        buttons={[
          ["Explore Challenges", "/challenges"],
          ["Launch a Challenge", "/launch-challenge"],
        ]}
      />
      <HomeInquiryPanel />
      </div>
    </Layout>
  );
}

function ChallengesPage() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Challenges");
  const [typeFilter, setTypeFilter] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");
  const [participationFilter, setParticipationFilter] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const filteredChallenges = challenges.filter((challenge) => {
    const matchesQuery = !normalizedQuery || [challenge.title, challenge.tag, challenge.copy, challenge.outcome, challenge.industry, ...challenge.types].join(" ").toLowerCase().includes(normalizedQuery);
    const matchesStatus = statusFilter === "All Challenges" || challenge.status === statusFilter;
    const matchesType = !typeFilter || challenge.types.includes(typeFilter);
    const matchesIndustry = !industryFilter || challenge.industry === industryFilter;
    const matchesParticipation = !participationFilter || participationFilter === challenge.participation || (challenge.participation === "Both" && ["Individual", "Team"].includes(participationFilter));
    return matchesQuery && matchesStatus && matchesType && matchesIndustry && matchesParticipation;
  });
  return (
    <Layout>
      <Hero
        eyebrow="Explore Challenges"
        title="Explore Real-World Challenges"
        copy="Discover global AI and innovation challenges created around meaningful business, healthcare, and societal problems. Participate individually or with a team, demonstrate what you can build, and create opportunities for recognition, collaboration, hiring, pilots, or venture discussions."
        primary={["View Open Challenges", "/challenges#challenge-directory"]}
        secondary={["Create Your Free Profile", "/talent-profile/contact"]}
      />
      <Section
        id="challenge-directory"
        eyebrow="Find Your Opportunity"
        title="Explore Current Challenges"
        intro="Browse public challenges freely. Review the problem, required skills, participation format, expected outcomes, timeline, and evaluation criteria before deciding to participate."
      >
        <div className="filters">
          <input
            aria-label="Search challenges"
            placeholder="Search by challenge, skill, technology, or industry"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          {["All Challenges", "Open Now", "Coming Soon", "Completed"].map((status) => <button key={status} type="button" className={statusFilter === status ? "active" : ""} aria-pressed={statusFilter === status} onClick={() => setStatusFilter(status)}>{status}</button>)}
          <select aria-label="Filter by challenge type" value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}>
            <option value="">Challenge Type</option>
            <option>Talent</option>
            <option>Innovation</option>
            <option>Venture</option>
          </select>
          <select aria-label="Filter by industry" value={industryFilter} onChange={(event) => setIndustryFilter(event.target.value)}>
            <option value="">Industry</option>
            <option>Healthcare</option>
            <option>Technology</option>
            <option>Marketing</option>
            <option>Other</option>
          </select>
          <select aria-label="Filter by participation format" value={participationFilter} onChange={(event) => setParticipationFilter(event.target.value)}>
            <option value="">Participation</option>
            <option>Individual</option>
            <option>Team</option>
            <option>Both</option>
          </select>
        </div>
        {filteredChallenges.length ? <ChallengeCards items={filteredChallenges} /> : <div className="empty-state"><h3>No challenges match these filters.</h3><p>Try a different search or select “All Challenges.”</p><button className="button" type="button" onClick={() => { setQuery(""); setStatusFilter("All Challenges"); setTypeFilter(""); setIndustryFilter(""); setParticipationFilter(""); }}>Clear filters</button></div>}
      </Section>
      <Section
        eyebrow="Choose the Right Challenge"
        title="Three Challenge Models. Different Outcomes."
        soft
      >
        <Cards
          items={[
            {
              title: "Talent Challenges",
              copy: "Demonstrate practical skills through real assignments and create pathways to employment, paid projects, or inclusion in the optional StartupFair Talent Network.",
              meta: "Hiring · Paid Projects · Talent Discovery",
            },
            {
              title: "Innovation Challenges",
              copy: "Develop practical AI, technology, or process solutions for defined operational, business, healthcare, or societal problems.",
              meta: "Pilots · Partnerships · Solution Development",
            },
            {
              title: "Venture Challenges",
              copy: "Build and validate promising ideas, solutions and teams with commercial potential.",
              meta: "Mentorship · Accelerator Access · Venture Discussions",
            },
          ]}
        />
        <p className="prose process-note">
          These are opportunity pathways—not guaranteed outcomes.
        </p>
      </Section>
      <Section
        eyebrow="How It Works"
        title="How Challenge Participation Works"
      >
        <Cards
          items={[
            {
              title: "1. Explore",
              copy: "Search and review challenges that match your interests, skills, or experience.",
            },
            {
              title: "2. Review the Requirements",
              copy: "Understand the problem, eligibility rules, participation format, timeline, deliverables, evaluation criteria, and challenge-specific terms.",
            },
            {
              title: "3. Create Your Profile",
              copy: "Create a free private profile and choose whether to participate individually or with a team, depending on the challenge.",
            },
            {
              title: "4. Build and Submit",
              copy: "Develop your solution and submit the required materials before the published deadline.",
            },
            {
              title: "5. Evaluation and Results",
              copy: "Authorized reviewers evaluate eligible submissions using the published criteria. StartupFair publicly announces only winners and finalists.",
            },
            {
              title: "6. Explore Possible Outcomes",
              copy: "Selected participants may be considered for recognition, hiring, paid projects, pilots, partnerships, mentorship, or venture discussions. Outcomes are not guaranteed.",
            },
          ]}
        />
      </Section>
      <Section
        eyebrow="Challenge Status"
        title="Understanding Challenge Status"
        soft
      >
        <Cards
          cols={4}
          items={[
            {
              title: "Open Now",
              copy: "The challenge is currently accepting eligible participant applications or submissions. Review its deadline and requirements before participating.",
            },
            {
              title: "Coming Soon",
              copy: "The challenge has been announced but is not yet accepting applications or submissions. Visitors may review available information and return when registration opens.",
            },
            {
              title: "Under Evaluation",
              copy: "The submission period has closed, and authorized evaluators are reviewing eligible entries according to the published criteria.",
            },
            {
              title: "Completed",
              copy: "The challenge has concluded. StartupFair may publish the challenge results, winners, and finalists. Other participants remain private unless they independently share their participation.",
            },
          ]}
        />
      </Section>
      <CTA
        title="Ready to Take the Next Step?"
        copy="Join a real-world challenge to demonstrate what you can build, or bring StartupFair a meaningful problem that talented people can help solve."
        buttons={[
          ["Create Your Free Profile", "/talent-profile/contact"],
          ["Propose a Challenge", "/launch-challenge"],
        ]}
        note="Participation, evaluation, recognition, and potential outcomes are governed by each challenge’s published eligibility requirements, rules, criteria, timelines, and terms."
      />
    </Layout>
  );
}

function ChallengeDetail({ slug }: { slug: string }) {
  const c = challenges.find((x) => x.slug === slug) || challenges[0];
  const isEnterprise = c.slug === "enterprise-ai-agent";
  const isPublisher = c.slug === "publisher-campaign-intelligence";
  const actionHref = c.slug === "ai-clinician-matching"
    ? "/apply/ai-clinician-matching/participant-type"
    : c.slug === "enterprise-ai-agent"
      ? "/apply/enterprise-ai-agent/participant-type"
      : "/apply/publisher-campaign-intelligence/participant-type";
  return (
    <Layout>
      <section className="detail-hero">
        <div className="tags">
          <span>{c.status}</span>
          <span>{c.tag}</span>
          <span>Global</span>
          <span>Individual or Team</span>
          {(isEnterprise || isPublisher) && <span>Talent + Innovation Challenge</span>}
        </div>
        <h1>{isEnterprise ? "Enterprise AI Agent Challenge" : c.title}</h1>
        <p>
          {isPublisher
            ? "Build an AI-powered solution that identifies the strongest fit between publishers, audiences, advertisers, offers, and marketing campaigns using content, engagement, performance, and conversion signals."
            : isEnterprise
            ? "Build an AI agent that can understand business workflows, perform useful tasks, and collaborate safely with people across enterprise systems."
            : c.copy}
        </p>
        {isEnterprise && (
          <p>
            This challenge is designed to identify strong AI builders and
            practical solutions that can move beyond demonstrations toward real
            operational use.
          </p>
        )}
        {isPublisher && (
          <p>
            This challenge is designed to discover capable AI and
            marketing-technology talent while developing practical solutions
            that can improve campaign performance, publisher monetization, and
            advertiser decision-making.
          </p>
        )}
        <p className="detail-pathways">
          <strong>Potential pathways:</strong>{" "}
          {isPublisher
            ? "Paid projects · Pilots · Partnerships · Product-development opportunities · Hiring discussions"
            : "Hiring opportunities · Paid project opportunities · Pilot discussions · Strategic partnerships"}
        </p>
        <div className="actions">
          <Link className="button primary" href={actionHref}>
            {isPublisher ? "Register Interest" : "Apply to Participate"}
          </Link>
          <Link className="button" href="#challenge-requirements">
            View Challenge Requirements
          </Link>
        </div>
        <small className="detail-hero-note">
          Participation and potential outcomes are subject to eligibility
          requirements, challenge rules, evaluation criteria, and final
          organizational decisions. No outcome is guaranteed.
        </small>
      </section>
      <div className="detail-layout">
        <article>
          <Section
            id="challenge-requirements"
            eyebrow="Challenge overview"
            title="The Challenge"
          >
            <div className="prose">
              {isPublisher ? (
                <>
                  <p>
                    Advertisers and performance-marketing teams often struggle
                    to determine which publishers, audiences, content
                    environments, offers, and campaign formats are most likely
                    to produce strong results. Decisions may rely on incomplete
                    data, broad audience categories, manual analysis, or past
                    performance that does not fully reflect the current campaign.
                  </p>
                  <p>
                    At the same time, publishers need better ways to identify
                    relevant advertising opportunities without weakening
                    audience trust, content quality, privacy, or brand integrity.
                  </p>
                  <p>
                    Participants will develop an AI-powered intelligence solution
                    that can evaluate and recommend publisher-to-campaign fit
                    using appropriate signals such as:
                  </p>
                  <ul>
                    <li>Campaign objectives and target outcomes</li>
                    <li>Publisher content, topics, context, and audience alignment</li>
                    <li>Aggregated and properly authorized audience characteristics</li>
                    <li>Historical engagement, conversion, and campaign-performance signals</li>
                    <li>Offer relevance and expected audience interest</li>
                    <li>Creative formats, placements, devices, channels, and geography</li>
                    <li>Brand-safety, suitability, compliance, and exclusion requirements</li>
                    <li>Expected performance, confidence level, and supporting explanations</li>
                    <li>Human review before campaign activation or commercial decisions</li>
                  </ul>
                  <h3>Intended Outcome</h3>
                  <p>
                    A functional prototype or well-developed proof of concept
                    that ranks and explains suitable publisher, audience, offer,
                    and campaign combinations while supporting privacy,
                    transparency, responsible data use, brand safety, and human
                    decision-making.
                  </p>
                </>
              ) : isEnterprise ? (
                <>
                  <p>
                    Organizations often rely on disconnected systems, repetitive
                    manual work, and information spread across documents, emails,
                    databases, and business applications. Traditional automation
                    can handle predictable steps, but it often struggles when a
                    workflow requires reasoning, context, judgment, or human
                    collaboration.
                  </p>
                  <p>
                    Participants will design and develop an enterprise AI agent
                    that can:
                  </p>
                  <ul>
                    <li>Understand a real business objective and its workflow</li>
                    <li>Retrieve and interpret information from approved sources</li>
                    <li>Perform useful multi-step tasks across business systems</li>
                    <li>Maintain context throughout the workflow</li>
                    <li>Ask for clarification when information is incomplete</li>
                    <li>Escalate exceptions and important decisions to a person</li>
                    <li>Explain its actions, recommendations, and results</li>
                    <li>Protect sensitive information through appropriate access controls</li>
                    <li>Maintain auditable records of actions and decisions</li>
                    <li>Demonstrate a measurable improvement in speed, quality, cost, or productivity</li>
                  </ul>
                  <h3>Possible Use Cases</h3>
                  <p>
                    Solutions may address areas such as operations, customer
                    support, recruiting, sales, marketing, finance, compliance,
                    research, or internal knowledge management.
                  </p>
                  <h3>Intended Outcome</h3>
                  <p>
                    A functional prototype or well-developed proof of concept
                    demonstrating how an AI agent can improve a meaningful
                    enterprise workflow while maintaining security, transparency,
                    reliability, and human oversight.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Healthcare organizations often struggle to connect qualified
                    clinicians with the right opportunities quickly and accurately.
                    Traditional matching processes depend heavily on manual screening,
                    incomplete profiles, keyword searches, and disconnected systems.
                    This can delay hiring, increase administrative work, produce weak
                    matches, and overlook qualified professionals.
                  </p>
                  <p>Participants will develop an explainable AI solution that improves clinician-to-opportunity matching by considering:</p>
                  <ul>
                    <li>Skills, specialties, licenses, certifications, and credentials</li>
                    <li>Professional experience and clinical background</li>
                    <li>Availability and preferred assignment type</li>
                    <li>Geographic preferences and licensing eligibility</li>
                    <li>Clinician preferences and stated requirements</li>
                    <li>Facility requirements and organizational priorities</li>
                    <li>Clear explanations showing why each match was recommended</li>
                    <li>Human review before any final hiring or placement decision</li>
                  </ul>
                  <h3>Intended Outcome</h3>
                  <p>
                    A practical solution or working prototype that helps organizations
                    identify stronger clinician matches while supporting transparency,
                    privacy, responsible AI use, and human decision-making.
                  </p>
                </>
              )}
            </div>
          </Section>
          <Section
            eyebrow="What you will build"
            title="Required Submission Components"
            soft
          >
            <p className="prose">
              {isPublisher
                ? "Participants should submit a functional prototype or well-developed proof of concept demonstrating how AI can improve publisher, audience, offer, and campaign matching."
                : isEnterprise
                ? "Participants should submit a functional prototype or well-developed proof of concept demonstrating an AI agent performing a meaningful enterprise workflow."
                : "Participants should submit a functional prototype or well-developed proof of concept demonstrating how AI can improve clinician-to-opportunity matching."}
            </p>
            <Cards
              items={isPublisher ? [
                {
                  title: "01 — Matching and Recommendation Solution",
                  copy: "A working prototype that evaluates publishers, audiences, offers, content environments, and campaign requirements.",
                },
                {
                  title: "02 — Data and Signal Framework",
                  copy: "A clear explanation of the approved data sources, signals, features, assumptions, and limitations used by the solution.",
                },
                {
                  title: "03 — Explainable Rankings",
                  copy: "Each recommendation should include a fit score, confidence level, and understandable reasons supporting the result.",
                },
                {
                  title: "04 — Solution Architecture",
                  copy: "An overview of the AI models, data workflow, integrations, privacy controls, system components, and human-review process.",
                },
                {
                  title: "05 — Demonstration",
                  copy: "A short recorded or live demonstration showing how a campaign is evaluated and matched with suitable publishers or audience environments.",
                },
                {
                  title: "06 — Testing and Measurable Results",
                  copy: "Sample results or evaluation evidence showing relevance, prediction quality, ranking quality, usability, or potential performance improvement.",
                },
                {
                  title: "07 — Privacy, Brand Safety, and Responsible AI Disclosure",
                  copy: "An explanation of consent, privacy, data protection, bias, audience fairness, brand suitability, transparency, model limitations, and responsible marketing safeguards.",
                },
              ] : isEnterprise ? [
                {
                  title: "01 — Working AI Agent",
                  copy: "A functional agent that understands an objective and completes useful multi-step tasks.",
                },
                {
                  title: "02 — Business Workflow",
                  copy: "A clear description of the existing problem, intended users, current process, and how the agent improves it.",
                },
                {
                  title: "03 — Solution Architecture",
                  copy: "An overview of the AI models, tools, data sources, integrations, permissions, memory, and system components.",
                },
                {
                  title: "04 — Human Oversight and Controls",
                  copy: "A demonstration of where human approval is required and how the agent handles uncertainty, exceptions, errors, and restricted actions.",
                },
                {
                  title: "05 — Demonstration",
                  copy: "A short recorded or live demonstration showing the agent completing the proposed workflow.",
                },
                {
                  title: "06 — Testing and Measurable Results",
                  copy: "Evidence showing improvements in productivity, speed, cost, accuracy, quality, or user experience.",
                },
                {
                  title: "07 — Security and Responsible AI Disclosure",
                  copy: "An explanation of access controls, privacy, data protection, auditability, bias considerations, model limitations, and responsible AI safeguards.",
                },
              ] : [
                {
                  title: "01 — Matching Solution",
                  copy: "A working prototype that evaluates clinician qualifications, credentials, preferences, availability, and organizational requirements.",
                },
                {
                  title: "02 — Explainable Recommendations",
                  copy: "Each recommended match should include clear reasons explaining why the clinician and opportunity are compatible.",
                },
                {
                  title: "03 — Solution Architecture",
                  copy: "A concise explanation of the technology, AI models, data inputs, workflow, integrations, and key assumptions.",
                },
                {
                  title: "04 — Demonstration",
                  copy: "A short recorded or live demonstration showing the solution’s primary workflow and results.",
                },
                {
                  title: "05 — Testing and Evidence",
                  copy: "Sample results or evaluation data demonstrating the solution’s accuracy, relevance, fairness, usability, or efficiency.",
                },
                {
                  title: "06 — Responsible AI Disclosure",
                  copy: "An explanation of how the solution addresses privacy, consent, bias, security, human review, explainability, and appropriate use of healthcare workforce data.",
                },
              ]}
            />
            <p className="prose submission-note">
              <strong>Important:</strong> Participants must use fictional,
              {isPublisher
                ? " anonymized, aggregated, public, or properly authorized data. Personally identifiable information, sensitive consumer information, access credentials, confidential campaign data, or proprietary publisher data must not be submitted without appropriate permission."
                : isEnterprise
                ? " anonymized, public, or properly authorized data. Confidential business information, personal information, credentials, or proprietary data must not be submitted without appropriate permission."
                : " anonymized, or properly authorized data only. Protected health information, confidential employer information, and personal data without appropriate permission must not be submitted."}
            </p>
          </Section>
          <Section eyebrow="Evaluation" title="Evaluation Criteria">
            <p className="prose">
              Eligible submissions will be evaluated using the published criteria below.
            </p>
            <Cards
              cols={5}
              items={isPublisher ? [
                { title: "Matching and Recommendation Quality — 25%", copy: "Relevance, accuracy, ranking quality, confidence scoring, and practical usefulness." },
                { title: "Business Value and Market Relevance — 20%", copy: "Importance of the problem and potential value for publishers, advertisers, and performance-marketing teams." },
                { title: "Technical Execution — 15%", copy: "Functionality, architecture, data workflow, integrations, reliability, usability, and scalability." },
                { title: "Explainability and Decision Support — 15%", copy: "Clarity of recommendations and usefulness of the supporting reasons for human decision-makers." },
                { title: "Privacy, Brand Safety, and Responsible AI — 15%", copy: "Consent, privacy, data protection, audience fairness, transparency, brand suitability, and appropriate safeguards." },
                { title: "Testing and Measurable Evidence — 10%", copy: "Quality of testing and evidence supporting relevance or potential performance improvement." },
              ] : isEnterprise ? [
                { title: "Business Value and Relevance — 25%", copy: "Importance of the problem and the solution’s potential operational value." },
                { title: "Agent Functionality — 20%", copy: "Ability to understand objectives and complete useful multi-step tasks." },
                { title: "Technical Quality — 15%", copy: "Architecture, reliability, integrations, scalability, and implementation quality." },
                { title: "Security and Responsible AI — 15%", copy: "Privacy, access controls, data protection, auditability, limitations, and safeguards." },
                { title: "Human Oversight — 10%", copy: "Approval controls, escalation, transparency, and safe handling of uncertainty." },
                { title: "Measurable Results — 10%", copy: "Evidence of improvements in speed, quality, cost, accuracy, or productivity." },
                { title: "Demonstration and Communication — 5%", copy: "Clarity of the demonstration and explanation of the solution." },
              ] : [
                { title: "Problem Understanding and Relevance — 20%", copy: "Understanding of the clinician-matching problem and relevance of the proposed solution." },
                { title: "Matching Quality — 25%", copy: "Accuracy, relevance, completeness, and practical usefulness of the recommended matches." },
                { title: "Explainability — 20%", copy: "Clarity of the reasons provided for each recommendation and the ability of a human reviewer to understand the result." },
                { title: "Technical Execution — 20%", copy: "Functionality, architecture, usability, reliability, integration readiness, and ability to scale." },
                { title: "Responsible AI — 15%", copy: "Privacy, security, consent, bias mitigation, fairness, appropriate data use, transparency, and human oversight." },
              ]}
            />
            <p className="prose evaluation-note">
              <strong>Total: 100%.</strong>{" "}
              {isPublisher
                ? "Judging may include technical review, demonstration review, validation of submitted claims, and follow-up questions. StartupFair may use qualified independent judges, challenge sponsors, marketing professionals, publishers, advertisers, or subject-matter experts."
                : isEnterprise
                ? "Judging may include technical review, demonstration review, validation of submitted claims, and follow-up questions. StartupFair may use qualified independent judges, challenge sponsors, or subject-matter experts."
                : "Eligible submissions may be reviewed by a panel with relevant business, technical, healthcare-workforce, and responsible-AI experience. Evaluator decisions will be based on the submitted materials and published criteria."}
            </p>
          </Section>
          <Section
            eyebrow="Timeline"
            title="Challenge Timeline"
            soft
          >
            <div className="timeline">
              {isPublisher ? (
                <>
                  <div><strong>01 — Registration of Interest</strong><p>Interested individuals and teams create their private StartupFair profiles and register to receive challenge updates.</p></div>
                  <div><strong>02 — Challenge Launch and Applications</strong><p>StartupFair publishes the complete challenge brief, eligibility requirements, rules, schedule, submission requirements, and evaluation criteria.</p></div>
                  <div><strong>03 — Participant Confirmation</strong><p>Approved participants receive challenge instructions and any authorized datasets, templates, or supporting resources.</p></div>
                  <div><strong>04 — Build Period</strong><p>Participants design, develop, test, and document their publisher-to-campaign intelligence solutions.</p></div>
                  <div><strong>05 — Final Submission and Compliance Review</strong><p>Participants submit their prototype, demonstration, architecture, testing evidence, and required privacy and responsible-AI disclosures. StartupFair reviews submissions for completeness, eligibility, originality, authorized data use, and compliance with the challenge rules.</p></div>
                  <div><strong>06 — Evaluation and Finalist Selection</strong><p>Eligible submissions are reviewed using the published criteria. Selected participants may be invited to answer questions or provide an additional demonstration.</p></div>
                  <div><strong>07 — Results and Opportunity Discussions</strong><p>Winners and finalists are publicly announced. Selected participants may be invited to paid-project, pilot, partnership, product-development, hiring, mentorship, or venture discussions.</p></div>
                </>
              ) : (
                <>
                  <div><strong>01 — Applications Open</strong><p>Eligible individuals and teams create their private profiles and apply to participate.</p></div>
                  <div><strong>02 — Participant Confirmation</strong><p>{isEnterprise ? "Approved participants receive the complete challenge brief, rules, submission requirements, evaluation criteria, and authorized resources." : "Approved participants receive challenge instructions, rules, submission requirements, and authorized resources."}</p></div>
                  <div><strong>03 — Build Period</strong><p>{isEnterprise ? "Participants design, develop, test, and document their AI agents during the announced challenge period." : "Participants design, develop, test, and document their solutions during the announced challenge period."}</p></div>
                  <div><strong>04 — Final Submission</strong><p>{isEnterprise ? "Participants submit their prototype, demonstration, architecture, testing evidence, and required security and responsible-AI disclosures." : "Participants submit their prototype, demonstration, technical documentation, testing evidence, and required responsible-AI disclosures."}</p></div>
                  <div><strong>05 — Eligibility and Compliance Review</strong><p>{isEnterprise ? "StartupFair reviews submissions for completeness, eligibility, originality, data-use compliance, and adherence to the challenge rules." : "StartupFair reviews submissions for completeness, eligibility, data-use compliance, and adherence to challenge rules."}</p></div>
                  <div><strong>06 — Evaluation and Finalist Selection</strong><p>{isEnterprise ? "Eligible submissions are reviewed using the published evaluation criteria. Selected participants may be invited to answer questions or provide an additional demonstration." : "Eligible submissions are reviewed using the published evaluation criteria."}</p></div>
                  <div><strong>07 — Results and Opportunity Discussions</strong><p>Winners and finalists are publicly announced. Selected participants may be invited to hiring, paid-project, pilot, partnership, mentorship, or venture discussions.</p></div>
                </>
              )}
            </div>
            <p className="prose timeline-note">
              Exact dates and deadlines will be published {isPublisher ? "when the challenge opens" : "before applications open"}.
              StartupFair may update the schedule when necessary and will
              communicate material changes to registered participants.
            </p>
          </Section>
          <Section eyebrow="Eligibility" title="Who Can Participate">
            <Cards
              cols={5}
              items={isPublisher ? [
                { title: "AI, Data, and Technical Talent", copy: "AI engineers, software developers, data scientists, machine-learning specialists, architects, and technical builders." },
                { title: "Performance Marketing and AdTech Professionals", copy: "Performance marketers, media buyers, campaign analysts, affiliate-marketing professionals, advertising-technology specialists, and growth professionals." },
                { title: "Publishers and Media Professionals", copy: "Digital publishers, audience-development professionals, content strategists, media operators, and publisher-monetization specialists." },
                { title: "Product, Research, and Design Professionals", copy: "Product managers, UX designers, researchers, analysts, and solution designers." },
                { title: "Students, Founders, and Multidisciplinary Teams", copy: "Students, recent graduates, independent innovators, startups, and teams combining technical, media, marketing, and business expertise." },
              ] : isEnterprise ? [
                { title: "AI and Technical Talent", copy: "AI engineers, software developers, data scientists, solution architects, and technical builders." },
                { title: "Automation and Integration Specialists", copy: "Professionals experienced in APIs, workflow automation, enterprise applications, data systems, or process improvement." },
                { title: "Product and Industry Professionals", copy: "Product managers, designers, researchers, operations professionals, and people with expertise in specific business functions or industries." },
                { title: "Students and Emerging Talent", copy: "College students, recent graduates, career changers, and self-taught builders with relevant capabilities." },
                { title: "Founders and Multidisciplinary Teams", copy: "Independent innovators, startups, and established teams combining technical and business expertise." },
              ] : [
                { title: "AI and Technical Talent", copy: "AI developers, software engineers, data scientists, architects, and technical builders." },
                { title: "Product and Design Professionals", copy: "Product managers, UX designers, researchers, and solution designers." },
                { title: "Healthcare and Workforce Specialists", copy: "Clinicians, healthcare workforce professionals, staffing specialists, operations professionals, and healthcare-domain experts." },
                { title: "Students and Emerging Talent", copy: "College students, recent graduates, career changers, and self-taught builders." },
                { title: "Founders and Innovators", copy: "Independent innovators, startups, and established multidisciplinary teams." },
              ]}
            />
            <div className="prose eligibility-copy">
              <h3>Participation Requirements</h3>
              <ul>
                {(isEnterprise || isPublisher) && <li>Participation is open globally to eligible individuals and teams.</li>}
                <li>Participants must meet the minimum legal age required in their jurisdiction.</li>
                <li>Each participant must create a private StartupFair profile and accept the challenge-specific rules.</li>
                <li>Submitted work must be original or properly licensed.</li>
                <li>{isPublisher ? "Participants must disclose significant third-party datasets, AI models, APIs, advertising technologies, software, and intellectual property used." : <>Participants must disclose significant third-party tools, datasets, AI models, {isEnterprise && "APIs, "}and intellectual property used.</>}</li>
                {isPublisher && <li>All publisher, audience, campaign, and performance data must be public, fictional, anonymized, aggregated, or properly authorized.</li>}
                <li>{isPublisher ? "Submissions must not contain personally identifiable information, sensitive consumer data, access credentials, confidential campaign information, or proprietary publisher data without permission." : isEnterprise ? "Submissions must not contain confidential business information, personal information, access credentials, or proprietary data without authorization." : "Submissions must not contain protected health information, confidential employer data, or information obtained without appropriate authorization."}</li>
                <li>{isPublisher ? "Participants must comply with applicable privacy, advertising, consumer-protection, intellectual-property, responsible-AI, platform-policy, export-control, and local legal requirements." : "Participants must comply with applicable privacy, security, intellectual-property, responsible-AI, export-control, and local legal requirements."}</li>
              </ul>
              <p><strong>Detailed eligibility, intellectual-property, confidentiality, {isPublisher && "data-use, "}judging, disqualification, and award terms will be presented before application submission.</strong></p>
            </div>
          </Section>
        </article>
      <aside className="detail-aside">
        <h3>At a Glance</h3>
        <p>Status: {c.status}</p>
        <p>Category: {c.tag}</p>
        <p>Format: Individual or Team</p>
        <p>Participation: Global</p>
        <p>Challenge Type: Talent + Innovation</p>
        <p>
          Potential Outcomes: {isPublisher ? "Paid projects, pilots, partnerships, product-development opportunities, and hiring discussions" : "Hiring, paid projects, pilots, and strategic partnerships"}
        </p>
        <p>{isPublisher ? "Registration Opens" : "Application Deadline"}: To Be Announced</p>
        <p>Build Period: To Be Announced</p>
        <p>Results Announcement: To Be Announced</p>
        <Link className="button primary" href={actionHref}>
          {isPublisher ? "Register Interest" : "Apply to Participate"}
        </Link>
        <hr />
        <small>
          Eligibility, intellectual-property, confidentiality, privacy,
          data-use, AI-tool, judging, disqualification, and award terms will be
          shown before {isPublisher ? "a final challenge application" : "an application"} is submitted.
        </small>
      </aside>
      </div>
      <CTA
        title={isPublisher ? "Ready to Build Smarter Connections Between Publishers and Campaigns?" : isEnterprise ? "Ready to Build AI That Works in the Real World?" : "Ready to Improve How Healthcare Talent Is Matched?"}
        copy={isPublisher ? "Bring your AI, data, publishing, advertising, or performance-marketing expertise to this upcoming challenge. Register your interest, demonstrate your capabilities when the challenge opens, and create possible pathways to paid projects, pilots, partnerships, product development, hiring, mentorship, or venture discussions." : isEnterprise ? "Bring your AI, engineering, product, automation, or industry expertise to a real enterprise challenge. Build a practical AI agent, demonstrate your capabilities, and create possible pathways to hiring, paid projects, pilots, partnerships, mentorship, or venture discussions." : "Bring your AI, healthcare, product, or workforce expertise to a real industry challenge. Build a practical solution, demonstrate your capabilities, and create possible pathways to hiring, paid projects, pilots, partnerships, mentorship, or venture discussions."}
        buttons={[
          [isPublisher ? "Register Interest" : "Apply to Participate", actionHref],
          ["Explore Other Challenges", "/challenges"],
        ]}
        note={isPublisher ? "Registering interest does not guarantee an invitation, acceptance, recognition, employment, a paid engagement, a pilot, a partnership, funding, or any other outcome." : "Submitting an application does not guarantee acceptance, recognition, employment, a paid engagement, a pilot, a partnership, funding, or any other outcome."}
      />
    </Layout>
  );
}

function ClinicianApplicationPage() {
  return (
    <Layout>
      <section className="detail-hero">
        <span className="eyebrow">Application · Step 1 of 9</span>
        <div className="tags">
          <span>Open Now</span>
          <span>AI Clinician Matching Challenge</span>
        </div>
        <h1>Apply to Participate</h1>
        <p>
          Show us how your experience, capabilities, and ideas could contribute
          to improving healthcare talent matching.
        </p>
        <p>
          StartupFair welcomes eligible individuals and teams from around the
          world. There is no fee to apply.
        </p>
        <div className="actions"><Link className="button primary" href="/apply/ai-clinician-matching/participant-type">Start Application</Link><Link className="button" href="/challenges/ai-clinician-matching">View Challenge Details</Link></div>
      </section>
      <Section
        id="before-you-begin"
        eyebrow="Application overview"
        title="Before You Begin"
      >
        <div className="prose">
          <p>Please be prepared to provide:</p>
          <ul>
            <li>Your contact and location information</li>
            <li>Your professional or academic background</li>
            <li>Relevant AI, healthcare, product, workforce, or technical experience</li>
            <li>Links to LinkedIn, GitHub, a portfolio, or a website</li>
            <li>A brief explanation of why you want to participate</li>
            <li>A preliminary description of how you may approach the challenge</li>
            <li>Information about your team, if applying as a team</li>
            <li>Required eligibility and policy acknowledgments</li>
          </ul>
          <p><strong>Estimated completion time:</strong> 10–15 minutes</p>
          <div className="actions">
            <Link className="button primary" href="/apply/ai-clinician-matching/participant-type">Start Application</Link>
            <Link className="button" href="/challenges/ai-clinician-matching">Return to Challenge</Link>
          </div>
          <p className="submission-note">
            Submitting an application does not guarantee acceptance or any
            employment, project, pilot, partnership, funding, or other outcome.
            Applicants must review and accept the challenge-specific rules
            before final submission.
          </p>
        </div>
      </Section>
    </Layout>
  );
}

function EnterpriseApplicationPage() {
  return (
    <Layout>
      <section className="detail-hero">
        <span className="eyebrow">Application · Step 1 of 9</span>
        <div className="tags">
          <span>Open Now</span>
          <span>Enterprise AI Agent Challenge</span>
        </div>
        <h1>Apply to Participate</h1>
        <p>Show us how your experience, capabilities, and ideas could contribute to building practical, secure, and human-supervised AI agents for real enterprise workflows.</p>
        <p>StartupFair welcomes eligible individuals and teams from around the world. There is no fee to apply.</p>
        <div className="actions"><Link className="button primary" href="/apply/enterprise-ai-agent/participant-type">Start Application</Link><Link className="button" href="/challenges/enterprise-ai-agent">View Challenge Details</Link></div>
      </section>
      <Section id="enterprise-before-you-begin" eyebrow="Application overview" title="Before You Begin">
        <div className="prose">
          <p>Please be prepared to provide:</p>
          <ul>
            <li>Your contact and location information</li>
            <li>Your professional or academic background</li>
            <li>Relevant AI, software, data, automation, product, security, or industry experience</li>
            <li>Experience with AI agents, enterprise systems, APIs, integrations, or business workflows</li>
            <li>Links to LinkedIn, GitHub, a portfolio, demonstration, or website</li>
            <li>A brief explanation of why you want to participate</li>
            <li>A preliminary description of the enterprise workflow and AI-agent approach you may explore</li>
            <li>Information about your team, if applying as a team</li>
            <li>Required eligibility, privacy, security, IP, and data-use acknowledgments</li>
          </ul>
          <p><strong>Estimated completion time:</strong> 10–15 minutes</p>
          <div className="actions">
            <Link className="button primary" href="/apply/enterprise-ai-agent/participant-type">Start Application</Link>
            <Link className="button" href="/challenges/enterprise-ai-agent">Return to Challenge</Link>
          </div>
          <p className="submission-note">Submitting an application does not guarantee acceptance or any employment, paid project, pilot, partnership, funding, or other outcome. Applicants must review and accept the challenge-specific rules before final submission.</p>
        </div>
      </Section>
    </Layout>
  );
}

function PublisherApplicationPage() {
  return (
    <Layout>
      <section className="detail-hero">
        <span className="eyebrow">Interest Registration · Step 1 of 9</span>
        <div className="tags">
          <span>Coming Soon</span>
          <span>Publisher-to-Campaign Intelligence Challenge</span>
        </div>
        <h1>Register Interest in the Publisher-to-Campaign Intelligence Challenge</h1>
        <p>Help develop an AI-powered system that evaluates publisher, audience, content, campaign, and conversion signals to improve campaign matching and performance.</p>
        <p>StartupFair welcomes eligible individuals and teams from around the world. There is no fee to register interest.</p>
        <div className="actions"><Link className="button primary" href="/apply/publisher-campaign-intelligence/participant-type">Start Interest Registration</Link><Link className="button" href="/challenges/publisher-campaign-intelligence">View Challenge Details</Link></div>
      </section>
      <Section id="publisher-before-you-begin" eyebrow="Application overview" title="Before You Begin">
        <div className="prose">
          <h3>Who Can Register Interest</h3>
          <ul>
            <li>Individuals or teams worldwide</li>
            <li>AI and machine-learning professionals</li>
            <li>Data scientists and analytics specialists</li>
            <li>AdTech and MarTech professionals</li>
            <li>Publisher, media, affiliate, and performance-marketing specialists</li>
            <li>Product managers, developers, students, founders, and independent builders</li>
            <li>Applicants with transferable skills, even without direct advertising-industry experience</li>
          </ul>
          <h3>What Interested Participants Should Prepare</h3>
          <ul>
            <li>Contact and professional information</li>
            <li>Relevant technical, marketing, publishing, or analytics experience</li>
            <li>An example of a relevant project or business problem</li>
            <li>A preliminary approach to campaign-publisher matching</li>
            <li>Optional portfolio, LinkedIn, GitHub, case studies, or demonstrations</li>
            <li>Information about the team, if applying as a team</li>
            <li>Eligibility and submission acknowledgments</li>
          </ul>
          <p><strong>Estimated completion time:</strong> 10–15 minutes</p>
          <div className="actions">
            <Link className="button primary" href="/apply/publisher-campaign-intelligence/participant-type">Start Interest Registration</Link>
            <Link className="button" href="/challenges/publisher-campaign-intelligence">Return to Challenge Details</Link>
          </div>
          <p className="submission-note">Registering interest does not guarantee an invitation, acceptance, employment, a paid project, pilot, commercial partnership, funding, investment, or any other outcome.</p>
          <p className="submission-note"><strong>Prototype notice:</strong> During this website-development stage, application information is not transmitted or stored.</p>
        </div>
      </Section>
    </Layout>
  );
}

function ApplicationTypePage({ basePath, interestOnly = false }: { basePath: string; interestOnly?: boolean }) {
  const [applicationType, setApplicationType] = useState<"individual" | "team" | "">("");
  return (
    <Layout>
      <section className="detail-hero">
        <span className="eyebrow">{interestOnly ? "Interest Registration" : "Application"} · Step 2 of 9</span>
        <h1>{interestOnly ? "How Are You Registering?" : "How Are You Applying?"}</h1>
        <p>Choose the option that best represents your {interestOnly ? "registration" : "application"}.</p>
      </section>
      <Section eyebrow="Participant type" title="Individual or Team">
        <EmailRoutingForm category="challenges" className="contact-form" onSubmit={(event) => { event.preventDefault(); window.location.assign(`${basePath}/contact`); }}>
          <label className="wide check">
            <input
              required
              type="radio"
              name="applicationType"
              value="individual"
              checked={applicationType === "individual"}
              onChange={() => setApplicationType("individual")}
            />
            <span><strong>Applying as an Individual</strong><br />You will participate independently and will be responsible for the complete submission.</span>
          </label>
          <label className="wide check">
            <input
              required
              type="radio"
              name="applicationType"
              value="team"
              checked={applicationType === "team"}
              onChange={() => setApplicationType("team")}
            />
            <span><strong>Applying as a Team</strong><br />Two or more people will collaborate on the challenge submission. One person must serve as the primary contact.</span>
          </label>
          {applicationType === "team" && (
            <>
              <label>Team name<input required name="teamName" /></label>
              <label>Number of team members<input required min="2" type="number" name="teamSize" /></label>
              <label>Primary contact’s name<input required name="primaryContactName" /></label>
              <label>Primary contact’s email<input required type="email" name="primaryContactEmail" /></label>
              <label className="wide">Names of other team members<textarea required name="teamMembers" rows={4} /></label>
              <label className="wide">Each member’s role or area of expertise<textarea required name="teamRoles" rows={4} /></label>
              <label className="wide check">
                <input required type="checkbox" name="teamProfileConfirmation" />
                I confirm that every team member will create or be associated with a private StartupFair profile before final submission.
              </label>
            </>
          )}
          <div className="wide actions">
            <button className="button primary" type="submit" disabled={!applicationType}>Continue</button>
            <Link className="button" href={basePath}>Back to Overview</Link>
          </div>
          <p className="wide submission-note">
            The application type may be changed before final submission. Team
            membership changes after acceptance may require StartupFair approval.
          </p>
        </EmailRoutingForm>
      </Section>
    </Layout>
  );
}

function ApplicationContactPage({ basePath, challengeName, interestOnly = false }: { basePath: string; challengeName: string; interestOnly?: boolean }) {
  return (
    <Layout>
      <section className="detail-hero">
        <span className="eyebrow">{interestOnly ? "Interest Registration" : "Application"} · Step 3 of 9</span>
        <h1>Tell Us How to Reach You</h1>
        <p>For team applications, this section should be completed by the primary contact.</p>
      </section>
      <Section eyebrow="Applicant details" title="Contact Information">
        <EmailRoutingForm category="challenges" className="contact-form" onSubmit={(event) => { event.preventDefault(); window.location.assign(`${basePath}/background`); }}>
          <label>First name<input required name="firstName" autoComplete="given-name" /></label>
          <label>Last name<input required name="lastName" autoComplete="family-name" /></label>
          <label>Preferred name <small>(optional)</small><input name="preferredName" /></label>
          <label>Email address<input required type="email" name="email" autoComplete="email" /></label>
          <label>Phone number <small>(optional)</small><input type="tel" name="phone" autoComplete="tel" /></label>
          <label>Country or region<input required name="country" autoComplete="country-name" /></label>
          <label>State, province, or territory <small>(optional)</small><input name="region" autoComplete="address-level1" /></label>
          <label>City<input required name="city" autoComplete="address-level2" /></label>
          <label>Time zone<input required name="timeZone" placeholder="Example: Pacific Time (UTC−8)" /></label>
          <label>Preferred contact method<select required name="contactMethod" defaultValue=""><option value="" disabled>Select one</option><option>Email</option><option>Phone</option><option>Video call</option></select></label>
          <label className="wide check"><input required type="checkbox" name="communicationsConsent" />I agree to receive communications about this application and the {challengeName}.</label>
          <div className="wide actions">
            <button className="button primary" type="submit">Continue</button>
            <Link className="button" href={`${basePath}/participant-type`}>Back to Participant Type</Link>
          </div>
          <p className="wide submission-note">
            Contact information will remain private and will be used for
            application review, challenge administration, eligibility
            verification, safety, compliance, and relevant opportunity
            discussions. It will not be displayed publicly without permission.
          </p>
        </EmailRoutingForm>
      </Section>
    </Layout>
  );
}

function ClinicianApplicationBackgroundPage() {
  const expertise = [
    "Artificial intelligence or machine learning",
    "Software engineering",
    "Data science or analytics",
    "Product management",
    "UX or solution design",
    "Healthcare",
    "Healthcare staffing or workforce operations",
    "Recruiting or talent acquisition",
    "Business operations",
    "Privacy, security, or responsible AI",
    "Other",
  ];
  return (
    <Layout>
      <section className="detail-hero">
        <span className="eyebrow">Application · Step 4 of 9</span>
        <h1>Tell Us About Your Background</h1>
        <p>For team applications, describe the primary contact’s background here. Other team members’ capabilities can be included in the team information.</p>
      </section>
      <Section eyebrow="Experience and skills" title="Background and Capabilities">
        <EmailRoutingForm category="challenges" className="contact-form" onSubmit={(event) => { event.preventDefault(); window.location.assign("/apply/ai-clinician-matching/challenge-experience"); }}>
          <label>Current professional status<select required name="professionalStatus" defaultValue=""><option value="" disabled>Select one</option><option>Employed</option><option>Independent professional or consultant</option><option>Founder or business owner</option><option>Student</option><option>Recent graduate</option><option>Career changer</option><option>Not currently employed</option><option>Other</option></select></label>
          <label>Current or most recent job title<input required name="jobTitle" /></label>
          <label>Organization, company, or educational institution <small>(optional)</small><input name="organization" /></label>
          <label>Total years of relevant experience<select required name="experience" defaultValue=""><option value="" disabled>Select one</option><option>Less than 1 year</option><option>1–2 years</option><option>3–5 years</option><option>6–10 years</option><option>More than 10 years</option></select></label>
          <label>Highest level of education <small>(optional)</small><input name="education" /></label>
          <label>Field of study or professional discipline <small>(optional)</small><input name="discipline" /></label>
          <fieldset className="wide application-fieldset">
            <legend>Primary areas of expertise <small>(select all that apply)</small></legend>
            {expertise.map((item) => <label className="check" key={item}><input type="checkbox" name="expertise" value={item} />{item}</label>)}
          </fieldset>
          <label className="wide">Short professional summary <small>(maximum 1,500 characters)</small><textarea required maxLength={1500} name="professionalSummary" rows={7} placeholder="Briefly describe your professional background, strongest capabilities, and the types of problems you are best equipped to solve." /></label>
          <div className="wide actions">
            <button className="button primary" type="submit">Continue</button>
            <Link className="button" href="/apply/ai-clinician-matching/contact">Back to Contact Information</Link>
          </div>
          <p className="wide submission-note">Applicants should provide accurate information. StartupFair may request reasonable verification of material qualifications or experience during the review process.</p>
        </EmailRoutingForm>
      </Section>
    </Layout>
  );
}

function EnterpriseApplicationBackgroundPage() {
  const expertise = [
    "Artificial intelligence or machine learning",
    "Generative AI, large language models, or agentic systems",
    "Software engineering",
    "Data engineering, data science, or analytics",
    "APIs, integrations, or enterprise applications",
    "Cloud architecture, infrastructure, or DevOps",
    "Workflow automation or robotic process automation",
    "Product management",
    "UX, conversation design, or solution design",
    "Cybersecurity, privacy, or identity and access management",
    "Responsible AI, governance, risk, or compliance",
    "Business operations or process improvement",
    "Industry or domain expertise",
    "Other",
  ];
  return (
    <Layout>
      <section className="detail-hero">
        <span className="eyebrow">Application · Step 4 of 9</span>
        <h1>Tell Us About Your Background</h1>
        <p>For team applications, describe the primary contact’s background here. Other team members’ capabilities can be included in the team information.</p>
      </section>
      <Section eyebrow="Experience and skills" title="Background and Capabilities">
        <EmailRoutingForm category="challenges" className="contact-form" onSubmit={(event) => { event.preventDefault(); window.location.assign("/apply/enterprise-ai-agent/challenge-experience"); }}>
          <label>Current professional status<select required name="professionalStatus" defaultValue=""><option value="" disabled>Select one</option><option>Employed</option><option>Independent professional or consultant</option><option>Founder or business owner</option><option>Student</option><option>Recent graduate</option><option>Career changer</option><option>Not currently employed</option><option>Other</option></select></label>
          <label>Current or most recent job title<input required name="jobTitle" /></label>
          <label>Organization, company, or educational institution <small>(optional)</small><input name="organization" /></label>
          <label>Total years of relevant experience<select required name="experience" defaultValue=""><option value="" disabled>Select one</option><option>Less than 1 year</option><option>1–2 years</option><option>3–5 years</option><option>6–10 years</option><option>More than 10 years</option></select></label>
          <label>Highest level of education <small>(optional)</small><input name="education" /></label>
          <label>Field of study or professional discipline <small>(optional)</small><input name="discipline" /></label>
          <fieldset className="wide application-fieldset">
            <legend>Primary areas of expertise <small>(select all that apply)</small></legend>
            {expertise.map((item) => <label className="check" key={item}><input type="checkbox" name="expertise" value={item} />{item}</label>)}
          </fieldset>
          <label className="wide">Short professional summary <small>(maximum 1,500 characters)</small><textarea required maxLength={1500} name="professionalSummary" rows={7} placeholder="Briefly describe your background, strongest capabilities, and the enterprise or technical problems you are best equipped to solve." /></label>
          <div className="wide actions">
            <button className="button primary" type="submit">Continue</button>
            <Link className="button" href="/apply/enterprise-ai-agent/contact">Back to Contact Information</Link>
          </div>
          <p className="wide submission-note">Applicants should provide accurate information. StartupFair may request reasonable verification of material qualifications or experience during the review process.</p>
        </EmailRoutingForm>
      </Section>
    </Layout>
  );
}

function PublisherApplicationBackgroundPage() {
  const expertise = [
    "Artificial intelligence or machine learning",
    "Data science, analytics, or predictive modeling",
    "Recommendation, ranking, or matching systems",
    "Software engineering",
    "Data engineering",
    "APIs and platform integrations",
    "AdTech or MarTech",
    "Performance marketing and campaign optimization",
    "Publisher, media, or audience development",
    "Affiliate and partnership marketing",
    "Advertising operations or campaign management",
    "Publisher monetization",
    "Product management",
    "UX or solution design",
    "Privacy, security, or responsible AI",
    "Business or industry expertise",
    "Other",
  ];
  return (
    <Layout>
      <section className="detail-hero">
        <span className="eyebrow">Interest Registration · Step 4 of 9</span>
        <h1>Tell Us About Your Background</h1>
        <p>For team applications, describe the primary contact’s background here. Other team members’ capabilities can be included in the team information.</p>
      </section>
      <Section eyebrow="Experience and skills" title="Background and Capabilities">
        <EmailRoutingForm category="challenges" className="contact-form" onSubmit={(event) => { event.preventDefault(); window.location.assign("/apply/publisher-campaign-intelligence/challenge-experience"); }}>
          <label>Current professional status<select required name="professionalStatus" defaultValue=""><option value="" disabled>Select one</option><option>Employed</option><option>Independent professional or consultant</option><option>Founder or business owner</option><option>Student</option><option>Recent graduate</option><option>Career changer</option><option>Not currently employed</option><option>Other</option></select></label>
          <label>Current or most recent job title<input required name="jobTitle" /></label>
          <label>Organization, company, or educational institution <small>(optional)</small><input name="organization" /></label>
          <label>Total years of relevant experience<select required name="experience" defaultValue=""><option value="" disabled>Select one</option><option>Less than 1 year</option><option>1–2 years</option><option>3–5 years</option><option>6–10 years</option><option>More than 10 years</option></select></label>
          <label>Highest level of education <small>(optional)</small><input name="education" /></label>
          <label>Field of study or professional discipline <small>(optional)</small><input name="discipline" /></label>
          <fieldset className="wide application-fieldset">
            <legend>Primary areas of expertise <small>(select all that apply)</small></legend>
            {expertise.map((item) => <label className="check" key={item}><input type="checkbox" name="expertise" value={item} />{item}</label>)}
          </fieldset>
          <label className="wide">Short professional summary <small>(maximum 1,500 characters)</small><textarea required maxLength={1500} name="professionalSummary" rows={7} placeholder="Briefly describe your background, strongest capabilities, and the publishing, advertising, marketing, data, or technical problems you are best equipped to solve." /></label>
          <div className="wide actions">
            <button className="button primary" type="submit">Continue</button>
            <Link className="button" href="/apply/publisher-campaign-intelligence/contact">Back to Contact Information</Link>
          </div>
          <p className="wide submission-note">Applicants should provide accurate information. StartupFair may request reasonable verification of material qualifications or experience during the review process.</p>
        </EmailRoutingForm>
      </Section>
    </Layout>
  );
}

function PublisherApplicationExperiencePage() {
  const [sensitiveData, setSensitiveData] = useState("");
  const experienceAreas = [
    "Publisher or audience intelligence",
    "Digital media, advertising, or campaign operations",
    "Affiliate or performance marketing",
    "Campaign optimization and media buying",
    "Recommendation, ranking, or matching systems",
    "Attribution, conversion, or marketing analytics",
    "Content classification or natural-language processing",
    "Predictive modeling or machine learning",
    "Data pipelines and signal engineering",
    "Advertising APIs and platform integrations",
    "Experimentation or A/B testing",
    "Privacy, consumer protection, security, or responsible AI",
    "No direct advertising experience yet, but I have transferable skills",
    "Other",
  ];
  return (
    <Layout>
      <section className="detail-hero">
        <span className="eyebrow">Interest Registration · Step 5 of 9</span>
        <h1>Tell Us About Your Relevant Experience</h1>
        <p>Direct advertising-industry experience is helpful but not required. Applicants may demonstrate relevant skills through AI, data, software, publishing, media, analytics, product, marketing, or other transferable work.</p>
      </section>
      <Section eyebrow="Challenge fit" title="Challenge-Specific Experience">
        <EmailRoutingForm category="challenges" className="contact-form" onSubmit={(event) => { event.preventDefault(); window.location.assign("/apply/publisher-campaign-intelligence/motivation"); }}>
          <fieldset className="wide application-fieldset">
            <legend>Relevant experience areas <small>(select all that apply)</small></legend>
            {experienceAreas.map((item) => <label className="check" key={item}><input type="checkbox" name="experienceAreas" value={item} />{item}</label>)}
          </fieldset>
          <label className="wide">Relevant project, campaign, or business problem <small>(maximum 2,000 characters)</small><textarea required maxLength={2000} name="relevantProject" rows={8} placeholder="Describe your role, what you built, analyzed, operated, or improved, and measurable results when available." /></label>
          <label>Publisher and media familiarity<select required name="publisherFamiliarity" defaultValue=""><option value="" disabled>Select one</option><option>Extensive</option><option>Moderate</option><option>Basic</option><option>None yet</option></select></label>
          <label>Performance-marketing familiarity<select required name="performanceMarketingFamiliarity" defaultValue=""><option value="" disabled>Select one</option><option>Extensive</option><option>Moderate</option><option>Basic</option><option>None yet</option></select></label>
          <label className="wide">Matching, prediction, or optimization-system experience<select required name="matchingExperience" defaultValue=""><option value="" disabled>Select one</option><option>I have built and deployed one</option><option>I have built a prototype</option><option>I have contributed to one</option><option>I understand the concepts but have not built one</option><option>This would be my first related project</option></select></label>
          <fieldset className="wide application-fieldset">
            <legend>Have you worked with audience, campaign, conversion, consumer, or other sensitive data?</legend>
            <label className="check"><input required type="radio" name="sensitiveData" value="yes" checked={sensitiveData === "yes"} onChange={() => setSensitiveData("yes")} />Yes</label>
            <label className="check"><input required type="radio" name="sensitiveData" value="no" checked={sensitiveData === "no"} onChange={() => setSensitiveData("no")} />No</label>
          </fieldset>
          {sensitiveData === "yes" && <label className="wide">Briefly explain your experience and safeguards used <small>(maximum 1,000 characters)</small><textarea required maxLength={1000} name="sensitiveDataExperience" rows={5} /></label>}
          <div className="wide actions">
            <button className="button primary" type="submit">Continue</button>
            <Link className="button" href="/apply/publisher-campaign-intelligence/background">Back to Background and Capabilities</Link>
          </div>
          <p className="wide submission-note">StartupFair evaluates applicants based on their overall capabilities and potential contribution. Lack of direct advertising-industry experience does not automatically disqualify an applicant.</p>
        </EmailRoutingForm>
      </Section>
    </Layout>
  );
}

function PublisherApplicationApproachPage() {
  return (
    <Layout>
      <section className="detail-hero">
        <span className="eyebrow">Interest Registration · Step 6 of 9</span>
        <h1>How Would You Approach the Challenge?</h1>
        <p>A complete technical design is not required at this stage. We want to understand the problem you would prioritize, your reasoning, how you would measure value, and how you would use data responsibly.</p>
      </section>
      <Section eyebrow="Your perspective" title="Motivation and Proposed Approach">
        <EmailRoutingForm category="challenges" className="contact-form" onSubmit={(event) => { event.preventDefault(); window.location.assign("/apply/publisher-campaign-intelligence/links"); }}>
          <label className="wide">Why do you want to participate? <small>(maximum 1,000 characters)</small><textarea required maxLength={1000} name="motivation" rows={5} placeholder="Explain why this challenge is relevant to your interests, experience, or goals." /></label>
          <label className="wide">Which publisher-to-campaign matching problem would you prioritize? <small>(maximum 1,500 characters)</small><textarea required maxLength={1500} name="priorityProblem" rows={6} placeholder="Describe the problem, current limitations, and the outcome you would aim to improve." /></label>
          <label className="wide">Who are the intended users, and what decisions should the solution improve? <small>(maximum 1,000 characters)</small><textarea required maxLength={1000} name="usersAndDecisions" rows={5} placeholder="Examples may include publishers, advertisers, campaign managers, affiliate teams, media buyers, or analysts." /></label>
          <label className="wide">Preliminary AI and matching approach <small>(maximum 2,500 characters)</small><textarea required maxLength={2500} name="preliminaryApproach" rows={9} placeholder="Describe relevant publisher, audience, content, campaign, and performance signals; matching, ranking, or prediction methods; data sources and integrations; feedback mechanisms; and human-review points." /></label>
          <label className="wide">How would you measure success? <small>(maximum 1,500 characters)</small><textarea required maxLength={1500} name="successMeasures" rows={6} placeholder="Consider conversion quality, advertiser performance, publisher revenue, audience relevance, campaign suitability, or operational efficiency." /></label>
          <label className="wide">Privacy, fairness, explainability, and placement safeguards <small>(maximum 1,500 characters)</small><textarea required maxLength={1500} name="safeguards" rows={7} placeholder="Explain how you would address data permissions, privacy, bias, explainability, inappropriate campaign placements, uncertainty, errors, and human oversight." /></label>
          <label className="wide">Your expected contribution or team strengths <small>(maximum 1,000 characters)</small><textarea required maxLength={1000} name="expectedContribution" rows={5} placeholder="Describe the role you expect to play and the technical, publishing, advertising, marketing, product, or analytical strengths you would contribute." /></label>
          <label className="wide">Anticipated tools and resources <small>(optional · maximum 1,000 characters)</small><textarea maxLength={1000} name="toolsAndResources" rows={5} placeholder="List any AI models, development tools, authorized datasets, APIs, advertising platforms, or other resources you may use." /></label>
          <label className="wide">Expected weekly availability<select required name="weeklyAvailability" defaultValue=""><option value="" disabled>Select one</option><option>Fewer than 5 hours</option><option>5–10 hours</option><option>11–20 hours</option><option>More than 20 hours</option><option>To be determined after the schedule is announced</option></select></label>
          <div className="wide actions">
            <button className="button primary" type="submit">Continue</button>
            <Link className="button" href="/apply/publisher-campaign-intelligence/challenge-experience">Back to Challenge-Specific Experience</Link>
          </div>
          <p className="wide submission-note">Do not submit confidential campaign data, unauthorized publisher information, personally identifiable information, consumer-level tracking data, proprietary information you cannot share, or access credentials. Proposed approaches may change during the challenge.</p>
        </EmailRoutingForm>
      </Section>
    </Layout>
  );
}

function PublisherApplicationLinksPage() {
  return (
    <Layout>
      <section className="detail-hero">
        <span className="eyebrow">Interest Registration · Step 7 of 9</span>
        <h1>Share Your Work</h1>
        <p>Provide links that help reviewers understand your experience and capabilities. All fields are optional.</p>
      </section>
      <Section eyebrow="Evidence of capability" title="Professional Links and Work Samples">
        <EmailRoutingForm category="challenges" className="contact-form" onSubmit={(event) => { event.preventDefault(); window.location.assign("/apply/publisher-campaign-intelligence/acknowledgments"); }}>
          <label>LinkedIn profile<input type="url" name="linkedin" placeholder="https://" /></label>
          <label>GitHub or code repository<input type="url" name="codeRepository" placeholder="https://" /></label>
          <label>Personal portfolio<input type="url" name="portfolio" placeholder="https://" /></label>
          <label>Professional or company website<input type="url" name="website" placeholder="https://" /></label>
          <label>AI model, product, dashboard, prototype, or project demonstration<input type="url" name="demonstration" placeholder="https://" /></label>
          <label>Advertising, publishing, affiliate, or performance-marketing case study<input type="url" name="caseStudy" placeholder="https://" /></label>
          <label className="wide">Article, research paper, presentation, or technical work<input type="url" name="publishedWork" placeholder="https://" /></label>
          <label className="wide">Additional team-member links <small>(optional · maximum 1,500 characters)</small><textarea maxLength={1500} name="teamLinks" rows={6} placeholder="Add the team member’s name, describe the link, and provide the URL." /></label>
          <label className="wide">Additional context <small>(optional · maximum 1,000 characters)</small><textarea maxLength={1000} name="linkContext" rows={5} placeholder="Explain which work samples are most relevant and what reviewers should examine." /></label>
          <div className="wide actions">
            <button className="button primary" type="submit">Continue</button>
            <Link className="button" href="/apply/publisher-campaign-intelligence/motivation">Back to Motivation and Proposed Approach</Link>
          </div>
          <p className="wide submission-note">Applicants must have permission to share every submitted link. Work samples must not expose client-confidential data, personal information, campaign credentials, or proprietary information. Not having a portfolio, GitHub profile, or published work does not automatically disqualify an applicant.</p>
        </EmailRoutingForm>
      </Section>
    </Layout>
  );
}

function PublisherApplicationAcknowledgmentsPage() {
  const confirmations = [
    "I meet the minimum legal age required in my jurisdiction and am legally permitted to participate.",
    "The information in this application is accurate and complete to the best of my knowledge.",
    "I have the authority and necessary permission to submit all ideas, information, links, and materials included in this application.",
    "My application does not contain confidential campaign information, unauthorized publisher data, personally identifiable information, consumer-level tracking data, access credentials, restricted intellectual property, or proprietary information that I am not permitted to share.",
    "I will disclose significant datasets, APIs, AI models, advertising technologies, software, tools, and third-party intellectual property used if I am accepted into the challenge.",
    "I will use only public, fictional, anonymized, aggregated, or properly authorized data.",
    "I will follow applicable privacy, advertising, consumer-protection, intellectual-property, responsible-AI, platform-policy, export-control, and local legal requirements.",
    "I consent to StartupFair processing my application and sharing necessary information with authorized reviewers, evaluators, and relevant challenge organizations for application review and challenge administration.",
    "I authorize StartupFair to contact me regarding this application and its status.",
    "I understand that applying does not guarantee selection, recognition, employment, payment, a pilot, a partnership, funding, investment, commercialization, or any other outcome.",
    "I understand that submitting this application does not transfer ownership of my pre-existing intellectual property. Additional challenge-specific intellectual-property, data-use, and submission terms will be presented before participation or final challenge submission.",
  ];
  return (
    <Layout>
      <section className="detail-hero">
        <span className="eyebrow">Interest Registration · Step 8 of 9</span>
        <h1>Review and Confirm</h1>
        <p>Applicants must confirm the following before continuing to final review.</p>
      </section>
      <Section eyebrow="Required confirmations" title="Eligibility and Acknowledgments">
        <EmailRoutingForm category="challenges" className="contact-form" onSubmit={(event) => { event.preventDefault(); window.location.assign("/apply/publisher-campaign-intelligence/review"); }}>
          <fieldset className="wide application-fieldset">
            <legend>Required confirmations</legend>
            {confirmations.map((item) => <label className="check wide" key={item}><input required type="checkbox" name="confirmations" value={item} />{item}</label>)}
            <label className="check wide"><input required type="checkbox" name="policyAgreement" />I have reviewed and agree to the applicable <Link className="text-link" href="/privacy">Privacy Policy</Link>, <Link className="text-link" href="/terms">Terms of Use</Link>, and challenge-specific application rules.</label>
          </fieldset>
          <fieldset className="wide application-fieldset">
            <legend>Optional permission</legend>
            <label className="check wide"><input type="checkbox" name="otherOpportunities" />StartupFair may contact me about other relevant challenges, projects, hiring opportunities, pilots, partnerships, or programs.</label>
          </fieldset>
          <label>Full legal name<input required name="legalName" /></label>
          <label>Date<input required type="date" name="acknowledgmentDate" /></label>
          <label className="wide check"><input required type="checkbox" name="electronicAcknowledgment" />I confirm that entering my name constitutes my electronic acknowledgment of the statements above.</label>
          <div className="wide actions">
            <button className="button primary" type="submit">Continue to Review</button>
            <Link className="button" href="/apply/publisher-campaign-intelligence/links">Back to Professional Links</Link>
          </div>
          <p className="wide submission-note">These application acknowledgments should receive final legal review before the website begins accepting real applications.</p>
        </EmailRoutingForm>
      </Section>
    </Layout>
  );
}

function EnterpriseApplicationExperiencePage() {
  const [responsibleAI, setResponsibleAI] = useState("");
  const experienceAreas = [
    "AI agents or agentic workflows",
    "Generative AI or large language models",
    "Retrieval-augmented generation or enterprise search",
    "Tool use, orchestration, memory, or multi-agent systems",
    "APIs, integrations, or enterprise applications",
    "Workflow automation or process improvement",
    "Data engineering, analytics, or knowledge systems",
    "Cloud architecture, infrastructure, or DevOps",
    "Security, identity, permissions, or access controls",
    "AI evaluation, testing, monitoring, or observability",
    "Human-in-the-loop workflows and approval controls",
    "Responsible AI, governance, risk, or compliance",
    "No direct AI-agent experience yet, but I have transferable skills",
    "Other",
  ];
  return (
    <Layout>
      <section className="detail-hero">
        <span className="eyebrow">Application · Step 5 of 9</span>
        <h1>Tell Us About Your Enterprise AI Experience</h1>
        <p>Direct AI-agent experience is helpful but not required. Applicants may demonstrate relevant skills through software, automation, data, product, security, operations, or industry projects.</p>
      </section>
      <Section eyebrow="Challenge fit" title="Challenge-Specific Experience">
        <EmailRoutingForm category="challenges" className="contact-form" onSubmit={(event) => { event.preventDefault(); window.location.assign("/apply/enterprise-ai-agent/motivation"); }}>
          <fieldset className="wide application-fieldset">
            <legend>Relevant experience areas <small>(select all that apply)</small></legend>
            {experienceAreas.map((item) => <label className="check" key={item}><input type="checkbox" name="experienceAreas" value={item} />{item}</label>)}
          </fieldset>
          <label className="wide">Relevant project or problem <small>(maximum 2,000 characters)</small><textarea required maxLength={2000} name="relevantProject" rows={8} placeholder="Describe one project, product, research effort, or professional problem that demonstrates your ability to contribute. Include your role, what you built or improved, and measurable results when available." /></label>
          <label>Enterprise-workflow familiarity<select required name="enterpriseFamiliarity" defaultValue=""><option value="" disabled>Select one</option><option>Extensive</option><option>Moderate</option><option>Basic</option><option>None yet</option></select></label>
          <label>AI-agent familiarity<select required name="agentFamiliarity" defaultValue=""><option value="" disabled>Select one</option><option>I have built and deployed an AI agent</option><option>I have built an AI-agent prototype</option><option>I have contributed to an AI-agent project</option><option>I understand the concepts but have not built one</option><option>This would be my first AI-agent project</option></select></label>
          <fieldset className="wide application-fieldset">
            <legend>Have you worked with privacy, cybersecurity, permissions, sensitive data, human oversight, model evaluation, governance, or responsible-AI requirements?</legend>
            <label className="check"><input required type="radio" name="responsibleAI" value="yes" checked={responsibleAI === "yes"} onChange={() => setResponsibleAI("yes")} />Yes</label>
            <label className="check"><input required type="radio" name="responsibleAI" value="no" checked={responsibleAI === "no"} onChange={() => setResponsibleAI("no")} />No</label>
          </fieldset>
          {responsibleAI === "yes" && <label className="wide">Briefly explain your experience <small>(maximum 1,000 characters)</small><textarea required maxLength={1000} name="responsibleAIExperience" rows={5} /></label>}
          <div className="wide actions">
            <button className="button primary" type="submit">Continue</button>
            <Link className="button" href="/apply/enterprise-ai-agent/background">Back to Background and Capabilities</Link>
          </div>
          <p className="wide submission-note">StartupFair evaluates applicants based on their overall capabilities and potential contribution. Lack of prior AI-agent deployment experience does not automatically disqualify an applicant.</p>
        </EmailRoutingForm>
      </Section>
    </Layout>
  );
}

function EnterpriseApplicationApproachPage() {
  return (
    <Layout>
      <section className="detail-hero">
        <span className="eyebrow">Application · Step 6 of 9</span>
        <h1>How Would You Approach the Enterprise AI Challenge?</h1>
        <p>A complete architecture is not required at this stage. We want to understand the workflow you would improve, your reasoning, how you would manage risk, and the contribution you could make.</p>
      </section>
      <Section eyebrow="Your perspective" title="Motivation and Proposed Approach">
        <EmailRoutingForm category="challenges" className="contact-form" onSubmit={(event) => { event.preventDefault(); window.location.assign("/apply/enterprise-ai-agent/links"); }}>
          <label className="wide">Why do you want to participate? <small>(maximum 1,000 characters)</small><textarea required maxLength={1000} name="motivation" rows={5} placeholder="Explain why this challenge is relevant to your interests, experience, or goals." /></label>
          <label className="wide">Which enterprise workflow or problem would you improve? <small>(maximum 1,500 characters)</small><textarea required maxLength={1500} name="workflowProblem" rows={6} placeholder="Describe the intended users, the current process and pain points, and the outcome you would aim to improve." /></label>
          <label className="wide">Preliminary AI-agent approach <small>(maximum 2,500 characters)</small><textarea required maxLength={2500} name="preliminaryApproach" rows={9} placeholder="Outline the objective, inputs or data sources, models, tools or APIs, memory or orchestration, human approvals, and expected outputs." /></label>
          <label className="wide">Safety and control approach <small>(maximum 1,500 characters)</small><textarea required maxLength={1500} name="safetyApproach" rows={7} placeholder="Explain how you would address permissions, sensitive data, uncertainty, errors, escalation, auditability, and human oversight." /></label>
          <label className="wide">Your expected contribution or team strengths <small>(maximum 1,000 characters)</small><textarea required maxLength={1000} name="expectedContribution" rows={5} placeholder="Describe the role you expect to play and the technical, product, operational, or industry strengths you would contribute." /></label>
          <label className="wide">Anticipated tools and resources <small>(optional · maximum 1,000 characters)</small><textarea maxLength={1000} name="toolsAndResources" rows={5} placeholder="List any AI models, development tools, datasets, APIs, platforms, or other resources you may use." /></label>
          <label className="wide">Expected weekly availability<select required name="weeklyAvailability" defaultValue=""><option value="" disabled>Select one</option><option>Fewer than 5 hours</option><option>5–10 hours</option><option>11–20 hours</option><option>More than 20 hours</option><option>To be determined after the schedule is announced</option></select></label>
          <div className="wide actions">
            <button className="button primary" type="submit">Continue</button>
            <Link className="button" href="/apply/enterprise-ai-agent/challenge-experience">Back to Challenge-Specific Experience</Link>
          </div>
          <p className="wide submission-note">Proposed approaches may change during the challenge. Do not include confidential or proprietary information, personal or sensitive data, or access credentials in this application.</p>
        </EmailRoutingForm>
      </Section>
    </Layout>
  );
}

function EnterpriseApplicationLinksPage() {
  return (
    <Layout>
      <section className="detail-hero">
        <span className="eyebrow">Application · Step 7 of 9</span>
        <h1>Share Your Work</h1>
        <p>Provide links that help reviewers understand your experience and capabilities. All fields are optional.</p>
      </section>
      <Section eyebrow="Evidence of capability" title="Professional Links and Work Samples">
        <EmailRoutingForm category="challenges" className="contact-form" onSubmit={(event) => { event.preventDefault(); window.location.assign("/apply/enterprise-ai-agent/acknowledgments"); }}>
          <label>LinkedIn profile<input type="url" name="linkedin" placeholder="https://" /></label>
          <label>GitHub or code repository<input type="url" name="codeRepository" placeholder="https://" /></label>
          <label>Personal portfolio<input type="url" name="portfolio" placeholder="https://" /></label>
          <label>Professional or company website<input type="url" name="website" placeholder="https://" /></label>
          <label>Product, AI-agent prototype, research, or project demonstration<input type="url" name="demonstration" placeholder="https://" /></label>
          <label>Article, case study, presentation, or technical work<input type="url" name="publishedWork" placeholder="https://" /></label>
          <label className="wide">Additional team links <small>(optional · maximum 1,500 characters)</small><textarea maxLength={1500} name="teamLinks" rows={6} placeholder="Add the team member’s name, describe the link, and provide the URL." /></label>
          <label className="wide">Additional context <small>(optional · maximum 1,000 characters)</small><textarea maxLength={1000} name="linkContext" rows={5} placeholder="Explain which work samples are most relevant to this challenge and what reviewers should notice." /></label>
          <div className="wide actions">
            <button className="button primary" type="submit">Continue</button>
            <Link className="button" href="/apply/enterprise-ai-agent/motivation">Back to Motivation and Proposed Approach</Link>
          </div>
          <p className="wide submission-note">Applicants are responsible for ensuring they have permission to share all submitted links and materials. Not having a portfolio, GitHub profile, or published work does not automatically disqualify an applicant.</p>
        </EmailRoutingForm>
      </Section>
    </Layout>
  );
}

function EnterpriseApplicationAcknowledgmentsPage() {
  const confirmations = [
    "I meet the minimum legal age required in my jurisdiction and am legally permitted to participate.",
    "The information in this application is accurate and complete to the best of my knowledge.",
    "I have the authority and necessary permission to submit all information, links, ideas, and materials included in this application.",
    "My application does not contain confidential employer or client information, sensitive personal data, access credentials, unauthorized intellectual property, or proprietary information that I am not permitted to share.",
    "I will disclose significant third-party datasets, software, APIs, AI models, tools, and intellectual property used if I am accepted into the challenge.",
    "I will follow the challenge rules, applicable laws, security requirements, and responsible-AI standards.",
    "I consent to StartupFair processing my application and sharing necessary information with authorized reviewers, evaluators, and relevant challenge organizations for application review and challenge administration.",
    "I authorize StartupFair to contact me regarding this application and its status.",
    "I understand that applying does not guarantee acceptance, recognition, employment, a paid engagement, a pilot, a partnership, investment, funding, or any other outcome.",
    "I understand that submitting this application does not transfer ownership of my pre-existing intellectual property. Additional challenge-specific intellectual-property and submission terms will be presented before participation or final challenge submission.",
  ];
  return (
    <Layout>
      <section className="detail-hero">
        <span className="eyebrow">Application · Step 8 of 9</span>
        <h1>Review and Confirm</h1>
        <p>Applicants must confirm the following before continuing to final review.</p>
      </section>
      <Section eyebrow="Required confirmations" title="Eligibility and Acknowledgments">
        <EmailRoutingForm category="challenges" className="contact-form" onSubmit={(event) => { event.preventDefault(); window.location.assign("/apply/enterprise-ai-agent/review"); }}>
          <fieldset className="wide application-fieldset">
            <legend>Required confirmations</legend>
            {confirmations.map((item) => <label className="check wide" key={item}><input required type="checkbox" name="confirmations" value={item} />{item}</label>)}
            <label className="check wide"><input required type="checkbox" name="policyAgreement" />I have reviewed and agree to the applicable <Link className="text-link" href="/privacy">Privacy Policy</Link>, <Link className="text-link" href="/terms">Terms of Use</Link>, and challenge-specific application rules.</label>
          </fieldset>
          <fieldset className="wide application-fieldset">
            <legend>Optional permission</legend>
            <label className="check wide"><input type="checkbox" name="otherOpportunities" />StartupFair may contact me about other relevant challenges, projects, hiring opportunities, pilots, partnerships, or programs.</label>
          </fieldset>
          <label>Full legal name<input required name="legalName" /></label>
          <label>Date<input required type="date" name="acknowledgmentDate" /></label>
          <label className="wide check"><input required type="checkbox" name="electronicAcknowledgment" />I confirm that entering my name constitutes my electronic acknowledgment of the statements above.</label>
          <div className="wide actions">
            <button className="button primary" type="submit">Continue to Review</button>
            <Link className="button" href="/apply/enterprise-ai-agent/links">Back to Professional Links</Link>
          </div>
          <p className="wide submission-note">These application acknowledgments should receive final legal review before the website begins accepting real applications.</p>
        </EmailRoutingForm>
      </Section>
    </Layout>
  );
}

function ClinicianApplicationExperiencePage() {
  const [responsibleData, setResponsibleData] = useState("");
  const experienceAreas = [
    "AI or machine-learning applications",
    "Matching, recommendation, ranking, or search systems",
    "Healthcare technology",
    "Healthcare staffing or workforce operations",
    "Recruiting or talent acquisition",
    "Credentialing, licensing, or compliance workflows",
    "Data engineering or analytics",
    "Privacy, security, fairness, or responsible AI",
    "Product development or user-experience design",
    "No direct experience yet, but I have relevant transferable skills",
    "Other",
  ];
  return (
    <Layout>
      <section className="detail-hero">
        <span className="eyebrow">Application · Step 5 of 9</span>
        <h1>Tell Us About Your Relevant Experience</h1>
        <p>Prior healthcare experience is helpful but not required. Applicants may bring technical, product, workforce, operational, design, or domain expertise.</p>
      </section>
      <Section eyebrow="Challenge fit" title="Challenge-Specific Experience">
        <EmailRoutingForm category="challenges" className="contact-form" onSubmit={(event) => { event.preventDefault(); window.location.assign("/apply/ai-clinician-matching/motivation"); }}>
          <fieldset className="wide application-fieldset">
            <legend>Relevant experience areas <small>(select all that apply)</small></legend>
            {experienceAreas.map((item) => <label className="check" key={item}><input type="checkbox" name="experienceAreas" value={item} />{item}</label>)}
          </fieldset>
          <label className="wide">Relevant project or problem <small>(maximum 2,000 characters)</small><textarea required maxLength={2000} name="relevantProject" rows={8} placeholder="Describe your role, what you built or improved, and any measurable result." /></label>
          <label>Healthcare-workforce familiarity<select required name="healthcareFamiliarity" defaultValue=""><option value="" disabled>Select one</option><option>Extensive</option><option>Moderate</option><option>Basic</option><option>None yet</option></select></label>
          <label>AI matching-system familiarity<select required name="matchingFamiliarity" defaultValue=""><option value="" disabled>Select one</option><option>I have built or implemented a matching or recommendation system</option><option>I have contributed to one</option><option>I understand the concepts but have not built one</option><option>This would be my first matching-system project</option></select></label>
          <fieldset className="wide application-fieldset">
            <legend>Have you worked with privacy, sensitive data, security, fairness, explainability, or responsible-AI requirements?</legend>
            <label className="check"><input required type="radio" name="responsibleData" value="yes" checked={responsibleData === "yes"} onChange={() => setResponsibleData("yes")} />Yes</label>
            <label className="check"><input required type="radio" name="responsibleData" value="no" checked={responsibleData === "no"} onChange={() => setResponsibleData("no")} />No</label>
          </fieldset>
          {responsibleData === "yes" && <label className="wide">Briefly explain your experience <small>(maximum 1,000 characters)</small><textarea required maxLength={1000} name="responsibleDataExperience" rows={5} /></label>}
          <div className="wide actions">
            <button className="button primary" type="submit">Continue</button>
            <Link className="button" href="/apply/ai-clinician-matching/background">Back to Background and Capabilities</Link>
          </div>
          <p className="wide submission-note">StartupFair evaluates applicants based on their overall capabilities and potential contribution. Lack of direct healthcare experience does not automatically disqualify an applicant.</p>
        </EmailRoutingForm>
      </Section>
    </Layout>
  );
}

function ClinicianApplicationApproachPage() {
  return (
    <Layout>
      <section className="detail-hero">
        <span className="eyebrow">Application · Step 6 of 9</span>
        <h1>How Would You Approach the Challenge?</h1>
        <p>A complete technical design is not required at the application stage. We want to understand your thinking, motivation, and potential contribution.</p>
      </section>
      <Section eyebrow="Your perspective" title="Motivation and Proposed Approach">
        <EmailRoutingForm category="challenges" className="contact-form" onSubmit={(event) => { event.preventDefault(); window.location.assign("/apply/ai-clinician-matching/links"); }}>
          <label className="wide">Why do you want to participate? <small>(maximum 1,000 characters)</small><textarea required maxLength={1000} name="motivation" rows={5} placeholder="Explain why this challenge is relevant to your interests, experience, or goals." /></label>
          <label className="wide">Which part of the problem interests you most? <small>(maximum 1,000 characters)</small><textarea required maxLength={1000} name="problemInterest" rows={5} placeholder="Examples include qualification matching, credential interpretation, preferences, geographic eligibility, explainability, fairness, recruiter productivity, or user experience." /></label>
          <label className="wide">Preliminary approach <small>(maximum 2,500 characters)</small><textarea required maxLength={2500} name="preliminaryApproach" rows={9} placeholder="Describe the intended users, major workflow, relevant data inputs, AI methods, and human-review points." /></label>
          <label className="wide">Your expected contribution <small>(maximum 1,000 characters)</small><textarea required maxLength={1000} name="expectedContribution" rows={5} placeholder="Describe the role you expect to play and the capabilities you would contribute." /></label>
          <label className="wide">Anticipated tools and resources <small>(optional · maximum 1,000 characters)</small><textarea maxLength={1000} name="toolsAndResources" rows={5} placeholder="List any AI models, development tools, datasets, APIs, platforms, or other resources you may use." /></label>
          <label className="wide">Expected weekly availability<select required name="weeklyAvailability" defaultValue=""><option value="" disabled>Select one</option><option>Fewer than 5 hours</option><option>5–10 hours</option><option>11–20 hours</option><option>More than 20 hours</option><option>To be determined after the schedule is announced</option></select></label>
          <div className="wide actions">
            <button className="button primary" type="submit">Continue</button>
            <Link className="button" href="/apply/ai-clinician-matching/challenge-experience">Back to Relevant Experience</Link>
          </div>
          <p className="wide submission-note">Proposed approaches may change during the challenge. Applicants must not include confidential, proprietary, personal, or protected health information in this application.</p>
        </EmailRoutingForm>
      </Section>
    </Layout>
  );
}

function ClinicianApplicationLinksPage() {
  return (
    <Layout>
      <section className="detail-hero">
        <span className="eyebrow">Application · Step 7 of 9</span>
        <h1>Share Your Work</h1>
        <p>Provide links that help reviewers understand your experience and capabilities. All fields are optional.</p>
      </section>
      <Section eyebrow="Evidence of capability" title="Professional Links and Work Samples">
        <EmailRoutingForm category="challenges" className="contact-form" onSubmit={(event) => { event.preventDefault(); window.location.assign("/apply/ai-clinician-matching/acknowledgments"); }}>
          <label>LinkedIn profile<input type="url" name="linkedin" placeholder="https://" /></label>
          <label>GitHub or code repository<input type="url" name="codeRepository" placeholder="https://" /></label>
          <label>Personal portfolio<input type="url" name="portfolio" placeholder="https://" /></label>
          <label>Professional or company website<input type="url" name="website" placeholder="https://" /></label>
          <label>Product, application, research, or project demonstration<input type="url" name="demonstration" placeholder="https://" /></label>
          <label>Article, case study, presentation, or technical work<input type="url" name="publishedWork" placeholder="https://" /></label>
          <label className="wide">Additional team links <small>(optional · maximum 1,500 characters)</small><textarea maxLength={1500} name="teamLinks" rows={6} placeholder="Add the team member’s name, describe the link, and provide the URL." /></label>
          <label className="wide">Additional context <small>(optional · maximum 1,000 characters)</small><textarea maxLength={1000} name="linkContext" rows={5} placeholder="Explain which work samples are most relevant to this challenge and what reviewers should notice." /></label>
          <div className="wide actions">
            <button className="button primary" type="submit">Continue</button>
            <Link className="button" href="/apply/ai-clinician-matching/motivation">Back to Motivation and Proposed Approach</Link>
          </div>
          <p className="wide submission-note">Applicants are responsible for ensuring they have permission to share all submitted links and materials. Reviewers may access only the materials provided or publicly available through those links. Not having a portfolio, GitHub profile, or published work does not automatically disqualify an applicant.</p>
        </EmailRoutingForm>
      </Section>
    </Layout>
  );
}

function ClinicianApplicationAcknowledgmentsPage() {
  const confirmations = [
    "I meet the minimum legal age required in my jurisdiction and am legally permitted to participate.",
    "The information in this application is accurate and complete to the best of my knowledge.",
    "I have the authority and necessary permission to submit all information, links, ideas, and materials included in this application.",
    "My application does not contain protected health information, confidential employer information, access credentials, unauthorized personal information, or proprietary information that I am not permitted to share.",
    "I will disclose significant third-party datasets, software, APIs, AI models, tools, and intellectual property used if I am accepted into the challenge.",
    "I consent to StartupFair processing my application and sharing necessary information with authorized reviewers, evaluators, and relevant challenge organizations for application review and challenge administration.",
    "I understand that applying does not guarantee acceptance, recognition, employment, a paid engagement, a pilot, a partnership, funding, or any other outcome.",
    "I understand that submitting this application does not transfer ownership of my pre-existing intellectual property. Additional challenge-specific intellectual-property and submission terms will be presented before participation or final challenge submission.",
  ];
  return (
    <Layout>
      <section className="detail-hero">
        <span className="eyebrow">Application · Step 8 of 9</span>
        <h1>Review and Confirm</h1>
        <p>Applicants must confirm the following before continuing to final review.</p>
      </section>
      <Section eyebrow="Required confirmations" title="Eligibility and Acknowledgments">
        <EmailRoutingForm category="challenges" className="contact-form" onSubmit={(event) => { event.preventDefault(); window.location.assign("/apply/ai-clinician-matching/review"); }}>
          <fieldset className="wide application-fieldset">
            <legend>Required confirmations</legend>
            {confirmations.map((item) => <label className="check wide" key={item}><input required type="checkbox" name="confirmations" value={item} />{item}</label>)}
            <label className="check wide"><input required type="checkbox" name="policyAgreement" />I have reviewed and agree to the applicable <Link className="text-link" href="/privacy">Privacy Policy</Link>, <Link className="text-link" href="/terms">Terms of Use</Link>, and challenge-specific application rules.</label>
          </fieldset>
          <fieldset className="wide application-fieldset">
            <legend>Optional permission</legend>
            <label className="check wide"><input type="checkbox" name="otherOpportunities" />StartupFair may contact me about other relevant challenges, projects, hiring opportunities, pilots, partnerships, or programs.</label>
          </fieldset>
          <label>Full legal name<input required name="legalName" /></label>
          <label>Date<input required type="date" name="acknowledgmentDate" /></label>
          <label className="wide check"><input required type="checkbox" name="electronicAcknowledgment" />I confirm that entering my name constitutes my electronic acknowledgment of the statements above.</label>
          <div className="wide actions">
            <button className="button primary" type="submit">Continue to Review</button>
            <Link className="button" href="/apply/ai-clinician-matching/links">Back to Professional Links</Link>
          </div>
          <p className="wide submission-note">These application acknowledgments should receive final legal review before the website begins accepting real applications.</p>
        </EmailRoutingForm>
      </Section>
    </Layout>
  );
}

function ClinicianApplicationReviewPage() {
  const sections = [
    ["1. Application Type", "Individual or Team", "/apply/ai-clinician-matching/participant-type"],
    ["2. Contact Information", "Applicant or primary-contact details", "/apply/ai-clinician-matching/contact"],
    ["3. Background and Capabilities", "Professional status, experience, education, expertise, and summary", "/apply/ai-clinician-matching/background"],
    ["4. Challenge-Specific Experience", "Relevant experience, project example, healthcare familiarity, matching-system familiarity, and responsible-data experience", "/apply/ai-clinician-matching/challenge-experience"],
    ["5. Motivation and Proposed Approach", "Motivation, problem interest, preliminary approach, expected contribution, tools, and availability", "/apply/ai-clinician-matching/motivation"],
    ["6. Professional Links and Work Samples", "Profiles, portfolios, demonstrations, published work, and additional context", "/apply/ai-clinician-matching/links"],
    ["7. Eligibility and Acknowledgments", "Required confirmations, permissions, and electronic acknowledgment", "/apply/ai-clinician-matching/acknowledgments"],
  ];
  return (
    <Layout>
      <section className="detail-hero">
        <span className="eyebrow">Application · Step 9 of 9</span>
        <h1>Review Your Application</h1>
        <p>Review each section before submitting. You may return to any section and make corrections.</p>
      </section>
      <Section eyebrow="Final review" title="Application Summary">
        <div className="cards cols-3">
          {sections.map(([title, copy, href]) => (
            <article className="card" key={title}>
              <h3>{title}</h3>
              <p>{copy}</p>
              <Link className="text-link" href={href}>Edit section</Link>
            </article>
          ))}
        </div>
      </Section>
      <Section eyebrow="Ready to submit" title="Final Confirmation" soft>
        <EmailRoutingForm category="challenges" showEmailContact className="contact-form" onSubmit={(event) => { event.preventDefault(); window.location.assign("/apply/ai-clinician-matching/confirmation"); }}>
          <label className="wide check"><input required type="checkbox" name="reviewed" />I have reviewed my application and confirm that it is ready to be submitted.</label>
          <label className="wide check"><input required type="checkbox" name="followUp" />I understand that I may be contacted for clarification, verification, or an interview.</label>
          <label className="wide check"><input required type="checkbox" name="noGuarantee" />I understand that submitting an application does not guarantee acceptance or any other outcome.</label>
          <div className="wide actions">
            <button className="button primary" type="submit">Submit Application</button>
            <Link className="button" href="/apply/ai-clinician-matching/acknowledgments">Back to Eligibility and Acknowledgments</Link>
          </div>
          <p className="wide submission-note">After submission, the applicant will see a confirmation screen. When production email delivery is enabled, StartupFair should also send an application reference number and confirmation email.</p>
        </EmailRoutingForm>
      </Section>
    </Layout>
  );
}

function EnterpriseApplicationReviewPage() {
  const sections = [
    ["1. Application Type", "Individual or Team", "/apply/enterprise-ai-agent/participant-type"],
    ["2. Contact Information", "Applicant or primary-contact details", "/apply/enterprise-ai-agent/contact"],
    ["3. Background and Capabilities", "Professional status, experience, education, expertise, and summary", "/apply/enterprise-ai-agent/background"],
    ["4. Challenge-Specific Experience", "Relevant project, enterprise-workflow familiarity, AI-agent experience, security, and responsible-AI experience", "/apply/enterprise-ai-agent/challenge-experience"],
    ["5. Motivation and Proposed Approach", "Workflow problem, AI-agent approach, safety controls, expected contribution, tools, and availability", "/apply/enterprise-ai-agent/motivation"],
    ["6. Professional Links and Work Samples", "Profiles, repositories, portfolios, demonstrations, published work, and additional context", "/apply/enterprise-ai-agent/links"],
    ["7. Eligibility and Acknowledgments", "Required confirmations, permissions, and electronic acknowledgment", "/apply/enterprise-ai-agent/acknowledgments"],
  ];
  return (
    <Layout>
      <section className="detail-hero">
        <span className="eyebrow">Application · Step 9 of 9</span>
        <h1>Review Your Application</h1>
        <p>Review each section before submitting. You may return to any section and make corrections.</p>
      </section>
      <Section eyebrow="Final review" title="Application Summary">
        <div className="cards cols-3">
          {sections.map(([title, copy, href]) => (
            <article className="card" key={title}>
              <h3>{title}</h3>
              <p>{copy}</p>
              <Link className="text-link" href={href}>Edit section</Link>
            </article>
          ))}
        </div>
      </Section>
      <Section eyebrow="Ready to submit" title="Final Confirmation" soft>
        <EmailRoutingForm category="challenges" showEmailContact className="contact-form" onSubmit={(event) => { event.preventDefault(); window.location.assign("/apply/enterprise-ai-agent/confirmation"); }}>
          <label className="wide check"><input required type="checkbox" name="reviewed" />I have reviewed my application and confirm that it is accurate and ready to be submitted.</label>
          <label className="wide check"><input required type="checkbox" name="followUp" />I understand that I may be contacted for clarification, verification, or an interview.</label>
          <label className="wide check"><input required type="checkbox" name="noGuarantee" />I understand that submitting an application does not guarantee acceptance or any other outcome.</label>
          <div className="wide actions">
            <button className="button primary" type="submit">Submit Application</button>
            <Link className="button" href="/apply/enterprise-ai-agent/acknowledgments">Back to Eligibility and Acknowledgments</Link>
          </div>
          <p className="wide submission-note">After submission, the applicant will see a confirmation screen. When production email delivery is enabled, StartupFair should also send an application reference number and confirmation email.</p>
        </EmailRoutingForm>
      </Section>
    </Layout>
  );
}

function EnterpriseApplicationConfirmationPage() {
  return (
    <Layout>
      <section className="system-page">
        <div className="status">✓</div>
        <span className="eyebrow">Application submitted</span>
        <h1>Thank You for Applying</h1>
        <p>Your application for the <strong>Enterprise AI Agent Challenge</strong> has been submitted.</p>
        <div className="application-reference">
          <small>Application reference</small>
          <strong>SF-EAIA-2026-00001</strong>
          <p>The production platform will generate a unique reference number. Keep it for future communication.</p>
        </div>
      </section>
      <Section eyebrow="Interest review" title="What Happens Next">
        <div className="process">
          <div><span>01</span><h3>Completeness Review</h3><p>StartupFair reviews the application for completeness and eligibility.</p></div>
          <div><span>02</span><h3>Qualified Evaluation</h3><p>Reviewers evaluate the applicant’s enterprise, technical, product, security, and responsible-AI capabilities.</p></div>
          <div><span>03</span><h3>Possible Follow-Up</h3><p>StartupFair may contact the applicant for clarification, verification, or an interview.</p></div>
          <div><span>04</span><h3>Decision and Next Steps</h3><p>Applicants are notified when a decision or important update is available. Accepted participants receive the complete rules, schedule, authorized resources, and submission instructions.</p></div>
        </div>
        <p className="prose submission-note"><strong>Important:</strong> This confirmation means the application was submitted. It does not mean the applicant has been accepted into the challenge.</p>
        <div className="actions">
          <Link className="button primary" href="/challenges/enterprise-ai-agent">View Challenge</Link>
          <Link className="button" href="/challenges">Explore Other Challenges</Link>
          <Link className="button" href="/">Return Home</Link>
        </div>
        <p className="prose submission-note">Submission does not guarantee acceptance, recognition, employment, a paid engagement, a pilot, a partnership, investment, funding, or any other outcome.</p>
        <p className="prose submission-note"><strong>Prototype notice:</strong> During this website-development stage, form information is not transmitted or stored. Production submission, reference-number generation, email delivery, secure data storage, and administrative review workflows must be connected before accepting real applications.</p>
      </Section>
    </Layout>
  );
}

function PublisherApplicationReviewPage() {
  const sections = [
    ["1. Application Type", "Individual or Team", "/apply/publisher-campaign-intelligence/participant-type"],
    ["2. Contact Information", "Applicant or primary-contact details", "/apply/publisher-campaign-intelligence/contact"],
    ["3. Background and Capabilities", "Professional status, experience, education, expertise, and summary", "/apply/publisher-campaign-intelligence/background"],
    ["4. Challenge-Specific Experience", "Relevant project, publishing and media familiarity, performance-marketing familiarity, system experience, and responsible-data safeguards", "/apply/publisher-campaign-intelligence/challenge-experience"],
    ["5. Motivation and Proposed Approach", "Priority problem, intended users, matching approach, success measures, safeguards, contribution, tools, and availability", "/apply/publisher-campaign-intelligence/motivation"],
    ["6. Professional Links and Work Samples", "Profiles, repositories, portfolios, demonstrations, case studies, published work, and additional context", "/apply/publisher-campaign-intelligence/links"],
    ["7. Eligibility and Acknowledgments", "Required confirmations, data-use commitments, permissions, and electronic acknowledgment", "/apply/publisher-campaign-intelligence/acknowledgments"],
  ];
  return (
    <Layout>
      <section className="detail-hero">
        <span className="eyebrow">Interest Registration · Step 9 of 9</span>
        <h1>Review and Register Your Interest</h1>
        <p>Review each section before submitting. You may return to any section and make corrections.</p>
      </section>
      <Section eyebrow="Final review" title="Interest Registration Summary">
        <div className="cards cols-3">
          {sections.map(([title, copy, href]) => (
            <article className="card" key={title}>
              <h3>{title}</h3>
              <p>{copy}</p>
              <Link className="text-link" href={href}>Edit section</Link>
            </article>
          ))}
        </div>
      </Section>
      <Section eyebrow="Ready to submit" title="Final Confirmation" soft>
        <EmailRoutingForm category="challenges" showEmailContact className="contact-form" onSubmit={(event) => { event.preventDefault(); window.location.assign("/apply/publisher-campaign-intelligence/confirmation"); }}>
          <label className="wide check"><input required type="checkbox" name="reviewed" />I have reviewed my application and confirm that it is accurate and ready to be submitted.</label>
          <label className="wide check"><input required type="checkbox" name="followUp" />I understand that I may be contacted for clarification, verification, or an interview.</label>
          <label className="wide check"><input required type="checkbox" name="noGuarantee" />I understand that submitting an application does not guarantee acceptance or any other outcome.</label>
          <div className="wide actions">
            <button className="button primary" type="submit">Register Interest</button>
            <Link className="button" href="/apply/publisher-campaign-intelligence/acknowledgments">Back to Eligibility and Acknowledgments</Link>
          </div>
          <p className="wide submission-note">After submission, the applicant will see a confirmation screen. When production email delivery is enabled, StartupFair should also send an application reference number and confirmation email.</p>
        </EmailRoutingForm>
      </Section>
    </Layout>
  );
}

function PublisherApplicationConfirmationPage() {
  return (
    <Layout>
      <section className="system-page">
        <div className="status">✓</div>
        <span className="eyebrow">Interest registered</span>
        <h1>Thank You for Registering Your Interest</h1>
        <p>Your interest in the <strong>Publisher-to-Campaign Intelligence Challenge</strong> has been registered.</p>
        <div className="application-reference">
          <small>Interest reference</small>
          <strong>SF-INT-2026-00001</strong>
          <p>The production platform will generate a unique reference number. Keep it for future communication.</p>
        </div>
      </section>
      <Section eyebrow="Application review" title="What Happens Next">
        <div className="process">
          <div><span>01</span><h3>Interest Review</h3><p>StartupFair reviews registrations to understand potential participant interest and relevant capabilities.</p></div>
          <div><span>02</span><h3>Challenge Update</h3><p>Registered people receive important updates if the challenge advances toward launch.</p></div>
          <div><span>03</span><h3>Possible Follow-Up</h3><p>StartupFair may contact you for clarification or to share a future application opportunity.</p></div>
          <div><span>04</span><h3>Application Invitation</h3><p>If applications open, StartupFair may invite interested people to complete the formal application and review process.</p></div>
        </div>
        <p className="prose submission-note"><strong>Important:</strong> This confirmation records interest only. It is not an application, invitation, or acceptance into the challenge.</p>
        <div className="actions">
          <Link className="button primary" href="/challenges/publisher-campaign-intelligence">View Challenge</Link>
          <Link className="button" href="/challenges">Explore Other Challenges</Link>
          <Link className="button" href="/">Return Home</Link>
        </div>
        <p className="prose submission-note">Submission does not guarantee acceptance, recognition, employment, payment, a pilot, a partnership, funding, investment, commercialization, or any other outcome.</p>
        <p className="prose submission-note"><strong>Prototype notice:</strong> During this website-development stage, form information is not transmitted or stored. Production submission, reference-number generation, email delivery, secure data storage, and administrative review workflows must be connected before accepting real applications.</p>
      </Section>
    </Layout>
  );
}

function ClinicianApplicationConfirmationPage() {
  return (
    <Layout>
      <section className="system-page">
        <div className="status">✓</div>
        <span className="eyebrow">Application submitted</span>
        <h1>Thank You for Applying</h1>
        <p>Your application for the <strong>AI Clinician Matching Challenge</strong> has been submitted.</p>
        <div className="application-reference">
          <small>Application reference</small>
          <strong>SF-AICM-2026-00001</strong>
          <p>The production platform will generate a unique reference number. Keep it for future communication.</p>
        </div>
      </section>
      <Section eyebrow="Application review" title="What Happens Next">
        <div className="process">
          <div><span>01</span><h3>Completeness Review</h3><p>StartupFair reviews the application for completeness and eligibility.</p></div>
          <div><span>02</span><h3>Qualified Evaluation</h3><p>Reviewers evaluate the applicant’s experience, capabilities, motivation, and potential contribution.</p></div>
          <div><span>03</span><h3>Possible Follow-Up</h3><p>StartupFair may contact the applicant for clarification, verification, or an interview.</p></div>
          <div><span>04</span><h3>Decision and Next Steps</h3><p>Applicants are notified when a decision or important update is available. Accepted participants receive the complete rules, schedule, authorized resources, and submission instructions.</p></div>
        </div>
        <p className="prose submission-note"><strong>Important:</strong> This confirmation means the application was submitted. It does not mean the applicant has been accepted into the challenge.</p>
        <div className="actions">
          <Link className="button primary" href="/challenges/ai-clinician-matching">View Challenge</Link>
          <Link className="button" href="/challenges">Explore Other Challenges</Link>
          <Link className="button" href="/">Return Home</Link>
        </div>
        <p className="prose submission-note">Submission does not guarantee acceptance, recognition, employment, a paid engagement, a pilot, a partnership, funding, or any other outcome.</p>
        <p className="prose submission-note"><strong>Prototype notice:</strong> During this website-development stage, form information is not transmitted or stored. Production submission, reference-number generation, email delivery, secure data storage, and administrative review workflows must be connected before accepting real applications.</p>
      </Section>
    </Layout>
  );
}

function TalentProfileIntroductionPage() {
  return (
    <Layout>
      <section className="detail-hero">
        <span className="eyebrow">Talent Profile · Step 1 of 8</span>
        <div className="tags"><span>Free Profile</span><span>Global Talent Network</span></div>
        <h1>Create Your StartupFair Talent Profile</h1>
        <p>Build a free profile that helps StartupFair understand your capabilities, interests, and the types of challenges and opportunities relevant to you.</p>
        <div className="actions"><ActionLink className="button primary" href="/talent-profile/contact">Start My Free Profile</ActionLink><Link className="button" href="/challenges">Explore Challenges</Link></div>
      </section>
      <Section eyebrow="Who can join" title="A Profile for Builders, Specialists and Emerging Talent">
        <div className="prose">
          <ul>
            <li>AI, software, data, and technology professionals</li>
            <li>Healthcare and other industry specialists</li>
            <li>Product managers, designers, researchers, and analysts</li>
            <li>Performance-marketing, publishing, and commerce professionals</li>
            <li>Students, recent graduates, and career changers</li>
            <li>Founders, consultants, and independent professionals</li>
            <li>People located anywhere in the world</li>
          </ul>
        </div>
      </Section>
      <Section eyebrow="Profile benefits" title="What Your Profile May Help You Do" soft>
        <Cards cols={3} items={[
          { title: "Discover Challenges", copy: "Find relevant StartupFair challenges and receive recommendations based on your interests and capabilities." },
          { title: "Demonstrate Skills", copy: "Use practical challenge work to show what you can build and contribute." },
          { title: "Explore Opportunities", copy: "Be considered for hiring, paid projects, pilots, partnerships, mentorship, or venture discussions." },
          { title: "Build Verified Recognition", copy: "Create a record of verified finalist or winner achievements earned through StartupFair challenges." },
        ]} />
      </Section>
      <Section eyebrow="Privacy controls" title="You Choose Who Can See Your Profile">
        <Cards cols={5} items={[
          { title: "Private", copy: "Your profile remains visible only within your own account." },
          { title: "StartupFair Review", copy: "Authorized StartupFair personnel may review your profile." },
          { title: "Challenge Access", copy: "Relevant challenge organizations and authorized reviewers may view necessary information." },
          { title: "Verified Talent Network", copy: "Approved organizations may discover selected professional information." },
          { title: "Public Profile", copy: "Selected profile information may be visible publicly with your permission." },
        ]} />
        <div className="actions">
          <ActionLink className="button primary" href="/talent-profile/contact">Start My Profile</ActionLink>
          <Link className="button" href="/challenges">Explore Challenges</Link>
          <Link className="button" href="/">Return Home</Link>
        </div>
        <p className="prose submission-note">Creating a profile does not guarantee challenge acceptance, employment, paid work, introductions, partnerships, funding, investment, or any other outcome.</p>
        <p className="prose submission-note"><strong>Prototype notice:</strong> During this website-development stage, profile information is not transmitted or stored.</p>
      </Section>
    </Layout>
  );
}

function TalentProfileContactPage() {
  return (
    <Layout>
      <section className="detail-hero">
        <span className="eyebrow">Talent Profile · Step 2 of 8</span>
        <h1>Contact and Location</h1>
        <p>Tell us how to identify and contact you. Your email address, phone number, and precise location will not appear publicly, even if you later choose a public profile.</p>
      </section>
      <Section eyebrow="Basic information" title="Your Contact Details">
        <EmailRoutingForm category="talent" className="contact-form" onSubmit={(event) => { event.preventDefault(); window.location.assign("/talent-profile/background"); }}>
          <label>Full legal name<input required autoComplete="name" name="legalName" /></label>
          <label>Preferred or display name<input required name="displayName" /></label>
          <label>Email address<input required type="email" autoComplete="email" name="email" /></label>
          <label>Phone number<input required type="tel" autoComplete="tel" name="phone" /></label>
          <label>Country<input required autoComplete="country-name" name="country" /></label>
          <label>State, province, or region<input required name="region" /></label>
          <label>City<input required autoComplete="address-level2" name="city" /></label>
          <label>Time zone<input required name="timezone" placeholder="Example: Pacific Time or UTC+5:30" /></label>
          <label>Preferred language<input required name="preferredLanguage" /></label>
          <label>Preferred contact method<select required name="contactMethod" defaultValue=""><option value="" disabled>Select one</option><option>Email</option><option>Phone</option><option>Text message</option></select></label>
          <label>LinkedIn profile <small>(optional)</small><input type="url" name="linkedin" placeholder="https://" /></label>
          <label>Personal or professional website <small>(optional)</small><input type="url" name="website" placeholder="https://" /></label>
          <label className="wide">How did you hear about StartupFair?<select required name="source" defaultValue=""><option value="" disabled>Select one</option><option>Search engine</option><option>LinkedIn or social media</option><option>University or college</option><option>Employer or professional organization</option><option>Friend, colleague, or referral</option><option>StartupFair event or prior relationship</option><option>Other</option></select></label>
          <fieldset className="wide application-fieldset">
            <legend>Communication permissions</legend>
            <label className="check wide"><input required type="checkbox" name="profileContactConsent" />StartupFair may contact me about my profile, selected challenges, and profile-related updates.</label>
            <label className="check wide"><input type="checkbox" name="otherOpportunityConsent" />StartupFair may also contact me about other relevant hiring, project, pilot, partnership, mentorship, or program opportunities.</label>
          </fieldset>
          <div className="wide actions">
            <button className="button primary" type="submit">Continue</button>
            <Link className="button" href="/talent-profile">Back to Profile Introduction</Link>
          </div>
          <p className="wide submission-note"><strong>Privacy:</strong> Email, phone number, and precise location remain non-public under every profile-visibility setting.</p>
        </EmailRoutingForm>
      </Section>
    </Layout>
  );
}

function TalentProfileBackgroundPage() {
  const industries = [
    "Artificial intelligence and machine learning",
    "Software and information technology",
    "Data and analytics",
    "Healthcare and life sciences",
    "Workforce, recruiting, or human resources",
    "Advertising, marketing, and commerce",
    "Publishing and digital media",
    "Financial services",
    "Education",
    "Public sector or social impact",
    "Business operations",
    "Other",
  ];
  return (
    <Layout>
      <section className="detail-hero">
        <span className="eyebrow">Talent Profile · Step 3 of 8</span>
        <h1>Professional Background</h1>
        <p>Share enough context for StartupFair to understand your experience, career stage, and the types of problems where you can contribute.</p>
      </section>
      <Section eyebrow="Your experience" title="Background and Professional Summary">
        <EmailRoutingForm category="talent" className="contact-form" onSubmit={(event) => { event.preventDefault(); window.location.assign("/talent-profile/skills"); }}>
          <label>Current professional status<select required name="professionalStatus" defaultValue=""><option value="" disabled>Select one</option><option>Employed</option><option>Independent professional or consultant</option><option>Founder or business owner</option><option>Student</option><option>Recent graduate</option><option>Career changer</option><option>Not currently employed</option><option>Other</option></select></label>
          <label>Professional headline<input required name="professionalHeadline" placeholder="Example: AI engineer building secure enterprise applications" /></label>
          <label>Current or most recent job title<input required name="jobTitle" /></label>
          <label>Organization, company, or educational institution <small>(optional)</small><input name="organization" /></label>
          <label>Total years of relevant experience<select required name="experience" defaultValue=""><option value="" disabled>Select one</option><option>Less than 1 year</option><option>1–2 years</option><option>3–5 years</option><option>6–10 years</option><option>More than 10 years</option></select></label>
          <label>Career stage<select required name="careerStage" defaultValue=""><option value="" disabled>Select one</option><option>Student or learner</option><option>Entry level</option><option>Early career</option><option>Mid career</option><option>Senior professional</option><option>Executive or business leader</option><option>Founder or entrepreneur</option><option>Career transition</option></select></label>
          <label>Highest education level <small>(optional)</small><input name="education" /></label>
          <label>Field of study or professional discipline <small>(optional)</small><input name="discipline" /></label>
          <fieldset className="wide application-fieldset">
            <legend>Primary industries or domains <small>(select all that apply)</small></legend>
            {industries.map((item) => <label className="check" key={item}><input type="checkbox" name="industries" value={item} />{item}</label>)}
          </fieldset>
          <label className="wide">Short professional summary <small>(maximum 1,500 characters)</small><textarea required maxLength={1500} name="professionalSummary" rows={7} placeholder="Describe your background, strongest capabilities, preferred types of problems, and the value you can contribute." /></label>
          <div className="wide actions">
            <button className="button primary" type="submit">Continue</button>
            <Link className="button" href="/talent-profile/contact">Back to Contact and Location</Link>
          </div>
          <p className="wide submission-note">Focus on accurate, relevant information. StartupFair may request reasonable verification of material qualifications or experience for specific challenges or opportunities.</p>
        </EmailRoutingForm>
      </Section>
    </Layout>
  );
}

function TalentProfileSkillsPage() {
  const skillCategories = [
    "Artificial intelligence and machine learning",
    "Generative AI and AI agents",
    "Software engineering",
    "Data engineering",
    "Data science and analytics",
    "Cloud infrastructure and DevOps",
    "Cybersecurity, privacy, and responsible AI",
    "Product management",
    "UX, research, and solution design",
    "Healthcare and life sciences",
    "Workforce, recruiting, and HR",
    "Marketing, AdTech, and performance marketing",
    "Publishing, media, and audience development",
    "Business operations and process improvement",
    "Entrepreneurship and venture development",
    "Research and academic work",
    "Other",
  ];
  return (
    <Layout>
      <section className="detail-hero">
        <span className="eyebrow">Talent Profile · Step 4 of 8</span>
        <h1>Skills and Expertise</h1>
        <p>Describe the capabilities you can apply to practical challenges, projects, and opportunities.</p>
      </section>
      <Section eyebrow="Your capabilities" title="Skills, Tools and Evidence">
        <EmailRoutingForm category="talent" className="contact-form" onSubmit={(event) => { event.preventDefault(); window.location.assign("/talent-profile/interests"); }}>
          <fieldset className="wide application-fieldset">
            <legend>Primary skill categories <small>(select all that apply)</small></legend>
            {skillCategories.map((item) => <label className="check" key={item}><input type="checkbox" name="skillCategories" value={item} />{item}</label>)}
          </fieldset>
          <label className="wide">Top skills <small>(list up to 10)</small><textarea required maxLength={700} name="topSkills" rows={4} placeholder="Example: Python, LLM application development, data pipelines, product strategy, clinician workforce operations" /></label>
          <label>Primary area of expertise<input required name="primaryExpertise" /></label>
          <label>Self-assessed proficiency<select required name="proficiency" defaultValue=""><option value="" disabled>Select one</option><option>Developing</option><option>Proficient</option><option>Advanced</option><option>Expert</option></select></label>
          <label className="wide">Tools, platforms, programming languages, or methodologies <small>(maximum 1,500 characters)</small><textarea required maxLength={1500} name="tools" rows={6} placeholder="List the technologies, platforms, methods, frameworks, or professional tools you can use effectively." /></label>
          <label className="wide">Certifications or professional licenses <small>(optional · maximum 1,000 characters)</small><textarea maxLength={1000} name="credentials" rows={5} placeholder="Include the credential name, issuing organization, and status or expiration date when relevant." /></label>
          <label className="wide">Spoken or working languages and proficiency <small>(maximum 700 characters)</small><textarea required maxLength={700} name="languages" rows={4} placeholder="Example: English — professional; Hindi — native; Spanish — conversational" /></label>
          <label className="wide">Example demonstrating your strongest skill <small>(maximum 1,500 characters)</small><textarea required maxLength={1500} name="skillExample" rows={7} placeholder="Describe a problem, your role, what you did, and the result. Use measurable outcomes when available." /></label>
          <div className="wide actions">
            <button className="button primary" type="submit">Continue</button>
            <Link className="button" href="/talent-profile/background">Back to Professional Background</Link>
          </div>
          <p className="wide submission-note">Skills are self-reported until verified through challenge results, supporting evidence, professional credentials, or another StartupFair-approved verification process.</p>
        </EmailRoutingForm>
      </Section>
    </Layout>
  );
}

function TalentProfileInterestsPage() {
  const challengeTypes = ["Talent challenges", "Innovation challenges", "Venture challenges"];
  const focusAreas = [
    "Healthcare innovation",
    "Enterprise AI and automation",
    "Software and technology",
    "Data and analytics",
    "Workforce and recruiting",
    "Performance marketing and AdTech",
    "Publishing, media, and digital commerce",
    "Education",
    "Public-interest innovation",
    "Other",
  ];
  const opportunities = [
    "Full-time employment",
    "Contract or consulting work",
    "Paid projects",
    "Product pilots",
    "Strategic partnerships",
    "Mentorship",
    "Founder or venture opportunities",
    "Research collaboration",
  ];
  return (
    <Layout>
      <section className="detail-hero">
        <span className="eyebrow">Talent Profile · Step 5 of 8</span>
        <h1>Challenge and Opportunity Interests</h1>
        <p>Choose the types of challenges, working arrangements, and professional opportunities most relevant to you.</p>
      </section>
      <Section eyebrow="Your preferences" title="What Are You Looking For?">
        <EmailRoutingForm category="talent" className="contact-form" onSubmit={(event) => { event.preventDefault(); window.location.assign("/talent-profile/work-samples"); }}>
          <fieldset className="wide application-fieldset">
            <legend>Challenge types <small>(select all that apply)</small></legend>
            {challengeTypes.map((item) => <label className="check" key={item}><input type="checkbox" name="challengeTypes" value={item} />{item}</label>)}
          </fieldset>
          <fieldset className="wide application-fieldset">
            <legend>Focus areas <small>(select all that apply)</small></legend>
            {focusAreas.map((item) => <label className="check" key={item}><input type="checkbox" name="focusAreas" value={item} />{item}</label>)}
          </fieldset>
          <label>Participation preference<select required name="participationPreference" defaultValue=""><option value="" disabled>Select one</option><option>Participate individually</option><option>Join or form a team</option><option>Open to either</option><option>Interested in team-matching recommendations</option></select></label>
          <label>Preferred challenge difficulty<select required name="challengeDifficulty" defaultValue=""><option value="" disabled>Select one</option><option>Beginner or guided</option><option>Intermediate</option><option>Advanced</option><option>Open to any suitable level</option></select></label>
          <fieldset className="wide application-fieldset">
            <legend>Opportunity interests <small>(select all that apply)</small></legend>
            {opportunities.map((item) => <label className="check" key={item}><input type="checkbox" name="opportunities" value={item} />{item}</label>)}
          </fieldset>
          <fieldset className="wide application-fieldset">
            <legend>Work-arrangement preferences <small>(select all that apply)</small></legend>
            {['Remote', 'Hybrid', 'Onsite'].map((item) => <label className="check" key={item}><input type="checkbox" name="workArrangement" value={item} />{item}</label>)}
          </fieldset>
          <label>Travel preference<select required name="travelPreference" defaultValue=""><option value="" disabled>Select one</option><option>Not available for travel</option><option>Occasional travel</option><option>Regular travel</option><option>Depends on the opportunity</option></select></label>
          <label>Relocation preference<select required name="relocationPreference" defaultValue=""><option value="" disabled>Select one</option><option>Not open to relocation</option><option>Open to relocation</option><option>Depends on the opportunity</option></select></label>
          <label className="wide">Expected weekly availability<select required name="weeklyAvailability" defaultValue=""><option value="" disabled>Select one</option><option>Fewer than 5 hours</option><option>5–10 hours</option><option>11–20 hours</option><option>More than 20 hours</option><option>Full-time availability</option><option>Depends on the challenge or opportunity</option></select></label>
          <label className="wide">Professional goals and desired opportunities <small>(maximum 1,500 characters)</small><textarea required maxLength={1500} name="goals" rows={7} placeholder="Describe what you hope to build, learn, demonstrate, or pursue through StartupFair." /></label>
          <div className="wide actions">
            <button className="button primary" type="submit">Continue</button>
            <Link className="button" href="/talent-profile/skills">Back to Skills and Expertise</Link>
          </div>
          <p className="wide submission-note">These preferences help StartupFair make more relevant recommendations. They do not guarantee challenge selection, introductions, employment, projects, partnerships, or any other outcome.</p>
        </EmailRoutingForm>
      </Section>
    </Layout>
  );
}

function TalentProfileWorkSamplesPage() {
  return (
    <Layout>
      <section className="detail-hero">
        <span className="eyebrow">Talent Profile · Step 6 of 8</span>
        <h1>Work Samples and Professional Links</h1>
        <p>Share materials that help reviewers understand what you can build, analyze, design, lead, improve, or deliver. Every field on this page is optional.</p>
      </section>
      <Section eyebrow="Evidence of capability" title="Professional Links">
        <EmailRoutingForm category="talent" className="contact-form" onSubmit={(event) => { event.preventDefault(); window.location.assign("/talent-profile/privacy"); }}>
          <label>GitHub or code repository<input type="url" name="codeRepository" placeholder="https://" /></label>
          <label>Portfolio<input type="url" name="portfolio" placeholder="https://" /></label>
          <label>Product, application, or prototype<input type="url" name="product" placeholder="https://" /></label>
          <label>Project demonstration or video<input type="url" name="demonstration" placeholder="https://" /></label>
          <label>Case study<input type="url" name="caseStudy" placeholder="https://" /></label>
          <label>Research, publication, or presentation<input type="url" name="publication" placeholder="https://" /></label>
          <label>Professional or company website<input type="url" name="website" placeholder="https://" /></label>
          <label>Other relevant work<input type="url" name="otherWork" placeholder="https://" /></label>
          <fieldset className="wide application-fieldset">
            <legend>Featured project <small>(optional)</small></legend>
            <label className="wide">Project name<input name="projectName" /></label>
            <label className="wide">Problem or objective<textarea maxLength={1000} name="projectProblem" rows={5} /></label>
            <label className="wide">Your role and contribution<textarea maxLength={1000} name="projectContribution" rows={5} /></label>
            <label className="wide">Tools or methods used<textarea maxLength={700} name="projectTools" rows={4} /></label>
            <label className="wide">Result or measurable impact<textarea maxLength={1000} name="projectResult" rows={5} /></label>
            <label className="wide">Project link<input type="url" name="projectLink" placeholder="https://" /></label>
          </fieldset>
          <label className="wide">Additional context <small>(optional · maximum 1,000 characters)</small><textarea maxLength={1000} name="additionalContext" rows={5} placeholder="Explain which materials best demonstrate your capabilities and what reviewers should examine." /></label>
          <div className="wide actions">
            <button className="button primary" type="submit">Continue</button>
            <Link className="button" href="/talent-profile/interests">Back to Challenge and Opportunity Interests</Link>
          </div>
          <p className="wide submission-note">Applicants without public work samples are not disqualified. You must have permission to share every submitted material. Links must not expose confidential information, protected data, personal information, access credentials, or unauthorized intellectual property. Work samples will not become public unless you later select an appropriate visibility setting.</p>
        </EmailRoutingForm>
      </Section>
    </Layout>
  );
}

function TalentProfilePrivacyPage() {
  const [visibility, setVisibility] = useState("");
  const sharedFields = [
    "Display name",
    "Professional headline",
    "Country and general region",
    "Professional summary",
    "Skills and expertise",
    "Industries and challenge interests",
    "Work samples",
    "Verified winner or finalist achievements",
  ];
  const visibilityOptions = [
    ["private", "Private", "The profile is not available for talent discovery."],
    ["startupfair", "StartupFair Review Only", "Authorized StartupFair personnel may review the profile."],
    ["challenge", "Challenge Access", "Necessary information may be shared with authorized reviewers and relevant organizations only for challenges you join."],
    ["network", "Verified Talent Network", "Approved organizations may discover selected professional information and request an introduction through StartupFair."],
    ["public", "Public Profile", "Only profile fields you specifically approve may appear publicly."],
  ];
  const canSelectFields = visibility === "network" || visibility === "public";
  return (
    <Layout>
      <section className="detail-hero">
        <span className="eyebrow">Talent Profile · Step 7 of 8</span>
        <h1>Privacy and Profile Visibility</h1>
        <p>Choose how StartupFair may use your profile. Your contact information and precise location remain private under every option.</p>
      </section>
      <Section eyebrow="Your choice" title="Choose One Visibility Level">
        <EmailRoutingForm category="talent" className="contact-form" onSubmit={(event) => { event.preventDefault(); window.location.assign("/talent-profile/review"); }}>
          <fieldset className="wide application-fieldset">
            <legend>Profile visibility</legend>
            {visibilityOptions.map(([value, title, copy]) => (
              <label className="check wide" key={value}>
                <input required type="radio" name="visibility" value={value} checked={visibility === value} onChange={() => setVisibility(value)} />
                <span><strong>{title}</strong><small>{copy}</small></span>
              </label>
            ))}
          </fieldset>
          {canSelectFields && (
            <fieldset className="wide application-fieldset">
              <legend>Information you approve for {visibility === "public" ? "your public profile" : "verified talent-network discovery"} <small>(select all that apply)</small></legend>
              {sharedFields.map((item) => <label className="check" key={item}><input type="checkbox" name="approvedFields" value={item} />{item}</label>)}
            </fieldset>
          )}
          <fieldset className="wide application-fieldset">
            <legend>Information that always remains private</legend>
            <p>Legal name unless separately required for verification; email address; phone number; precise location; private application information; unpublished challenge submissions; and confidential verification records.</p>
          </fieldset>
          <label className="wide check"><input required type="checkbox" name="mediatedContact" />I understand that approved organizations must request an introduction through StartupFair and that my direct contact information will not be disclosed without separate permission.</label>
          <label className="wide check"><input required type="checkbox" name="visibilityControl" />I understand that I may change my visibility or leave the Talent Network later, subject to legal requirements, challenge-administration records, and previously approved winner or finalist publications.</label>
          <label className="wide check"><input required type="checkbox" name="privacyAgreement" />I have reviewed and agree to the applicable <Link className="text-link" href="/privacy">Privacy Policy</Link> and <Link className="text-link" href="/terms">Terms of Use</Link>.</label>
          <div className="wide actions">
            <button className="button primary" type="submit">Continue to Review</button>
            <Link className="button" href="/talent-profile/work-samples">Back to Work Samples</Link>
          </div>
          <p className="wide submission-note">StartupFair publicly announces only challenge winners and finalists. Other challenge participation and results remain private unless the participant independently chooses to share them.</p>
        </EmailRoutingForm>
      </Section>
    </Layout>
  );
}

function TalentProfileReviewPage() {
  const sections = [
    ["1. Contact and Location", "Identity, contact details, location, language, and communication permissions", "/talent-profile/contact"],
    ["2. Professional Background", "Professional status, headline, experience, career stage, industries, and summary", "/talent-profile/background"],
    ["3. Skills and Expertise", "Skill categories, top skills, proficiency, tools, credentials, languages, and evidence", "/talent-profile/skills"],
    ["4. Challenge and Opportunity Interests", "Challenge types, focus areas, participation, opportunity, work-arrangement, and availability preferences", "/talent-profile/interests"],
    ["5. Work Samples and Professional Links", "Repositories, portfolios, demonstrations, case studies, publications, and featured project", "/talent-profile/work-samples"],
    ["6. Privacy and Profile Visibility", "Visibility level, approved fields, mediated contact, and privacy controls", "/talent-profile/privacy"],
  ];
  return (
    <Layout>
      <section className="detail-hero">
        <span className="eyebrow">Talent Profile · Step 8 of 8</span>
        <h1>Review and Create Your Profile</h1>
        <p>Review each section before creating your profile. You may return to any section and make corrections.</p>
      </section>
      <Section eyebrow="Final review" title="Profile Summary">
        <div className="cards cols-3">
          {sections.map(([title, copy, href]) => (
            <article className="card" key={title}>
              <h3>{title}</h3>
              <p>{copy}</p>
              <Link className="text-link" href={href}>Edit section</Link>
            </article>
          ))}
        </div>
      </Section>
      <Section eyebrow="Ready to create" title="Final Confirmation" soft>
        <EmailRoutingForm category="talent" showEmailContact className="contact-form" onSubmit={(event) => { event.preventDefault(); window.location.assign("/talent-profile/confirmation"); }}>
          <label className="wide check"><input required type="checkbox" name="accurate" />I have reviewed my profile and confirm that the information is accurate and complete to the best of my knowledge.</label>
          <label className="wide check"><input required type="checkbox" name="permission" />I have permission to submit and share all information, links, and materials included in my profile.</label>
          <label className="wide check"><input required type="checkbox" name="visibility" />I understand and approve the profile-visibility settings I selected.</label>
          <label className="wide check"><input required type="checkbox" name="noGuarantee" />I understand that creating a profile does not guarantee challenge acceptance, introductions, employment, paid work, partnerships, funding, investment, or any other outcome.</label>
          <div className="wide actions">
            <button className="button primary" type="submit">Create My Profile</button>
            <Link className="button" href="/talent-profile/privacy">Back to Privacy and Visibility</Link>
          </div>
          <p className="wide submission-note">The production platform should show a final visibility summary and send a confirmation email after the profile is created.</p>
        </EmailRoutingForm>
      </Section>
    </Layout>
  );
}

function TalentProfileConfirmationPage() {
  return (
    <Layout>
      <section className="system-page">
        <div className="status">✓</div>
        <span className="eyebrow">Profile created</span>
        <h1>Your StartupFair Profile Has Been Created</h1>
        <p>Your talent profile is ready for the visibility setting and opportunity preferences you selected.</p>
        <div className="application-reference">
          <small>Profile reference</small>
          <strong>SF-TAL-2026-00001</strong>
          <p>The production platform will generate a unique reference number for profile support and verification.</p>
        </div>
      </section>
      <Section eyebrow="Your next steps" title="Put Your Profile to Work">
        <div className="process">
          <div><span>01</span><h3>Review Visibility</h3><p>Confirm that the selected visibility level and approved profile fields reflect your preferences.</p></div>
          <div><span>02</span><h3>Explore Challenges</h3><p>Review current and upcoming challenges that match your skills and interests.</p></div>
          <div><span>03</span><h3>Demonstrate Capability</h3><p>Apply to suitable challenges and build practical evidence of what you can contribute.</p></div>
          <div><span>04</span><h3>Consider Opportunities</h3><p>StartupFair may contact you about relevant opportunities according to your permissions and profile settings.</p></div>
        </div>
        <div className="actions">
          <Link className="button primary" href="/challenges">Explore Challenges</Link>
          <Link className="button" href="/for-talent">Review For Talent</Link>
          <Link className="button" href="/">Return Home</Link>
        </div>
        <p className="prose submission-note">Creating a profile does not guarantee challenge acceptance, introductions, employment, paid work, partnerships, funding, investment, or any other outcome.</p>
        <p className="prose submission-note"><strong>Prototype notice:</strong> During this website-development stage, profile information is not transmitted or stored. Production accounts, authentication, profile editing, secure storage, organization introductions, reference generation, and notifications must be connected before accepting real profiles.</p>
      </Section>
    </Layout>
  );
}

function TalentPage() {
  return (
    <Layout>
      <Hero
        eyebrow="For Talent"
        title="Prove What You Can Build."
        copy="Create your free StartupFair profile, participate in real-world AI and innovation challenges, demonstrate your capabilities, and get discovered for hiring, pilot, partnership, or venture opportunities."
        primary={["Explore Challenges", "/challenges"]}
        secondary={["Create Your Free Profile", "/talent-profile/contact"]}
      />
      <Section
        eyebrow="Who StartupFair Is For"
        title="Opportunity Should Be Based on What You Can Build."
      >
        <p className="prose section-intro">
          StartupFair is designed for people who want to demonstrate practical
          capabilities—not rely only on résumés, job titles, or academic credentials.
        </p>
        <Cards
          cols={5}
          items={[
            {
              title: "AI and Technology Builders",
              copy: "Developers, AI engineers, data scientists, architects, and technical creators.",
            },
            {
              title: "Product and Creative Talent",
              copy: "Product managers, UX designers, researchers, analysts, and solution designers.",
            },
            {
              title: "Industry Specialists",
              copy: "Healthcare, workforce, marketing, commerce, operations, and other domain professionals.",
            },
            {
              title: "Students and Emerging Talent",
              copy: "College students, recent graduates, career changers, and self-taught builders seeking credible experience.",
            },
            {
              title: "Founders and Independent Teams",
              copy: "Startups, entrepreneurs, and multidisciplinary teams developing promising solutions.",
            },
          ]}
        />
      </Section>
      <Section eyebrow="How It Works" title="From Profile to Proven Capability." soft>
        <Cards
          cols={4}
          items={[
            {
              title: "Create Your Free Profile",
              copy: "Add your skills, experience, interests, preferred challenge areas, and professional goals.",
              href: "/talent-profile/contact",
            },
            {
              title: "Discover and Join Challenges",
              copy: "Find relevant AI, innovation, and venture challenges. Participate independently or form a team.",
            },
            {
              title: "Build and Submit Your Solution",
              copy: "Develop your solution using the published requirements, timeline, rules, and evaluation criteria.",
            },
            {
              title: "Get Evaluated and Discovered",
              copy: "Receive recognition for your work and become eligible for hiring, pilot, partnership, or venture opportunities.",
            },
          ]}
        />
        <p className="prose process-note">
          Each challenge has its own requirements and outcomes. Participation
          does not guarantee employment, funding, or a commercial engagement.
        </p>
      </Section>
      <Section
        eyebrow="Open Opportunities"
        title="Find the Right Problem to Solve."
      >
        <p className="prose section-intro">
          Browse real-world AI, innovation, and venture challenges across
          healthcare, enterprise technology, digital commerce, workforce, and
          other industries. Each challenge clearly identifies its status,
          participation requirements, evaluation criteria, and potential outcomes.
        </p>
        <ChallengeCards />
        <div className="center">
          <Link className="button primary" href="/challenges">
            View All Challenges
          </Link>
        </div>
      </Section>
      <Section
        eyebrow="Recognition and Verified Achievement"
        title="Turn Your Work into Credible Proof."
        soft
      >
        <p className="prose section-intro">
          Depending on the challenge requirements and evaluation results,
          participants may receive:
        </p>
        <div className="badge-list">
          <span><strong>Completion Certificate</strong><small>For eligible participants who complete and submit the required work.</small></span>
          <span><strong>Finalist Recognition</strong><small>For submissions selected for the final evaluation stage.</small></span>
          <span><strong>Winner Recognition</strong><small>For the highest-rated eligible solutions.</small></span>
          <span><strong>Challenge Skill Record</strong><small>Evidence of capabilities demonstrated through the submitted work.</small></span>
          <span><strong>Team Contribution Record</strong><small>Recognition of each verified team member’s contribution.</small></span>
        </div>
        <p className="prose disclosure-note">
          <strong>Public-disclosure rule:</strong> StartupFair will publicly
          publish only winners and finalists. Other participation records,
          certificates, and achievements will remain private unless the
          participant independently chooses to share them.
        </p>
      </Section>
      <Section
        eyebrow="Privacy and Profile Visibility"
        title="Your Profile. Your Choice."
      >
        <p className="prose section-intro">
          StartupFair profiles will remain private by default. Participants
          control how their information is used beyond the challenges they join.
        </p>
        <Cards
          cols={4}
          items={[
            {
              title: "Private by Default",
              copy: "Your full profile is visible only to you unless you choose another visibility option.",
            },
            {
              title: "Challenge Access",
              copy: "Required profile and submission information is shared only with authorized StartupFair reviewers, evaluators, and relevant challenge organizations.",
            },
            {
              title: "Talent Network — Optional",
              copy: "You may choose to make selected professional information searchable by approved organizations seeking talent or collaborators.",
            },
            {
              title: "Public Recognition",
              copy: "StartupFair will publicly recognize only winners and finalists. Public information will be limited to approved names, profiles, team details, and challenge results.",
            },
          ]}
        />
        <p className="prose privacy-note">
          Participants may change optional visibility settings or withdraw from
          the talent network, subject to challenge records, legal obligations,
          and previously published winner or finalist results.
        </p>
      </Section>
      <CTA
        title="Ready to Prove What You Can Build?"
        copy="Create your free StartupFair profile, explore real-world challenges, and turn your work into credible evidence of your capabilities."
        buttons={[
          ["Explore Challenges", "/challenges"],
          ["Create Your Free Profile", "/talent-profile/contact"],
        ]}
        note="Participation and recognition are subject to each challenge’s eligibility requirements, rules, evaluation criteria, and published outcomes."
      />
    </Layout>
  );
}

function ChallengeProposalIntroductionPage() {
  const organizations = [
    "Companies and healthcare organizations",
    "Startups and technology businesses",
    "Universities and research institutions",
    "Nonprofit and public-interest organizations",
    "Publishers, advertisers, and commerce businesses",
    "Investors, accelerators, and venture organizations",
    "Industry associations and ecosystem partners",
    "Authorized representatives acting for an organization",
  ];
  const services = [
    { title: "Clarify the Problem", copy: "Define the business need, target users, measurable pain points, and desired outcomes." },
    { title: "Design the Challenge", copy: "Shape the participation model, requirements, timeline, rules, and evaluation criteria." },
    { title: "Reach Participants", copy: "Recruit eligible global talent and coordinate applications and submissions." },
    { title: "Evaluate and Advance", copy: "Support reviewers, finalists, winner selection, and possible outcome pathways." },
  ];
  return (
    <Layout>
      <section className="detail-hero">
        <span className="eyebrow">Challenge Proposal · Step 1 of 8</span>
        <div className="tags"><span>Organization Proposal</span><span>Global Challenges</span></div>
        <h1>Launch an AI or Innovation Challenge</h1>
        <p>Bring StartupFair a meaningful business, healthcare, technology, marketing, workforce, or societal problem. We will review the opportunity and determine whether a challenge-based approach can help discover talent, develop solutions, or evaluate promising ideas.</p>
        <div className="actions"><Link className="button primary" href="/launch-challenge/contact">Start Challenge Proposal</Link><Link className="button" href="/for-organizations">For Organizations</Link></div>
      </section>
      <Section eyebrow="Who can propose" title="Organizations With Problems Worth Solving">
        <div className="prose"><ul>{organizations.map((item) => <li key={item}>{item}</li>)}</ul></div>
      </Section>
      <Section eyebrow="How StartupFair may help" title="From Problem Definition to Possible Outcomes" soft>
        <Cards cols={4} items={services} />
        <p className="prose section-intro">Possible pathways may include hiring, paid projects, pilots, partnerships, mentorship, or venture discussions. No pathway or outcome is guaranteed.</p>
      </Section>
      <Section eyebrow="Before you begin" title="Information to Prepare">
        <div className="prose">
          <ul>
            <li>Organization and contact information</li>
            <li>Problem statement, target users, current process, and measurable pain points</li>
            <li>Desired solution or talent outcome</li>
            <li>Required skills and participant profile</li>
            <li>Available data, systems, APIs, tools, or other resources</li>
            <li>Security, confidentiality, compliance, and intellectual-property considerations</li>
            <li>Preliminary timeline and budget range</li>
            <li>Potential outcomes for selected participants</li>
          </ul>
          <div className="actions">
            <Link className="button primary" href="/launch-challenge/contact">Start Challenge Proposal</Link>
            <Link className="button" href="/for-organizations">Learn How It Works</Link>
            <Link className="button" href="/">Return Home</Link>
          </div>
          <p className="submission-note">Submitting a proposal does not guarantee acceptance, publication, participant interest, a successful solution, hiring, commercialization, funding, or any other outcome. Every challenge requires separate review, approval, scope, rules, and commercial terms.</p>
          <p className="submission-note"><strong>Prototype notice:</strong> During this website-development stage, proposal information is not transmitted or stored.</p>
        </div>
      </Section>
    </Layout>
  );
}

function ChallengeProposalContactPage() {
  return (
    <Layout>
      <section className="detail-hero">
        <span className="eyebrow">Challenge Proposal · Step 2 of 8</span>
        <h1>Contact and Organization Details</h1>
        <p>Identify the organization and the person authorized to discuss a potential challenge with StartupFair.</p>
      </section>
      <Section eyebrow="Organization proposal" title="Primary Contact and Organization">
        <EmailRoutingForm category="challenges" className="contact-form" onSubmit={(event) => { event.preventDefault(); window.location.assign("/launch-challenge/problem"); }}>
          <label>Full name<input required autoComplete="name" name="contactName" /></label>
          <label>Job title<input required name="jobTitle" /></label>
          <label>Business email<input required type="email" autoComplete="email" name="businessEmail" /></label>
          <label>Phone number<input required type="tel" autoComplete="tel" name="phone" /></label>
          <label>Preferred contact method<select required name="contactMethod" defaultValue=""><option value="" disabled>Select one</option><option>Email</option><option>Phone</option><option>Video meeting</option></select></label>
          <label>Country<input required autoComplete="country-name" name="contactCountry" /></label>
          <label>Time zone<input required name="timezone" placeholder="Example: Pacific Time or UTC+5:30" /></label>
          <label>LinkedIn profile <small>(optional)</small><input type="url" name="linkedin" placeholder="https://" /></label>
          <label>Legal organization name<input required name="organizationName" /></label>
          <label>Organization website<input required type="url" name="organizationWebsite" placeholder="https://" /></label>
          <label>Organization type<select required name="organizationType" defaultValue=""><option value="" disabled>Select one</option><option>Company or corporation</option><option>Startup</option><option>Healthcare organization</option><option>University or research institution</option><option>Nonprofit organization</option><option>Public-sector organization</option><option>Investor or accelerator</option><option>Industry association</option><option>Other</option></select></label>
          <label>Primary industry<input required name="industry" /></label>
          <label>Approximate organization size<select required name="organizationSize" defaultValue=""><option value="" disabled>Select one</option><option>1–10 people</option><option>11–50 people</option><option>51–200 people</option><option>201–1,000 people</option><option>More than 1,000 people</option><option>Prefer not to state</option></select></label>
          <label>Headquarters country<input required autoComplete="country-name" name="headquartersCountry" /></label>
          <label className="wide">Countries or regions of operation <small>(maximum 700 characters)</small><textarea required maxLength={700} name="operatingRegions" rows={4} /></label>
          <label className="wide">Brief organization description <small>(maximum 1,000 characters)</small><textarea required maxLength={1000} name="organizationDescription" rows={5} placeholder="Describe the organization’s purpose, primary products or services, customers, and relevant operations." /></label>
          <label className="wide">How did you hear about StartupFair?<select required name="source" defaultValue=""><option value="" disabled>Select one</option><option>Search engine</option><option>LinkedIn or social media</option><option>University or research network</option><option>Professional organization or event</option><option>Referral or prior relationship</option><option>Other</option></select></label>
          <label className="wide check"><input required type="checkbox" name="authority" />I am authorized to submit this proposal and discuss a potential challenge on behalf of the organization.</label>
          <div className="wide actions">
            <button className="button primary" type="submit">Continue</button>
            <Link className="button" href="/launch-challenge">Back to Introduction</Link>
          </div>
          <p className="wide submission-note">Contact information and proposal details remain private and available only to authorized StartupFair personnel unless separate sharing permission is provided.</p>
        </EmailRoutingForm>
      </Section>
    </Layout>
  );
}

function ChallengeProposalProblemPage() {
  return (
    <Layout>
      <section className="detail-hero">
        <span className="eyebrow">Challenge Proposal · Step 3 of 8</span>
        <h1>Challenge Objective and Business Problem</h1>
        <p>Define the current problem, who it affects, why it matters, and what a successful challenge should help accomplish.</p>
      </section>
      <Section eyebrow="Problem definition" title="What Should the Challenge Solve?">
        <EmailRoutingForm category="challenges" className="contact-form" onSubmit={(event) => { event.preventDefault(); window.location.assign("/launch-challenge/talent"); }}>
          <label className="wide">Working challenge title<input required name="challengeTitle" /></label>
          <label>Primary challenge model<select required name="challengeModel" defaultValue=""><option value="" disabled>Select one</option><option>Talent discovery</option><option>Solution development</option><option>Venture discovery</option><option>Combination</option><option>Not sure — StartupFair should recommend</option></select></label>
          <label>Preferred format<select required name="challengeFormat" defaultValue=""><option value="" disabled>Select one</option><option>Public</option><option>Private</option><option>Hybrid</option><option>Not sure</option></select></label>
          <label className="wide">What problem should the challenge address? <small>(maximum 2,000 characters)</small><textarea required maxLength={2000} name="problemStatement" rows={8} placeholder="Describe the business, operational, technical, healthcare, marketing, workforce, or societal problem in plain language." /></label>
          <label className="wide">Who experiences the problem? <small>(maximum 1,000 characters)</small><textarea required maxLength={1000} name="affectedUsers" rows={5} placeholder="Identify the users, customers, employees, clinicians, partners, communities, or other stakeholders affected." /></label>
          <label className="wide">Current workflow or process <small>(maximum 1,500 characters)</small><textarea required maxLength={1500} name="currentWorkflow" rows={6} placeholder="Explain how the work is handled today, including important handoffs, systems, or decision points." /></label>
          <label className="wide">Primary pain points <small>(maximum 1,500 characters)</small><textarea required maxLength={1500} name="painPoints" rows={6} placeholder="Describe delays, costs, errors, risks, missed opportunities, poor experiences, or other measurable limitations." /></label>
          <label className="wide">Why is this problem important now? <small>(maximum 1,000 characters)</small><textarea required maxLength={1000} name="whyNow" rows={5} /></label>
          <label className="wide">Previous solutions or attempts and remaining limitations <small>(maximum 1,500 characters)</small><textarea required maxLength={1500} name="priorAttempts" rows={6} /></label>
          <label className="wide">What should participants build, analyze, design, or demonstrate? <small>(maximum 1,500 characters)</small><textarea required maxLength={1500} name="desiredDeliverable" rows={6} /></label>
          <label className="wide">What decisions or operations should improve? <small>(maximum 1,000 characters)</small><textarea required maxLength={1000} name="improvedOutcomes" rows={5} /></label>
          <label className="wide">How will the organization measure success? <small>(maximum 1,500 characters)</small><textarea required maxLength={1500} name="successMeasures" rows={6} placeholder="List relevant operational, financial, quality, adoption, experience, safety, or technical measures." /></label>
          <label className="wide">Current baseline or measurable impact <small>(optional · maximum 1,000 characters)</small><textarea maxLength={1000} name="baseline" rows={5} /></label>
          <label className="wide">Important exclusions or out-of-scope areas <small>(optional · maximum 1,000 characters)</small><textarea maxLength={1000} name="exclusions" rows={5} /></label>
          <div className="wide actions">
            <button className="button primary" type="submit">Continue</button>
            <Link className="button" href="/launch-challenge/contact">Back to Contact and Organization</Link>
          </div>
          <p className="wide submission-note"><strong>Protected-information warning:</strong> Do not include confidential information, regulated data, access credentials, personal information, trade secrets, or proprietary technical details at this stage. Protected information can be discussed later under appropriate agreements and controls.</p>
        </EmailRoutingForm>
      </Section>
    </Layout>
  );
}

function ChallengeProposalTalentPage() {
  const participantProfiles = [
    "AI and machine-learning professionals",
    "Software engineers",
    "Data scientists and analysts",
    "Product managers and designers",
    "Industry or domain specialists",
    "Students and recent graduates",
    "Founders and startups",
    "Researchers and academics",
    "Business, operations, or process specialists",
    "Other",
  ];
  return (
    <Layout>
      <section className="detail-hero">
        <span className="eyebrow">Challenge Proposal · Step 4 of 8</span>
        <h1>Desired Talent and Participants</h1>
        <p>Describe who should participate, the capabilities they need, and any lawful eligibility or screening requirements.</p>
      </section>
      <Section eyebrow="Participant design" title="Who Should Take Part?">
        <EmailRoutingForm category="challenges" className="contact-form" onSubmit={(event) => { event.preventDefault(); window.location.assign("/launch-challenge/resources"); }}>
          <label>Participation structure<select required name="participationStructure" defaultValue=""><option value="" disabled>Select one</option><option>Individuals</option><option>Teams</option><option>Both individuals and teams</option></select></label>
          <label>Geographic eligibility<select required name="geographicEligibility" defaultValue=""><option value="" disabled>Select one</option><option>Global</option><option>Selected countries</option><option>Selected regions</option><option>To be determined</option></select></label>
          <label>Application access<select required name="applicationAccess" defaultValue=""><option value="" disabled>Select one</option><option>Public applications</option><option>Invitation only</option><option>Hybrid</option><option>To be determined</option></select></label>
          <label>Preferred team size<input required name="teamSize" placeholder="Example: 2–5 people, or no preference" /></label>
          <label>Estimated participants or teams<input required name="participantCount" placeholder="Example: 50 applicants and 10 selected teams" /></label>
          <label>May organization employees participate?<select required name="employeeParticipation" defaultValue=""><option value="" disabled>Select one</option><option>Yes</option><option>No</option><option>Not sure</option></select></label>
          <fieldset className="wide application-fieldset">
            <legend>Desired participant profiles <small>(select all that apply)</small></legend>
            {participantProfiles.map((item) => <label className="check" key={item}><input type="checkbox" name="participantProfiles" value={item} />{item}</label>)}
          </fieldset>
          <label className="wide">Essential technical or professional skills <small>(maximum 1,500 characters)</small><textarea required maxLength={1500} name="essentialSkills" rows={6} /></label>
          <label className="wide">Preferred additional skills <small>(optional · maximum 1,000 characters)</small><textarea maxLength={1000} name="preferredSkills" rows={5} /></label>
          <label className="wide">Required industry or domain knowledge <small>(maximum 1,000 characters)</small><textarea required maxLength={1000} name="domainKnowledge" rows={5} /></label>
          <label>Expected experience level<select required name="experienceLevel" defaultValue=""><option value="" disabled>Select one</option><option>Student or beginner</option><option>Entry level</option><option>Intermediate</option><option>Advanced</option><option>Expert</option><option>Mixed levels</option><option>Open to all qualified applicants</option></select></label>
          <label>Required credentials?<select required name="credentialsRequired" defaultValue=""><option value="" disabled>Select one</option><option>No</option><option>Yes — genuinely required</option><option>To be determined</option></select></label>
          <label className="wide">Required certifications, licenses, education, or work authorization <small>(optional · maximum 1,000 characters)</small><textarea maxLength={1000} name="requiredCredentials" rows={5} placeholder="Include only requirements that are genuinely necessary and legally appropriate." /></label>
          <label className="wide">Expected participant roles or team composition <small>(maximum 1,000 characters)</small><textarea required maxLength={1000} name="teamComposition" rows={5} /></label>
          <label className="wide">Screening questions or qualification evidence <small>(maximum 1,500 characters)</small><textarea required maxLength={1500} name="screeningEvidence" rows={6} placeholder="Examples include work samples, project experience, certifications, technical responses, or short interviews." /></label>
          <label className="wide">Accessibility or accommodation requirements <small>(optional · maximum 1,000 characters)</small><textarea maxLength={1000} name="accessibility" rows={5} /></label>
          <label className="wide">Diversity and inclusion objectives <small>(optional · maximum 1,000 characters)</small><textarea maxLength={1000} name="inclusion" rows={5} /></label>
          <label className="wide">Conflicts of interest or excluded participants <small>(optional · maximum 1,000 characters)</small><textarea maxLength={1000} name="conflicts" rows={5} /></label>
          <label className="wide">Geographic, legal, regulatory, or export-control limitations <small>(optional · maximum 1,000 characters)</small><textarea maxLength={1000} name="limitations" rows={5} /></label>
          <label className="wide check"><input required type="checkbox" name="lawfulCriteria" />I understand that participant criteria must be relevant, lawful, non-discriminatory, and proportionate to the challenge requirements.</label>
          <div className="wide actions">
            <button className="button primary" type="submit">Continue</button>
            <Link className="button" href="/launch-challenge/problem">Back to Challenge Objective</Link>
          </div>
        </EmailRoutingForm>
      </Section>
    </Layout>
  );
}

function ChallengeProposalResourcesPage() {
  const resources = [
    "Data or sample datasets",
    "Systems, platforms, APIs, or integrations",
    "Sandbox or test environment",
    "Software, cloud, AI-model, or platform credits",
    "Documentation and technical support",
    "Subject-matter experts or mentors",
    "Existing prototypes, workflows, or research",
    "No resources confirmed yet",
  ];
  return (
    <Layout>
      <section className="detail-hero">
        <span className="eyebrow">Challenge Proposal · Step 5 of 8</span>
        <h1>Data, Technology, Security, and Intellectual Property</h1>
        <p>Describe the resources participants may use and the preliminary controls required to protect data, systems, organizations, and participant work.</p>
      </section>
      <Section eyebrow="Protected challenge design" title="Resources, Controls and Preliminary Terms">
        <EmailRoutingForm category="challenges" className="contact-form" onSubmit={(event) => { event.preventDefault(); window.location.assign("/launch-challenge/timeline"); }}>
          <fieldset className="wide application-fieldset">
            <legend>Available or anticipated resources <small>(select all that apply)</small></legend>
            {resources.map((item) => <label className="check" key={item}><input type="checkbox" name="resources" value={item} />{item}</label>)}
          </fieldset>
          <label className="wide">Resource details and access timing <small>(maximum 1,500 characters)</small><textarea required maxLength={1500} name="resourceDetails" rows={6} placeholder="Explain what may be available, who would receive access, and whether access begins during application, selection, or the build period." /></label>
          <label className="wide">Data type and approximate volume <small>(maximum 1,500 characters)</small><textarea required maxLength={1500} name="dataDescription" rows={6} /></label>
          <fieldset className="wide application-fieldset">
            <legend>Expected data classification <small>(select all that apply)</small></legend>
            {['Public', 'Fictional', 'Synthetic', 'Anonymized', 'Aggregated', 'Properly authorized', 'Personal information', 'Health information', 'Financial information', 'Consumer or advertising data', 'Proprietary business data', 'No data required', 'To be determined'].map((item) => <label className="check" key={item}><input type="checkbox" name="dataClassification" value={item} />{item}</label>)}
          </fieldset>
          <label className="wide">Data access, retention, and deletion requirements <small>(maximum 1,500 characters)</small><textarea required maxLength={1500} name="dataControls" rows={6} placeholder="Describe the proposed access method, permitted environment, retention period, deletion process, and any restrictions on copying or export." /></label>
          <label>May participants use external datasets?<select required name="externalData" defaultValue=""><option value="" disabled>Select one</option><option>Yes, with disclosure and proper licensing</option><option>Only with prior approval</option><option>No</option><option>To be determined</option></select></label>
          <label>Is an NDA anticipated?<select required name="nda" defaultValue=""><option value="" disabled>Select one</option><option>Yes</option><option>No</option><option>Possibly</option><option>To be determined</option></select></label>
          <label className="wide">Required or preferred technology stack <small>(maximum 1,500 characters)</small><textarea required maxLength={1500} name="technologyStack" rows={6} /></label>
          <label className="wide">Approved or preferred AI models, tools, and platforms <small>(optional · maximum 1,000 characters)</small><textarea maxLength={1000} name="approvedTools" rows={5} /></label>
          <label className="wide">Prohibited technologies, platforms, or uses <small>(optional · maximum 1,000 characters)</small><textarea maxLength={1000} name="prohibitedTools" rows={5} /></label>
          <label className="wide">Integration, deployment, hosting, and data-residency expectations <small>(maximum 1,500 characters)</small><textarea required maxLength={1500} name="deploymentExpectations" rows={6} /></label>
          <label className="wide">Open-source requirements or restrictions <small>(optional · maximum 1,000 characters)</small><textarea maxLength={1000} name="openSource" rows={5} /></label>
          <label className="wide">Security, identity, access-control, and review requirements <small>(maximum 1,500 characters)</small><textarea required maxLength={1500} name="securityRequirements" rows={6} /></label>
          <label className="wide">Applicable legal, regulatory, platform, or industry requirements <small>(maximum 1,500 characters)</small><textarea required maxLength={1500} name="complianceRequirements" rows={6} placeholder="Examples may include HIPAA, GDPR, CCPA, SOC 2 controls, advertising-platform policies, or other applicable requirements." /></label>
          <label className="wide">Human-review, responsible-AI, and incident-reporting expectations <small>(maximum 1,500 characters)</small><textarea required maxLength={1500} name="responsibleAI" rows={6} /></label>
          <label className="wide">Preliminary intellectual-property and commercialization expectations <small>(maximum 2,000 characters)</small><textarea required maxLength={2000} name="ipExpectations" rows={8} placeholder="Describe anticipated treatment of pre-existing IP, submission ownership or licensing, prototype and result use, publication permissions, and commercialization discussions." /></label>
          <label className="wide">Third-party software, dataset, API, and AI-model license requirements <small>(maximum 1,000 characters)</small><textarea required maxLength={1000} name="thirdPartyLicenses" rows={5} /></label>
          <label className="wide check"><input required type="checkbox" name="nonBindingTerms" />I understand that these answers are preliminary and do not create binding legal terms. Final data-use, confidentiality, security, intellectual-property, and commercialization terms require separate review and written agreement before protected resources are shared or final work is submitted.</label>
          <div className="wide actions">
            <button className="button primary" type="submit">Continue</button>
            <Link className="button" href="/launch-challenge/talent">Back to Desired Talent</Link>
          </div>
          <p className="wide submission-note">Do not include protected data, access credentials, security secrets, personal information, or proprietary technical details in this proposal. StartupFair may request a controlled follow-up under appropriate agreements.</p>
        </EmailRoutingForm>
      </Section>
    </Layout>
  );
}

function ChallengeProposalTimelinePage() {
  const outcomes = [
    "Cash award or prize",
    "Participation stipend",
    "Paid project or contract",
    "Full-time hiring consideration",
    "Product pilot",
    "Strategic partnership",
    "Licensing or commercialization discussion",
    "Mentorship",
    "Accelerator or venture discussion",
    "Public recognition for winners and finalists",
    "Certificate or verified achievement",
  ];
  return (
    <Layout>
      <section className="detail-hero">
        <span className="eyebrow">Challenge Proposal · Step 6 of 8</span>
        <h1>Timeline, Budget, and Potential Outcomes</h1>
        <p>Share the organization’s preliminary timing, available resources, approval requirements, and realistic pathways for selected participants.</p>
      </section>
      <Section eyebrow="Program feasibility" title="Timing, Resources and Follow-Through">
        <EmailRoutingForm category="challenges" className="contact-form" onSubmit={(event) => { event.preventDefault(); window.location.assign("/launch-challenge/privacy"); }}>
          <label>Preferred launch date<input required type="date" name="launchDate" /></label>
          <label>Date flexibility<select required name="dateFlexibility" defaultValue=""><option value="" disabled>Select one</option><option>Fixed date</option><option>Flexible within 30 days</option><option>Flexible within 90 days</option><option>Timing not established</option></select></label>
          <label>Preferred application period<input required name="applicationPeriod" placeholder="Example: 3 weeks" /></label>
          <label>Participant-selection period<input required name="selectionPeriod" placeholder="Example: 1 week" /></label>
          <label>Build or challenge duration<input required name="buildDuration" placeholder="Example: 6 weeks" /></label>
          <label>Evaluation period<input required name="evaluationPeriod" placeholder="Example: 2 weeks" /></label>
          <label>Preferred final presentation or demonstration date <small>(optional)</small><input type="date" name="presentationDate" /></label>
          <label>Desired completion date<input required type="date" name="completionDate" /></label>
          <label className="wide">Important organizational deadlines <small>(optional · maximum 1,000 characters)</small><textarea maxLength={1000} name="deadlines" rows={5} /></label>
          <label>Budget currency<input required name="currency" placeholder="Example: USD" /></label>
          <label>Preliminary total program budget<select required name="budgetRange" defaultValue=""><option value="" disabled>Select one</option><option>Under $10,000</option><option>$10,000–$25,000</option><option>$25,001–$50,000</option><option>$50,001–$100,000</option><option>More than $100,000</option><option>Not established</option></select></label>
          <fieldset className="wide application-fieldset">
            <legend>What the preliminary budget may include <small>(select all that apply)</small></legend>
            {['StartupFair design and management services', 'Participant compensation or awards', 'Technology, data, tools, or cloud resources', 'Evaluation, mentors, or subject-matter expertise', 'Pilot or implementation funding', 'Not yet determined'].map((item) => <label className="check" key={item}><input type="checkbox" name="budgetIncludes" value={item} />{item}</label>)}
          </fieldset>
          <label className="wide">Internal project owner and available support <small>(maximum 1,500 characters)</small><textarea required maxLength={1500} name="internalSupport" rows={6} placeholder="Identify the accountable owner and any available subject-matter experts, reviewers, judges, technical support, or operational resources." /></label>
          <label className="wide">Approvals still required <small>(maximum 1,500 characters)</small><textarea required maxLength={1500} name="approvals" rows={6} placeholder="Describe procurement, legal, security, privacy, finance, leadership, or other approvals needed before launch." /></label>
          <fieldset className="wide application-fieldset">
            <legend>Potential participant outcomes <small>(select all that could realistically apply)</small></legend>
            {outcomes.map((item) => <label className="check" key={item}><input type="checkbox" name="outcomes" value={item} />{item}</label>)}
          </fieldset>
          <label className="wide">What can the organization realistically offer? <small>(maximum 1,500 characters)</small><textarea required maxLength={1500} name="realisticOffer" rows={6} /></label>
          <label className="wide">Who will make post-challenge decisions, and on what timeline? <small>(maximum 1,500 characters)</small><textarea required maxLength={1500} name="decisionProcess" rows={6} /></label>
          <label className="wide">Resources available for a pilot or implementation <small>(optional · maximum 1,500 characters)</small><textarea maxLength={1500} name="implementationResources" rows={6} /></label>
          <label className="wide">How will finalists and winners receive updates? <small>(maximum 1,000 characters)</small><textarea required maxLength={1000} name="participantUpdates" rows={5} /></label>
          <label className="wide check"><input required type="checkbox" name="confirmedOutcomesOnly" />I understand that only confirmed outcomes should be published. Budgets, awards, employment, pilots, partnerships, licensing, commercialization, or investment are not guaranteed until separately approved and documented.</label>
          <div className="wide actions">
            <button className="button primary" type="submit">Continue</button>
            <Link className="button" href="/launch-challenge/resources">Back to Data, Technology, Security and IP</Link>
          </div>
        </EmailRoutingForm>
      </Section>
    </Layout>
  );
}

function ChallengeProposalPrivacyPage() {
  return (
    <Layout>
      <section className="detail-hero">
        <span className="eyebrow">Challenge Proposal · Step 7 of 8</span>
        <h1>Privacy, Consent and Submission Acknowledgments</h1>
        <p>Confirm your authority, information safeguards, participant protections, and the preliminary nature of this proposal.</p>
      </section>
      <Section eyebrow="Required acknowledgments" title="Protect People, Information and the Process">
        <EmailRoutingForm category="challenges" className="contact-form" onSubmit={(event) => { event.preventDefault(); window.location.assign("/launch-challenge/review"); }}>
          <label className="wide check"><input required type="checkbox" name="authorizedToPropose" />I am authorized to propose this challenge and discuss it on behalf of the organization.</label>
          <label className="wide check"><input required type="checkbox" name="protectedInformation" />I have not included protected data, credentials, protected health information, trade secrets, or confidential information that I am not authorized to share.</label>
          <label className="wide check"><input required type="checkbox" name="participantInformation" />Participant, candidate, and applicant information will be used only for the approved challenge, evaluation, talent, or opportunity purpose.</label>
          <label className="wide check"><input required type="checkbox" name="evaluationIntegrity" />The organization will support independent evaluation and disclose relevant reviewer conflicts of interest.</label>
          <label className="wide check"><input required type="checkbox" name="publicRecognition" />I understand that StartupFair publicly announces only winners and finalists; other participants will not be identified without their consent unless they share their participation themselves.</label>
          <label className="wide check"><input required type="checkbox" name="preliminaryTerms" />I understand that proposed intellectual-property, data-use, privacy, security, confidentiality, and commercialization terms are preliminary and require separate written agreement.</label>
          <label className="wide check"><input required type="checkbox" name="contactPermission" />StartupFair may contact me for clarification, verification, evaluation, and proposal-related discussions.</label>
          <label className="wide check"><input required type="checkbox" name="policyAgreement" />I have reviewed and agree to the applicable <Link className="text-link" href="/privacy">Privacy Policy</Link>, <Link className="text-link" href="/terms">Terms of Use</Link>, and <Link className="text-link" href="/challenge-rules">Challenge Rules</Link>.</label>
          <label>Full legal name<input required name="legalName" /></label>
          <label>Date<input required type="date" name="acknowledgmentDate" /></label>
          <label className="wide check"><input required type="checkbox" name="electronicAcknowledgment" />I confirm that entering my name constitutes my electronic acknowledgment of the statements above.</label>
          <div className="wide actions">
            <button className="button primary" type="submit">Continue to Review</button>
            <Link className="button" href="/launch-challenge/timeline">Back to Timeline, Budget and Outcomes</Link>
          </div>
          <p className="wide submission-note">Do not submit protected or regulated information through this prototype. Separate agreements and secure workflows are required before protected resources are shared.</p>
        </EmailRoutingForm>
      </Section>
    </Layout>
  );
}

function ChallengeProposalReviewPage() {
  const sections = [
    ["1. Contact and Organization Details", "Authorized representative, contact information, and organization profile", "/launch-challenge/contact"],
    ["2. Challenge Objective and Business Problem", "Challenge direction, current workflow, pain points, desired deliverable, success measures, and exclusions", "/launch-challenge/problem"],
    ["3. Desired Talent and Participants", "Participation structure, participant profiles, skills, credentials, screening, accessibility, inclusion, conflicts, and limitations", "/launch-challenge/talent"],
    ["4. Data, Technology, Security, and IP", "Resources, data classification and controls, technology requirements, security, compliance, responsible AI, and preliminary IP expectations", "/launch-challenge/resources"],
    ["5. Timeline, Budget, and Potential Outcomes", "Schedule, budget range, internal support, required approvals, realistic participant outcomes, and follow-through", "/launch-challenge/timeline"],
    ["6. Privacy, Consent and Acknowledgments", "Authorization, protected-information safeguards, participant privacy, conflicts, preliminary terms, policies, and electronic acknowledgment", "/launch-challenge/privacy"],
  ];
  return (
    <Layout>
      <section className="detail-hero">
        <span className="eyebrow">Challenge Proposal · Step 8 of 8</span>
        <h1>Review and Submit Your Proposal</h1>
        <p>Review each section before submitting. You may return to any section and make corrections.</p>
      </section>
      <Section eyebrow="Final review" title="Challenge Proposal Summary">
        <div className="cards cols-3">
          {sections.map(([title, copy, href]) => (
            <article className="card" key={title}>
              <h3>{title}</h3>
              <p>{copy}</p>
              <Link className="text-link" href={href}>Edit section</Link>
            </article>
          ))}
        </div>
      </Section>
      <Section eyebrow="Ready to submit" title="Required Confirmations" soft>
        <EmailRoutingForm category="challenges" showEmailContact className="contact-form" onSubmit={(event) => { event.preventDefault(); window.location.assign("/launch-challenge/confirmation"); }}>
          <label className="wide check"><input required type="checkbox" name="accurate" />I have reviewed the proposal and confirm that the information is accurate and complete to the best of my knowledge.</label>
          <label className="wide check"><input required type="checkbox" name="authorized" />I am authorized to submit this proposal and discuss a potential challenge on behalf of the organization.</label>
          <label className="wide check"><input required type="checkbox" name="protectedInformation" />The proposal does not contain protected data, access credentials, personal information, trade secrets, confidential information, or proprietary material that I am not authorized to share.</label>
          <label className="wide check"><input required type="checkbox" name="preliminary" />I understand that preliminary budgets, schedules, outcomes, data controls, and intellectual-property expectations are not binding commitments.</label>
          <label className="wide check"><input required type="checkbox" name="contact" />StartupFair may contact the organization for clarification, verification, evaluation, and proposal-related discussions.</label>
          <label className="wide check"><input required type="checkbox" name="noGuarantee" />I understand that submission does not guarantee acceptance, publication, participant interest, a successful solution, hiring, commercialization, funding, or any other outcome.</label>
          <label className="wide check"><input required type="checkbox" name="separateAgreements" />I understand that final scope, fees, rules, data use, confidentiality, security, intellectual property, and participant-outcome commitments require separate review, approval, and written agreements.</label>
          <label className="wide check"><input required type="checkbox" name="policies" />I have reviewed and agree to the applicable <Link className="text-link" href="/privacy">Privacy Policy</Link> and <Link className="text-link" href="/terms">Terms of Use</Link>.</label>
          <div className="wide actions">
            <button className="button primary" type="submit">Submit Challenge Proposal</button>
            <Link className="button" href="/launch-challenge/privacy">Back to Privacy and Acknowledgments</Link>
          </div>
          <p className="wide submission-note">When production processing is connected, StartupFair should generate a proposal reference and send a confirmation email after submission.</p>
        </EmailRoutingForm>
      </Section>
    </Layout>
  );
}

function ChallengeProposalConfirmationPage() {
  return (
    <Layout>
      <section className="system-page">
        <div className="status">✓</div>
        <span className="eyebrow">Proposal received</span>
        <h1>Your Challenge Proposal Has Been Received</h1>
        <p>Thank you for sharing your organization’s problem and proposed challenge with StartupFair.</p>
        <div className="application-reference">
          <small>Proposal reference</small>
          <strong>SF-CHP-2026-00001</strong>
          <p>The production platform will generate a unique reference number for future communication and status tracking.</p>
        </div>
      </section>
      <Section eyebrow="Proposal review" title="What Happens Next">
        <div className="process">
          <div><span>01</span><h3>Completeness Review</h3><p>StartupFair checks whether the proposal contains enough information for initial evaluation.</p></div>
          <div><span>02</span><h3>Suitability Assessment</h3><p>The problem, participant model, resources, timeline, risks, and potential outcomes are reviewed.</p></div>
          <div><span>03</span><h3>Discovery Discussion</h3><p>StartupFair may contact the authorized representative for clarification, verification, and alignment.</p></div>
          <div><span>04</span><h3>Scope and Commercial Proposal</h3><p>If there is mutual interest, StartupFair may prepare a separate scope covering services, responsibilities, fees, timeline, rules, data use, security, IP, evaluation, and outcomes.</p></div>
        </div>
        <p className="prose submission-note"><strong>Important:</strong> Receiving the proposal does not mean the challenge has been accepted, approved, published, funded, or launched.</p>
        <div className="actions">
          <Link className="button primary" href="/for-organizations">Review For Organizations</Link>
          <Link className="button" href="/contact">Contact StartupFair</Link>
          <Link className="button" href="/">Return Home</Link>
        </div>
        <p className="prose submission-note"><strong>Prototype notice:</strong> During this website-development stage, proposal information is not transmitted or stored. Production submission, authentication, secure storage, notifications, administrative review, reference generation, and status tracking must be connected before accepting real proposals.</p>
      </Section>
    </Layout>
  );
}

function TalentRequestIntroductionPage() {
  const requesters = [
    "Companies and startups",
    "Healthcare organizations",
    "Technology and AI businesses",
    "Publishers, advertisers, and commerce companies",
    "Universities and research institutions",
    "Nonprofits and public-sector organizations",
    "Investors, accelerators, and portfolio companies",
    "Authorized hiring managers, business leaders, procurement teams, and talent professionals",
  ];
  const needs = [
    "Full-time hiring",
    "Contract or consulting talent",
    "Project-based teams",
    "AI product development",
    "Data, automation, or software specialists",
    "Healthcare and workforce-domain experts",
    "Performance-marketing, AdTech, or publisher specialists",
    "Product, design, research, or operations talent",
    "Pilot or implementation teams",
    "Founder, advisor, or venture-team discovery",
  ];
  return (
    <Layout>
      <section className="detail-hero">
        <span className="eyebrow">Talent Request · Step 1 of 7</span>
        <div className="tags"><span>Organization Request</span><span>Global Talent Discovery</span></div>
        <h1>Find Talent Through Demonstrated Capability</h1>
        <p>Tell StartupFair what your organization needs. We will review the request and determine whether relevant talent may be identified through verified profiles, challenge performance, targeted outreach, or a new skills-based challenge.</p>
        <div className="actions"><Link className="button primary" href="/find-talent/contact">Start Talent Request</Link><Link className="button" href="/for-organizations">For Organizations</Link></div>
      </section>
      <Section eyebrow="Who can request" title="Organizations With Real Talent Needs">
        <div className="prose"><ul>{requesters.map((item) => <li key={item}>{item}</li>)}</ul></div>
      </Section>
      <Section eyebrow="Types of needs" title="Talent for Roles, Projects and New Opportunities" soft>
        <div className="prose"><ul>{needs.map((item) => <li key={item}>{item}</li>)}</ul></div>
      </Section>
      <Section eyebrow="How StartupFair may help" title="Discovery With Participant Control">
        <Cards cols={3} items={[
          { title: "Search Relevant Profiles", copy: "Identify opted-in people based on relevant skills, experience, interests, and availability." },
          { title: "Use Verified Evidence", copy: "Consider supporting work and verified challenge winner or finalist achievements where relevant." },
          { title: "Conduct Targeted Outreach", copy: "Reach suitable global talent while respecting profile visibility and communication choices." },
          { title: "Coordinate Introductions", copy: "Obtain necessary permission before sharing protected contact information or making an introduction." },
          { title: "Recommend a Challenge", copy: "Use a practical talent challenge when structured skills evaluation would improve the decision." },
          { title: "Support Evaluation", copy: "Coordinate screening and structured evaluation under a separate service agreement." },
        ]} />
        <div className="actions">
          <Link className="button primary" href="/find-talent/contact">Start Talent Request</Link>
          <Link className="button" href="/challenges">Explore Challenges</Link>
          <Link className="button" href="/">Return Home</Link>
        </div>
        <p className="prose submission-note"><strong>Privacy and access:</strong> Organizations do not receive unrestricted access to personal profiles or direct contact information. StartupFair respects participant visibility settings and obtains necessary permission before protected introductions.</p>
        <p className="prose submission-note">Submitting a talent request does not guarantee candidate availability, introductions, interviews, hiring, project acceptance, performance, or any other outcome. Services, fees, responsibilities, and engagement terms require separate agreement.</p>
        <p className="prose submission-note"><strong>Prototype notice:</strong> During this website-development stage, request information is not transmitted or stored.</p>
      </Section>
    </Layout>
  );
}

function TalentRequestContactPage() {
  return (
    <Layout>
      <section className="detail-hero">
        <span className="eyebrow">Talent Request · Step 2 of 7</span>
        <h1>Organization and Contact</h1>
        <p>Identify the organization and the person authorized to discuss its role, project, or talent need.</p>
      </section>
      <Section eyebrow="Verified request" title="Primary Contact and Organization">
        <EmailRoutingForm category="talent" className="contact-form" onSubmit={(event) => { event.preventDefault(); window.location.assign("/find-talent/need"); }}>
          <label>Full name<input required autoComplete="name" name="contactName" /></label>
          <label>Job title<input required name="jobTitle" /></label>
          <label>Business email<input required type="email" autoComplete="email" name="businessEmail" /></label>
          <label>Phone number<input required type="tel" autoComplete="tel" name="phone" /></label>
          <label>Preferred contact method<select required name="contactMethod" defaultValue=""><option value="" disabled>Select one</option><option>Email</option><option>Phone</option><option>Video meeting</option></select></label>
          <label>Country<input required autoComplete="country-name" name="contactCountry" /></label>
          <label>Time zone<input required name="timezone" placeholder="Example: Pacific Time or UTC+5:30" /></label>
          <label>LinkedIn profile <small>(optional)</small><input type="url" name="linkedin" placeholder="https://" /></label>
          <label>Legal organization name<input required name="organizationName" /></label>
          <label>Organization website<input required type="url" name="organizationWebsite" placeholder="https://" /></label>
          <label>Organization type<select required name="organizationType" defaultValue=""><option value="" disabled>Select one</option><option>Company or corporation</option><option>Startup</option><option>Healthcare organization</option><option>University or research institution</option><option>Nonprofit organization</option><option>Public-sector organization</option><option>Investor, accelerator, or portfolio company</option><option>Other</option></select></label>
          <label>Primary industry<input required name="industry" /></label>
          <label>Approximate organization size<select required name="organizationSize" defaultValue=""><option value="" disabled>Select one</option><option>1–10 people</option><option>11–50 people</option><option>51–200 people</option><option>201–1,000 people</option><option>More than 1,000 people</option><option>Prefer not to state</option></select></label>
          <label>Headquarters country<input required autoComplete="country-name" name="headquartersCountry" /></label>
          <label className="wide">Countries or regions of operation <small>(maximum 700 characters)</small><textarea required maxLength={700} name="operatingRegions" rows={4} /></label>
          <label className="wide">Brief organization description <small>(maximum 1,000 characters)</small><textarea required maxLength={1000} name="organizationDescription" rows={5} placeholder="Describe the organization’s purpose, primary products or services, customers, and relevant operations." /></label>
          <label className="wide">How did you hear about StartupFair?<select required name="source" defaultValue=""><option value="" disabled>Select one</option><option>Search engine</option><option>LinkedIn or social media</option><option>Professional organization or event</option><option>University or research network</option><option>Referral or prior relationship</option><option>Other</option></select></label>
          <fieldset className="wide application-fieldset">
            <legend>Required confirmations</legend>
            <label className="check wide"><input required type="checkbox" name="authority" />I am authorized to submit this request and discuss the organization’s role, project, or talent need.</label>
            <label className="check wide"><input required type="checkbox" name="legitimateNeed" />The organization has a legitimate role, project, advisory, research, venture, or other talent need.</label>
            <label className="check wide"><input required type="checkbox" name="noScraping" />This request is not intended to scrape profiles, build marketing lists, or obtain unrestricted access to personal information.</label>
            <label className="check wide"><input required type="checkbox" name="verification" />StartupFair may verify the organization and representative before providing talent-discovery services or protected introductions.</label>
          </fieldset>
          <div className="wide actions">
            <button className="button primary" type="submit">Continue</button>
            <Link className="button" href="/find-talent">Back to Introduction</Link>
          </div>
          <p className="wide submission-note">Request details remain private and accessible only to authorized StartupFair personnel unless separate sharing permission is provided.</p>
        </EmailRoutingForm>
      </Section>
    </Layout>
  );
}

function TalentRequestNeedPage() {
  const discoveryMethods = [
    "Profile-based discovery",
    "Targeted outreach",
    "Structured screening",
    "Practical talent challenge",
    "Combination",
    "StartupFair recommendation",
  ];
  return (
    <Layout>
      <section className="detail-hero">
        <span className="eyebrow">Talent Request · Step 3 of 7</span>
        <h1>Role, Project, or Talent Need</h1>
        <p>Describe the business need, the people or team required, and the outcomes the organization wants to achieve.</p>
      </section>
      <Section eyebrow="Talent need" title="What Does the Organization Need?">
        <EmailRoutingForm category="talent" className="contact-form" onSubmit={(event) => { event.preventDefault(); window.location.assign("/find-talent/qualifications"); }}>
          <label>Request type<select required name="requestType" defaultValue=""><option value="" disabled>Select one</option><option>Full-time hire</option><option>Contract professional</option><option>Consultant or advisor</option><option>Project-based individual</option><option>Project team</option><option>Pilot or implementation team</option><option>Research collaborator</option><option>Founder or venture-team member</option><option>Multiple needs</option><option>Not sure — StartupFair should recommend</option></select></label>
          <label>Number of people or teams needed<input required name="quantity" /></label>
          <label className="wide">Role or project title<input required name="requestTitle" /></label>
          <label className="wide">Business objective <small>(maximum 1,500 characters)</small><textarea required maxLength={1500} name="businessObjective" rows={6} /></label>
          <label className="wide">Current problem or opportunity <small>(maximum 1,500 characters)</small><textarea required maxLength={1500} name="problemOrOpportunity" rows={6} /></label>
          <label className="wide">Primary responsibilities or expected deliverables <small>(maximum 2,000 characters)</small><textarea required maxLength={2000} name="responsibilities" rows={8} /></label>
          <label className="wide">Users, customers, or stakeholders served <small>(maximum 1,000 characters)</small><textarea required maxLength={1000} name="stakeholders" rows={5} /></label>
          <label className="wide">Desired measurable outcomes <small>(maximum 1,500 characters)</small><textarea required maxLength={1500} name="desiredOutcomes" rows={6} /></label>
          <label className="wide">Why is the need important now? <small>(maximum 1,000 characters)</small><textarea required maxLength={1000} name="whyNow" rows={5} /></label>
          <label className="wide">Existing team and capability gaps <small>(maximum 1,500 characters)</small><textarea required maxLength={1500} name="capabilityGaps" rows={6} /></label>
          <label className="wide">Reporting relationship or accountable leader <small>(maximum 1,000 characters)</small><textarea required maxLength={1000} name="accountableLeader" rows={5} /></label>
          <fieldset className="wide application-fieldset">
            <legend>Preferred talent-discovery approach <small>(select all that apply)</small></legend>
            {discoveryMethods.map((item) => <label className="check" key={item}><input type="checkbox" name="discoveryMethods" value={item} />{item}</label>)}
          </fieldset>
          <div className="wide actions">
            <button className="button primary" type="submit">Continue</button>
            <Link className="button" href="/find-talent/contact">Back to Organization and Contact</Link>
          </div>
          <p className="wide submission-note"><strong>Protected-information warning:</strong> Do not include confidential information, personal data, access credentials, trade secrets, protected health information, or proprietary technical details. Sensitive requirements can be discussed later under appropriate agreements and controls.</p>
        </EmailRoutingForm>
      </Section>
    </Layout>
  );
}

function TalentRequestQualificationsPage() {
  const expertiseAreas = [
    "Artificial intelligence and machine learning",
    "Generative AI, agents, and automation",
    "Software engineering",
    "Data engineering",
    "Data science and analytics",
    "Cloud, infrastructure, and DevOps",
    "Cybersecurity, privacy, and responsible AI",
    "Product management",
    "UX, service design, and research",
    "Healthcare and life sciences",
    "Workforce, recruiting, and HR technology",
    "Marketing, AdTech, and performance marketing",
    "Publishing, media, and affiliate commerce",
    "Business operations and strategy",
    "Academic or applied research",
    "Other",
  ];
  const evaluationMethods = [
    "Profile and résumé review",
    "Portfolio or work-sample review",
    "Structured interview",
    "Technical or domain interview",
    "Practical talent challenge",
    "Reference or credential verification",
    "StartupFair recommendation",
  ];
  return (
    <Layout>
      <section className="detail-hero">
        <span className="eyebrow">Talent Request · Step 4 of 7</span>
        <h1>Required Skills and Qualifications</h1>
        <p>Define the capabilities that matter most. Separate genuine requirements from preferences so qualified people are not screened out unnecessarily.</p>
      </section>
      <Section eyebrow="Selection criteria" title="What Should the Right Talent Bring?">
        <EmailRoutingForm category="talent" className="contact-form" onSubmit={(event) => { event.preventDefault(); window.location.assign("/find-talent/logistics"); }}>
          <fieldset className="wide application-fieldset">
            <legend>Relevant expertise areas <small>(select all that apply)</small></legend>
            {expertiseAreas.map((item) => <label className="check" key={item}><input type="checkbox" name="expertiseAreas" value={item} />{item}</label>)}
          </fieldset>
          <label className="wide">Required skills and capabilities <small>(maximum 1,500 characters)</small><textarea required maxLength={1500} name="requiredSkills" rows={6} /></label>
          <label className="wide">Preferred skills and capabilities <small>(maximum 1,500 characters)</small><textarea maxLength={1500} name="preferredSkills" rows={6} /></label>
          <label>Primary expertise required<input required name="primaryExpertise" /></label>
          <label>Minimum relevant experience<select required name="minimumExperience" defaultValue=""><option value="" disabled>Select one</option><option>No minimum — capability matters most</option><option>Less than 2 years</option><option>2–4 years</option><option>5–7 years</option><option>8–10 years</option><option>10+ years</option><option>Varies by team member</option></select></label>
          <label>Preferred seniority or career stage<select required name="seniority" defaultValue=""><option value="" disabled>Select one</option><option>Open to all qualified talent</option><option>Student or emerging talent</option><option>Early career</option><option>Mid-level</option><option>Senior</option><option>Lead or principal</option><option>Executive, advisor, or recognized expert</option><option>Mixed-level team</option></select></label>
          <label>Portfolio or work sample<select required name="workSample" defaultValue=""><option value="" disabled>Select one</option><option>Required</option><option>Preferred</option><option>Not required</option><option>Depends on the candidate</option></select></label>
          <label className="wide">Relevant industry or domain experience <small>(maximum 1,000 characters)</small><textarea maxLength={1000} name="domainExperience" rows={5} /></label>
          <label className="wide">Necessary certifications, licenses, or education <small>(maximum 1,000 characters)</small><textarea maxLength={1000} name="credentials" rows={5} placeholder="Include only credentials genuinely required to perform the work." /></label>
          <label className="wide">Languages or communication requirements <small>(maximum 750 characters)</small><textarea maxLength={750} name="languages" rows={4} /></label>
          <label className="wide">Team composition or complementary capabilities <small>(maximum 1,000 characters)</small><textarea maxLength={1000} name="teamComposition" rows={5} placeholder="Complete this only if requesting a project team or multiple people." /></label>
          <label className="wide">Employment or work-authorization requirements <small>(maximum 750 characters)</small><textarea maxLength={750} name="workAuthorization" rows={4} placeholder="Include only lawful requirements that are necessary for this engagement." /></label>
          <fieldset className="wide application-fieldset">
            <legend>Preferred evaluation methods <small>(select all that apply)</small></legend>
            {evaluationMethods.map((item) => <label className="check" key={item}><input type="checkbox" name="evaluationMethods" value={item} />{item}</label>)}
          </fieldset>
          <label className="wide">Additional screening or evaluation guidance <small>(maximum 1,000 characters)</small><textarea maxLength={1000} name="evaluationGuidance" rows={5} /></label>
          <label className="wide check"><input required type="checkbox" name="fairCriteriaConfirmation" />I confirm that these criteria are relevant to the work, lawful, and non-discriminatory.</label>
          <div className="wide actions">
            <button className="button primary" type="submit">Continue</button>
            <Link className="button" href="/find-talent/need">Back to Talent Need</Link>
          </div>
          <p className="wide submission-note">StartupFair may recommend broadening or clarifying criteria when doing so could improve the quality and fairness of talent discovery.</p>
        </EmailRoutingForm>
      </Section>
    </Layout>
  );
}

function TalentRequestLogisticsPage() {
  const engagementModels = [
    "Full-time employment",
    "Part-time employment",
    "Independent contract",
    "Consulting or advisory engagement",
    "Fixed-scope project",
    "Pilot or proof of concept",
    "Research collaboration",
    "Founder or venture-team opportunity",
    "Open to multiple models",
  ];
  const flexibilityAreas = [
    "Engagement model",
    "Location or work arrangement",
    "Start date",
    "Duration",
    "Weekly commitment",
    "Compensation or budget",
    "Experience or seniority",
    "Team size or composition",
  ];
  return (
    <Layout>
      <section className="detail-hero">
        <span className="eyebrow">Talent Request · Step 5 of 7</span>
        <h1>Engagement, Location, Timeline and Budget</h1>
        <p>Share the practical terms of the opportunity so StartupFair can identify talent whose availability and expectations are aligned.</p>
      </section>
      <Section eyebrow="Engagement details" title="How Will the Work Be Structured?">
        <EmailRoutingForm category="talent" className="contact-form" onSubmit={(event) => { event.preventDefault(); window.location.assign("/find-talent/privacy"); }}>
          <fieldset className="wide application-fieldset">
            <legend>Acceptable engagement models <small>(select all that apply)</small></legend>
            {engagementModels.map((item) => <label className="check" key={item}><input type="checkbox" name="engagementModels" value={item} />{item}</label>)}
          </fieldset>
          <label>Work arrangement<select required name="workArrangement" defaultValue=""><option value="" disabled>Select one</option><option>Fully remote</option><option>Hybrid</option><option>Onsite</option><option>Flexible or negotiable</option><option>Varies by role or team member</option></select></label>
          <label>Time-zone alignment<select required name="timezoneAlignment" defaultValue=""><option value="" disabled>Select one</option><option>No fixed time-zone requirement</option><option>Some overlapping hours required</option><option>Must work within a specified time zone</option><option>Varies by role or team member</option></select></label>
          <label className="wide">Work location and geographic limitations <small>(maximum 1,000 characters)</small><textarea maxLength={1000} name="locationDetails" rows={5} placeholder="List countries, regions, cities, onsite expectations, or lawful geographic restrictions." /></label>
          <label>Desired start date<input required type="date" name="desiredStartDate" /></label>
          <label>Hiring or selection urgency<select required name="urgency" defaultValue=""><option value="" disabled>Select one</option><option>Immediate</option><option>Within 2 weeks</option><option>Within 30 days</option><option>Within 60–90 days</option><option>Exploratory or flexible</option></select></label>
          <label>Expected engagement duration<select required name="duration" defaultValue=""><option value="" disabled>Select one</option><option>Permanent or ongoing</option><option>Less than 1 month</option><option>1–3 months</option><option>3–6 months</option><option>6–12 months</option><option>More than 12 months</option><option>To be determined</option></select></label>
          <label>Expected weekly commitment<select required name="weeklyCommitment" defaultValue=""><option value="" disabled>Select one</option><option>Full-time</option><option>30–39 hours</option><option>20–29 hours</option><option>10–19 hours</option><option>Fewer than 10 hours</option><option>Milestone or deliverable based</option><option>Varies by role or team member</option></select></label>
          <label>Compensation or budget currency<select required name="currency" defaultValue=""><option value="" disabled>Select one</option><option>USD</option><option>INR</option><option>EUR</option><option>GBP</option><option>CAD</option><option>AUD</option><option>Other</option><option>Not determined</option></select></label>
          <label>Compensation or budget basis<select required name="budgetBasis" defaultValue=""><option value="" disabled>Select one</option><option>Annual salary</option><option>Hourly rate</option><option>Daily rate</option><option>Monthly amount</option><option>Fixed project budget</option><option>Milestone based</option><option>Equity or incentive based</option><option>Combination</option><option>Prefer to discuss privately</option></select></label>
          <label>Minimum amount<input inputMode="decimal" name="minimumBudget" placeholder="Optional" /></label>
          <label>Maximum amount<input inputMode="decimal" name="maximumBudget" placeholder="Optional" /></label>
          <label className="wide">Benefits, incentives, equity, or other consideration <small>(maximum 1,000 characters)</small><textarea maxLength={1000} name="additionalConsideration" rows={5} /></label>
          <label className="wide">Travel or onsite attendance requirements <small>(maximum 750 characters)</small><textarea maxLength={750} name="travelRequirements" rows={4} /></label>
          <label className="wide">Expected interview, evaluation, and decision timeline <small>(maximum 1,000 characters)</small><textarea required maxLength={1000} name="decisionTimeline" rows={5} /></label>
          <fieldset className="wide application-fieldset">
            <legend>Areas where the organization can be flexible <small>(select all that apply)</small></legend>
            {flexibilityAreas.map((item) => <label className="check" key={item}><input type="checkbox" name="flexibilityAreas" value={item} />{item}</label>)}
          </fieldset>
          <label className="wide">Additional engagement details <small>(maximum 1,000 characters)</small><textarea maxLength={1000} name="additionalLogistics" rows={5} /></label>
          <div className="wide actions">
            <button className="button primary" type="submit">Continue</button>
            <Link className="button" href="/find-talent/qualifications">Back to Qualifications</Link>
          </div>
          <p className="wide submission-note">Compensation and engagement information is used to improve matching. StartupFair does not guarantee candidate availability, acceptance, hiring, or project completion.</p>
        </EmailRoutingForm>
      </Section>
    </Layout>
  );
}

function TalentRequestPrivacyPage() {
  const matchingMethods = [
    "Search opted-in StartupFair talent profiles",
    "Curated outreach to suitable talent",
    "Structured screening by StartupFair",
    "Practical talent challenge",
    "Introductions from approved ecosystem partners",
    "StartupFair recommendation",
  ];
  const shareableDetails = [
    "Role or project title",
    "Business objective and expected outcomes",
    "Required and preferred qualifications",
    "Engagement model and work arrangement",
    "Location and time-zone expectations",
    "Timeline and expected commitment",
    "Compensation range or project budget",
    "Organization name",
  ];
  return (
    <Layout>
      <section className="detail-hero">
        <span className="eyebrow">Talent Request · Step 6 of 7</span>
        <h1>Privacy, Matching and Communication Preferences</h1>
        <p>Control how the request is presented, how talent is identified, and when organization details may be disclosed.</p>
      </section>
      <Section eyebrow="Controlled discovery" title="How May StartupFair Use and Share This Request?">
        <EmailRoutingForm category="talent" className="contact-form" onSubmit={(event) => { event.preventDefault(); window.location.assign("/find-talent/review"); }}>
          <label>Request visibility<select required name="requestVisibility" defaultValue=""><option value="" disabled>Select one</option><option>Private — do not publish</option><option>Limited — share an anonymized summary with selected talent</option><option>Public summary — only after organization approval</option><option>Not sure — StartupFair should recommend</option></select></label>
          <label>Organization-name disclosure<select required name="organizationDisclosure" defaultValue=""><option value="" disabled>Select one</option><option>May be shared with selected talent immediately</option><option>Share only after candidate interest is confirmed</option><option>Share only after an NDA or confidentiality agreement</option><option>Do not disclose without separate approval</option></select></label>
          <fieldset className="wide application-fieldset">
            <legend>Approved matching methods <small>(select all that apply)</small></legend>
            {matchingMethods.map((item) => <label className="check" key={item}><input type="checkbox" name="matchingMethods" value={item} />{item}</label>)}
          </fieldset>
          <fieldset className="wide application-fieldset">
            <legend>Information StartupFair may share with selected talent <small>(select all that apply)</small></legend>
            {shareableDetails.map((item) => <label className="check" key={item}><input type="checkbox" name="shareableDetails" value={item} />{item}</label>)}
          </fieldset>
          <label>Initial candidate communication<select required name="initialCommunication" defaultValue=""><option value="" disabled>Select one</option><option>StartupFair should coordinate all initial communication</option><option>Selected candidates may contact the organization directly</option><option>Decide separately for each candidate</option></select></label>
          <label>Profile-delivery preference<select required name="profileDelivery" defaultValue=""><option value="" disabled>Select one</option><option>Send profiles as they are identified</option><option>Send a curated shortlist</option><option>Schedule a review meeting before sharing</option><option>Not sure — StartupFair should recommend</option></select></label>
          <label className="wide">Authorized profile recipients <small>(maximum 1,000 characters)</small><textarea required maxLength={1000} name="authorizedRecipients" rows={5} placeholder="List the roles or authorized people who may receive candidate information." /></label>
          <label>Confidentiality requirement<select required name="confidentialityRequirement" defaultValue=""><option value="" disabled>Select one</option><option>No NDA required for initial discussions</option><option>NDA required before organization disclosure</option><option>NDA required before detailed discussions</option><option>Existing organization agreement will be used</option><option>To be determined with StartupFair</option></select></label>
          <label>Candidate consent requirement<select required name="candidateConsent" defaultValue=""><option value="" disabled>Select one</option><option>Obtain consent before every profile introduction</option><option>Opted-in StartupFair visibility is sufficient</option><option>Depends on the information being shared</option><option>StartupFair should recommend</option></select></label>
          <label className="wide">Additional confidentiality, data-handling, or communication instructions <small>(maximum 1,500 characters)</small><textarea maxLength={1500} name="privacyInstructions" rows={6} /></label>
          <label className="wide check"><input required type="checkbox" name="candidatePrivacyConfirmation" />I understand that candidate information may be used only for evaluating the stated opportunity and must be handled securely and lawfully.</label>
          <label className="wide check"><input required type="checkbox" name="confidentialInformationConfirmation" />I confirm that this request does not contain access credentials, protected health information, unnecessary personal data, trade secrets, or other confidential material that should not be submitted through this form.</label>
          <label className="wide check"><input required type="checkbox" name="sharingAuthorization" />I authorize StartupFair to use the approved information and matching methods solely to support this talent request.</label>
          <div className="wide actions">
            <button className="button primary" type="submit">Continue to Review</button>
            <Link className="button" href="/find-talent/logistics">Back to Engagement Details</Link>
          </div>
          <p className="wide submission-note">StartupFair will not publicly disclose the organization or its request beyond the permissions selected here. Candidate profiles are shared according to candidate visibility choices and applicable consent requirements.</p>
        </EmailRoutingForm>
      </Section>
    </Layout>
  );
}

function TalentRequestReviewPage() {
  const sections = [
    ["1. Organization and Contact", "Authorized representative, organization profile, location, contact information, and communication preferences", "/find-talent/contact"],
    ["2. Role, Project, or Talent Need", "Request type, business objective, current problem, responsibilities, stakeholders, outcomes, capability gaps, and discovery approach", "/find-talent/need"],
    ["3. Required Skills and Qualifications", "Required and preferred capabilities, expertise, experience, credentials, work samples, team composition, and evaluation methods", "/find-talent/qualifications"],
    ["4. Engagement, Location, Timeline and Budget", "Engagement model, work arrangement, location, timing, commitment, compensation, travel, and flexibility", "/find-talent/logistics"],
    ["5. Privacy, Matching and Communication", "Request visibility, organization disclosure, matching methods, approved information sharing, candidate contact, and confidentiality", "/find-talent/privacy"],
  ];
  return (
    <Layout>
      <section className="detail-hero">
        <span className="eyebrow">Talent Request · Step 7 of 7</span>
        <h1>Review and Submit Your Talent Request</h1>
        <p>Review each section before submitting. You may return to any section to make corrections or clarify the request.</p>
      </section>
      <Section eyebrow="Final review" title="Talent Request Summary">
        <div className="cards cols-3">
          {sections.map(([title, copy, href]) => (
            <article className="card" key={title}>
              <h3>{title}</h3>
              <p>{copy}</p>
              <Link className="text-link" href={href}>Edit section</Link>
            </article>
          ))}
        </div>
      </Section>
      <Section eyebrow="Ready to submit" title="Required Confirmations" soft>
        <EmailRoutingForm category="talent" showEmailContact className="contact-form" onSubmit={(event) => { event.preventDefault(); window.location.assign("/find-talent/confirmation"); }}>
          <label className="wide check"><input required type="checkbox" name="accurate" />I have reviewed the talent request and confirm that the information is accurate and complete to the best of my knowledge.</label>
          <label className="wide check"><input required type="checkbox" name="authorized" />I am authorized to submit this request and discuss potential talent introductions, hiring, projects, or other engagements on behalf of the organization.</label>
          <label className="wide check"><input required type="checkbox" name="lawfulCriteria" />I confirm that the selection criteria, location requirements, work-authorization requirements, and evaluation methods are relevant, lawful, and non-discriminatory.</label>
          <label className="wide check"><input required type="checkbox" name="protectedInformation" />The request does not contain access credentials, protected health information, unnecessary personal data, trade secrets, or confidential or proprietary information that I am not authorized to share.</label>
          <label className="wide check"><input required type="checkbox" name="candidateUse" />I will use candidate information only to evaluate the stated opportunity and will handle it securely, confidentially, and in accordance with applicable law.</label>
          <label className="wide check"><input required type="checkbox" name="contact" />StartupFair may contact the organization for clarification, verification, matching, screening, and request-related discussions.</label>
          <label className="wide check"><input required type="checkbox" name="noGuarantee" />I understand that submission does not guarantee suitable candidates, introductions, candidate interest or availability, interviews, hiring, project completion, funding, partnerships, or any other outcome.</label>
          <label className="wide check"><input required type="checkbox" name="separateAgreements" />I understand that any search services, fees, hiring, employment, project scope, confidentiality, data use, intellectual property, or commercial terms require separate review and written agreements where applicable.</label>
          <label className="wide check"><input required type="checkbox" name="policies" />I have reviewed and agree to the applicable <Link className="text-link" href="/privacy">Privacy Policy</Link> and <Link className="text-link" href="/terms">Terms of Use</Link>.</label>
          <div className="wide actions">
            <button className="button primary" type="submit">Submit Talent Request</button>
            <Link className="button" href="/find-talent/privacy">Back to Privacy and Matching</Link>
          </div>
          <p className="wide submission-note">When production processing is connected, StartupFair should generate a request reference and send a confirmation email after submission.</p>
        </EmailRoutingForm>
      </Section>
    </Layout>
  );
}

function TalentRequestConfirmationPage() {
  return (
    <Layout>
      <section className="system-page">
        <div className="status">✓</div>
        <span className="eyebrow">Talent request received</span>
        <h1>Your Talent Request Has Been Received</h1>
        <p>Thank you for sharing your organization’s hiring, project, or talent need with StartupFair.</p>
        <div className="application-reference">
          <small>Talent request reference</small>
          <strong>SF-TREQ-2026-00001</strong>
          <p>The production platform will generate a unique reference number for future communication and status tracking.</p>
        </div>
      </section>
      <Section eyebrow="Request review" title="What Happens Next">
        <div className="process">
          <div><span>01</span><h3>Completeness Review</h3><p>StartupFair checks whether the request contains enough information for initial talent discovery.</p></div>
          <div><span>02</span><h3>Matching Assessment</h3><p>The need, qualifications, engagement terms, timing, budget, and approved discovery methods are reviewed.</p></div>
          <div><span>03</span><h3>Clarification and Alignment</h3><p>StartupFair may contact the authorized representative to refine criteria, discuss privacy controls, or confirm the search approach.</p></div>
          <div><span>04</span><h3>Discovery and Introductions</h3><p>If the request is suitable and terms are agreed, StartupFair may begin approved profile discovery, outreach, screening, or challenge design.</p></div>
        </div>
        <p className="prose submission-note"><strong>Important:</strong> Receiving the request does not mean StartupFair has accepted an engagement or guaranteed candidates, introductions, interviews, hiring, or project results. The organization will not be publicly identified without its approved permission.</p>
        <div className="actions">
          <Link className="button primary" href="/for-organizations">Review For Organizations</Link>
          <Link className="button" href="/contact">Contact StartupFair</Link>
          <Link className="button" href="/">Return Home</Link>
        </div>
        <p className="prose submission-note"><strong>Prototype notice:</strong> During this website-development stage, talent-request information is not transmitted or stored. Production submission, authentication, secure storage, notifications, administrative review, candidate consent, reference generation, and status tracking must be connected before accepting real requests.</p>
      </Section>
    </Layout>
  );
}

function OrganizationsPage() {
  return (
    <Layout>
      <Hero
        eyebrow="For organizations with problems worth solving"
        title="Solve Real Problems. Discover Proven Talent."
        copy="Launch AI and innovation challenges designed around your priorities. Evaluate talent through practical work and explore promising solutions."
        primary={["Discuss Your Challenge", "/launch-challenge"]}
        secondary={["Find Proven Talent", "/find-talent"]}
      />
      <Section
        eyebrow="Three models"
        title="Choose the outcome—not the template."
      >
        <Cards
          items={[
            {
              title: "Discover Talent",
              copy: "Evaluate people through practical work.",
              meta: "Talent Challenge",
            },
            {
              title: "Develop Solutions",
              copy: "Address a defined operational problem.",
              meta: "Innovation Challenge",
            },
            {
              title: "Explore Ventures",
              copy: "Identify teams and commercial potential.",
              meta: "Venture Challenge",
            },
          ]}
        />
      </Section>
      <Section
        eyebrow="Flexible participation"
        title="Public, private or hybrid."
        soft
      >
        <Cards
          items={[
            {
              title: "Public",
              copy: "Broad visibility and open applications.",
            },
            {
              title: "Private",
              copy: "Invite-only participation and controlled access.",
            },
            { title: "Hybrid", copy: "Public summary with protected details." },
          ]}
        />
      </Section>
      <Section eyebrow="How it works" title="From priority to next step.">
        <Cards
          cols={5}
          items={[
            { title: "Share", copy: "Describe the problem." },
            { title: "Design", copy: "Define the challenge." },
            { title: "Attract", copy: "Reach participants." },
            { title: "Select", copy: "Evaluate talent and solutions." },
            { title: "Move Forward", copy: "Create an outcome pathway." },
          ]}
        />
      </Section>
      <Section
        eyebrow="Two discovery paths"
        title="Launch a challenge—or find proven talent."
        soft
      >
        <div className="split">
          <div>
            <h3>Challenge-Based Discovery</h3>
            <p>See how people perform against a practical problem.</p>
          </div>
          <div>
            <h3>Talent Network Discovery</h3>
            <p>Search opted-in profiles or request curated introductions.</p>
          </div>
        </div>
      </Section>
      <Section eyebrow="Responsible innovation" title="Designed around trust.">
        <Cards
          cols={4}
          items={[
            { title: "Confidentiality", copy: "NDAs and controlled access." },
            { title: "Data", copy: "Approved or anonymized data." },
            { title: "IP", copy: "Terms disclosed before entry." },
            { title: "Privacy", copy: "Consent-based visibility." },
          ]}
        />
      </Section>
      <CTA
        title="Have a Real Problem Worth Solving?"
        copy="Discover capable people and evaluate practical solutions."
        buttons={[
          ["Discuss Your Challenge", "/launch-challenge"],
          ["Find Proven Talent", "/find-talent"],
        ]}
      />
    </Layout>
  );
}

function PartnershipInquiryIntroductionPage() {
  return (
    <Layout>
      <section className="detail-hero">
        <span className="eyebrow">Partnership Inquiry · Step 1 of 8</span>
        <h1>Partnership Opportunities</h1>
        <p>Explore ways to contribute expertise, technology, networks, resources, funding, or opportunities to StartupFair’s global talent and innovation ecosystem.</p>
        <div className="actions">
          <Link className="button primary" href="/partner-inquiry/contact">Start Partnership Inquiry</Link>
          <Link className="button" href="/partners">Back to Partners</Link>
        </div>
      </section>
      <Section eyebrow="Partnership models" title="Choose the Role That Best Fits Your Organization">
        <Cards
          items={[
            { title: "Industry and Corporate Partner", copy: "Contribute real problems, domain expertise, career opportunities, pilots, or commercial pathways." },
            { title: "Challenge Sponsor", copy: "Support a defined talent, innovation, or venture challenge through funding, resources, expertise, or visibility." },
            { title: "University and Education Partner", copy: "Connect students, researchers, faculty, learning programs, and campus innovation communities." },
            { title: "Technology and Data Partner", copy: "Provide approved tools, platforms, credits, datasets, technical guidance, or secure environments." },
            { title: "Mentor, Judge, or Expert Partner", copy: "Contribute relevant professional expertise, participant guidance, evaluation, or responsible-innovation review." },
            { title: "Investor, Accelerator, or Ecosystem Partner", copy: "Support consent-based venture discovery, founder development, networks, and appropriate follow-on opportunities." },
          ]}
        />
      </Section>
      <Section eyebrow="Who should inquire" title="Partnerships should create practical value." soft>
        <div className="split">
          <div>
            <h3>Good Fit</h3>
            <p>Organizations and experts with a clear contribution, relevant capabilities, responsible practices, and a genuine interest in creating opportunities for talent and innovators.</p>
          </div>
          <div>
            <h3>Not Automatic Access</h3>
            <p>Partner status does not provide unrestricted participant data, guaranteed judging influence, platform-wide exclusivity, investment access, or commercial outcomes.</p>
          </div>
        </div>
      </Section>
      <Section eyebrow="Eight-step inquiry" title="What the partnership inquiry will cover.">
        <div className="process">
          <div><span>01</span><h3>Opportunity</h3><p>Review partnership models.</p></div>
          <div><span>02</span><h3>Organization</h3><p>Provide contact and organization details.</p></div>
          <div><span>03</span><h3>Contribution</h3><p>Describe goals, interests, and resources.</p></div>
          <div><span>04</span><h3>Sponsorship</h3><p>Define any challenge-related interests.</p></div>
          <div><span>05</span><h3>Focus</h3><p>Share industries, geographies, and audiences.</p></div>
          <div><span>06</span><h3>Timeline</h3><p>Outline timing and potential budget.</p></div>
          <div><span>07</span><h3>Privacy</h3><p>Set disclosure and communication preferences.</p></div>
          <div><span>08</span><h3>Review</h3><p>Confirm and submit the inquiry.</p></div>
        </div>
      </Section>
      <Section eyebrow="Before you begin" title="Helpful information to prepare." soft>
        <Cards
          cols={4}
          items={[
            { title: "Your Objective", copy: "What the organization hopes to achieve through the partnership." },
            { title: "Your Contribution", copy: "Expertise, technology, funding, data, networks, opportunities, or other resources." },
            { title: "Your Focus", copy: "Relevant industries, challenge themes, regions, audiences, or talent communities." },
            { title: "Your Timing", copy: "Preferred start period, decision timeline, and any known budget range." },
          ]}
        />
      </Section>
      <CTA
        title="Ready to Explore a Partnership?"
        copy="Share your organization’s goals and proposed contribution for an initial fit review."
        buttons={[
          ["Start Partnership Inquiry", "/partner-inquiry/contact"],
          ["Review Partner Information", "/partners"],
        ]}
      />
      <p className="prose submission-note">Submitting an inquiry does not create an official partnership, sponsorship, endorsement, exclusivity, data-access right, financial commitment, or guaranteed outcome. Any partnership requires separate review, approval, and written agreement.</p>
    </Layout>
  );
}

function PartnershipInquiryContactPage() {
  const organizationTypes = [
    "Company or corporate organization",
    "Startup or growth-stage company",
    "University, college, or educational institution",
    "Research institution or laboratory",
    "Technology or data provider",
    "Investor, fund, or family office",
    "Accelerator, incubator, or venture studio",
    "Professional association or industry group",
    "Nonprofit or community organization",
    "Government or public-sector organization",
    "Consulting or professional-services firm",
    "Individual mentor, judge, or subject-matter expert",
    "Other",
  ];
  return (
    <Layout>
      <section className="detail-hero">
        <span className="eyebrow">Partnership Inquiry · Step 2 of 8</span>
        <h1>Organization and Contact Details</h1>
        <p>Tell us who is proposing the partnership and identify the authorized person StartupFair may contact about the inquiry.</p>
      </section>
      <Section eyebrow="About the organization" title="Who Is Interested in Partnering?">
        <EmailRoutingForm category="partners" className="contact-form" onSubmit={(event) => { event.preventDefault(); window.location.assign("/partner-inquiry/contribution"); }}>
          <label>Organization or professional name<input required name="organizationName" /></label>
          <label>Website <small>(optional)</small><input type="url" name="website" placeholder="https://" /></label>
          <label>Organization type<select required name="organizationType" defaultValue=""><option value="" disabled>Select one</option>{organizationTypes.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label>Organization size<select required name="organizationSize" defaultValue=""><option value="" disabled>Select one</option><option>Individual</option><option>2–10 people</option><option>11–50 people</option><option>51–200 people</option><option>201–1,000 people</option><option>1,001–5,000 people</option><option>More than 5,000 people</option><option>Not applicable or prefer not to say</option></select></label>
          <label className="wide">Industry or primary area of work <small>(maximum 750 characters)</small><textarea required maxLength={750} name="industry" rows={4} /></label>
          <label>Headquarters country<input required name="headquartersCountry" /></label>
          <label>Headquarters city and region<input required name="headquartersLocation" /></label>
          <label className="wide">Countries or regions where the organization operates <small>(maximum 1,000 characters)</small><textarea required maxLength={1000} name="operatingRegions" rows={5} /></label>
          <label className="wide">Brief organization description <small>(maximum 1,500 characters)</small><textarea required maxLength={1500} name="organizationDescription" rows={6} placeholder="Describe the organization’s work, primary audiences or customers, and relevant capabilities." /></label>
          <label>Authorized representative’s first name<input required name="firstName" /></label>
          <label>Authorized representative’s last name<input required name="lastName" /></label>
          <label>Job title or professional role<input required name="jobTitle" /></label>
          <label>Work email address<input required type="email" name="email" /></label>
          <label>Phone number<input required type="tel" name="phone" /></label>
          <label>Preferred communication method<select required name="communicationMethod" defaultValue=""><option value="" disabled>Select one</option><option>Email</option><option>Phone</option><option>Video meeting</option><option>Email first, then schedule a meeting</option></select></label>
          <label className="wide">Role in partnership decisions <small>(maximum 750 characters)</small><textarea required maxLength={750} name="decisionRole" rows={4} placeholder="Explain your authority or involvement in evaluating and approving the proposed partnership." /></label>
          <label>How did you hear about StartupFair?<select required name="referralSource" defaultValue=""><option value="" disabled>Select one</option><option>StartupFair website or previous event</option><option>Professional referral</option><option>LinkedIn or social media</option><option>University or educational institution</option><option>Industry event or community</option><option>Search engine</option><option>Existing StartupFair relationship</option><option>Other</option></select></label>
          <label>May StartupFair contact you about this inquiry?<select required name="contactPermission" defaultValue=""><option value="" disabled>Select one</option><option>Yes, by my preferred method</option><option>Yes, by email only</option><option>Yes, but please schedule in advance</option></select></label>
          <label className="wide check"><input required type="checkbox" name="authorityConfirmation" />I confirm that I am authorized to submit this inquiry or have permission to explore a potential partnership on behalf of the named organization.</label>
          <div className="wide actions">
            <button className="button primary" type="submit">Continue</button>
            <Link className="button" href="/partner-inquiry">Back to Partnership Opportunities</Link>
          </div>
          <p className="wide submission-note"><strong>Protected-information warning:</strong> Do not include confidential information, personal data about other people, access credentials, protected health information, trade secrets, or proprietary technical details. Sensitive matters can be discussed later under appropriate agreements and controls.</p>
        </EmailRoutingForm>
      </Section>
    </Layout>
  );
}

function PartnershipInquiryContributionPage() {
  const partnershipCategories = [
    "Industry or corporate partnership",
    "Challenge sponsorship",
    "University or education partnership",
    "Technology or data partnership",
    "Mentor, judge, or expert participation",
    "Investor, accelerator, or venture ecosystem partnership",
    "Community, association, or media partnership",
    "Research or public-interest collaboration",
    "Not sure — StartupFair should recommend",
  ];
  const contributions = [
    "Industry or subject-matter expertise",
    "Mentors, judges, or technical reviewers",
    "Technology, software, APIs, cloud, or AI credits",
    "Properly authorized data, research, or sample datasets",
    "Funding, prizes, stipends, or sponsorship budget",
    "Full-time, contract, project, or internship opportunities",
    "Pilot, procurement, licensing, or commercial pathways",
    "University, student, researcher, or faculty participation",
    "Publisher, media, marketing, or audience reach",
    "Community, professional, or industry networks",
    "Facilities, laboratories, event space, or secure environments",
    "Operational, legal, privacy, security, or responsible-AI support",
    "Other contribution",
  ];
  return (
    <Layout>
      <section className="detail-hero">
        <span className="eyebrow">Partnership Inquiry · Step 3 of 8</span>
        <h1>Partnership Goals and Contributions</h1>
        <p>Describe what the organization hopes to achieve and the practical value it may contribute to StartupFair participants, challenges, or ecosystem programs.</p>
      </section>
      <Section eyebrow="Mutual value" title="What Could This Partnership Accomplish?">
        <EmailRoutingForm category="partners" className="contact-form" onSubmit={(event) => { event.preventDefault(); window.location.assign("/partner-inquiry/sponsorship"); }}>
          <fieldset className="wide application-fieldset">
            <legend>Partnership categories of interest <small>(select all that apply)</small></legend>
            {partnershipCategories.map((item) => <label className="check" key={item}><input type="checkbox" name="partnershipCategories" value={item} />{item}</label>)}
          </fieldset>
          <label>Primary partnership objective<select required name="primaryObjective" defaultValue=""><option value="" disabled>Select one</option><option>Discover and engage skilled talent</option><option>Support practical AI and innovation</option><option>Launch or sponsor a challenge</option><option>Provide technology, data, or technical resources</option><option>Create education or research opportunities</option><option>Develop pilots, projects, or commercial opportunities</option><option>Support founders or venture discovery</option><option>Expand ecosystem, community, or audience engagement</option><option>Contribute professional expertise</option><option>Explore multiple objectives</option></select></label>
          <label>Preferred partnership structure<select required name="structurePreference" defaultValue=""><option value="" disabled>Select one</option><option>Defined program or campaign</option><option>Single challenge or event</option><option>Ongoing strategic partnership</option><option>Advisory, mentor, or evaluator role</option><option>Resource or technology partnership</option><option>Referral or ecosystem collaboration</option><option>Not sure — StartupFair should recommend</option></select></label>
          <label className="wide">Problem or opportunity the partnership should address <small>(maximum 1,500 characters)</small><textarea required maxLength={1500} name="problemOrOpportunity" rows={6} /></label>
          <label className="wide">Value the organization hopes to receive <small>(maximum 1,500 characters)</small><textarea required maxLength={1500} name="organizationValue" rows={6} placeholder="Describe the desired strategic, talent, innovation, research, visibility, commercial, or community value." /></label>
          <label className="wide">Value the partnership could create for participants or the StartupFair ecosystem <small>(maximum 1,500 characters)</small><textarea required maxLength={1500} name="participantValue" rows={6} /></label>
          <fieldset className="wide application-fieldset">
            <legend>Potential contributions <small>(select all that apply)</small></legend>
            {contributions.map((item) => <label className="check" key={item}><input type="checkbox" name="potentialContributions" value={item} />{item}</label>)}
          </fieldset>
          <label className="wide">Expertise, mentors, judges, or reviewers available <small>(maximum 1,500 characters)</small><textarea maxLength={1500} name="expertiseContribution" rows={6} /></label>
          <label className="wide">Technology, platforms, software, credits, or technical resources <small>(maximum 1,500 characters)</small><textarea maxLength={1500} name="technologyContribution" rows={6} /></label>
          <label className="wide">Authorized data, research, datasets, or knowledge resources <small>(maximum 1,500 characters)</small><textarea maxLength={1500} name="dataContribution" rows={6} placeholder="Describe resources at a high level only. Do not upload or disclose protected, personal, confidential, or proprietary data here." /></label>
          <label>Potential financial contribution<select required name="financialContribution" defaultValue=""><option value="" disabled>Select one</option><option>Funding or budget is available</option><option>Funding may be available after internal approval</option><option>In-kind contribution only</option><option>Combination of funding and in-kind support</option><option>No financial contribution planned</option><option>Not yet determined</option></select></label>
          <label>Potential opportunity pathway<select required name="opportunityPathway" defaultValue=""><option value="" disabled>Select one</option><option>Hiring or internships</option><option>Paid projects or consulting</option><option>Pilots or proof of concept</option><option>Procurement or licensing discussions</option><option>Research or education collaboration</option><option>Mentorship or professional development</option><option>Investment or accelerator consideration</option><option>Multiple pathways</option><option>No defined pathway yet</option></select></label>
          <label className="wide">Talent, hiring, pilot, commercial, research, or other opportunities available <small>(maximum 1,500 characters)</small><textarea maxLength={1500} name="opportunityDetails" rows={6} /></label>
          <label className="wide">Marketing, media, community, university, or industry reach <small>(maximum 1,000 characters)</small><textarea maxLength={1000} name="networkReach" rows={5} /></label>
          <label className="wide">How should partnership success be measured? <small>(maximum 1,500 characters)</small><textarea required maxLength={1500} name="successMeasures" rows={6} /></label>
          <label className="wide">Known limitations, exclusions, conflicts, or approval requirements <small>(maximum 1,500 characters)</small><textarea maxLength={1500} name="limitations" rows={6} /></label>
          <label>Should StartupFair recommend the most suitable structure?<select required name="recommendationRequest" defaultValue=""><option value="" disabled>Select one</option><option>Yes</option><option>No, the preferred structure is already defined</option><option>Discuss options before recommending</option></select></label>
          <div className="wide actions">
            <button className="button primary" type="submit">Continue</button>
            <Link className="button" href="/partner-inquiry/contact">Back to Organization and Contact</Link>
          </div>
          <p className="wide submission-note">Proposed contributions and outcomes are preliminary. StartupFair will assess relevance, feasibility, participant value, privacy, independence, conflicts, and responsible-use requirements before any partnership is approved.</p>
        </EmailRoutingForm>
      </Section>
    </Layout>
  );
}

function PartnershipInquirySponsorshipPage() {
  const challengeModels = ["Talent challenge", "Innovation challenge", "Venture challenge", "Combined or multi-stage challenge", "Not sure — StartupFair should recommend"];
  const participantGroups = [
    "Students or emerging talent",
    "Experienced professionals",
    "Independent consultants or experts",
    "Developers, engineers, or data professionals",
    "Researchers or academic teams",
    "Founders or startup teams",
    "Healthcare or domain professionals",
    "Cross-functional teams",
    "Open global participation",
    "Invite-only participants",
  ];
  const sponsorSupport = [
    "Funding or sponsorship budget",
    "Cash prizes or awards",
    "Participation stipends",
    "Technology, software, cloud, API, or AI credits",
    "Properly authorized data or research resources",
    "Mentors or subject-matter experts",
    "Judges or technical reviewers",
    "Pilot, project, hiring, or commercial opportunities",
    "Marketing, media, or community reach",
    "Facilities, event space, or secure environments",
    "No support confirmed yet",
  ];
  const outcomePathways = [
    "Full-time hiring consideration",
    "Contract or consulting opportunities",
    "Paid projects",
    "Pilot or proof of concept",
    "Procurement or licensing discussions",
    "Strategic partnership",
    "Mentorship or professional development",
    "Accelerator or venture discussion",
    "Research or education collaboration",
    "Public recognition for winners and finalists",
  ];
  return (
    <Layout>
      <section className="detail-hero">
        <span className="eyebrow">Partnership Inquiry · Step 4 of 8</span>
        <h1>Challenge Sponsorship Preferences</h1>
        <p>Complete this section if the organization may sponsor, support, or collaborate on a StartupFair challenge. Non-sponsors may select “Not applicable” and continue.</p>
      </section>
      <Section eyebrow="Potential sponsorship" title="How Might the Organization Support a Challenge?">
        <EmailRoutingForm category="partners" className="contact-form" onSubmit={(event) => { event.preventDefault(); window.location.assign("/partner-inquiry/focus"); }}>
          <label>Sponsorship interest<select required name="sponsorshipInterest" defaultValue=""><option value="" disabled>Select one</option><option>Yes — we want to sponsor a challenge</option><option>Possibly — we want to explore sponsorship</option><option>We want to support a challenge without being the primary sponsor</option><option>Not applicable — sponsorship is not part of this inquiry</option></select></label>
          <label>Preferred challenge structure<select required name="challengeStructure" defaultValue=""><option value="" disabled>Select one</option><option>Public</option><option>Private or invite-only</option><option>Hybrid — public summary with controlled details</option><option>Not sure — StartupFair should recommend</option><option>Not applicable</option></select></label>
          <fieldset className="wide application-fieldset">
            <legend>Challenge models of interest <small>(select all that apply)</small></legend>
            {challengeModels.map((item) => <label className="check" key={item}><input type="checkbox" name="challengeModels" value={item} />{item}</label>)}
          </fieldset>
          <label className="wide">Proposed problem, opportunity, or challenge theme <small>(optional · maximum 1,500 characters)</small><textarea maxLength={1500} name="challengeTheme" rows={6} /></label>
          <label className="wide">Desired deliverable or participant outcome <small>(optional · maximum 1,500 characters)</small><textarea maxLength={1500} name="desiredDeliverable" rows={6} placeholder="Examples: talent demonstration, working prototype, research concept, implementation plan, or venture proposal." /></label>
          <fieldset className="wide application-fieldset">
            <legend>Desired participant groups <small>(select all that apply)</small></legend>
            {participantGroups.map((item) => <label className="check" key={item}><input type="checkbox" name="participantGroups" value={item} />{item}</label>)}
          </fieldset>
          <label>Geographic participation scope<select required name="geographicScope" defaultValue=""><option value="" disabled>Select one</option><option>Global</option><option>Selected countries or regions</option><option>Single country</option><option>Local or campus-based</option><option>To be determined</option><option>Not applicable</option></select></label>
          <label>Preferred sponsor recognition<select required name="recognitionPreference" defaultValue=""><option value="" disabled>Select one</option><option>Public lead sponsor recognition</option><option>Public supporting-partner recognition</option><option>Limited or program-specific recognition</option><option>Private or undisclosed participation</option><option>To be discussed</option><option>Not applicable</option></select></label>
          <label className="wide">Branding, communications, or recognition preferences <small>(optional · maximum 1,000 characters)</small><textarea maxLength={1000} name="brandingPreferences" rows={5} /></label>
          <fieldset className="wide application-fieldset">
            <legend>Potential sponsor support <small>(select all that apply)</small></legend>
            {sponsorSupport.map((item) => <label className="check" key={item}><input type="checkbox" name="sponsorSupport" value={item} />{item}</label>)}
          </fieldset>
          <label>Potential sponsorship currency<select required name="sponsorshipCurrency" defaultValue=""><option value="" disabled>Select one</option><option>USD</option><option>INR</option><option>EUR</option><option>GBP</option><option>CAD</option><option>AUD</option><option>Other</option><option>Not determined</option><option>Not applicable</option></select></label>
          <label>Potential funding or budget range<input name="sponsorshipBudget" placeholder="Optional — amount or preliminary range" /></label>
          <label className="wide">Available mentors, judges, experts, technology, data, or in-kind resources <small>(optional · maximum 1,500 characters)</small><textarea maxLength={1500} name="sponsorResources" rows={6} /></label>
          <fieldset className="wide application-fieldset">
            <legend>Potential participant pathways <small>(select all that apply)</small></legend>
            {outcomePathways.map((item) => <label className="check" key={item}><input type="checkbox" name="outcomePathways" value={item} />{item}</label>)}
          </fieldset>
          <label>Sponsor involvement in evaluation<select required name="evaluationInvolvement" defaultValue=""><option value="" disabled>Select one</option><option>Provide qualified judges subject to StartupFair standards</option><option>Participate as one member of an independent panel</option><option>Provide technical input but not score submissions</option><option>Receive results after independent evaluation</option><option>StartupFair should recommend the appropriate role</option><option>Not applicable</option></select></label>
          <label>Should StartupFair design the challenge structure?<select required name="designSupport" defaultValue=""><option value="" disabled>Select one</option><option>Yes — recommend the complete structure</option><option>Yes — refine an existing concept</option><option>No — a detailed structure already exists</option><option>Discuss before deciding</option><option>Not applicable</option></select></label>
          <label className="wide">Additional sponsorship requirements or constraints <small>(optional · maximum 1,500 characters)</small><textarea maxLength={1500} name="sponsorshipConstraints" rows={6} /></label>
          <label className="wide check"><input required type="checkbox" name="independenceAcknowledgment" />I understand that sponsorship does not guarantee participant data access, preferred results, control over judging, endorsement, exclusivity, or any hiring, pilot, commercial, or venture outcome. Conflicts must be disclosed, and evaluation roles remain subject to StartupFair’s independence and integrity standards.</label>
          <div className="wide actions">
            <button className="button primary" type="submit">Continue</button>
            <Link className="button" href="/partner-inquiry/contribution">Back to Goals and Contributions</Link>
          </div>
          <p className="wide submission-note">All challenge funding, branding, rules, data use, intellectual property, evaluation, participant communications, and potential outcomes require separate review and written agreement before launch.</p>
        </EmailRoutingForm>
      </Section>
    </Layout>
  );
}

function PartnershipInquiryFocusPage() {
  const industries = [
    "Healthcare and life sciences",
    "Enterprise technology and software",
    "Artificial intelligence and automation",
    "Workforce, recruiting, and future of work",
    "Marketing, advertising, and AdTech",
    "Publishing, media, and digital commerce",
    "Education and workforce development",
    "Financial services and FinTech",
    "Cybersecurity, privacy, and responsible AI",
    "Government and public-interest innovation",
    "Climate, energy, and sustainability",
    "Manufacturing, supply chain, and logistics",
    "Retail and consumer services",
    "Research and emerging technology",
    "Industry-agnostic or cross-sector",
    "Other",
  ];
  const innovationAreas = [
    "Generative AI and intelligent agents",
    "AI-enabled healthcare and workforce technology",
    "Data science, analytics, and decision support",
    "Software products, platforms, and APIs",
    "Automation and operational improvement",
    "Responsible AI, privacy, security, and governance",
    "Digital marketing and performance intelligence",
    "Publishing, audience, and commerce innovation",
    "Talent assessment and skills-based hiring",
    "Research, commercialization, and venture discovery",
    "Social-impact or public-interest innovation",
    "Other",
  ];
  const communities = [
    "Students and recent graduates",
    "Emerging or early-career talent",
    "Experienced professionals",
    "Independent consultants and experts",
    "Developers, engineers, and technical builders",
    "Data, AI, and research professionals",
    "Healthcare and domain professionals",
    "Product, design, and business professionals",
    "Founders and startup teams",
    "University faculty and researchers",
    "Cross-functional teams",
    "Open to all suitably qualified participants",
  ];
  const networks = [
    "Universities, colleges, and student organizations",
    "Professional associations and industry groups",
    "Developer and technology communities",
    "Healthcare and life-sciences networks",
    "Founder, accelerator, and investor ecosystems",
    "Publisher, media, marketing, and creator networks",
    "Research institutions and laboratories",
    "Nonprofit and public-interest communities",
    "Corporate innovation and workforce networks",
    "Other",
  ];
  return (
    <Layout>
      <section className="detail-hero">
        <span className="eyebrow">Partnership Inquiry · Step 5 of 8</span>
        <h1>Industry, Geography and Audience Focus</h1>
        <p>Identify the sectors, innovation themes, regions, and participant communities most relevant to the proposed partnership.</p>
      </section>
      <Section eyebrow="Partnership focus" title="Where Should the Partnership Create Value?">
        <EmailRoutingForm category="partners" className="contact-form" onSubmit={(event) => { event.preventDefault(); window.location.assign("/partner-inquiry/timeline"); }}>
          <fieldset className="wide application-fieldset">
            <legend>Industries and sectors of interest <small>(select all that apply)</small></legend>
            {industries.map((item) => <label className="check" key={item}><input type="checkbox" name="industries" value={item} />{item}</label>)}
          </fieldset>
          <fieldset className="wide application-fieldset">
            <legend>AI and innovation focus areas <small>(select all that apply)</small></legend>
            {innovationAreas.map((item) => <label className="check" key={item}><input type="checkbox" name="innovationAreas" value={item} />{item}</label>)}
          </fieldset>
          <label>Geographic focus<select required name="geographicFocus" defaultValue=""><option value="" disabled>Select one</option><option>Global</option><option>Multi-region</option><option>Selected countries</option><option>Single country</option><option>State, province, or regional</option><option>Local, city, or campus based</option><option>No geographic preference</option><option>To be determined</option></select></label>
          <label>Participation format<select required name="participationFormat" defaultValue=""><option value="" disabled>Select one</option><option>Online and globally accessible</option><option>Online with regional eligibility</option><option>Hybrid online and in person</option><option>Primarily in person</option><option>Private or invite-only community</option><option>Depends on the program</option></select></label>
          <label className="wide">Priority countries, regions, cities, campuses, or markets <small>(maximum 1,500 characters)</small><textarea maxLength={1500} name="priorityGeographies" rows={6} /></label>
          <label className="wide">Reasons for the geographic focus <small>(maximum 1,000 characters)</small><textarea maxLength={1000} name="geographicRationale" rows={5} placeholder="Examples: customer presence, hiring needs, regulatory scope, university relationships, language, community impact, or pilot location." /></label>
          <fieldset className="wide application-fieldset">
            <legend>Desired talent and participant communities <small>(select all that apply)</small></legend>
            {communities.map((item) => <label className="check" key={item}><input type="checkbox" name="participantCommunities" value={item} />{item}</label>)}
          </fieldset>
          <label className="wide">Desired participant experience, disciplines, or professional backgrounds <small>(maximum 1,500 characters)</small><textarea required maxLength={1500} name="participantBackgrounds" rows={6} /></label>
          <label className="wide">Languages and communication requirements <small>(maximum 1,000 characters)</small><textarea maxLength={1000} name="languageRequirements" rows={5} /></label>
          <label className="wide">Accessibility and participation-support needs <small>(maximum 1,000 characters)</small><textarea maxLength={1000} name="accessibilityNeeds" rows={5} placeholder="Describe captioning, accessible materials, scheduling, assistive-technology, language, or other participation needs." /></label>
          <label className="wide">Priority or underserved communities the partnership hopes to reach <small>(optional · maximum 1,000 characters)</small><textarea maxLength={1000} name="priorityCommunities" rows={5} placeholder="Describe mission-aligned outreach goals. Final eligibility and selection criteria must remain lawful, relevant, fair, and non-discriminatory." /></label>
          <fieldset className="wide application-fieldset">
            <legend>Relevant networks and outreach channels <small>(select all that apply)</small></legend>
            {networks.map((item) => <label className="check" key={item}><input type="checkbox" name="networks" value={item} />{item}</label>)}
          </fieldset>
          <label className="wide">Existing university, industry, professional, or community relationships <small>(maximum 1,500 characters)</small><textarea maxLength={1500} name="existingRelationships" rows={6} /></label>
          <label className="wide">Geographic, regulatory, licensing, data-residency, or audience limitations <small>(maximum 1,500 characters)</small><textarea maxLength={1500} name="limitations" rows={6} /></label>
          <label className="wide">Topics, uses, participant groups, or outreach channels that should be excluded <small>(maximum 1,000 characters)</small><textarea maxLength={1000} name="exclusions" rows={5} /></label>
          <label>Should StartupFair recommend an audience strategy?<select required name="audienceRecommendation" defaultValue=""><option value="" disabled>Select one</option><option>Yes — recommend the audience and outreach plan</option><option>Yes — refine our proposed audience</option><option>No — the audience strategy is already defined</option><option>Discuss before deciding</option></select></label>
          <label className="wide check"><input required type="checkbox" name="fairAudienceConfirmation" />I confirm that geographic, language, experience, and participant criteria will be based on legitimate program needs and applied lawfully, fairly, accessibly, and without prohibited discrimination.</label>
          <div className="wide actions">
            <button className="button primary" type="submit">Continue</button>
            <Link className="button" href="/partner-inquiry/sponsorship">Back to Sponsorship Preferences</Link>
          </div>
          <p className="wide submission-note">StartupFair may recommend changes to improve relevance, accessibility, geographic feasibility, participant reach, or fairness before a partnership or challenge is activated.</p>
        </EmailRoutingForm>
      </Section>
    </Layout>
  );
}

function PartnershipInquiryTimelinePage() {
  const internalSupport = [
    "Executive or senior-leadership sponsor",
    "Program or partnership manager",
    "Subject-matter experts",
    "Technology or engineering support",
    "Data or research support",
    "Security, privacy, or responsible-AI support",
    "Legal or compliance support",
    "Procurement or vendor-management support",
    "Finance or payment-processing support",
    "Marketing, communications, or media support",
    "Mentors, judges, or evaluators",
    "Hiring, talent, or workforce team",
    "No internal resources confirmed yet",
  ];
  const approvals = [
    "Executive or leadership approval",
    "Budget or finance approval",
    "Legal or contracting review",
    "Procurement or vendor onboarding",
    "Information-security review",
    "Privacy or data-protection review",
    "Compliance or regulatory review",
    "Brand, marketing, or communications approval",
    "University, research, or ethics approval",
    "Board, investment committee, or fund approval",
    "No additional approval anticipated",
    "Approval requirements are not yet known",
  ];
  const flexibleAreas = [
    "Partnership scope",
    "Start date",
    "Planning period",
    "Program duration",
    "Budget or funding structure",
    "Cash versus in-kind contribution",
    "Geographic or audience focus",
    "Challenge or program model",
    "Branding and recognition",
    "Internal roles and responsibilities",
  ];
  return (
    <Layout>
      <section className="detail-hero">
        <span className="eyebrow">Partnership Inquiry · Step 6 of 8</span>
        <h1>Timeline, Budget and Internal Readiness</h1>
        <p>Share the organization’s preliminary schedule, resource commitment, approval process, and ability to support a responsible partnership.</p>
      </section>
      <Section eyebrow="Partnership readiness" title="When and How Could the Organization Move Forward?">
        <EmailRoutingForm category="partners" className="contact-form" onSubmit={(event) => { event.preventDefault(); window.location.assign("/partner-inquiry/privacy"); }}>
          <label>Preferred partnership start date<input required type="date" name="preferredStartDate" /></label>
          <label>Start-date flexibility<select required name="startDateFlexibility" defaultValue=""><option value="" disabled>Select one</option><option>Fixed or deadline-driven</option><option>Flexible within 30 days</option><option>Flexible within 90 days</option><option>Flexible within 6 months</option><option>Exploratory — no date established</option></select></label>
          <label>Preferred relationship duration<select required name="relationshipDuration" defaultValue=""><option value="" disabled>Select one</option><option>One-time activity or event</option><option>Less than 3 months</option><option>3–6 months</option><option>6–12 months</option><option>More than 12 months</option><option>Ongoing strategic relationship</option><option>To be determined</option></select></label>
          <label>Current planning stage<select required name="planningStage" defaultValue=""><option value="" disabled>Select one</option><option>Initial exploration</option><option>Internal concept under discussion</option><option>Leadership interest confirmed</option><option>Budget planning underway</option><option>Internally approved and ready to scope</option><option>Time-sensitive opportunity</option></select></label>
          <label className="wide">Desired planning, approval, and launch timeline <small>(maximum 1,500 characters)</small><textarea required maxLength={1500} name="planningTimeline" rows={6} /></label>
          <label className="wide">Key dates, milestones, events, or external deadlines <small>(maximum 1,000 characters)</small><textarea maxLength={1000} name="keyMilestones" rows={5} /></label>
          <label>Budget currency<select required name="budgetCurrency" defaultValue=""><option value="" disabled>Select one</option><option>USD</option><option>INR</option><option>EUR</option><option>GBP</option><option>CAD</option><option>AUD</option><option>Other</option><option>Not determined</option></select></label>
          <label>Preliminary budget range<input name="budgetRange" placeholder="Optional — amount or estimated range" /></label>
          <label>Contribution structure<select required name="contributionStructure" defaultValue=""><option value="" disabled>Select one</option><option>Cash funding</option><option>In-kind resources</option><option>Combination of cash and in-kind support</option><option>Staff time or professional expertise</option><option>No financial contribution planned</option><option>Not yet determined</option></select></label>
          <label>Funding status<select required name="fundingStatus" defaultValue=""><option value="" disabled>Select one</option><option>Approved and available</option><option>Allocated but pending final approval</option><option>Budget request will be submitted</option><option>Dependent on scope and proposal</option><option>Seeking co-sponsors or external funding</option><option>No funding required</option><option>Not yet determined</option></select></label>
          <label className="wide">Budget assumptions and in-kind contribution details <small>(maximum 1,500 characters)</small><textarea maxLength={1500} name="budgetDetails" rows={6} /></label>
          <label className="wide">Accountable executive, sponsor, or partnership leader <small>(maximum 750 characters)</small><textarea required maxLength={750} name="accountableLeader" rows={4} placeholder="Provide the person’s role and level of involvement. Do not include unnecessary personal information." /></label>
          <fieldset className="wide application-fieldset">
            <legend>Internal support that may be available <small>(select all that apply)</small></legend>
            {internalSupport.map((item) => <label className="check" key={item}><input type="checkbox" name="internalSupport" value={item} />{item}</label>)}
          </fieldset>
          <fieldset className="wide application-fieldset">
            <legend>Required internal reviews or approvals <small>(select all that apply)</small></legend>
            {approvals.map((item) => <label className="check" key={item}><input type="checkbox" name="requiredApprovals" value={item} />{item}</label>)}
          </fieldset>
          <label className="wide">Decision-makers and approval process <small>(maximum 1,500 characters)</small><textarea required maxLength={1500} name="approvalProcess" rows={6} /></label>
          <label>Contracting readiness<select required name="contractingReadiness" defaultValue=""><option value="" disabled>Select one</option><option>Ready to review a scope and agreement</option><option>Vendor onboarding is required first</option><option>Legal or procurement review is required</option><option>Existing agreement or approved form may be required</option><option>Not ready for contracting yet</option><option>Not sure</option></select></label>
          <label>Payment readiness<select required name="paymentReadiness" defaultValue=""><option value="" disabled>Select one</option><option>Payment process and budget owner are confirmed</option><option>Purchase order or procurement setup is required</option><option>Payment depends on final approval</option><option>In-kind partnership with no payment anticipated</option><option>Not yet determined</option></select></label>
          <label className="wide">Potential risks, dependencies, or organizational constraints <small>(maximum 1,500 characters)</small><textarea maxLength={1500} name="risksAndDependencies" rows={6} /></label>
          <fieldset className="wide application-fieldset">
            <legend>Areas where the organization can be flexible <small>(select all that apply)</small></legend>
            {flexibleAreas.map((item) => <label className="check" key={item}><input type="checkbox" name="flexibleAreas" value={item} />{item}</label>)}
          </fieldset>
          <label className="wide">Additional readiness information <small>(maximum 1,000 characters)</small><textarea maxLength={1000} name="additionalReadiness" rows={5} /></label>
          <div className="wide actions">
            <button className="button primary" type="submit">Continue</button>
            <Link className="button" href="/partner-inquiry/focus">Back to Industry and Audience Focus</Link>
          </div>
          <p className="wide submission-note">Dates, budgets, resources, and approvals entered here are preliminary and do not create a financial or contractual commitment. Final responsibilities require documented approval and written agreement.</p>
        </EmailRoutingForm>
      </Section>
    </Layout>
  );
}

function PartnershipInquiryPrivacyPage() {
  const shareableInformation = [
    "Organization name",
    "Organization description and website",
    "Partnership category and objectives",
    "Industry and geographic focus",
    "Proposed participant value or opportunities",
    "Approved technology, data, expertise, or resources",
    "Challenge theme or program summary",
    "Preliminary timeline",
    "Sponsor or partner recognition level",
    "No information without separate approval",
  ];
  const authorizedUses = [
    "Evaluate partnership fit",
    "Prepare a private partnership recommendation",
    "Discuss the inquiry with authorized StartupFair reviewers",
    "Contact selected ecosystem partners with prior approval",
    "Contact potential participants using approved information",
    "Prepare a public partnership or challenge announcement after approval",
    "Develop a proposed scope, timeline, and commercial structure",
  ];
  return (
    <Layout>
      <section className="detail-hero">
        <span className="eyebrow">Partnership Inquiry · Step 7 of 8</span>
        <h1>Privacy, Disclosure and Communication Preferences</h1>
        <p>Set clear boundaries for how StartupFair may review, discuss, and disclose the partnership inquiry and any future partner recognition.</p>
      </section>
      <Section eyebrow="Controlled collaboration" title="What May StartupFair Use and Share?">
        <EmailRoutingForm category="partners" className="contact-form" onSubmit={(event) => { event.preventDefault(); window.location.assign("/partner-inquiry/review"); }}>
          <label>Inquiry visibility<select required name="inquiryVisibility" defaultValue=""><option value="" disabled>Select one</option><option>Private — do not disclose outside authorized StartupFair personnel</option><option>Limited — discuss an anonymized summary with selected parties</option><option>Controlled — share approved information with selected participants or partners</option><option>Public summary — only after separate organization approval</option><option>Not sure — StartupFair should recommend</option></select></label>
          <label>Organization-name disclosure<select required name="organizationDisclosure" defaultValue=""><option value="" disabled>Select one</option><option>May be shared during initial partnership discussions</option><option>Share only with selected parties after organization approval</option><option>Share only after an NDA or confidentiality agreement</option><option>Do not disclose without separate written approval</option></select></label>
          <label>Public partner or sponsor recognition<select required name="publicRecognition" defaultValue=""><option value="" disabled>Select one</option><option>Permitted after the partnership is formally approved</option><option>Permitted only for approved programs or challenges</option><option>Permitted only after reviewing each announcement</option><option>Private partnership — no public recognition</option><option>To be determined in a separate agreement</option></select></label>
          <label>Logo and trademark use<select required name="brandPermission" defaultValue=""><option value="" disabled>Select one</option><option>May be considered after formal partnership approval and brand review</option><option>Requires written approval for every use</option><option>Do not use the organization’s logo or trademarks</option><option>To be determined in a separate agreement</option></select></label>
          <fieldset className="wide application-fieldset">
            <legend>Information StartupFair may share if consistent with the visibility choice <small>(select all that apply)</small></legend>
            {shareableInformation.map((item) => <label className="check" key={item}><input type="checkbox" name="shareableInformation" value={item} />{item}</label>)}
          </fieldset>
          <fieldset className="wide application-fieldset">
            <legend>Authorized uses of inquiry information <small>(select all that apply)</small></legend>
            {authorizedUses.map((item) => <label className="check" key={item}><input type="checkbox" name="authorizedUses" value={item} />{item}</label>)}
          </fieldset>
          <label className="wide">Authorized organization recipients and stakeholders <small>(maximum 1,000 characters)</small><textarea required maxLength={1000} name="authorizedRecipients" rows={5} placeholder="List the roles or authorized people who may receive partnership materials, participant information, or proposals." /></label>
          <label>Initial communication process<select required name="communicationProcess" defaultValue=""><option value="" disabled>Select one</option><option>Email the authorized representative first</option><option>Schedule a video meeting</option><option>Include specified internal stakeholders</option><option>Submit materials through the organization’s procurement or review process</option><option>Other process described below</option></select></label>
          <label>Meeting and update preference<select required name="meetingPreference" defaultValue=""><option value="" disabled>Select one</option><option>As-needed meetings and written updates</option><option>Regular scheduled meetings</option><option>Written updates only until scope is approved</option><option>To be agreed during discovery</option></select></label>
          <label>Confidentiality requirement<select required name="confidentialityRequirement" defaultValue=""><option value="" disabled>Select one</option><option>No NDA required for initial high-level discussions</option><option>NDA required before organization disclosure</option><option>NDA required before detailed scope or resource discussions</option><option>Existing organization agreement must be used</option><option>StartupFair agreement may be reviewed</option><option>To be determined</option></select></label>
          <label className="wide">Additional confidentiality, branding, communications, or approval instructions <small>(maximum 1,500 characters)</small><textarea maxLength={1500} name="additionalInstructions" rows={6} /></label>
          <label className="wide">Data, participant, candidate, or founder-information restrictions <small>(maximum 1,500 characters)</small><textarea maxLength={1500} name="informationRestrictions" rows={6} placeholder="Describe legitimate privacy, security, legal, regulatory, or internal-handling requirements without requesting unrestricted access." /></label>
          <label>May StartupFair contact you about this inquiry?<select required name="partnershipContactPermission" defaultValue=""><option value="" disabled>Select one</option><option>Yes, using the selected communication preferences</option><option>Yes, by email only</option><option>Yes, but include the authorized recipients</option></select></label>
          <label className="wide check"><input required type="checkbox" name="participantDataAcknowledgment" />I understand that partnership or sponsor status does not provide unrestricted access to participant, candidate, founder, evaluator, application, submission, or platform data. Any sharing must follow consent, visibility settings, applicable law, and written agreements.</label>
          <label className="wide check"><input required type="checkbox" name="brandAcknowledgment" />I understand that names, logos, trademarks, endorsements, quotations, announcements, and public recognition require the applicable organization and StartupFair approvals before use.</label>
          <label className="wide check"><input required type="checkbox" name="protectedInformationConfirmation" />I confirm that this inquiry does not contain access credentials, protected health information, unnecessary personal data, trade secrets, or confidential or proprietary material that should not be submitted through this form.</label>
          <div className="wide actions">
            <button className="button primary" type="submit">Continue to Review</button>
            <Link className="button" href="/partner-inquiry/timeline">Back to Timeline and Readiness</Link>
          </div>
          <p className="wide submission-note">No organization will be publicly presented as an official StartupFair partner or sponsor based solely on this inquiry. Public recognition requires a formally approved relationship and applicable brand permissions.</p>
        </EmailRoutingForm>
      </Section>
    </Layout>
  );
}

function PartnershipInquiryReviewPage() {
  const sections = [
    ["1. Organization and Contact", "Organization profile, operating regions, authorized representative, decision role, and communication preferences", "/partner-inquiry/contact"],
    ["2. Partnership Goals and Contributions", "Objectives, partnership categories, participant value, expertise, technology, data, funding, opportunities, networks, and success measures", "/partner-inquiry/contribution"],
    ["3. Challenge Sponsorship Preferences", "Sponsorship interest, challenge model, participants, geography, recognition, resources, outcomes, evaluation role, and design support", "/partner-inquiry/sponsorship"],
    ["4. Industry, Geography and Audience Focus", "Industries, innovation themes, regions, participant communities, languages, accessibility, networks, limitations, and outreach strategy", "/partner-inquiry/focus"],
    ["5. Timeline, Budget and Internal Readiness", "Timing, duration, budget, funding status, internal resources, approvals, contracting, payment readiness, risks, and flexibility", "/partner-inquiry/timeline"],
    ["6. Privacy, Disclosure and Communication", "Inquiry visibility, organization disclosure, public recognition, branding, approved uses, recipients, confidentiality, and information restrictions", "/partner-inquiry/privacy"],
  ];
  return (
    <Layout>
      <section className="detail-hero">
        <span className="eyebrow">Partnership Inquiry · Step 8 of 8</span>
        <h1>Review and Submit Your Partnership Inquiry</h1>
        <p>Review each section before submitting. You may return to any section to make corrections or clarify the proposed partnership.</p>
      </section>
      <Section eyebrow="Final review" title="Partnership Inquiry Summary">
        <div className="cards cols-3">
          {sections.map(([title, copy, href]) => (
            <article className="card" key={title}>
              <h3>{title}</h3>
              <p>{copy}</p>
              <Link className="text-link" href={href}>Edit section</Link>
            </article>
          ))}
        </div>
      </Section>
      <Section eyebrow="Ready to submit" title="Required Confirmations" soft>
        <EmailRoutingForm category="partners" showEmailContact className="contact-form" onSubmit={(event) => { event.preventDefault(); window.location.assign("/partner-inquiry/confirmation"); }}>
          <label className="wide check"><input required type="checkbox" name="accurate" />I have reviewed the inquiry and confirm that the information is accurate and complete to the best of my knowledge.</label>
          <label className="wide check"><input required type="checkbox" name="authorized" />I am authorized to submit this inquiry or have permission to explore a potential partnership on behalf of the named organization.</label>
          <label className="wide check"><input required type="checkbox" name="preliminary" />I understand that proposed contributions, funding, resources, schedules, approvals, opportunities, recognition, and outcomes are preliminary and do not create a binding commitment.</label>
          <label className="wide check"><input required type="checkbox" name="protectedInformation" />The inquiry does not contain access credentials, protected health information, unnecessary personal data, trade secrets, or confidential or proprietary information that I am not authorized to share.</label>
          <label className="wide check"><input required type="checkbox" name="participantPrivacy" />I understand that participant, candidate, founder, evaluator, application, and submission information may be used only for approved purposes and must be handled securely, confidentially, and lawfully.</label>
          <label className="wide check"><input required type="checkbox" name="independence" />I understand that a partner or sponsor may not control results, receive preferred treatment, interfere with independent evaluation, or obtain undisclosed access. Relevant conflicts of interest must be disclosed.</label>
          <label className="wide check"><input required type="checkbox" name="brandPermissions" />I understand that official partner status, announcements, endorsements, logos, trademarks, quotations, and public recognition require the applicable approvals and written permissions.</label>
          <label className="wide check"><input required type="checkbox" name="contact" />StartupFair may contact the authorized representative for clarification, verification, fit assessment, partnership design, and proposal-related discussions.</label>
          <label className="wide check"><input required type="checkbox" name="noGuarantee" />I understand that submission does not guarantee partnership approval, sponsorship, publication, participant interest, talent access, challenge launch, hiring, pilots, commercial opportunities, funding, investment, or any other outcome.</label>
          <label className="wide check"><input required type="checkbox" name="separateAgreements" />I understand that final scope, responsibilities, fees, funding, branding, data use, confidentiality, security, intellectual property, evaluation, and participant outcomes require separate review, approval, and written agreements.</label>
          <label className="wide check"><input required type="checkbox" name="policies" />I have reviewed and agree to the applicable <Link className="text-link" href="/privacy">Privacy Policy</Link> and <Link className="text-link" href="/terms">Terms of Use</Link>.</label>
          <div className="wide actions">
            <button className="button primary" type="submit">Submit Partnership Inquiry</button>
            <Link className="button" href="/partner-inquiry/privacy">Back to Privacy and Disclosure</Link>
          </div>
          <p className="wide submission-note">When production processing is connected, StartupFair should generate an inquiry reference and send a confirmation email after submission.</p>
        </EmailRoutingForm>
      </Section>
    </Layout>
  );
}

function PartnershipInquiryConfirmationPage() {
  return (
    <Layout>
      <section className="system-page">
        <div className="status">✓</div>
        <span className="eyebrow">Partnership inquiry received</span>
        <h1>Your Partnership Inquiry Has Been Received</h1>
        <p>Thank you for sharing your organization’s goals and proposed contribution with StartupFair.</p>
        <div className="application-reference">
          <small>Partnership inquiry reference</small>
          <strong>SF-PART-2026-00001</strong>
          <p>The production platform will generate a unique reference number for future communication and status tracking.</p>
        </div>
      </section>
      <Section eyebrow="Partnership review" title="What Happens Next">
        <div className="process">
          <div><span>01</span><h3>Completeness Review</h3><p>StartupFair checks whether the inquiry contains enough information for initial partnership evaluation.</p></div>
          <div><span>02</span><h3>Mutual-Fit Assessment</h3><p>The objectives, participant value, contributions, focus, resources, timing, risks, privacy, and independence requirements are reviewed.</p></div>
          <div><span>03</span><h3>Discovery Discussion</h3><p>StartupFair may contact the authorized representative to clarify goals, confirm readiness, and explore an appropriate structure.</p></div>
          <div><span>04</span><h3>Scope and Agreement</h3><p>If there is mutual interest, the parties may develop a separate scope covering roles, resources, fees, branding, data, security, IP, evaluation, and outcomes.</p></div>
        </div>
        <p className="prose submission-note"><strong>Important:</strong> Receiving the inquiry does not mean the organization has been approved, announced, endorsed, or activated as a StartupFair partner or sponsor.</p>
        <div className="actions">
          <Link className="button primary" href="/partners">Review Partner Information</Link>
          <Link className="button" href="/contact">Contact StartupFair</Link>
          <Link className="button" href="/">Return Home</Link>
        </div>
        <p className="prose submission-note"><strong>Prototype notice:</strong> During this website-development stage, partnership-inquiry information is not transmitted or stored. Production submission, authentication, secure storage, notifications, administrative review, consent controls, reference generation, and status tracking must be connected before accepting real inquiries.</p>
      </Section>
    </Layout>
  );
}

function PartnersPage() {
  return (
    <Layout>
      <Hero
        eyebrow="Partner with purpose"
        title="Build the Future of Talent and Innovation Together."
        copy="Bring expertise, networks, technology, data, resources or funding to strengthen challenge programs and meaningful outcomes."
        primary={["Become a Partner", "/partner-inquiry"]}
        secondary={["Sponsor a Challenge", "/partner-inquiry"]}
      />
      <Section
        eyebrow="Why partner"
        title="Stronger programs through meaningful collaboration."
      >
        <Cards
          cols={4}
          items={[
            { title: "Discover", copy: "Connect with talent and founders." },
            { title: "Contribute", copy: "Support applied innovation." },
            { title: "Collaborate", copy: "Work across the ecosystem." },
            { title: "Measure", copy: "Receive impact reporting." },
          ]}
        />
      </Section>
      <Section
        eyebrow="Partnership categories"
        title="Six ways to participate."
        soft
      >
        <Cards
          items={[
            {
              title: "Industry & Corporate",
              copy: "Problems, expertise, careers and pilots.",
            },
            {
              title: "Universities & Education",
              copy: "Students, researchers and learning.",
            },
            {
              title: "Technology & Data",
              copy: "Tools, datasets and resources.",
            },
            {
              title: "Mentors, Judges & Experts",
              copy: "Guidance and evaluation.",
            },
            {
              title: "Investors & Accelerators",
              copy: "Consent-based venture access.",
            },
            {
              title: "Community & Ecosystem",
              copy: "Networks and communities.",
            },
          ]}
        />
      </Section>
      <Section
        eyebrow="Partnership process"
        title="From inquiry to activation."
      >
        <Cards
          cols={4}
          items={[
            { title: "Choose Your Role", copy: "Select the category." },
            {
              title: "Submit an Inquiry",
              copy: "Describe goals and contribution.",
            },
            { title: "Review and Align", copy: "Confirm mutual fit." },
            { title: "Activate", copy: "Document responsibilities." },
          ]}
        />
      </Section>
      <Section
        eyebrow="Partner standards"
        title="Official status must mean something."
        soft
      >
        <div className="split">
          <div>
            <h3>Meaningful Contribution</h3>
            <p>
              Funding, technology, data, expertise, networks or opportunities.
            </p>
          </div>
          <div>
            <h3>Responsible Access</h3>
            <p>
              No automatic data access, judging influence or platform-wide
              exclusivity.
            </p>
          </div>
        </div>
      </Section>
      <CTA
        title="Let’s Build Meaningful Opportunities Together"
        copy="Help talented people solve real problems."
        buttons={[
          ["Become a Partner", "/partner-inquiry"],
          ["Sponsor a Challenge", "/partner-inquiry"],
        ]}
      />
    </Layout>
  );
}

function AboutPage() {
  return (
    <Layout>
      <Hero
        eyebrow="About StartupFair"
        title="From Startup Events to a Global Innovation Platform"
        copy="Founded in 2015, StartupFair is evolving from entrepreneurial event roots into a skills-based talent discovery and open innovation platform."
        primary={["Explore Challenges", "/challenges"]}
      />
      <Section
        eyebrow="At a glance"
        title="A clear snapshot of StartupFair today."
      >
        <Cards
          cols={4}
          items={[
            { title: "Global", copy: "Participation scope" },
            { title: "Three Models", copy: "Talent · Innovation · Venture" },
            { title: "Established 2015", copy: "Entrepreneurial roots" },
            { title: "Skills-first", copy: "Practical discovery" },
          ]}
        />
      </Section>
      <Section eyebrow="Our journey" title="A visual history timeline." soft>
        <div className="timeline">
          <span>2015 · Founded</span>
          <span>Early Years · Events</span>
          <span>Evolution · New Need</span>
          <span>Today · Platform</span>
        </div>
      </Section>
      <section className="mission">
        <span className="eyebrow">Mission</span>
        <h2>
          Connect talented people, meaningful problems and credible
          opportunities.
        </h2>
      </section>
      <Section eyebrow="Principles" title="How StartupFair intends to operate.">
        <Cards
          items={[
            {
              title: "Skills Before Labels",
              copy: "Practical ability and demonstrated work.",
            },
            {
              title: "Meaningful Outcomes",
              copy: "Credible potential pathways.",
            },
            { title: "Transparent Evaluation", copy: "Published criteria." },
            { title: "Participant Control", copy: "Consent-based visibility." },
            {
              title: "Responsible Innovation",
              copy: "Clear data and IP terms.",
            },
            {
              title: "Verified Claims",
              copy: "Evidence-backed history and outcomes.",
            },
          ]}
        />
      </Section>
      <Section
        eyebrow="Historical gallery"
        title="Preserve the history without confusing the present."
        soft
      >
        <div className="gallery">
          <div>Primary historical event image</div>
          <div>Event image</div>
          <div>Community image</div>
          <div>Pitch image</div>
        </div>
      </Section>
      <CTA
        title="Choose How You Want to Engage"
        copy="Explore challenges, bring a problem or build a partnership."
        buttons={[
          ["Explore Challenges", "/challenges"],
          ["Contact StartupFair", "/contact"],
        ]}
      />
    </Layout>
  );
}

function ContactPage() {
  return (
    <Layout>
      <Hero
        eyebrow="Contact StartupFair"
        title="Start With the Right Conversation."
        copy="Choose the pathway that matches your goal so your request reaches the appropriate StartupFair process."
      />
      <Section eyebrow="Choose your pathway" title="What Would You Like to Do?">
        <div className="cards cols-3">
          <article className="card">
            <h3>Launch a Challenge</h3>
            <p>Bring a real business, technology, healthcare, workforce, research, or social-impact problem to StartupFair.</p>
            <Link className="text-link" href="/launch-challenge">Propose a challenge</Link>
            <EmailRecipientNotice category="challenges" />
          </article>
          <article className="card">
            <h3>Find Proven Talent</h3>
            <p>Request talent for a role, project, pilot, research collaboration, or venture opportunity.</p>
            <Link className="text-link" href="/find-talent">Submit a talent request</Link>
            <EmailRecipientNotice category="talent" />
          </article>
          <article className="card">
            <h3>Create a Talent Profile</h3>
            <p>Present your skills, experience, interests, work samples, and opportunity preferences.</p>
            <ActionLink className="text-link" href="/talent-profile/contact">Create a free profile</ActionLink>
            <EmailRecipientNotice category="talent" />
          </article>
          <article className="card">
            <h3>Partnership or Sponsorship</h3>
            <p>Explore a corporate, university, technology, expert, investor, community, or challenge-sponsor relationship.</p>
            <Link className="text-link" href="/partner-inquiry">Start a partnership inquiry</Link>
            <EmailRecipientNotice category="partners" />
          </article>
          <article className="card">
            <h3>Challenge Participation</h3>
            <p>Review available challenges, eligibility, application requirements, timelines, and published rules.</p>
            <Link className="text-link" href="/challenges">Explore challenges</Link>
            <EmailRecipientNotice category="challenges" />
          </article>
          <article className="card">
            <h3>General, Media or Support</h3>
            <p>Use the form below or email <a className="text-link" href="mailto:hello@startupfair.org">hello@startupfair.org</a> for general business, media, speaking, accessibility, technical support, privacy, or historical inquiries.</p>
            <a className="text-link" href="#contact-form">Use the general contact form</a>
          </article>
        </div>
      </Section>
      <Section eyebrow="Before contacting us" title="Use the dedicated pathways when possible." soft>
        <div className="split">
          <div>
            <h3>Faster Routing</h3>
            <p>Challenge, talent, profile, and partnership forms collect the information needed for an initial review and provide the appropriate privacy and no-guarantee notices.</p>
          </div>
          <div>
            <h3>Protect Sensitive Information</h3>
            <p>Do not submit passwords, access credentials, protected health information, unnecessary personal data, trade secrets, unpublished inventions, or confidential technical details.</p>
          </div>
        </div>
      </Section>
      <Section
        id="contact-form"
        eyebrow="General contact form"
        title="For inquiries that do not fit a dedicated pathway."
      >
        <EmailRoutingForm category="general" showEmailContact className="contact-form" onSubmit={(event) => { event.preventDefault(); window.location.assign("/contact/confirmation"); }}>
          <label>
            Inquiry type
            <select required name="type" defaultValue="">
              <option value="" disabled>Select one</option>
              <option>General business inquiry</option>
              <option>Media or interview inquiry</option>
              <option>Speaking or event inquiry</option>
              <option>Website or technical support</option>
              <option>Accessibility request or feedback</option>
              <option>Privacy or personal-data request</option>
              <option>Legal or compliance inquiry</option>
              <option>Historical StartupFair inquiry</option>
              <option>Other</option>
            </select>
          </label>
          <label>
            Preferred communication method
            <select required name="communicationMethod" defaultValue=""><option value="" disabled>Select one</option><option>Email</option><option>Phone</option><option>Video meeting after email coordination</option></select>
          </label>
          <label>
            First name<input required name="firstName" />
          </label>
          <label>
            Last name<input required name="lastName" />
          </label>
          <label>
            Email address<input required type="email" name="email" />
          </label>
          <label>
            Phone number <small>(optional)</small><input type="tel" name="phone" />
          </label>
          <label>
            Organization <small>(optional)</small><input name="organization" />
          </label>
          <label>
            Country or region<input required name="region" />
          </label>
          <label className="wide">
            Subject<input required maxLength={150} name="subject" />
          </label>
          <label className="wide">
            Message <small>(maximum 2,000 characters)</small><textarea required maxLength={2000} name="message" rows={8} />
          </label>
          <label className="wide check">
            <input type="checkbox" required name="contactPermission" /> I authorize StartupFair to use this information to review and respond to my inquiry.
          </label>
          <label className="wide check">
            <input type="checkbox" required name="policies" /> I have reviewed the <Link className="text-link" href="/privacy">Privacy Policy</Link> and agree to the applicable <Link className="text-link" href="/terms">Terms of Use</Link>.
          </label>
          <div className="wide actions"><button className="button primary" type="submit">Submit General Inquiry</button></div>
          <p className="wide submission-note"><strong>Prototype notice:</strong> During website development, this form does not transmit or store information. Production form processing, secure storage, routing, notifications, identity verification for privacy requests, and support tracking must be connected before accepting real inquiries.</p>
        </EmailRoutingForm>
      </Section>
    </Layout>
  );
}

const legal: Record<string, { title: string; description: string; sections: [string, string][] }> = {
  privacy: {
    title: "Privacy Policy",
    description: "Structure for explaining what information StartupFair collects, why it is used, when it may be shared, how visibility and consent work, and what choices people have.",
    sections: [
      ["1. Scope and Who Is Responsible", "Identify the covered website, platform services, legal entity, geographic scope, and privacy contact."],
      ["2. Information You Provide", "Cover accounts, profiles, applications, submissions, organization requests, partnership inquiries, communications, and uploaded materials."],
      ["3. Information Collected Automatically", "Cover device, browser, log, security, usage, cookie, and similar technical information."],
      ["4. Information From Other Sources", "Cover referrals, organizations, partners, public professional sources, service providers, and authorized integrations."],
      ["5. How Information Is Used", "Explain platform operation, challenge administration, matching, communication, verification, safety, analytics, legal compliance, and service improvement."],
      ["6. Profiles, Visibility and Consent", "Explain Private, Challenge Only, Talent Network, and Public Portfolio controls plus consent-based introductions."],
      ["7. When Information May Be Shared", "Cover authorized reviewers, challenge organizations, selected talent, service providers, legal obligations, business transfers, and user-directed sharing."],
      ["8. AI, Matching and Automated Tools", "Explain intended AI-assisted uses, human review, material limitations, and whether decisions are automated."],
      ["9. Data Retention and Deletion", "Define retention criteria for accounts, submissions, inquiries, logs, disputes, legal obligations, and backups."],
      ["10. Security and International Processing", "Describe organizational and technical safeguards, incident limitations, hosting locations, and cross-border transfer mechanisms."],
      ["11. Your Privacy Rights and Choices", "Cover access, correction, deletion, restriction, objection, portability, consent withdrawal, communications, cookies, and identity verification."],
      ["12. Children, Changes and Contact", "State age limitations, policy-update method, effective date, complaint pathways, and privacy contact details."],
    ],
  },
  terms: {
    title: "Terms of Use",
    description: "Structure for the agreement governing website use, accounts, platform participation, acceptable conduct, user materials, opportunities, and legal responsibilities.",
    sections: [
      ["1. Agreement and Scope", "Identify the website, platform services, incorporated policies, legal entity, and acceptance mechanism."],
      ["2. Eligibility and Authority", "Cover minimum age, legal capacity, organization authority, geographic restrictions, and accurate representations."],
      ["3. Accounts and Security", "Cover registration, accurate information, credentials, account responsibility, verification, suspension, and termination."],
      ["4. Platform Services and Role", "Define StartupFair as a challenge, talent, innovation, and venture-discovery platform and clarify what it does not guarantee."],
      ["5. Acceptable Use", "Cover lawful conduct and restrictions on abuse, discrimination, harassment, scraping, spam, fraud, malware, impersonation, and circumvention."],
      ["6. User Materials and Permissions", "Cover ownership, submission authority, licenses needed to operate the service, feedback, removal, and prohibited materials."],
      ["7. Challenges, Profiles and Opportunities", "Explain that eligibility, selection, introductions, hiring, pilots, partnerships, funding, and investment are not guaranteed."],
      ["8. Third-Party Services and Organizations", "Address external links, tools, sponsors, employers, partners, service providers, and separately governed transactions."],
      ["9. Fees, Taxes and Commercial Terms", "Reserve structure for future platform fees while requiring separate written terms for paid services, sponsorships, or transactions."],
      ["10. Intellectual Property and Brand Use", "Protect StartupFair content, software, names, logos, trademarks, historical materials, and permitted uses."],
      ["11. Disclaimers, Liability and Indemnity", "Reserve counsel-reviewed provisions on service availability, reliance, warranties, risk allocation, liability limits, and indemnification."],
      ["12. Governing Terms, Changes and Contact", "Reserve counsel-reviewed dispute, governing-law, venue, notices, assignment, severability, modification, termination, and contact provisions."],
    ],
  },
  "challenge-rules": {
    title: "Challenge Rules",
    description: "Structure for general participation rules that work alongside each challenge’s specific eligibility, scope, timeline, evaluation criteria, and intellectual-property terms.",
    sections: [
      ["1. Rules Hierarchy and Challenge Details", "Explain how general rules, challenge-specific terms, posted updates, and separate agreements work together."],
      ["2. Eligibility and Verification", "Cover age, location, experience, conflicts, sanctions, organization restrictions, and reasonable verification."],
      ["3. Individuals, Teams and Representatives", "Cover team formation, authorized representatives, member responsibility, changes, and prize or opportunity allocation."],
      ["4. Registration and Deadlines", "Cover application steps, accurate information, time zones, late entries, incomplete materials, and technical failures."],
      ["5. Submission Requirements", "Cover format, scope, demonstrations, documentation, testing evidence, accessibility, language, and compliance with instructions."],
      ["6. Originality and Third-Party Materials", "Cover submission authority, plagiarism, open source, datasets, APIs, licenses, permissions, and attribution."],
      ["7. AI Tools and Disclosure", "Cover permitted AI assistance, required disclosure, human accountability, prohibited uses, and verification of claims."],
      ["8. Data, Security and Responsible Innovation", "Cover approved data, privacy, consent, prohibited protected information, security controls, bias, explainability, and human review."],
      ["9. Evaluation, Judges and Conflicts", "Cover published criteria, eligibility screening, independent review, sponsor roles, recusals, demonstrations, questions, and decision integrity."],
      ["10. Finalists, Winners and Publicity", "State that only winners and finalists are publicly announced by StartupFair unless another participant independently chooses to share."],
      ["11. Intellectual Property and Confidentiality", "Distinguish pre-existing IP, submission rights, evaluation permissions, confidential materials, showcase consent, and separate commercialization terms."],
      ["12. Outcomes, Changes and Enforcement", "Cover prizes or opportunities, no-guarantee language, taxes, disqualification, cancellation, rule changes, disputes, and challenge contact."],
    ],
  },
  cookies: {
    title: "Cookie Policy",
    description: "Structure for explaining cookies and similar technologies used by the website, their purposes and duration, third-party services, and visitor controls.",
    sections: [
      ["1. Scope and Relationship to Privacy Policy", "Identify the covered website and explain how this policy works with the Privacy Policy."],
      ["2. Cookies and Similar Technologies", "Define cookies, local storage, pixels, SDKs, tags, and other relevant browser or device technologies."],
      ["3. Strictly Necessary Technologies", "Cover security, authentication, routing, accessibility, load balancing, fraud prevention, and core functionality."],
      ["4. Preference and Functional Technologies", "Cover language, region, interface, consent, and other saved user choices."],
      ["5. Analytics and Performance Technologies", "Cover measurement, diagnostics, feature improvement, audience statistics, and any consent requirements."],
      ["6. Third Parties and Duration", "List each provider, purpose, cookie or technology, data recipient, and session or persistent duration."],
      ["7. Consent and User Controls", "Explain consent mechanisms, preference changes, browser controls, device settings, opt-outs, and effects of disabling technologies."],
      ["8. Updates and Contact", "State the effective date, update process, contact method, and link to privacy-rights information."],
    ],
  },
};
function LegalPage({ type }: { type: string }) {
  const d = legal[type];
  return (
    <Layout>
      <section className="legal">
        <span className="eyebrow">Legal wireframe · Final language requires counsel review</span>
        <h1>{d.title}</h1>
        <p>{d.description}</p>
        <div className="cards cols-4">
          <article className="card"><h3>Effective Date</h3><p>To be confirmed</p></article>
          <article className="card"><h3>Last Updated</h3><p>To be confirmed</p></article>
          <article className="card"><h3>Responsible Entity</h3><p>Legal entity to be confirmed</p></article>
          <article className="card"><h3>Contact</h3><p><a className="text-link" href="mailto:hello@startupfair.org">hello@startupfair.org</a></p></article>
        </div>
        <p className="submission-note"><strong>Wireframe notice:</strong> This page defines the required information architecture only. It is not a final policy, contract, legal notice, or substitute for advice from qualified counsel.</p>
        <h2>Contents</h2>
        <nav>
          {d.sections.map(([h]) => (
            <a key={h} href={`#${h.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
              {h}
            </a>
          ))}
        </nav>
        {d.sections.map(([h, b]) => (
          <section key={h} id={h.toLowerCase().replace(/[^a-z0-9]+/g, "-")}>
            <h2>{h}</h2>
            <p><strong>Section scope:</strong> {b}</p>
            <p className="placeholder">[Counsel-reviewed language, definitions, jurisdictional requirements, exceptions, procedures, and cross-references will be added during the legal-content phase.]</p>
          </section>
        ))}
        <div className="actions">
          <Link className="button primary" href="/contact#contact-form">Contact StartupFair</Link>
          <Link className="button" href="/privacy">Privacy Policy</Link>
          <Link className="button" href="/terms">Terms of Use</Link>
          <Link className="button" href="/challenge-rules">Challenge Rules</Link>
          <Link className="button" href="/cookies">Cookie Policy</Link>
        </div>
      </section>
    </Layout>
  );
}
function GeneralInquiryConfirmationPage() {
  return (
    <Layout>
      <section className="system-page">
        <div className="status">✓</div>
        <span className="eyebrow">General inquiry received</span>
        <h1>Thank You for Contacting StartupFair</h1>
        <p>Your general, media, speaking, support, accessibility, privacy, legal, historical, or other inquiry has reached the confirmation stage.</p>
        <div className="application-reference">
          <small>Inquiry reference</small>
          <strong>SF-GEN-2026-00001</strong>
          <p>The production platform will generate a unique reference number for future communication and support tracking.</p>
        </div>
      </section>
      <Section eyebrow="Inquiry routing" title="What Happens Next">
        <div className="process">
          <div><span>01</span><h3>Routing Review</h3><p>StartupFair identifies the appropriate inquiry category and responsible contact.</p></div>
          <div><span>02</span><h3>Completeness Check</h3><p>The message is checked for enough information to understand the request and determine a next step.</p></div>
          <div><span>03</span><h3>Clarification if Needed</h3><p>StartupFair may request additional non-sensitive information or direct the sender to a dedicated website pathway.</p></div>
          <div><span>04</span><h3>Appropriate Response</h3><p>If a response is warranted, an authorized StartupFair representative may follow up using the selected communication preference.</p></div>
        </div>
        <p className="prose submission-note"><strong>Privacy requests:</strong> Requests involving access, correction, deletion, restriction, or another personal-data right may require reasonable identity and authority verification before StartupFair can take action or disclose information.</p>
        <p className="prose submission-note"><strong>Response notice:</strong> Submission does not guarantee a response time, meeting, interview, support resolution, media participation, speaking engagement, business relationship, or other outcome.</p>
        <div className="actions">
          <Link className="button primary" href="/contact">Return to Contact</Link>
          <Link className="button" href="/challenges">Explore Challenges</Link>
          <Link className="button" href="/">Return Home</Link>
        </div>
        <p className="prose submission-note"><strong>Prototype notice:</strong> During this website-development stage, inquiry information is not transmitted or stored and the displayed reference number is illustrative. Production form processing, secure storage, routing, notifications, verification, reference generation, and support tracking must be connected before accepting real inquiries.</p>
      </Section>
    </Layout>
  );
}
function NotFoundPage() {
  return (
    <Layout>
      <section className="system-page">
        <div className="status">404</div>
        <span className="eyebrow">Page not found</span>
        <h1>Let’s Get You Back on Track.</h1>
        <p>The requested page is not available in this prototype.</p>
        <div className="actions">
          <Link className="button primary" href="/">
            Return Home
          </Link>
          <Link className="button" href="/challenges">
            Browse Challenges
          </Link>
        </div>
      </section>
    </Layout>
  );
}

export function StartupFairPage({ page }: { page: string }) {
  if (page === "home") return <HomePage />;
  if (page === "challenges") return <ChallengesPage />;
  if (page.startsWith("challenges/"))
    return <ChallengeDetail slug={page.split("/")[1]} />;
  if (page === "apply/ai-clinician-matching") return <ClinicianApplicationPage />;
  if (page === "apply/enterprise-ai-agent") return <EnterpriseApplicationPage />;
  if (page === "apply/publisher-campaign-intelligence") return <PublisherApplicationPage />;
  if (page === "apply/ai-clinician-matching/participant-type") return <ApplicationTypePage basePath="/apply/ai-clinician-matching" />;
  if (page === "apply/enterprise-ai-agent/participant-type") return <ApplicationTypePage basePath="/apply/enterprise-ai-agent" />;
  if (page === "apply/publisher-campaign-intelligence/participant-type") return <ApplicationTypePage basePath="/apply/publisher-campaign-intelligence" interestOnly />;
  if (page === "apply/ai-clinician-matching/contact") return <ApplicationContactPage basePath="/apply/ai-clinician-matching" challengeName="AI Clinician Matching Challenge" />;
  if (page === "apply/enterprise-ai-agent/contact") return <ApplicationContactPage basePath="/apply/enterprise-ai-agent" challengeName="Enterprise AI Agent Challenge" />;
  if (page === "apply/publisher-campaign-intelligence/contact") return <ApplicationContactPage basePath="/apply/publisher-campaign-intelligence" challengeName="Publisher-to-Campaign Intelligence Challenge" interestOnly />;
  if (page === "apply/ai-clinician-matching/background") return <ClinicianApplicationBackgroundPage />;
  if (page === "apply/enterprise-ai-agent/background") return <EnterpriseApplicationBackgroundPage />;
  if (page === "apply/publisher-campaign-intelligence/background") return <PublisherApplicationBackgroundPage />;
  if (page === "apply/publisher-campaign-intelligence/challenge-experience") return <PublisherApplicationExperiencePage />;
  if (page === "apply/publisher-campaign-intelligence/motivation") return <PublisherApplicationApproachPage />;
  if (page === "apply/publisher-campaign-intelligence/links") return <PublisherApplicationLinksPage />;
  if (page === "apply/publisher-campaign-intelligence/acknowledgments") return <PublisherApplicationAcknowledgmentsPage />;
  if (page === "apply/publisher-campaign-intelligence/review") return <PublisherApplicationReviewPage />;
  if (page === "apply/publisher-campaign-intelligence/confirmation") return <PublisherApplicationConfirmationPage />;
  if (page === "apply/enterprise-ai-agent/challenge-experience") return <EnterpriseApplicationExperiencePage />;
  if (page === "apply/enterprise-ai-agent/motivation") return <EnterpriseApplicationApproachPage />;
  if (page === "apply/enterprise-ai-agent/links") return <EnterpriseApplicationLinksPage />;
  if (page === "apply/enterprise-ai-agent/acknowledgments") return <EnterpriseApplicationAcknowledgmentsPage />;
  if (page === "apply/enterprise-ai-agent/review") return <EnterpriseApplicationReviewPage />;
  if (page === "apply/enterprise-ai-agent/confirmation") return <EnterpriseApplicationConfirmationPage />;
  if (page === "apply/ai-clinician-matching/challenge-experience") return <ClinicianApplicationExperiencePage />;
  if (page === "apply/ai-clinician-matching/motivation") return <ClinicianApplicationApproachPage />;
  if (page === "apply/ai-clinician-matching/links") return <ClinicianApplicationLinksPage />;
  if (page === "apply/ai-clinician-matching/acknowledgments") return <ClinicianApplicationAcknowledgmentsPage />;
  if (page === "apply/ai-clinician-matching/review") return <ClinicianApplicationReviewPage />;
  if (page === "apply/ai-clinician-matching/confirmation") return <ClinicianApplicationConfirmationPage />;
  if (page === "for-talent") return <TalentPage />;
  if (page === "talent-profile") return <TalentProfileContactPage />;
  if (page === "talent-profile/overview") return <TalentProfileIntroductionPage />;
  if (page === "talent-profile/contact") return <TalentProfileContactPage />;
  if (page === "talent-profile/background") return <TalentProfileBackgroundPage />;
  if (page === "talent-profile/skills") return <TalentProfileSkillsPage />;
  if (page === "talent-profile/interests") return <TalentProfileInterestsPage />;
  if (page === "talent-profile/work-samples") return <TalentProfileWorkSamplesPage />;
  if (page === "talent-profile/privacy") return <TalentProfilePrivacyPage />;
  if (page === "talent-profile/review") return <TalentProfileReviewPage />;
  if (page === "talent-profile/confirmation") return <TalentProfileConfirmationPage />;
  if (page === "for-organizations") return <OrganizationsPage />;
  if (page === "launch-challenge") return <ChallengeProposalIntroductionPage />;
  if (page === "launch-challenge/contact") return <ChallengeProposalContactPage />;
  if (page === "launch-challenge/problem") return <ChallengeProposalProblemPage />;
  if (page === "launch-challenge/talent") return <ChallengeProposalTalentPage />;
  if (page === "launch-challenge/resources") return <ChallengeProposalResourcesPage />;
  if (page === "launch-challenge/timeline") return <ChallengeProposalTimelinePage />;
  if (page === "launch-challenge/privacy") return <ChallengeProposalPrivacyPage />;
  if (page === "launch-challenge/review") return <ChallengeProposalReviewPage />;
  if (page === "launch-challenge/confirmation") return <ChallengeProposalConfirmationPage />;
  if (page === "find-talent") return <TalentRequestIntroductionPage />;
  if (page === "find-talent/contact") return <TalentRequestContactPage />;
  if (page === "find-talent/need") return <TalentRequestNeedPage />;
  if (page === "find-talent/qualifications") return <TalentRequestQualificationsPage />;
  if (page === "find-talent/logistics") return <TalentRequestLogisticsPage />;
  if (page === "find-talent/privacy") return <TalentRequestPrivacyPage />;
  if (page === "find-talent/review") return <TalentRequestReviewPage />;
  if (page === "find-talent/confirmation") return <TalentRequestConfirmationPage />;
  if (page === "partner-inquiry") return <PartnershipInquiryIntroductionPage />;
  if (page === "partner-inquiry/contact") return <PartnershipInquiryContactPage />;
  if (page === "partner-inquiry/contribution") return <PartnershipInquiryContributionPage />;
  if (page === "partner-inquiry/sponsorship") return <PartnershipInquirySponsorshipPage />;
  if (page === "partner-inquiry/focus") return <PartnershipInquiryFocusPage />;
  if (page === "partner-inquiry/timeline") return <PartnershipInquiryTimelinePage />;
  if (page === "partner-inquiry/privacy") return <PartnershipInquiryPrivacyPage />;
  if (page === "partner-inquiry/review") return <PartnershipInquiryReviewPage />;
  if (page === "partner-inquiry/confirmation") return <PartnershipInquiryConfirmationPage />;
  if (page === "partners") return <PartnersPage />;
  if (page === "about") return <AboutPage />;
  if (page === "contact") return <ContactPage />;
  if (page === "contact/confirmation") return <GeneralInquiryConfirmationPage />;
  if (legal[page]) return <LegalPage type={page} />;
  return <NotFoundPage />;
}
