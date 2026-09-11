export type PlatformRole =
  | "Talent"
  | "Innovator"
  | "Organization"
  | "Partner"
  | "Mentor"
  | "Judge"
  | "Admin";

export type PlatformKind =
  | "dashboard"
  | "directory"
  | "challenge"
  | "application"
  | "selection"
  | "team"
  | "matching"
  | "workspace"
  | "ai-tools"
  | "resources"
  | "validation"
  | "submission"
  | "results"
  | "profile"
  | "opportunities"
  | "messages"
  | "notifications"
  | "settings"
  | "builder"
  | "operations"
  | "discovery"
  | "commercials"
  | "reports"
  | "experts"
  | "calendar"
  | "review"
  | "scorecard"
  | "admin-table"
  | "security"
  | "analytics";

export type PlatformRoute = {
  path: string;
  label: string;
  title: string;
  role: PlatformRole;
  kind: PlatformKind;
  description: string;
  nav?: boolean;
};

export const PLATFORM_ROUTES: PlatformRoute[] = [
  { path: "/app/home", label: "Home", title: "Participant Command Center", role: "Talent", kind: "dashboard", description: "Challenge, team, build, submission and opportunity priorities.", nav: true },
  { path: "/app/challenges", label: "Challenges", title: "Explore Challenges", role: "Talent", kind: "directory", description: "Public, private and invite-only challenge discovery.", nav: true },
  { path: "/app/challenges/global-ai-software-talent", label: "Talent Challenge", title: "Global AI & Software Talent Challenge", role: "Talent", kind: "challenge", description: "Full authenticated challenge experience." },
  { path: "/app/applications", label: "Applications", title: "Applications", role: "Talent", kind: "application", description: "Application status, drafts and decisions.", nav: true },
  { path: "/app/applications/talent/qualification", label: "Qualification", title: "Talent Qualification", role: "Talent", kind: "application", description: "Skills-first qualification flow." },
  { path: "/app/applications/talent/full", label: "Full Application", title: "Talent Full Application", role: "Talent", kind: "application", description: "Full applicant profile after qualification." },
  { path: "/app/applications/talent/selection", label: "Selection", title: "Selection", role: "Talent", kind: "selection", description: "Selected, waitlist, more-info and not-selected states." },
  { path: "/app/teams", label: "Teams", title: "Teams", role: "Talent", kind: "team", description: "Solo, bring/create team and current team.", nav: true },
  { path: "/app/teams/matching", label: "AI Team Matching", title: "AI Team Matching", role: "Talent", kind: "matching", description: "Complementary teammate recommendations." },
  { path: "/app/teams/current", label: "Team Room", title: "Team Room", role: "Talent", kind: "team", description: "Members, roles, chat, tasks and readiness." },
  { path: "/app/workspaces", label: "Build Workspaces", title: "Build Workspaces", role: "Talent", kind: "workspace", description: "Managed development environments.", nav: true },
  { path: "/app/workspaces/current", label: "Build Studio", title: "StartupFair Build Studio", role: "Talent", kind: "workspace", description: "Browser IDE, AI, GitHub, runtime, preview and logs." },
  { path: "/app/workspaces/current/ai-tools", label: "AI Tools", title: "AI & Development Tools", role: "Talent", kind: "ai-tools", description: "StartupFair credits plus participant-owned approved tools." },
  { path: "/app/workspaces/current/resources", label: "Resource Vault", title: "Challenge Resource Vault", role: "Talent", kind: "resources", description: "Files, datasets, APIs, SDKs and secrets." },
  { path: "/app/workspaces/current/validation", label: "Validation", title: "Technical Validation", role: "Talent", kind: "validation", description: "Build, tests, security, demo and challenge-specific checks." },
  { path: "/app/submissions", label: "Submissions", title: "Submissions", role: "Talent", kind: "submission", description: "Drafts and final challenge submissions.", nav: true },
  { path: "/app/submissions/current", label: "Final Submission", title: "Final Submission", role: "Talent", kind: "submission", description: "Exact Git commit freeze and evidence package." },
  { path: "/app/results", label: "Results", title: "Results & Recognition", role: "Talent", kind: "results", description: "Results, certificates and verified recognition." },
  { path: "/app/portfolio", label: "My Portfolio", title: "Verified Talent Portfolio", role: "Talent", kind: "profile", description: "Permanent verified skills, projects and challenge history.", nav: true },
  { path: "/app/opportunities", label: "Opportunities", title: "Opportunity Marketplace", role: "Talent", kind: "opportunities", description: "Hiring, contract and project introductions.", nav: true },
  { path: "/app/messages", label: "Messages", title: "Messages", role: "Talent", kind: "messages", description: "Contextual team, mentor and opportunity messaging.", nav: true },
  { path: "/app/notifications", label: "Notifications", title: "Notification Center", role: "Talent", kind: "notifications", description: "Challenge, team, build and opportunity alerts." },
  { path: "/app/settings", label: "Settings", title: "Settings", role: "Talent", kind: "settings", description: "Profile, privacy, accounts, AI tools and security.", nav: true },

  { path: "/app/innovator/home", label: "Home", title: "Innovator Command Center", role: "Innovator", kind: "dashboard", description: "Innovation, challenge, evidence and opportunity priorities.", nav: true },
  { path: "/app/innovator/applications", label: "Applications", title: "Innovator Applications", role: "Innovator", kind: "application", description: "Qualification, full application and decision status.", nav: true },
  { path: "/app/innovator/qualification", label: "Qualification", title: "Innovator Qualification", role: "Innovator", kind: "application", description: "Problem, evidence, solution and execution qualification." },
  { path: "/app/innovator/full-application", label: "Full Application", title: "Innovator Full Application", role: "Innovator", kind: "application", description: "Team, stage, materials, market, privacy and IP." },
  { path: "/app/innovator/workspace", label: "Innovation Workspace", title: "Innovation Workspace", role: "Innovator", kind: "workspace", description: "Problem validation, product, evidence and pitch workspace.", nav: true },
  { path: "/app/innovator/team", label: "Team", title: "Team & Collaborators", role: "Innovator", kind: "team", description: "Collaborators, roles and privacy." },
  { path: "/app/innovator/submission", label: "Submission", title: "Innovation Submission", role: "Innovator", kind: "submission", description: "Innovation, evidence, demo, pitch and team contribution.", nav: true },
  { path: "/app/innovator/portfolio", label: "Portfolio", title: "Innovation Portfolio", role: "Innovator", kind: "profile", description: "Permanent innovation record, recognition and pilot readiness.", nav: true },
  { path: "/app/innovator/opportunities", label: "Opportunities", title: "Pilot & Venture Opportunities", role: "Innovator", kind: "opportunities", description: "Pilot, partnership, accelerator and investment introductions.", nav: true },

  { path: "/app/organization/home", label: "Dashboard", title: "Organization Dashboard", role: "Organization", kind: "dashboard", description: "Challenges, teams, judging, discovery and outcomes.", nav: true },
  { path: "/app/organization/challenges", label: "Challenges", title: "Organization Challenges", role: "Organization", kind: "operations", description: "Draft, approved, active and completed challenges.", nav: true },
  { path: "/app/organization/challenges/new", label: "Create Challenge", title: "Create a Challenge", role: "Organization", kind: "builder", description: "Self-service challenge builder with StartupFair approval.", nav: true },
  { path: "/app/organization/challenges/current", label: "Challenge Operations", title: "Challenge Operations", role: "Organization", kind: "operations", description: "Applications, teams, workspaces, resources, judging and results." },
  { path: "/app/organization/talent", label: "Find Talent", title: "Find Verified Talent", role: "Organization", kind: "discovery", description: "Search demonstrated capability and request introductions.", nav: true },
  { path: "/app/organization/innovators", label: "Discover Innovators", title: "Discover Innovators", role: "Organization", kind: "discovery", description: "Find innovations by stage, evidence and pilot readiness.", nav: true },
  { path: "/app/organization/judging", label: "Judging", title: "Submissions & Judging", role: "Organization", kind: "review", description: "Authorized evaluation progress and submission access.", nav: true },
  { path: "/app/organization/opportunities", label: "Opportunities", title: "Opportunity Pipeline", role: "Organization", kind: "opportunities", description: "Hiring, project and pilot follow-through.", nav: true },
  { path: "/app/organization/commercials", label: "Agreements & Billing", title: "Agreements & Invoices", role: "Organization", kind: "commercials", description: "Approved agreements, invoices and credits.", nav: true },
  { path: "/app/organization/reports", label: "Reports", title: "Organization Reports", role: "Organization", kind: "reports", description: "Program metrics and verified outcomes.", nav: true },

  { path: "/app/partner/home", label: "Dashboard", title: "Partner Dashboard", role: "Partner", kind: "dashboard", description: "Programs, sponsorship, credits, experts and impact.", nav: true },
  { path: "/app/partner/programs", label: "Programs", title: "Programs & Sponsorships", role: "Partner", kind: "operations", description: "Supported programs and approved partner benefits.", nav: true },
  { path: "/app/partner/credits", label: "Credits & Resources", title: "Credits & Resources", role: "Partner", kind: "resources", description: "AI, cloud, APIs, tools and utilization.", nav: true },
  { path: "/app/partner/experts", label: "Mentors & Judges", title: "Mentors & Judges", role: "Partner", kind: "experts", description: "Verified partner experts and assignments.", nav: true },
  { path: "/app/partner/opportunities", label: "Opportunities", title: "Partner Opportunities", role: "Partner", kind: "opportunities", description: "Hiring, pilot and venture opportunities.", nav: true },
  { path: "/app/partner/impact", label: "Impact & Analytics", title: "Impact & Analytics", role: "Partner", kind: "analytics", description: "Utilization, expert contribution and outcomes.", nav: true },
  { path: "/app/partner/commercials", label: "Agreements", title: "Partner Agreements", role: "Partner", kind: "commercials", description: "Commercial and in-kind commitments.", nav: true },

  { path: "/app/mentor/home", label: "Dashboard", title: "Mentor Dashboard", role: "Mentor", kind: "dashboard", description: "Assigned teams, help requests and sessions.", nav: true },
  { path: "/app/mentor/requests", label: "Help Requests", title: "Mentor Help Requests", role: "Mentor", kind: "experts", description: "Contextual support requests from assigned teams.", nav: true },
  { path: "/app/mentor/sessions", label: "Sessions", title: "Team Sessions", role: "Mentor", kind: "experts", description: "Session agenda, external meeting link and notes.", nav: true },
  { path: "/app/mentor/calendar", label: "Calendar", title: "Office Hours & Calendar", role: "Mentor", kind: "calendar", description: "Availability and scheduled sessions.", nav: true },
  { path: "/app/mentor/profile", label: "Expert Profile", title: "Expert Profile", role: "Mentor", kind: "profile", description: "Verified reusable expert profile.", nav: true },

  { path: "/app/judge/home", label: "Judging Center", title: "Judging Center", role: "Judge", kind: "dashboard", description: "Assigned submissions, progress and deadlines.", nav: true },
  { path: "/app/judge/conflicts", label: "Conflicts", title: "Conflict Declaration", role: "Judge", kind: "review", description: "Conflict declaration before review.", nav: true },
  { path: "/app/judge/review", label: "Review Submission", title: "Submission Review", role: "Judge", kind: "review", description: "Frozen repo snapshot, demo, evidence and validation.", nav: true },
  { path: "/app/judge/scorecard", label: "Scorecard", title: "Judge Scorecard", role: "Judge", kind: "scorecard", description: "Rubric, private notes, participant feedback and score lock.", nav: true },
  { path: "/app/judge/final-review", label: "Final Review", title: "Final Review", role: "Judge", kind: "review", description: "Human panel review and finalist recommendation.", nav: true },

  { path: "/admin", label: "Command Center", title: "StartupFair Admin Command Center", role: "Admin", kind: "dashboard", description: "Central operations for the complete platform.", nav: true },
  { path: "/admin/users", label: "Users & Roles", title: "Users & Roles", role: "Admin", kind: "admin-table", description: "Identity verification, roles, status and access history.", nav: true },
  { path: "/admin/applications", label: "Applications", title: "Application Reviews", role: "Admin", kind: "admin-table", description: "Talent and Innovator review queues.", nav: true },
  { path: "/admin/programs", label: "Programs & Challenges", title: "Programs & Challenges", role: "Admin", kind: "admin-table", description: "Create, approve, publish, close and archive.", nav: true },
  { path: "/admin/teams", label: "Teams", title: "Team Operations", role: "Admin", kind: "admin-table", description: "Membership, roles, locks, permissions and exceptions.", nav: true },
  { path: "/admin/workspaces", label: "Workspaces", title: "Workspace Operations", role: "Admin", kind: "admin-table", description: "Runtime, preview, Vibe service health, logs and recovery.", nav: true },
  { path: "/admin/github", label: "GitHub", title: "GitHub Repositories", role: "Admin", kind: "admin-table", description: "Managed repos, sync, access and frozen snapshots.", nav: true },
  { path: "/admin/ai", label: "AI & Credits", title: "AI & Credits", role: "Admin", kind: "admin-table", description: "Providers, team limits, sponsor pools, usage and cost.", nav: true },
  { path: "/admin/resources", label: "Resources", title: "Resource Vault Administration", role: "Admin", kind: "admin-table", description: "Resources, access rules, secrets and audit history.", nav: true },
  { path: "/admin/experts", label: "Mentors & Judges", title: "Mentors & Judges", role: "Admin", kind: "admin-table", description: "Verification, assignment, conflicts and availability.", nav: true },
  { path: "/admin/submissions", label: "Submissions", title: "Submissions & Validation", role: "Admin", kind: "admin-table", description: "Exact commits, validation, deadlines and exceptions.", nav: true },
  { path: "/admin/judging", label: "Judging & Results", title: "Judging & Results", role: "Admin", kind: "admin-table", description: "Judge assignments, progress, panel review and publishing.", nav: true },
  { path: "/admin/opportunities", label: "Opportunities", title: "Opportunity Operations", role: "Admin", kind: "admin-table", description: "Protected introductions and verified outcomes.", nav: true },
  { path: "/admin/organizations", label: "Organizations & Partners", title: "Organizations & Partners", role: "Admin", kind: "admin-table", description: "Verification, users, programs and engagement.", nav: true },
  { path: "/admin/commercials", label: "Agreements & Invoices", title: "Agreements & Invoices", role: "Admin", kind: "admin-table", description: "Commercial records and sponsor commitments.", nav: true },
  { path: "/admin/communications", label: "Communications", title: "Communications", role: "Admin", kind: "admin-table", description: "Announcements and transactional notifications.", nav: true },
  { path: "/admin/analytics", label: "Analytics", title: "Platform Analytics", role: "Admin", kind: "analytics", description: "Applications, teams, AI cost, judging and outcomes.", nav: true },
  { path: "/admin/security", label: "Security & Audit", title: "Security & Audit", role: "Admin", kind: "security", description: "RBAC, MFA, consent, secrets, access history and incidents.", nav: true },
  { path: "/admin/settings", label: "Platform Settings", title: "Platform Settings", role: "Admin", kind: "settings", description: "Global configuration and integrations.", nav: true },
];

export const PLATFORM_PATHS = new Set(PLATFORM_ROUTES.map((route) => route.path));

export function platformRoute(path: string) {
  return PLATFORM_ROUTES.find((route) => route.path === path);
}

export function roleNavigation(role: PlatformRole) {
  return PLATFORM_ROUTES.filter((route) => route.role === role && route.nav);
}
