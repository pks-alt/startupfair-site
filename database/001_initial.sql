-- StartupFair v1 database foundation. SQLite / Cloudflare D1 compatible.
-- Apply once through a migration runner, not on each web request.
-- No production binding or public API is enabled by this migration.
PRAGMA foreign_keys = ON;
CREATE TABLE app_users (id TEXT PRIMARY KEY NOT NULL,auth_subject TEXT NOT NULL UNIQUE,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,disabled_at TEXT);
CREATE TABLE private_contacts (user_id TEXT PRIMARY KEY REFERENCES app_users(id) ON DELETE CASCADE,legal_name TEXT,email TEXT NOT NULL COLLATE NOCASE UNIQUE,email_verified_at TEXT,phone TEXT,city TEXT,region TEXT,country TEXT,timezone TEXT,updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE organizations (id TEXT PRIMARY KEY NOT NULL,name TEXT NOT NULL,verification_status TEXT NOT NULL DEFAULT 'pending' CHECK(verification_status IN ('pending','verified','rejected','suspended')),verified_by TEXT REFERENCES app_users(id),verified_at TEXT,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE organization_members (organization_id TEXT NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,user_id TEXT NOT NULL REFERENCES app_users(id) ON DELETE CASCADE,role TEXT NOT NULL CHECK(role IN ('owner','recruiter','reviewer')),PRIMARY KEY(organization_id,user_id));
CREATE TABLE talent_profiles (
 id TEXT PRIMARY KEY NOT NULL,user_id TEXT NOT NULL UNIQUE REFERENCES app_users(id) ON DELETE CASCADE,display_name TEXT,professional_headline TEXT,professional_summary TEXT,
 skills_json TEXT NOT NULL DEFAULT '{}' CHECK(json_valid(skills_json)),interests_json TEXT NOT NULL DEFAULT '{}' CHECK(json_valid(interests_json)),
 visibility TEXT NOT NULL DEFAULT 'private' CHECK(visibility IN ('private','startupfair','challenge','network','public')),
 approved_fields_json TEXT NOT NULL DEFAULT '[]' CHECK(json_valid(approved_fields_json)),
 status TEXT NOT NULL DEFAULT 'draft' CHECK(status IN ('draft','submitted','verified','withdrawn')),version INTEGER NOT NULL DEFAULT 1 CHECK(version>=1),created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE challenges (id TEXT PRIMARY KEY NOT NULL,slug TEXT NOT NULL UNIQUE,title TEXT NOT NULL,organization_id TEXT REFERENCES organizations(id),model TEXT NOT NULL CHECK(model IN ('talent','innovation','venture')),access_mode TEXT NOT NULL DEFAULT 'public' CHECK(access_mode IN ('public','private','hybrid')),status TEXT NOT NULL DEFAULT 'draft' CHECK(status IN ('draft','coming_soon','open','closed','archived')),public_summary TEXT,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE challenge_private_details (challenge_id TEXT PRIMARY KEY REFERENCES challenges(id) ON DELETE CASCADE,details_json TEXT NOT NULL DEFAULT '{}' CHECK(json_valid(details_json)));
CREATE TABLE form_submissions (
 id TEXT PRIMARY KEY NOT NULL,reference TEXT NOT NULL UNIQUE,
 kind TEXT NOT NULL CHECK(kind IN ('general_inquiry','challenge_application','challenge_proposal','talent_profile','hiring_request','partnership_inquiry')),
 owner_user_id TEXT REFERENCES app_users(id),organization_id TEXT REFERENCES organizations(id),challenge_id TEXT REFERENCES challenges(id),profile_id TEXT REFERENCES talent_profiles(id),reply_email TEXT,
 schema_version INTEGER NOT NULL DEFAULT 1 CHECK(schema_version>=1),status TEXT NOT NULL DEFAULT 'draft' CHECK(status IN ('draft','submitted','in_review','accepted','declined','withdrawn')),created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,submitted_at TEXT,
 CHECK(kind <> 'challenge_application' OR challenge_id IS NOT NULL)
);
CREATE INDEX submissions_kind_status ON form_submissions(kind,status,created_at);
CREATE TABLE submission_steps (submission_id TEXT NOT NULL REFERENCES form_submissions(id) ON DELETE CASCADE,step_key TEXT NOT NULL,answers_json TEXT NOT NULL CHECK(json_valid(answers_json)),version INTEGER NOT NULL DEFAULT 1 CHECK(version>=1),updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,PRIMARY KEY(submission_id,step_key));
CREATE TABLE file_assets (id TEXT PRIMARY KEY NOT NULL,owner_user_id TEXT NOT NULL REFERENCES app_users(id),submission_id TEXT REFERENCES form_submissions(id),object_key TEXT NOT NULL UNIQUE,original_name TEXT NOT NULL,media_type TEXT NOT NULL,size_bytes INTEGER NOT NULL CHECK(size_bytes>0),scan_status TEXT NOT NULL DEFAULT 'pending' CHECK(scan_status IN ('pending','clean','rejected')),created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE work_samples (id TEXT PRIMARY KEY NOT NULL,profile_id TEXT NOT NULL REFERENCES talent_profiles(id) ON DELETE CASCADE,title TEXT NOT NULL,external_url TEXT,file_id TEXT REFERENCES file_assets(id),share_approved INTEGER NOT NULL DEFAULT 0 CHECK(share_approved IN (0,1)),CHECK((external_url IS NULL) <> (file_id IS NULL)));
CREATE TABLE consent_records (id TEXT PRIMARY KEY NOT NULL,user_id TEXT REFERENCES app_users(id),submission_id TEXT REFERENCES form_submissions(id),purpose TEXT NOT NULL,policy_version TEXT NOT NULL,granted INTEGER NOT NULL CHECK(granted IN (0,1)),recorded_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,withdrawn_at TEXT,CHECK(user_id IS NOT NULL OR submission_id IS NOT NULL));
CREATE TABLE profile_access_grants (id TEXT PRIMARY KEY NOT NULL,profile_id TEXT NOT NULL REFERENCES talent_profiles(id) ON DELETE CASCADE,organization_id TEXT REFERENCES organizations(id),challenge_id TEXT REFERENCES challenges(id),purpose TEXT NOT NULL CHECK(purpose IN ('challenge_review','talent_discovery','introduction')),approved_fields_json TEXT NOT NULL DEFAULT '[]' CHECK(json_valid(approved_fields_json)),approved_by TEXT NOT NULL REFERENCES app_users(id),created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,expires_at TEXT,revoked_at TEXT,CHECK(organization_id IS NOT NULL OR challenge_id IS NOT NULL));
CREATE TABLE email_outbox (
 id TEXT PRIMARY KEY NOT NULL,submission_id TEXT NOT NULL REFERENCES form_submissions(id),category TEXT NOT NULL CHECK(category IN ('general','challenges','talent','partners')),recipient TEXT NOT NULL,template_key TEXT NOT NULL,idempotency_key TEXT NOT NULL UNIQUE,status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','processing','sent','failed')),attempt_count INTEGER NOT NULL DEFAULT 0 CHECK(attempt_count>=0),created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,sent_at TEXT,
 CHECK((category='general' AND recipient='hello@startupfair.org') OR (category='challenges' AND recipient='challenges@startupfair.org') OR (category='talent' AND recipient='talent@startupfair.org') OR (category='partners' AND recipient='partners@startupfair.org'))
);
CREATE TABLE audit_events (id TEXT PRIMARY KEY NOT NULL,actor_user_id TEXT REFERENCES app_users(id),action TEXT NOT NULL,resource_type TEXT NOT NULL,resource_id TEXT NOT NULL,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
