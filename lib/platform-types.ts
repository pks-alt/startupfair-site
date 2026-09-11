export type AccountRole = "talent" | "innovator" | "organization" | "partner" | "mentor" | "judge" | "admin";

export type ApplicationStatus =
  | "draft"
  | "submitted"
  | "under_review"
  | "more_information"
  | "qualified"
  | "selected"
  | "waitlisted"
  | "not_selected"
  | "withdrawn";

export type TeamStatus = "forming" | "ready" | "locked" | "active" | "completed";
export type WorkspaceStatus = "provisioning" | "running" | "idle" | "failed" | "suspended" | "archived";
export type SubmissionStatus = "draft" | "validating" | "ready" | "submitted" | "frozen" | "judged";
export type OpportunityStatus = "new" | "interested" | "introduction" | "meeting" | "discussion" | "offer_or_pilot" | "closed";

export type ChallengeVisibility = "public" | "private_enterprise" | "invite_only";

export type PlatformUser = {
  id: string;
  email: string;
  displayName: string;
  roles: AccountRole[];
  activeRole: AccountRole;
  emailVerified: boolean;
  mfaEnabled: boolean;
  githubConnected: boolean;
};

export type Challenge = {
  id: string;
  slug: string;
  title: string;
  visibility: ChallengeVisibility;
  status: "draft" | "review" | "approved" | "open" | "active" | "judging" | "completed" | "archived";
  ownerOrganizationId?: string;
  programType: "talent" | "innovation" | "venture";
  startAt?: string;
  endAt?: string;
};

export type Team = {
  id: string;
  challengeId: string;
  name: string;
  status: TeamStatus;
  repositoryId?: string;
  workspaceId?: string;
};

export type Workspace = {
  id: string;
  teamId: string;
  status: WorkspaceStatus;
  repositoryUrl: string;
  previewUrl?: string;
  aiCreditBalance: number;
};

export type Submission = {
  id: string;
  challengeId: string;
  teamId: string;
  status: SubmissionStatus;
  repositoryId: string;
  commitSha?: string;
  demoUrl?: string;
  aiDisclosure?: string[];
  frozenAt?: string;
};

export type Opportunity = {
  id: string;
  type: "interview" | "full_time" | "contract" | "project" | "pilot" | "partnership" | "accelerator" | "investment_intro";
  status: OpportunityStatus;
  participantId?: string;
  innovationId?: string;
  organizationId: string;
};

export const PLATFORM_BACKEND_BOUNDARIES = {
  auth: "Identity, sessions, email verification, OAuth/SSO, MFA and role claims",
  systemOfRecord: "Users, profiles, applications, organizations, teams, challenges, scores, submissions, consent, audit and opportunities",
  github: "Authoritative source repository for challenge code",
  objectStorage: "Private resumes, decks, screenshots, evidence and challenge files",
  secrets: "Encrypted environment variables, API credentials and provider secrets",
  workspaceEngine: "Vibe or equivalent runtime/agent orchestration where verified",
  notifications: "Email and in-app transactional delivery",
} as const;
