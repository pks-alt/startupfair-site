"use client";

import Link from "next/link";
import {
  Activity,
  Bell,
  Bot,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Code2,
  FileCheck2,
  FolderLock,
  GitBranch,
  LayoutDashboard,
  MessageSquare,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  Users,
} from "lucide-react";
import type { PlatformRoute, PlatformRole } from "@/lib/platform-routes";
import { roleNavigation } from "@/lib/platform-routes";

const ROLE_HOME: Record<PlatformRole, string> = {
  Talent: "/app/home",
  Innovator: "/app/innovator/home",
  Organization: "/app/organization/home",
  Partner: "/app/partner/home",
  Mentor: "/app/mentor/home",
  Judge: "/app/judge/home",
  Admin: "/admin",
};

function Metric({ label, value, note }: { label: string; value: string; note: string }) {
  return <div className="sf-metric"><span>{label}</span><strong>{value}</strong><small>{note}</small></div>;
}

function Status({ children, tone = "blue" }: { children: React.ReactNode; tone?: "blue" | "green" | "amber" | "purple" | "gray" }) {
  return <span className={`sf-status ${tone}`}>{children}</span>;
}

function Card({ title, children, actions }: { title: string; children: React.ReactNode; actions?: React.ReactNode }) {
  return <section className="sf-card"><header><h3>{title}</h3>{actions}</header>{children}</section>;
}

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return <div className="sf-table-wrap"><table><thead><tr>{headers.map((h) => <th key={h}>{h}</th>)}</tr></thead><tbody>{rows.map((row, i) => <tr key={i}>{row.map((cell, j) => <td key={`${i}-${j}`}>{cell}</td>)}</tr>)}</tbody></table></div>;
}

function Notice({ children, tone = "blue" }: { children: React.ReactNode; tone?: "blue" | "green" | "amber" }) {
  return <div className={`sf-notice ${tone}`}>{children}</div>;
}

function Dashboard({ role }: { role: PlatformRole }) {
  const roleMetrics: Record<PlatformRole, [string, string, string][]> = {
    Talent: [["Application", "Selected", "Ready for team formation"], ["Team", "4 / 4", "Locked and active"], ["AI Credits", "320", "StartupFair balance"], ["Submission", "72%", "1 validation warning"]],
    Innovator: [["Application", "Selected", "Global Innovator Challenge"], ["Stage", "MVP", "Verified in application"], ["Team", "3", "Collaborators"], ["Pilot Interest", "2", "New requests"]],
    Organization: [["Active Challenges", "3", "2 public · 1 private"], ["Applications", "284", "63 waiting"], ["Active Teams", "22", "18 workspaces online"], ["Opportunities", "11", "Hiring + pilots"]],
    Partner: [["Programs", "3", "2 active"], ["Credits", "$25K", "AI + cloud"], ["Experts", "14", "Mentors / judges"], ["Outcomes", "12", "Interviews / pilots"]],
    Mentor: [["Open Requests", "4", "2 blocking"], ["Assigned Teams", "6", "3 programs"], ["Sessions Today", "2", "Online"], ["Hours", "14", "This month"]],
    Judge: [["Assigned", "12", "Submissions"], ["Completed", "7", "58%"], ["Due", "2d", "Before panel"], ["Conflicts", "0", "Cleared"]],
    Admin: [["Live Challenges", "7", "3 public · 2 private · 2 invite-only"], ["Applications", "186", "Waiting"], ["Workspaces", "54", "3 incidents"], ["AI Spend", "$428", "Today"]],
  };
  return <>
    <div className="sf-grid4">{roleMetrics[role].map(([a,b,c]) => <Metric key={a} label={a} value={b} note={c} />)}</div>
    <div className="sf-grid2">
      <Card title={role === "Admin" ? "Operations Queue" : "Next Actions"}>
        <div className="sf-action-list">
          <div><CheckCircle2/><span><b>Review the highest-priority item</b><small>All critical actions are surfaced in one place.</small></span><button>Open</button></div>
          <div><Activity/><span><b>Recent activity</b><small>Git, challenge, judging and opportunity events.</small></span><button>View</button></div>
          <div><Bell/><span><b>Upcoming deadline</b><small>Deadline and reminder data will come from the backend.</small></span><button>View</button></div>
        </div>
      </Card>
      <Card title="Platform Status">
        <div className="sf-readiness"><span><CheckCircle2/> Identity verified</span><span><CheckCircle2/> Permissions resolved</span><span><CheckCircle2/> Challenge context loaded</span><span><CheckCircle2/> Audit events enabled</span></div>
      </Card>
    </div>
  </>;
}

function ChallengeDirectory() {
  const items = [["Global AI & Software Talent Challenge", "OPEN", "Global · 7 days · Talent"],["Global Innovator Challenge", "UPCOMING", "Global · 7 days · Innovation"],["AI Clinician Matching Challenge", "PUBLIC", "Healthcare · AI"],["Enterprise AI Agent Challenge", "PRIVATE", "Enterprise · NDA"]];
  return <><div className="sf-filter"><Search/><input aria-label="Search challenges" placeholder="Search challenges"/><select aria-label="Theme"><option>All themes</option></select><select aria-label="Status"><option>Open & upcoming</option></select></div><div className="sf-card-grid">{items.map(([title, state, meta]) => <article className="sf-tile" key={title}><Status tone={state === "OPEN" ? "green" : state === "PRIVATE" ? "purple" : "blue"}>{state}</Status><h3>{title}</h3><p>{meta}</p><Link href="/app/challenges/global-ai-software-talent">View Challenge <ChevronRight size={15}/></Link></article>)}</div></>;
}

function ChallengeDetail() {
  return <><div className="sf-feature"><div><Status tone="green">APPLICATIONS OPEN</Status><h2>Global AI & Software Talent Challenge</h2><p>Global · Free · Skills-first · 7-day build</p></div><Link className="sf-primary" href="/app/applications/talent/qualification">Start Qualification</Link></div><div className="sf-tabs">{["Overview","Problem","Eligibility","Tracks","Resources","Timeline","Recognition","Opportunities","Rules","FAQ"].map((x,i)=><button className={i===0?"active":""} key={x}>{x}</button>)}</div><div className="sf-grid2"><Card title="How participation works"><p>Qualify, apply, get selected, form a team, build in StartupFair or with approved external AI tools, push to the managed repository, validate and freeze one exact commit for judging.</p></Card><Card title="Tracks"><div className="sf-tags">{["AI/ML & LLMs","Full Stack","Backend & Data","Frontend","DevOps/Cloud/Security"].map(x=><span key={x}>{x}</span>)}</div></Card></div></>;
}

function Application() {
  return <><div className="sf-stepper">{["Eligibility","Profile","Evidence","Technical / Problem Thinking","Review"].map((x,i)=><div className={i<2?"done":i===2?"active":""} key={x}><i>{i<2?"✓":i+1}</i><span>{x}</span></div>)}</div><div className="sf-grid2 sf-wide-left"><Card title="Application Form"><div className="sf-form-grid"><label>Primary track / theme<select><option>Select one</option></select></label><label>Timezone<input placeholder="Pacific Time"/></label><label className="wide">Demonstrated evidence<textarea placeholder="Project, problem, evidence or validation details"/></label><label className="wide">Supporting link<input placeholder="https://"/></label></div><div className="sf-form-actions"><button>Save Draft</button><button className="sf-primary">Continue</button></div></Card><Card title="Backend connection points"><ul className="sf-list"><li>Authenticated draft save</li><li>Status history</li><li>Eligibility rules</li><li>Reviewer assignment</li><li>Consent/version record</li><li>Notification events</li></ul></Card></div></>;
}

function Selection() {
  return <><div className="sf-result"><CheckCircle2/><Status tone="green">SELECTED</Status><h2>You’re selected.</h2><p>Choose how you want to participate.</p></div><div className="sf-card-grid"><Card title="Participate Solo"><p>Receive a managed private repository and isolated workspace.</p><button>Choose</button></Card><Card title="Create / Bring Team"><p>Invite known collaborators and assign roles.</p><button>Choose</button></Card><Card title="Find Teammates"><p>Use StartupFair AI-assisted recommendations.</p><Link className="sf-primary inline" href="/app/teams/matching">Find Teammates</Link></Card></div></>;
}

function Team({ matching = false }: { matching?: boolean }) {
  if (matching) return <><Notice>AI recommends complementary teammates. It never automatically places a participant on a team.</Notice><div className="sf-profile-list">{[["Maya Chen","Frontend Engineer","92%","React · TypeScript · Accessibility","Complements backend/AI strength"],["Arjun Rao","Cloud / DevOps","88%","AWS · Docker · Security","Closes infrastructure gap"],["Elena Petrova","Product / UX Engineer","84%","UX · React · Research","Adds product strength"]].map(([name,role,score,skills,why])=><article className="sf-profile-card" key={name}><div className="sf-avatar">{name.split(" ").map(x=>x[0]).join("")}</div><div><h3>{name}</h3><p>{role}</p><small>{skills}</small><div className="sf-why"><b>Why this match</b><span>{why}</span></div></div><aside><strong>{score}</strong><small>Team match</small><button>Invite</button></aside></article>)}</div></>;
  return <><div className="sf-grid4"><Metric label="Members" value="4 / 4" note="Team complete"/><Metric label="Terms" value="4 / 4" note="Accepted"/><Metric label="GitHub" value="Connected" note="Private managed repo"/><Metric label="Workspace" value="Ready" note="Provisioned"/></div><div className="sf-grid2 sf-wide-left"><Card title="Team Phoenix"><Table headers={["Member","Role","Status","Activity"]} rows={[["PK Samal","AI / Product","Ready","12 commits"],["Ghausul","Full Stack","Ready","18 commits"],["Maya Chen","Frontend","Ready","9 commits"],["Arjun Rao","DevOps","Ready","7 commits"]]}/></Card><Card title="Readiness"><div className="sf-readiness"><span><CheckCircle2/> Team locked</span><span><CheckCircle2/> Terms accepted</span><span><CheckCircle2/> GitHub granted</span><span><CheckCircle2/> Workspace ready</span><span><CheckCircle2/> Resources unlocked</span></div><Link className="sf-primary" href="/app/workspaces/current">Launch Workspace</Link></Card></div><Card title="Team Chat & Tasks"><div className="sf-chat"><p><b>Maya</b> Responsive results card is ready. Pushing now.</p><p><b>Ghausul</b> I’ll connect the API after the current build.</p><input placeholder="Message Team Phoenix…"/></div></Card></>;
}

function BuildStudio() {
  return <div className="sf-studio"><div className="sf-studio-top"><img src="/startupfair-logo.png" alt="StartupFair"/><b>Build Studio</b><span>/ Team Phoenix / clinician-matching-ai</span><Status tone="green">RUNNING</Status><div className="spacer"/><button>Preview</button><button>Share</button><Link href="/app/submissions/current">Submit</Link></div><div className="sf-studio-grid"><aside className="sf-studio-rail">{[Code2,Search,GitBranch,FolderLock,Users,ShieldCheck].map((Icon,i)=><button key={i}><Icon size={17}/></button>)}</aside><aside className="sf-files"><b>PROJECT FILES</b><span>⌄ app</span><span> layout.tsx</span><span className="selected"> page.tsx</span><span>› components</span><span>› lib</span><span>package.json</span></aside><section className="sf-code"><div className="sf-code-tabs"><span>page.tsx ×</span><span>styles.css ×</span></div><pre>{`import { MatchingPanel } from "@/components/matching-panel";

export default function Home() {
  return (
    <main>
      <h1>AI Clinician Matching</h1>
      <MatchingPanel mode="challenge" />
    </main>
  );
}

// GitHub remains authoritative for source code.`}</pre></section><aside className="sf-agent"><header><Bot size={17}/><b>AI Build Assistant</b><select><option>Claude</option><option>Codex</option><option>Approved model</option></select></header><small>StartupFair credits: 320</small><div className="sf-credit"><i/></div><div className="sf-bubble user">Add a confidence explanation to each match.</div><div className="sf-bubble">I’ll update the component, run the build and show the diff before commit.</div><div className="sf-diff"><b>3 files changed</b><span>matching-card.tsx</span><span>match-reasons.ts</span><span>styles.css</span><button>View Diff</button><button>Run Build</button></div><textarea placeholder="Ask the agent…"/></aside></div><div className="sf-terminal"><div><TerminalSquare size={14}/><b>Terminal</b><span>Problems 1</span><span>Build</span><span>Logs</span><span>Validation</span></div><pre>{`$ npm run build
✓ Production build completed successfully
$ startupfair validate
✓ Repository  ✓ Security  ✓ Demo
⚠ challenge-specific-test: empty state message required`}</pre></div></div>;
}

function AITools() {
  return <div className="sf-grid2"><Card title="Use StartupFair AI Credits"><p>Approved models inside Build Studio with team limits, provider controls and sponsor pools.</p><div className="sf-credit-summary"><b>320 credits remaining</b><div><i/></div></div><Link className="sf-primary inline" href="/app/workspaces/current">Open Build Studio</Link></Card><Card title="Use Your Own AI Tool"><p>Use Cursor, Claude, Codex, Copilot or another approved tool and push all challenge code to the StartupFair-managed repository.</p><code className="sf-repo">git@github.com:startupfair/team-phoenix.git</code><button>Open Repository</button></Card></div>;
}

function Resources() {
  return <><Notice tone="green">Access is permission-based: Public · Qualified Only · Team Only · NDA / Private.</Notice><div className="sf-card-grid">{[["Challenge Brief","Problem, outcomes and evaluation notes"],["Dataset","Synthetic challenge dataset"],["API Documentation","Endpoints, rate limits and examples"],["API Credentials","Injected into workspace secrets"],["SDK & Samples","Starter code and integration examples"],["Rules & Rubric","Submission and judging criteria"]].map(([title,copy])=><Card key={title} title={title}><p>{copy}</p><button>Open</button></Card>)}</div></>;
}

function Validation() {
  return <><div className="sf-feature"><div><Status tone="amber">1 WARNING</Status><h2>Technical Readiness</h2><p>Run reproducible checks before freezing the judging commit.</p></div><button className="sf-primary">Run Again</button></div><div className="sf-validation">{[["Repository Verification","Passed"],["Clean Production Build","Passed"],["Automated Tests","Passed"],["Security & Dependencies","Passed"],["Demo Health","Passed"],["Challenge-Specific Harness","Warning"]].map(([a,b])=><div key={a} className={b==="Passed"?"pass":"warn"}>{b==="Passed"?<CheckCircle2/>:<Activity/>}<span><b>{a}</b><small>{b}</small></span><button>View</button></div>)}</div><Notice>Final judging always references one immutable commit snapshot even if the repository continues to receive later commits.</Notice></>;
}

function Submission() {
  return <><div className="sf-stepper">{["Project","Demo & Evidence","Team","AI Disclosure","Validation","Review & Freeze"].map((x,i)=><div className={i<4?"done":i===4?"active":""} key={x}><i>{i<4?"✓":i+1}</i><span>{x}</span></div>)}</div><div className="sf-grid2 sf-wide-left"><Card title="Official Submission Package"><div className="sf-form-grid"><label>Repository<input value="startupfair/team-phoenix" readOnly/></label><label>Final commit<input value="9f42cb7" readOnly/></label><label>Demo URL<input value="https://preview.startupfair.app/team-phoenix" readOnly/></label><label>AI disclosure<select><option>StartupFair + own tools</option></select></label><label className="wide">Team contribution summary<textarea/></label></div></Card><Card title="Freeze"><Status tone="green">REPOSITORY VERIFIED</Status><h2 className="sf-commit">9f42cb7</h2><p>main · exact version to be judged</p><button>Use Latest Commit</button><button className="sf-primary">Freeze & Submit</button></Card></div></>;
}

function Results() {
  return <><div className="sf-award"><Sparkles/><Status tone="green">RESULT PUBLISHED</Status><h2>Best Production-Ready Solution</h2><p>Global AI & Software Talent Challenge · Team Phoenix</p><button>Add to Portfolio</button><button>Share on LinkedIn</button></div><div className="sf-grid2"><Card title="Verified Achievement"><Table headers={["Field","Value"]} rows={[["Recognition","Best Production-Ready Solution"],["Verification ID","SF-2026-AI-0048"],["Certificate","Available"],["Visibility","StartupFair Network"]]}/></Card><Card title="Next Opportunity"><p>An authorized organization requested a project introduction.</p><Link className="sf-primary inline" href="/app/opportunities">Review Request</Link></Card></div></>;
}

function Profile({ role }: { role: PlatformRole }) {
  const isInnovator = role === "Innovator";
  return <><div className="sf-profile-hero"><div className="sf-avatar big">{isInnovator?"AI":"PK"}</div><div><Status tone={isInnovator?"purple":"green"}>{isInnovator?"INNOVATOR":"STARTUPFAIR VERIFIED"}</Status><h2>{isInnovator?"AI Workforce Intelligence":"PK Samal"}</h2><p>{isInnovator?"Healthcare AI · MVP · Open to pilots":"AI / Product Builder · Pacific Time"}</p></div><div className="spacer"/><button>Edit</button><button>Privacy</button></div><div className="sf-grid2 sf-wide-left"><Card title={isInnovator?"Verified Innovation Record":"Verified Capability"}><Table headers={["Item","Evidence","Status"]} rows={isInnovator?[["Global Innovator Challenge","Finalist","Verified"],["Technical Validation","Passed","Verified"],["Pilot Interest","2 organizations","Active"]]:[["Python","Challenge project + validation","Verified"],["LLM Application Design","Judge-reviewed project","Verified"],["Product Strategy","Team role + contribution","Verified"],["React","Self-reported","Unverified"]]}/></Card><Card title="Visibility"><div className="sf-radio"><label><input type="radio" name="vis"/> Private</label><label><input type="radio" name="vis"/> Challenge Only</label><label><input type="radio" name="vis" defaultChecked/> StartupFair Network</label><label><input type="radio" name="vis"/> Public</label></div></Card></div></>;
}

function Opportunities({ role }: { role: PlatformRole }) {
  const rows = role === "Innovator" ? [["Regional Health Network","Pilot / POC","Requested","Review"],["AI Infrastructure Partner","Partnership","Meeting","Open"],["HealthTech Accelerator","Accelerator","Invited","Respond"]] : [["Healthcare AI Product Team","Full-Time","Requested Introduction","Review"],["Enterprise AI Pilot","Paid Project","Meeting Scheduled","Open"],["StartupFair Partner Network","Contract","New","Review"]];
  return <><div className="sf-grid4"><Metric label="New" value="2" note="Needs response"/><Metric label="Introductions" value="3" note="Active"/><Metric label="Meetings" value="1" note="Scheduled"/><Metric label="Offers / Pilots" value="0" note="Open"/></div><Card title="Opportunity Pipeline"><Table headers={["Organization / Opportunity","Type","Status","Action"]} rows={rows}/></Card><Notice>Participants control availability and introductions. Private contact information is not exposed before permission.</Notice></>;
}

function GenericOperations({ route }: { route: PlatformRoute }) {
  const rowsByKind: Record<string, string[][]> = {
    operations: [["Healthcare AI Matching","Public","Build","8 teams","Active"],["Enterprise Agent Challenge","Private","Team Formation","6 teams","Active"],["Global Innovator","Public","Applications","15–20 cohort","Upcoming"]],
    discovery: [["Maya Chen","Frontend / React","2 completed challenges","Open to contract","Request intro"],["Arjun Rao","Cloud / DevOps","Validation passed","Open to project","Request intro"],["AI Workforce Intelligence","Healthcare AI / MVP","Finalist","Open to pilot","Request demo"]],
    commercials: [["Enterprise Challenge Services","Agreement","Active","Custom","View"],["INV-2026-104","Invoice","Open","—","View"],["AI Credit Sponsorship","In-kind","Active","$10K credits","Usage"]],
    reports: [["Applicants","284","Qualified","112","39%"],["Selected","32","Submitted","27","84%"],["Introductions","14","Meetings","6","43%"]],
    experts: [["Dr. Nina Shah","Healthcare AI","Mentor","Assigned","Open"],["Carlos Vega","Cloud / Security","Judge","Accepted","Open"],["Aisha Khan","Product Strategy","Mentor","Invited","Open"]],
    review: [["Team Phoenix","Validated","3/3 judges","Complete","Open"],["MatchCraft","Validated","2/3 judges","In progress","Open"],["ClinicianIQ","Validated","1/3 judges","In progress","Open"]],
    "admin-table": [["Team Phoenix / User / Program","Active","Healthy","8 min","Manage"],["MatchCraft / Organization","Active","Healthy","14 min","Manage"],["DataSprint / Workspace","Attention","Needs review","21 min","Open"]],
  };
  const rows = rowsByKind[route.kind] ?? rowsByKind.operations;
  return <><div className="sf-grid4"><Metric label="Active" value="7" note="Current"/><Metric label="Pending" value="18" note="Needs action"/><Metric label="Healthy" value="94%" note="Operational"/><Metric label="Outcomes" value="12" note="Verified"/></div><Card title={route.title}><Table headers={["Item","Type / State","Evidence / Progress","Status","Action"]} rows={rows}/></Card><Notice>{route.description} Backend data should be permission-scoped, auditable and delivered through typed APIs.</Notice></>;
}

function ChallengeBuilder() {
  return <><div className="sf-stepper">{["Type","Problem","Eligibility","Skills / Themes","Participation","Resources","Timeline","Judging","IP / NDA","Recognition","Commercials","Review"].map((x,i)=><div className={i===0?"active":""} key={x}><i>{i+1}</i><span>{x}</span></div>)}</div><Card title="What do you want StartupFair to help you accomplish?"><div className="sf-card-grid"><label className="sf-option"><input type="radio" name="goal"/><b>Discover Talent</b><span>Evaluate people through demonstrated capability.</span></label><label className="sf-option"><input type="radio" name="goal"/><b>Develop Solutions</b><span>Have teams solve a real problem.</span></label><label className="sf-option"><input type="radio" name="goal"/><b>Explore Innovation / Ventures</b><span>Discover ideas, MVPs or startups.</span></label></div><h4>Visibility</h4><div className="sf-card-grid"><label className="sf-option"><input type="radio" name="visibility"/><b>Public</b><span>Visible to eligible StartupFair participants.</span></label><label className="sf-option"><input type="radio" name="visibility"/><b>Private Enterprise</b><span>NDA and controlled access.</span></label><label className="sf-option"><input type="radio" name="visibility"/><b>Invite-Only</b><span>Authorized invitees only.</span></label></div><div className="sf-form-actions"><button>Save Draft</button><button className="sf-primary">Continue</button></div></Card><Notice tone="amber">Organizations cannot self-publish. StartupFair reviews and approves every challenge before launch.</Notice></>;
}

function Scorecard() {
  const criteria = [["Problem Understanding","13","15"],["Innovation","17","20"],["Technical Execution","22","25"],["Practical Value","18","20"],["Presentation","8","10"],["Responsible AI / Security","9","10"]];
  return <div className="sf-grid2 sf-wide-left"><Card title="Scoring Rubric"><div className="sf-score-list">{criteria.map(([a,b,c])=><label key={a}><span><b>{a}</b><small>Max {c}</small></span><input type="number" defaultValue={b}/><strong>/ {c}</strong></label>)}</div></Card><Card title="Current Score"><div className="sf-score-total">87<span>/ 100</span></div><textarea placeholder="Private judge notes"/><textarea placeholder="Participant feedback"/><button>Save Draft</button><button className="sf-primary">Submit & Lock Score</button></Card></div>;
}

function Security() {
  return <><div className="sf-grid4"><Metric label="Security Alerts" value="2" note="1 medium · 1 low"/><Metric label="MFA Coverage" value="100%" note="Privileged roles"/><Metric label="Restricted Access" value="Healthy" note="No open violations"/><Metric label="Audit Events" value="1,204" note="Today"/></div><Card title="Security & Audit"><Table headers={["Event","Actor","Object","Risk","Action"]} rows={[["Role changed","Super Admin","Organization user","Sensitive","View"],["Submission reopened","Program Manager","Team Phoenix","Sensitive","View"],["NDA accepted","Participant","Private Challenge","Normal","View"],["Secret rotated","Technical Admin","Enterprise API","Sensitive","View"]]}/></Card><div className="sf-grid2"><Card title="Controls"><div className="sf-readiness"><span><CheckCircle2/> Server-side RBAC</span><span><CheckCircle2/> MFA privileged roles</span><span><CheckCircle2/> Versioned NDA/IP consent</span><span><CheckCircle2/> Restricted file access</span><span><CheckCircle2/> Secrets vault</span></div></Card><Card title="Operational Safety"><div className="sf-readiness"><span><CheckCircle2/> Staging / production separation</span><span><CheckCircle2/> Backup & restore</span><span><CheckCircle2/> Incident logging</span><span><CheckCircle2/> Access revocation</span><span><CheckCircle2/> Rollback</span></div></Card></div></>;
}

function Analytics() {
  return <><div className="sf-grid4"><Metric label="Registered" value="1,842" note="All programs"/><Metric label="Qualified" value="684" note="37%"/><Metric label="Submissions" value="218" note="83% selected teams"/><Metric label="Opportunities" value="76" note="Verified follow-through"/></div><Card title="Platform Funnel"><div className="sf-bars">{[["Registered → Qualified",37],["Qualified → Selected",52],["Selected → Submitted",83],["Submitted → Opportunity",35]].map(([a,b])=><div key={String(a)}><span>{a}</span><div><i style={{width:`${b}%`}}/></div><b>{b}%</b></div>)}</div></Card></>;
}

function renderContent(route: PlatformRoute) {
  switch (route.kind) {
    case "dashboard": return <Dashboard role={route.role}/>;
    case "directory": return <ChallengeDirectory/>;
    case "challenge": return <ChallengeDetail/>;
    case "application": return <Application/>;
    case "selection": return <Selection/>;
    case "team": return <Team/>;
    case "matching": return <Team matching/>;
    case "workspace": return route.path.endsWith("/current") || route.role === "Innovator" ? <BuildStudio/> : <GenericOperations route={route}/>;
    case "ai-tools": return <AITools/>;
    case "resources": return <Resources/>;
    case "validation": return <Validation/>;
    case "submission": return <Submission/>;
    case "results": return <Results/>;
    case "profile": return <Profile role={route.role}/>;
    case "opportunities": return <Opportunities role={route.role}/>;
    case "builder": return <ChallengeBuilder/>;
    case "scorecard": return <Scorecard/>;
    case "security": return <Security/>;
    case "analytics": return <Analytics/>;
    default: return <GenericOperations route={route}/>;
  }
}

const roleIcon: Record<PlatformRole, React.ReactNode> = {
  Talent: <Code2 size={15}/>, Innovator: <Sparkles size={15}/>, Organization: <BriefcaseBusiness size={15}/>, Partner: <CircleDollarSign size={15}/>, Mentor: <MessageSquare size={15}/>, Judge: <FileCheck2 size={15}/>, Admin: <ShieldCheck size={15}/>,
};

export function StartupFairPlatform({ route }: { route: PlatformRoute }) {
  const nav = roleNavigation(route.role);
  return <div className="sf-platform"><header className="sf-topbar"><Link className="sf-brand" href="/"><img src="/startupfair-logo.png" alt="StartupFair"/></Link><div className="sf-context"><small>StartupFair Platform</small><b>{route.role} Experience</b></div><div className="spacer"/><Link className="sf-top-link" href="/app/notifications"><Bell size={16}/></Link><Link className="sf-top-link" href="/app/messages"><MessageSquare size={16}/></Link><button className="sf-user">PK</button></header><div className="sf-shell"><aside className="sf-sidebar"><div className="sf-role"><small>Active role</small><Link href={ROLE_HOME[route.role]}>{roleIcon[route.role]}<b>{route.role}</b></Link></div><nav>{nav.map((item)=><Link key={item.path} className={item.path===route.path?"active":""} href={item.path}><LayoutDashboard size={14}/><span>{item.label}</span></Link>)}</nav><div className="sf-side-bottom"><Link href="/"><ChevronRight size={14}/>Public StartupFair Site</Link><Link href="/sign-in"><Settings size={14}/>Account</Link></div></aside><main className="sf-main"><div className="sf-page-head"><div><span className="sf-eyebrow">{route.role}</span><h1>{route.title}</h1><p>{route.description}</p></div><div className="sf-head-actions"><button>Help</button>{route.role !== "Admin" && <Link className="sf-primary" href={ROLE_HOME[route.role]}>Role Home</Link>}</div></div>{renderContent(route)}</main></div></div>;
}

export function StartupFairSignIn() {
  return <div className="sf-platform sf-auth-page"><div className="sf-auth-brand"><img src="/startupfair-logo.png" alt="StartupFair"/><h1>Build. Solve. Get Discovered.</h1><p>Sign in to your StartupFair platform workspace.</p><Link href="/">← Back to StartupFair</Link></div><div className="sf-auth-card"><span className="sf-eyebrow">One identity. Multiple roles.</span><h2>Sign in</h2><label>Email<input type="email" placeholder="name@example.com"/></label><Link className="sf-primary block" href="/app/home">Continue with email</Link><div className="sf-or"><span>or</span></div><button>Continue with Google</button><button>Continue with GitHub</button><button>Business SSO</button><p>Email verification, account recovery and MFA for privileged roles are backend integration points.</p><Link href="/onboarding">New to StartupFair? Create account</Link></div></div>;
}

export function StartupFairOnboarding() {
  return <div className="sf-platform sf-onboarding"><header><img src="/startupfair-logo.png" alt="StartupFair"/><Link href="/">Public Site</Link></header><main><span className="sf-eyebrow">Account Setup</span><h1>Choose how you participate.</h1><p>One account can hold multiple roles. You can switch roles later.</p><div className="sf-card-grid">{[["Talent","Compete, build and get discovered","/app/home"],["Innovator","Advance an idea, MVP or startup","/app/innovator/home"],["Organization","Launch challenges and discover capability","/app/organization/home"],["Partner","Support programs, credits, experts and opportunities","/app/partner/home"],["Mentor / Judge","Support or evaluate assigned teams","/app/mentor/home"]].map(([a,b,c])=><Link className="sf-option-link" href={c} key={a}><b>{a}</b><span>{b}</span><ChevronRight/></Link>)}</div><Notice>Backend must persist verified identity, role membership, connected GitHub account, privacy settings and consent history.</Notice></main></div>;
}
